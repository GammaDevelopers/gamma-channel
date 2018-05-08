package main

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"html"
	"io"
	"os"
	"path/filepath"
	"io/ioutil"
	"log"
	"github.com/dpapathanasiou/go-recaptcha"
	"net/http"
	"net"
	"strconv"

	"github.com/gorilla/mux"
	_ "github.com/lib/pq"
)

type Board struct {
	Name         string `json:"name"`
	Abbreviation string `json:"abbreviation"`
	Description  string `json:"description"`
	Rules        string `json:"rules"`
}

type Thread struct {
	FirstPost  int    `json:"firstPost"`
	Board      string `json:"board"`
	Replycount int    `json:"replyCount"`
	Created    string `json:"created"`
	Updated    string `json:"updated"`
}

type Post struct {
	ID          int           `json:"id", omitempty`
	Title       string        `json:"title"`
	Name        string        `json:"name"`
	Options     string        `json:"options", omitempty`
	MediaURL    string        `json:"mediaURL", omitempty`
	Content     string        `json:"content"`
	FirstPostID sql.NullInt64 `json:"firstPostID", omitempty`
	Created     string        `json:"created", omitempty`
}

func getDB() *sql.DB {

	connStr := "user=testuser password=qwerty dbname=gamma sslmode=disable"
	db, err := sql.Open("postgres", connStr)
	if err != nil {
		log.Println(err)
		return nil
	}

	return db

}


// processRequest accepts the http.Request object, finds the reCaptcha form variables which
// were input and sent by HTTP POST to the server, then calls the recaptcha package's Confirm()
// method, which returns a boolean indicating whether or not the client answered the form correctly.
func verifyCaptcha(request *http.Request) (result bool) {
	userIP := net.ParseIP(request.Header.Get("X-FORWARDED-FOR"))
	response := request.Header.Get("captcha")
	result, err := recaptcha.Confirm(userIP.String(), response)
	if err != nil {
		log.Println("recaptcha server error", err)
	}
	return result
}

func okHeader(w http.ResponseWriter) {
	w.Header().Set("Content-Type", "application/json; charset=UTF-8")
	w.WriteHeader(http.StatusOK)
}

func errorResponse(w http.ResponseWriter) {
	w.Header().Set("Content-Type", "application/json; charset=UTF-8")
	w.WriteHeader(http.StatusInternalServerError)
}

func errorResponseMessage(w http.ResponseWriter, message string) {
	w.Header().Set("Content-Type", "application/json; charset=UTF-8")
	w.WriteHeader(http.StatusInternalServerError)
	fmt.Fprintf(w, `{ "error": %s }`, message)
}

func boards(w http.ResponseWriter, r *http.Request) {
	db := getDB()
	defer db.Close()
	rows, err := db.Query(`SELECT name, abbreviation, description FROM BOARDS`)
	if err != nil {
		errorResponse(w)
		return
	}
	okHeader(w)

	defer rows.Close()
	var boards []Board
	for rows.Next() {
		var board Board
		err := rows.Scan(&board.Name, &board.Abbreviation, &board.Description)
		if err != nil {
			log.Println(err)
		} else {
			boards = append(boards, board)
		}
	}
	err = rows.Err()
	if err != nil {
		log.Println(err)
	}

	json.NewEncoder(w).Encode(boards)
}

func getBoard(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	abrev := vars["abrev"]

	db := getDB()
	defer db.Close()

	var board Board
	err := db.QueryRow(`SELECT name, abbreviation, description FROM BOARDS
						   WHERE abbreviation=$1`, abrev).Scan(&board.Name, &board.Abbreviation, &board.Description)

	if err != nil {
		errorResponse(w)
		return
	}
	okHeader(w)
	json.NewEncoder(w).Encode(board)
}

func createThread(w http.ResponseWriter, r *http.Request) {
	if(!verifyCaptcha(r)){
		errorResponse(w)
		return
	}

	vars := mux.Vars(r)
	boardName := vars["board"]

	body, err := ioutil.ReadAll(io.LimitReader(r.Body, 10485))
	if err != nil {
		errorResponse(w)
		return
	}
	if err := r.Body.Close(); err != nil {
		errorResponse(w)
		return
	}

	type Response struct {
		ThreadID int `json:"threadID"`
	}

	var post Post
	if err := json.Unmarshal(body, &post); err != nil {
		errorResponse(w)
		if err := json.NewEncoder(w).Encode(err); err != nil {
			print("Reading data")
		}
	} else {
		db := getDB()
		defer db.Close()
		var response Response
		err := db.QueryRow(` WITH post_insert as (
                                    INSERT INTO posts (title, name, options,  mediaurl, content)
                                    VALUES($1, $2, $3, $4, $5)
                                    RETURNING id
                                )
                                INSERT INTO threads (firstPost, board)
								VALUES( (SELECT id from post_insert ), $6) RETURNING firstPost;
							`, html.EscapeString(post.Title), html.EscapeString(post.Name), html.EscapeString(post.Options),
			html.EscapeString(post.MediaURL), html.EscapeString(post.Content), boardName).Scan(&response.ThreadID)
		if err != nil {
			errorResponse(w)
			log.Println(err)
		} else {
			w.WriteHeader(http.StatusCreated)
			json.NewEncoder(w).Encode(response)
		}
	}

}

