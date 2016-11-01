package main

import (
	"log"
	"net/http"
)

// HelloServer coucou
func HelloServer(w http.ResponseWriter, req *http.Request) {
	w.Header().Set("Content-Type", "text/plain")
	w.Write([]byte("This is an example server.\n"))
	// fmt.Fprintf(w, "This is an example server.\n")
	// io.WriteString(w, "This is an example server.\n")
}

func main() {
	var secretDB SecretDB

	secretDB.db = Init()
	defer secretDB.db.Close()
	secretDB.ExecFromFile("migration.sql")
	secretDB.AddAccount("account", "secretKey", 23456789, 23)
	secretDB.List()

	http.HandleFunc("/", HelloServer)
	err := http.ListenAndServeTLS(":8080", "server.pem", "server.key", nil)
	if err != nil {
		log.Fatal("ListenAndServe: ", err)
	}
}
