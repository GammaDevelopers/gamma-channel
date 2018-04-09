package main

import (
    "fmt"
    "log"
    "net/http"
    "encoding/json"
    "database/sql"
    "github.com/lib/pq"
)

func handler(w http.ResponseWriter, r *http.Request) {
    fmt.Fprintf(w, "Hi there, I love %s!", r.URL.Path[1:])
}

func main() {
    http.HandleFunc("/", handler)
    log.Fatal(http.ListenAndServe(":8080", nil))
}
