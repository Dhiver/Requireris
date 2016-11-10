package main

import "net/http"

// Handler func type
type Handler func(w http.ResponseWriter, r *http.Request)

// GetOnly just GET method
func GetOnly(h Handler) Handler {
	return func(w http.ResponseWriter, r *http.Request) {
		if r.Method == "GET" || r.Header.Get("Access-Control-Request-Method") == "GET" {
			w.Header().Set("Access-Control-Allow-Origin", "*")
			w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
			w.Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization")
			h(w, r)
			return
		}
		http.Error(w, "get only", http.StatusMethodNotAllowed)
	}
}

// PostOnly just POST method
func PostOnly(h Handler) Handler {
	return func(w http.ResponseWriter, r *http.Request) {
		if r.Method == "POST" || r.Header.Get("Access-Control-Request-Method") == "POST" {
			w.Header().Set("Access-Control-Allow-Origin", "*")
			w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
			w.Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization")
			h(w, r)
			return
		}
		http.Error(w, "post only", http.StatusMethodNotAllowed)
	}
}
