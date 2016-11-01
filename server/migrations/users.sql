CREATE TABLE `users` (
    `id` INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    `user` varchar(255) NOT NULL UNIQUE,
    `password` varchar(255) NOT NULL
);