func newReply(w http.ResponseWriter, r *http.Request) {

	if(!verifyCaptcha(r)){
		errorResponse(w)
		return
	}

	vars := mux.Vars(r)
	threadID, err := strconv.Atoi(vars["id"])

	body, err := ioutil.ReadAll(io.LimitReader(r.Body, 10485))
	if err != nil {
		errorResponse(w)
		return
	}
	if err := r.Body.Close(); err != nil {
		errorResponse(w)
		return
	}
	var post Post
	if err := json.Unmarshal(body, &post); err != nil {
		if err := json.NewEncoder(w).Encode(err); err != nil {
			print("Reading data")
		}
		errorResponse(w)
	} else {
		db := getDB()
		defer db.Close()
		var postid int
		err := db.QueryRow(`INSERT INTO posts (title, name, options,  mediaurl, content, firstPostID)
                               VALUES($1, $2, $3, $4, $5, $6)
                               RETURNING id;
                              `, html.EscapeString(post.Title), html.EscapeString(post.Name), html.EscapeString(post.Options),
			html.EscapeString(post.MediaURL), html.EscapeString(post.Content), threadID).Scan(postid)
		if err != nil {
			errorResponse(w)
		} else {
			w.WriteHeader(http.StatusCreated)
			fmt.Fprintf(w, `{ "postID": %d }`, postid)
		}

	}

}
func threads(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	boardName := vars["board"]

	db := getDB()
	defer db.Close()
	rows, err := db.Query(`SELECT firstPost, board, replycount, created, updated 
								  FROM THREADS WHERE board=$1
								  ORDER BY updated DESC`, boardName)
	if err != nil {
		log.Println(err)
	}

	defer rows.Close()
	var threads []Thread
	for rows.Next() {
		var thread Thread
		err := rows.Scan(&thread.FirstPost, &thread.Board, &thread.Replycount, &thread.Created, &thread.Updated)
		if err != nil {
			log.Println(err)
		} else {
			threads = append(threads, thread)
		}
	}
	err = rows.Err()
	if err != nil {
		log.Println(err)
		errorResponse(w)
		return
	}
	okHeader(w)

	json.NewEncoder(w).Encode(threads)
}

func getThread(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	threadID := vars["id"]
	db := getDB()
	defer db.Close()
	row := db.QueryRow(`SELECT firstPost, board, created, updated, replycount
                                  FROM THREADS WHERE firstPost=$1`, threadID)
	var thread Thread
	err := row.Scan(&thread.FirstPost, &thread.Board, &thread.Created, &thread.Updated, &thread.Replycount)
	if err != nil {
		log.Println(err)
		errorResponse(w)
		return
	}
	okHeader(w)

	json.NewEncoder(w).Encode(thread)
}

func getPost(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	postID := vars["id"]
	db := getDB()
	defer db.Close()
	row := db.QueryRow(`SELECT id, title, name, options, mediaURL, content,
                        firstPostID, created
                        FROM POSTS WHERE id=$1`, postID)
	var post Post
	err := row.Scan(&post.ID, &post.Title, &post.Name, &post.Options,
		&post.MediaURL, &post.Content, &post.FirstPostID, &post.Created)
	if err != nil {
		log.Println(err)
		errorResponse(w)
		return
	}
	okHeader(w)

	json.NewEncoder(w).Encode(post)
}

func replies(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	threadID := vars["id"]

	db := getDB()
	defer db.Close()
	rows, err := db.Query(`SELECT id FROM POSTS WHERE firstPostID=$1 ORDER BY created`, threadID)
	if err != nil {
		log.Println(err)
	}

	defer rows.Close()
	replies := make([]int64, 0)
	for rows.Next() {
		var postID int64
		err := rows.Scan(&postID)
		if err != nil {
			log.Println(err)
		} else {
			replies = append(replies, postID)
		}
	}
	err = rows.Err()
	if err != nil {
		log.Println(err)
		errorResponse(w)
		return
	}
	okHeader(w)

	json.NewEncoder(w).Encode(replies)
}

func handler(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Welcome to gamma API")
}

func main() {

	if len(os.Args) != 2 {
		fmt.Printf("usage: %s <reCaptcha private key>\n", filepath.Base(os.Args[0]))
		os.Exit(1)
	} else {
		recaptcha.Init(os.Args[1])
	}

	router := mux.NewRouter()
	router.HandleFunc("/", handler)
	router.HandleFunc("/api", handler)
	router.HandleFunc("/api/boards", boards)
	router.HandleFunc("/api/boards/{abrev}", getBoard)
	router.HandleFunc("/api/threads/{board}", threads)
	router.HandleFunc("/api/threads/{board}/new", createThread)
	router.HandleFunc("/api/thread/{id}", getThread)
	router.HandleFunc("/api/thread/{id}/replies", replies)
	router.HandleFunc("/api/post/{id}", getPost)
	router.HandleFunc("/api/post/{id}/reply", newReply)
	log.Fatal(http.ListenAndServe(":8080", router))
}
