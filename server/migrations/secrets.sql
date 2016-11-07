CREATE TABLE `secrets` (
    `account` varchar(255) NOT NULL,
    `secret` varchar(255) NOT NULL UNIQUE,
    `movingFactor` tinyint(4) NOT NULL,
    `length` tinyint(4) NOT NULL,
    `otpType` varchar(4) NOT NULL,
    `hashType` varchar(8) NOT NULL
);
