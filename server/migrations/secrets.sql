CREATE TABLE `secrets` (
    `secretKey` varchar(255) NOT NULL UNIQUE,
    `time` tinyint(4) NOT NULL,
    `digits` tinyint(4) NOT NULL
);
