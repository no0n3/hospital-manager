<?php
require 'vendor/autoload.php';

use app\core\Zelivar;
use app\core\db\DBConnection;

Zelivar::run([
    'root_dir' => realpath('./'),
    'params'   => require './config/params.php'
]);

var_dump('INII', Zelivar::getApp()->getParams());

DBConnection::get()->execute(<<<QUERY
CREATE TABLE IF NOT EXISTS `user` (
    `id` BIGINT PRIMARY KEY AUTO_INCREMENT,
    `username` VARCHAR(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
    `email` VARCHAR(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
    `password` CHAR(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
    `created_at` INT DEFAULT NULL
)ENGINE=InnoDB;
QUERY
);

DBConnection::get()->execute(<<<QUERY
CREATE TABLE IF NOT EXISTS `hospital` (
    `id` BIGINT PRIMARY KEY AUTO_INCREMENT,
    `user_id` BIGINT NOT NULL REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE,
    `name` VARCHAR(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
    `alt_name` VARCHAR(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
    `description` TEXT CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
    `is_deleted` TINYINT(1) NOT NULL DEFAULT 0,
    `created_at` INT DEFAULT NULL
)ENGINE=InnoDB;
QUERY
);

DBConnection::get()->execute(<<<QUERY
CREATE TABLE IF NOT EXISTS `clinic` (
    `id` BIGINT PRIMARY KEY AUTO_INCREMENT,
    `hospital_id` BIGINT NOT NULL REFERENCES `hospital`(`id`) ON DELETE CASCADE ON UPDATE CASCADE,
    `user_id` BIGINT NOT NULL REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE,
    `name` VARCHAR(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
    `alt_name` VARCHAR(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
    `description` TEXT CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
    `is_deleted` TINYINT(1) NOT NULL DEFAULT 0,
    `created_at` INT DEFAULT NULL
)ENGINE=InnoDB;
QUERY
);

DBConnection::get()->execute(<<<QUERY
CREATE TABLE IF NOT EXISTS `department` (
    `id` BIGINT PRIMARY KEY AUTO_INCREMENT,
    `clinic_id` BIGINT NOT NULL REFERENCES `clinic`(`id`) ON DELETE CASCADE ON UPDATE CASCADE,
    `user_id` BIGINT NOT NULL REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE,
    `name` VARCHAR(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
    `alt_name` VARCHAR(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
    `description` TEXT CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
    `is_deleted` TINYINT(1) NOT NULL DEFAULT 0,
    `created_at` INT DEFAULT NULL
)ENGINE=InnoDB;
QUERY
);

DBConnection::get()->execute(<<<QUERY
CREATE TABLE IF NOT EXISTS `cabinet` (
    `id` BIGINT PRIMARY KEY AUTO_INCREMENT,
    `department_id` BIGINT NOT NULL REFERENCES `department`(`id`) ON DELETE CASCADE ON UPDATE CASCADE,
    `user_id` BIGINT NOT NULL REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE,
    `name` VARCHAR(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
    `alt_name` VARCHAR(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
    `description` TEXT CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
    `is_deleted` TINYINT(1) NOT NULL DEFAULT 0,
    `created_at` INT DEFAULT NULL
)ENGINE=InnoDB;
QUERY
);
