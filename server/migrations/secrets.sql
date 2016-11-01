CREATE TABLE `secrets` (
    `id` INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    `account` varchar(255) NOT NULL UNIQUE,
    `secretKey` varchar(255) NOT NULL UNIQUE,
    `time` tinyint(4) NOT NULL,
    `digits` tinyint(4) NOT NULL
);
