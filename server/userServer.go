package main

import (
	"encoding/json"
	"errors"
	"log"
	"net/http"

	"golang.org/x/crypto/bcrypt"
)

// Response type
type Response struct {
	Success bool
	msg     string
}

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
	err := accounts.AddUser(&UserDB{user.Identity.Username, passwordHash})
	if err != nil {
		user.Identity = UserIdentity{"", ""}
		log.Println(err)
		http.Error(w, err.Error(), 401)
		return
	}
	user.Connect()
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(Response{Success: true, msg: ""})
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
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(Response{Success: true, msg: ""})
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
	if secret.Account == "" {
		http.Error(w, "Bad", 500)
		return
	}
	err := user.AddSecret(secret)
	if err != nil {
		log.Println(err)
		http.Error(w, err.Error(), 500)
		return
	}
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(Response{Success: true, msg: ""})
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
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(user.Secrets)
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
	err = bcrypt.CompareHashAndPassword(passwordHash, []byte(userIdentity.Password))
	if err != nil {
		log.Println(err.Error())
		return errors.New("Bad Password for " + userIdentity.Username)
	}
	return nil
}
