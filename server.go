package main

import (
	"database/sql"
	"encoding/json"
	//	"fmt"
	_ "github.com/lib/pq"
	"log"
	"net/http"
)

type Board struct {
	Name         string
	Abbreviation string
	Rules        string
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

func boards(w http.ResponseWriter, r *http.Request) {
	db := getDB()
	rows, err := db.Query(`SELECT name, abbreviation FROM BOARDS`)
	if err != nil {
		log.Println(err)
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

func handler(w http.ResponseWriter, r *http.Request) {
}

func main() {
	http.HandleFunc("/", handler)
	http.HandleFunc("/api/boards", boards)
	log.Fatal(http.ListenAndServe(":8080", nil))
}
