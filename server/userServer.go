package main

import (
	"encoding/json"
	"log"
	"net/http"
	"reflect"

	"golang.org/x/crypto/bcrypt"
)

// UserIdentity type
type UserIdentity struct {
	Username string
	Password string
}

// SignUpHandler new user
func (user *User) SignUpHandler(w http.ResponseWriter, req *http.Request) {
	decoder := json.NewDecoder(req.Body)
	decoder.Decode(&user.Identity)
	passwordHash := cryptPassword(user.Identity.Password)
	log.Println(passwordHash)
	err := accounts.AddUser(&UserDB{user.Identity.Username, passwordHash})
	if err != nil {
		log.Println(err)
		http.Error(w, err.Error(), 401)
		return
	}
	user.Connect()
	w.WriteHeader(http.StatusOK)
}

// SignInHandler User
func (user *User) SignInHandler(w http.ResponseWriter, req *http.Request) {
	decoder := json.NewDecoder(req.Body)
	decoder.Decode(&user.Identity)
	err := user.Identity.CheckPassword()
	if err != nil {
		log.Println(err)
		http.Error(w, err.Error(), 401)
		return
	}
	// create JWT token
	user.Connect()
	// accounts.ListUsers()
	w.WriteHeader(http.StatusOK)
}

// LogoutHandler current user
func (user *User) LogoutHandler(w http.ResponseWriter, req *http.Request) {
	// remove JWT token
	w.WriteHeader(http.StatusOK)
}

// AddSecretHandler to user
func (user *User) AddSecretHandler(w http.ResponseWriter, req *http.Request) {
	var secret Secret
	decoder := json.NewDecoder(req.Body)
	decoder.Decode(&secret)
	err := user.AddSecret(secret)
	if err != nil {
		log.Println(err)
		http.Error(w, err.Error(), 500)
		return
	}
	w.WriteHeader(http.StatusOK)
}

// RemoveSecretHandler to user
func (user *User) RemoveSecretHandler(w http.ResponseWriter, req *http.Request) {
	// remove secret
	w.WriteHeader(http.StatusOK)
}

// ListSecretHandler to user
func (user *User) ListSecretHandler(w http.ResponseWriter, req *http.Request) {
	// remove JWT token
	user.LoadSecrets()
	json.NewEncoder(w).Encode(user.Secrets)
	w.WriteHeader(http.StatusOK)
}

func cryptPassword(password string) []byte {
	hash, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		log.Println(err)
	}
	return hash
}

// CheckPassword from userIdentity
func (userIdentity *UserIdentity) CheckPassword() error {
	passwordHash, err := accounts.GetPasswordHash(userIdentity.Username)
	if err != nil {
		return err
	}
	if reflect.DeepEqual(passwordHash, cryptPassword(userIdentity.Password)) {
		return err
	}
	return nil
}
