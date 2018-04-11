package main

import (
	"database/sql"
	"encoding/json"
	//	"fmt"
	_ "github.com/lib/pq"
	"log"
    "io"
    "io/ioutil"
	"net/http"
    "github.com/gorilla/mux"
)

type Board struct {
	Name         string `json:"name"`
	Abbreviation string `json:"abbreviation"`
	Rules        string `json:"rules"`
}

type Thread struct {
	FirstPost   int    `json:"firstPost"`
	Board       string `json:"board"`
	Created     string `json:"created"`
    Updated     string `json:"updated"`
}

type Post struct {
    ID          int    `json:"id",omitempty`
    Title       string `json:"title"`
	Name        string `json:"name"`
	Options     string `json:"options",omitempty`
	MediaURL    string `json:"mediaURL",omitempty`
	Content     string `json:"content"`
	FirstPostID string `json:"firstPostID",omitempty`
	Created     string `json:"created",omitempty`
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

func setHeader(w http.ResponseWriter){
    w.Header().Set("Content-Type", "application/json; charset=UTF-8")
}

func errorResponse(w http.ResponseWriter){
    w.WriteHeader(http.StatusOK)
}

func boards(w http.ResponseWriter, r *http.Request) {
	db := getDB()
	rows, err := db.Query(`SELECT name, abbreviation FROM BOARDS`)
	if err != nil {
        errorResponse(w); return
	}

	defer rows.Close()
	var boards []Board
	for rows.Next() {
		var board Board
		err := rows.Scan(&board.Name, &board.Abbreviation)
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

func createThread(w http.ResponseWriter, r *http.Request) {
    vars := mux.Vars(r)
    boardName := vars["board"]

    body, err := ioutil.ReadAll(io.LimitReader(r.Body, 10485))
    if err != nil {
        panic(err)
    }
    if err := r.Body.Close(); err != nil {
        panic(err)
    }
    var post Post
    if err := json.Unmarshal(body, &post); err != nil {
        w.Header().Set("Content-Type", "application/json; charset=UTF-8")
        w.WriteHeader(422) // unprocessable entity
        if err := json.NewEncoder(w).Encode(err); err != nil {
            print("Reading data")
        }
    }else{
	    db := getDB()
	    _, err := db.Query(` WITH post_insert as (
                                    INSERT INTO posts (title, name, options,  mediaurl, content)
                                    VALUES($1, $2, $3, $4, $5, $6)
                                    RETURNING id;
                                )
                                INSERT INTO threads (firstPost, board)
                                VALUES( (SELECT id from post_insert ), $7)
                              ` , post.Title, post.Name, post.Options, post.MediaURL, post.Content, boardName);
        if err != nil {
            w.WriteHeader(200) // unprocessable entity
        }

    }

}

func newReply(w http.ResponseWriter, r *http.Request) {
    vars := mux.Vars(r)
    threadID := vars["id"]

    body, err := ioutil.ReadAll(io.LimitReader(r.Body, 10485))
    if err != nil {
        panic(err)
    }
    if err := r.Body.Close(); err != nil {
        panic(err)
    }
    var post Post
    if err := json.Unmarshal(body, &post); err != nil {
        w.Header().Set("Content-Type", "application/json; charset=UTF-8")
        w.WriteHeader(422) // unprocessable entity
        if err := json.NewEncoder(w).Encode(err); err != nil {
            print("Reading data")
        }
    }else{
	    db := getDB()
	    _, err := db.Query(`INSERT INTO posts (title, name, options,  mediaurl, content, firstPostID)
                               VALUES($1, $2, $3, $4, $5, $6, $7)
                               RETURNING id;
                              `, post.Title, post.Name, post.Options, post.MediaURL, post.Content, threadID);
        if err != nil {
            w.WriteHeader(200) // unprocessable entity
        }

    }

}
func threads(w http.ResponseWriter, r *http.Request) {
    vars := mux.Vars(r)
    boardName := vars["board"]

	db := getDB()
	rows, err := db.Query(`SELECT firstPost, board, created, updated 
                                  FROM THREADS WHERE board=$1`, boardName)
	if err != nil {
		log.Println(err)
	}

	defer rows.Close()
	var threads []Thread
	for rows.Next() {
		var thread Thread
		err := rows.Scan(&thread.FirstPost, &thread.Board, &thread.Created, &thread.Updated)
		if err != nil {
			log.Println(err)
		} else {
			threads = append(threads, thread)
		}
	}
	err = rows.Err()
	if err != nil {
		log.Println(err)
	}

	json.NewEncoder(w).Encode(threads)
}

func getThread(w http.ResponseWriter, r *http.Request) {
    vars := mux.Vars(r)
    threadID := vars["id"]
	db := getDB()
	row := db.QueryRow(`SELECT firstPost, board, created, updated 
                                  FROM THREADS WHERE firstPost=$1`, threadID)
    var thread Thread
    err := row.Scan(&thread.FirstPost, &thread.Board, &thread.Created, &thread.Updated)
	if err != nil {
		log.Println(err)
	}

	json.NewEncoder(w).Encode(thread)
}

func getPost(w http.ResponseWriter, r *http.Request) {
    vars := mux.Vars(r)
    postID := vars["id"]
	db := getDB()
	row := db.QueryRow(`SELECT id, title, name, options, mediaURL, content
                        firstPostID, created
                        FROM POSTS WHERE id=$1`, postID)
    var post Post
    err := row.Scan(&post.ID, &post.Title, &post.Name, &post.Options,
                    &post.MediaURL, &post.FirstPostID, &post.Created);
	if err != nil {
		log.Println(err)
	}

	json.NewEncoder(w).Encode(post)
}

func replies(w http.ResponseWriter, r *http.Request) {
    vars := mux.Vars(r)
    threadID := vars["id"]

	db := getDB()
	rows, err := db.Query(`SELECT id FROM POSTS WHERE firstPostID=$1`, threadID)
	if err != nil {
		log.Println(err)
	}

	defer rows.Close()
    replies := make([]int64, 0)
	for rows.Next() {
        var postID int64
        err := rows.Scan(&postID);
		if err != nil {
			log.Println(err)
		} else {
			replies = append(replies, postID)
		}
	}
	err = rows.Err()
	if err != nil {
		log.Println(err)
	}

	json.NewEncoder(w).Encode(replies)
}

func handler(w http.ResponseWriter, r *http.Request) {
}

func main() {
    router := mux.NewRouter()
	router.HandleFunc("/", handler)
	router.HandleFunc("/api/boards", boards)
	router.HandleFunc("/api/threads/{board}", threads)
	router.HandleFunc("/api/threads/{board}/new", createThread)
	router.HandleFunc("/api/thread/{id}", getThread)
	router.HandleFunc("/api/thread/{id}/replies", replies)
	router.HandleFunc("/api/post/{id}", getPost)
	router.HandleFunc("/api/post/{id}/reply", newReply)
    log.Fatal(http.ListenAndServe(":8080", router))
}
