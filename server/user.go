package main

import (
	"database/sql"
	"path"
	"strconv"
)

// User type
type User struct {
	Identity UserIdentity
	DB       *sql.DB
	Secrets  []Secret
}

// Secret type
type Secret struct {
	Account      string `json:"account"`
	Secret       string `json:"secret"`
	MovingFactor int    `json:"movingFactor"`
	Length       int    `json:"length"`
	OTPType      string `json:"otpType"`
	HashType     string `json:"hashType"`
}

// Connect user openning db
func (user *User) Connect() error {
	user.DB = Init(path.Join(DatabaseFolder, user.Identity.Username)+".db", user.Identity.Password)
	ExecFromFile(user.DB, path.Join(MigrationsFolder, "secrets.sql"))

	user.LoadSecrets()
	return nil
}

// AddSecret to database
func (user *User) AddSecret(secret Secret) error {
	// TODO fix reconnect
	user.DB = Init(path.Join(DatabaseFolder, user.Identity.Username)+".db", user.Identity.Password)
	cmd := "INSERT INTO `secrets` (account, secret, movingFactor, length, otpType, hashType) values('" + secret.Account + "', '" + secret.Secret + "', " + strconv.Itoa(secret.MovingFactor) + ", " + strconv.Itoa(secret.Length) + ", '" + secret.OTPType + "', '" + secret.HashType + "');"
	_, err := user.DB.Exec(cmd)
	if err != nil {
		return err
	}
	return nil
}

// RemoveSecret to database
func (user *User) RemoveSecret(secret Secret) error {
	// cmd := "INSERT INTO `secrets` (account, Secret, movingFactor, length, otpType, hashType) values('" + secret.Account + "', '" + secret.Secret + "', " + strconv.Itoa(secret.MovingFactor) + ", " + strconv.Itoa(secret.Length) + ", " + secret.OTPType + ", " + secret.HashType + ");"
	// _, err := user.DB.Exec(cmd)
	// if err != nil {
	// 	return err
	// }
	return nil
}

// LoadSecrets from database
func (user *User) LoadSecrets() error {
	cmd := "select account, Secret, movingFactor, length, otpType, hashType from secrets;"
	rows, err := user.DB.Query(cmd)
	defer rows.Close()
	if err != nil {
		return err
	}

	user.Secrets = make([]Secret, 0)

	for rows.Next() {
		var secret Secret
		rows.Scan(&secret.Account, &secret.Secret, &secret.MovingFactor, &secret.Length, &secret.OTPType, &secret.HashType)
		user.Secrets = append(user.Secrets, secret)
	}
	return nil
}
