package main

import (
	"database/sql"
	"fmt"
	"io/ioutil"
	"strconv"

	_ "github.com/xeodou/go-sqlcipher"
)

const (
	dbName       = "accounts.db"
	dbPassphrase = "wggZbPsW4nV9LacUMHZCxMMk"
)

// SecretDB database
type SecretDB struct {
	db *sql.DB
}

// Init sql
func Init() (db *sql.DB) {
	db, err := sql.Open("sqlite3", dbName)

	if err != nil {
		fmt.Print(err)
	}

	p := "PRAGMA key = '" + dbPassphrase + "';"
	_, err = db.Exec(p)
	if err != nil {
		fmt.Println(err)
	}
	return
}

// ExecFromFile .sql
func (secretDB *SecretDB) ExecFromFile(filename string) {
	data, err := ioutil.ReadFile(filename)
	if err != nil {
		fmt.Println(err)
		return
	}
	_, err = secretDB.db.Exec(string(data))
	if err != nil {
		fmt.Println(err)
	}
}

// AddAccount to database
func (secretDB *SecretDB) AddAccount(account string, secretKey string, time int, digits int) {
	cmd := "INSERT INTO `secrets` (account, secretKey, time, digits) values('" + account + "','" + secretKey + "', " + strconv.Itoa(time) + ", " + strconv.Itoa(digits) + ");"
	println(cmd)
	_, err := secretDB.db.Exec(cmd)
	if err != nil {
		fmt.Println(err)
	}
}

// List database
func (secretDB *SecretDB) List() {
	e := "select account, secretKey, time, digits from secrets;"
	rows, err := secretDB.db.Query(e)
	if err != nil {
		fmt.Println(err)
	}
	defer rows.Close()
	for rows.Next() {
		var account string
		var secretKey string
		var time int
		var digits int
		rows.Scan(&account, &secretKey, &time, &digits)
		fmt.Println("{\"account\":\"" + account + "\", \"secretKey\": \"" + secretKey + "\", \"time\": \"" + strconv.Itoa(time) + "\", \"digits\": \"" + strconv.Itoa(digits) + "\"}")
	}
}
