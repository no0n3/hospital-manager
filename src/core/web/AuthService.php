<?php

namespace app\core\web;

use app\core\db\DBConnection;

class AuthService {
    private $userParam = '_user';

    public function login($email, $password) {
        if (!$this->isValidEmail($email) || !$this->isValidText($password)) {
            return false;
        }

        $stmt = DBConnection::get()->prepare('SELECT `id`, `email`, `username`, `password` FROM `user` WHERE `email` = :email');

        $stmt->execute([
            ':email' => $email,
        ]);
        $result = $stmt->fetch(\PDO::FETCH_ASSOC);

        if (!empty($result) && md5($password) === $result['password']) {
            $this->setUserAsLogged($result);

            return true;
        } else {
            return false;
        }
    }

    private function setUserAsLogged($user) {
        if (!empty($user)) {
            unset($user['password']);
            $_SESSION[$this->userParam] = $user;
        }
    }

    public function logout() {
        if ($this->isLogged()) {
            unset($_SESSION[$this->userParam]);
        }

        return true;
    }

    public function signup($email, $password, $username) {
        if (false === filter_var($email, FILTER_VALIDATE_EMAIL) ||
            '' === trim($password) ||
            '' === trim($username)
        ) {
            return false;
        }

        $stmt = DBConnection::get()->prepare('SELECT * FROM `user` WHERE `email` = :email');

        $stmt->execute([
            ':email' => $email,
        ]);
        $result = $stmt->fetch(\PDO::FETCH_ASSOC);

        if (empty($result)) {
            $stmt = DBConnection::get()->prepare('INSERT INTO `user` (`email`, `username`, `password`, `created_at`) VALUES (:email, :username, :password, :created_at)');

            return 0 < $stmt->execute([
                ':email'      => $email,
                ':username'   => $username,
                ':password'   => md5($password),
                ':created_at' => time(),
            ]);
        } else {
            return false;
        }
    }

    public function getLoggedUser() {
        $result = null;

        if ($this->isLogged()) {
            $result = $_SESSION[$this->userParam];
        }

        return $result;
    }

    public function isLogged() {
        return !empty($_SESSION[$this->userParam]);
    }

    private function isValidText($text) {
        return !empty($text) && '' !== trim($text);
    }

    private function isValidEmail($email) {
        return !empty($email) && false === !filter_var($email, FILTER_VALIDATE_EMAIL);
    }
}
