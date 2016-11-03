package main

import (
	"log"
	"net/http"
	"path"
)

const (
	// DatabaseFolder folder
	DatabaseFolder = "databases"

	// MigrationsFolder folder
	MigrationsFolder = "migrations"

	// KeysFolder folder
	KeysFolder = "keys"
)

var accounts Accounts
var user User

func main() {
	accounts.Init()
	defer accounts.db.Close()

	http.Handle("/", http.FileServer(http.Dir("dist")))

	http.HandleFunc("/auth/sign_up", PostOnly(user.SignUpHandler))
	http.HandleFunc("/auth/sign_in", PostOnly(user.SignInHandler))
	http.HandleFunc("/auth/logout", GetOnly(user.LogoutHandler))

	http.HandleFunc("/secret/add", PostOnly(user.AddSecretHandler))
	http.HandleFunc("/secret/remove", PostOnly(user.RemoveSecretHandler))
	http.HandleFunc("/secret/list", GetOnly(user.ListSecretHandler))

	// err := http.ListenAndServe(":8080", nil)

	err := http.ListenAndServeTLS(":8080", path.Join(KeysFolder, "https.pem"), path.Join(KeysFolder, "https.key"), nil)
	if err != nil {
		log.Fatal("ListenAndServe: ", err)
	}
}
