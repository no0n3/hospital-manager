<?php

namespace app\main\controllers;

use app\core\web\Controller;
use app\core\web\AuthService;

class MainController extends Controller {
    private $authService;

    public function __construct() {
        $this->authService = new AuthService();
    }

    public function config() {
        $config = parent::config();

        $config['login'] = [
            'method' => ['GET', 'POST']
        ];
        $config['logout'] = [
            'method' => ['POST']
        ];
        $config['signup'] = [
            'method' => ['POST']
        ];
        $config['user'] = [
            'method' => ['GET']
        ];

        return $config;
    }

    public function login() {
        $email    = $this->getPostParam('email');
        $password = $this->getPostParam('password');

        $success = $this->authService->login($email, $password);

        return [
            'success' => $success
        ];
    }

    public function logout() {
        $success = $this->authService->logout();

        return [
            'success' => $success
        ];
    }

    public function signup() {
        $email    = $this->getPostParam('email');
        $username = $this->getPostParam('username');
        $password = $this->getPostParam('password');

        $success = $this->authService->signup($email, $password, $username);

        return [
            'success' => $success
        ];
    }

    public function user() {
        $user = $this->authService->getLoggedUser();

        return [
            'user' => $user
        ];
    }
}
