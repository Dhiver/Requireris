package main

import (
	"database/sql"
	"fmt"
	"io/ioutil"

	_ "github.com/xeodou/go-sqlcipher"
)

// Init sql
func Init(name string, passphrase string) (db *sql.DB) {
	db, err := sql.Open("sqlite3", name)

	if err != nil {
		fmt.Print(err)
	}

	p := "PRAGMA key = '" + passphrase + "';"
	_, err = db.Exec(p)
	if err != nil {
		fmt.Println(err)
	}
	return
}

// ExecFromFile .sql
func ExecFromFile(db *sql.DB, filename string) {
	data, err := ioutil.ReadFile(filename)
	if err != nil {
		fmt.Println(err)
		return
	}
	_, err = db.Exec(string(data))
	if err != nil {
		fmt.Println(err)
	}
}
