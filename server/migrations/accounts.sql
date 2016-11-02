CREATE TABLE `users` (
    `user` varchar(255) NOT NULL UNIQUE,
    `password_hash` varchar(255) NOT NULL
);
