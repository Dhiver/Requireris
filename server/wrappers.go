package main

import "net/http"

// Handler func type
type Handler func(w http.ResponseWriter, r *http.Request)

// GetOnly just GET method
func GetOnly(h Handler) Handler {
	return func(w http.ResponseWriter, r *http.Request) {
		if r.Method == "GET" {
			h(w, r)
			return
		}
		http.Error(w, "get only", http.StatusMethodNotAllowed)
	}
}

// PostOnly just POST method
func PostOnly(h Handler) Handler {
	return func(w http.ResponseWriter, r *http.Request) {
		if r.Method == "POST" {
			h(w, r)
			return
		}
		http.Error(w, "post only", http.StatusMethodNotAllowed)
	}
}
