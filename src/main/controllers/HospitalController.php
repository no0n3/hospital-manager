<?php

namespace app\main\controllers;

use app\core\web\Controller;
use app\core\web\AuthService;
use app\main\services\HospitalService;

class HospitalController extends Controller {
    private $hospitalService;
    private $authService;

    public function __construct() {
        $this->hospitalService = new HospitalService();
        $this->authService = new AuthService();
    }

    public function config() {
        $config = parent::config();

        $config['getAll'] = [
            'method' => ['GET']
        ];
        $config['getAllByUser'] = [
            'method' => ['GET']
        ];
        $config['getByUser'] = [
            'method' => ['GET']
        ];
        $config['get'] = [
            'method' => ['GET']
        ];
        $config['create'] = [
            'method' => ['POST']
        ];
        $config['edit'] = [
            'method' => ['POST']
        ];
        $config['delete'] = [
            'method' => ['POST']
        ];

        return $config;
    }

    public function getAll() {
        $result = $this->hospitalService->getAll();

        return [
            'hospitals' => $result
        ];
    }

    public function getAllByUser() {
        if ($this->authService->isLogged()) {
            $result = $this->hospitalService->getByUser(
                $this->authService->getLoggedUser()['id']
            );
        } else {
            $result = [];
        }

        return [
            'hospitals' => $result
        ];
    }

    public function get() {
        $result = $result = $this->hospitalService->getById($this->getGetParam('id'));

        return [
            'hospital' => $result
        ];
    }

    public function getByUser() {
        if ($this->authService->isLogged()) {
            $result = $result = $this->hospitalService->getByIdAndUserId(
                $this->getGetParam('id'),
                $this->authService->getLoggedUser()['id']
            );
        } else {
            $result = null;
        }

        return [
            'hospital' => $result
        ];
    }

    public function create() {
        if ($this->authService->isLogged()) {
            $result = $this->hospitalService->create([
                'name'        => $this->getPostParam('name'),
                'alt_name'    => $this->getPostParam('alt_name'),
                'description' => $this->getPostParam('description'),
            ], $this->authService->getLoggedUser()['id']);
        } else {
            $result = false;
        }

        return [
            'success' => $result
        ];
    }

    public function edit() {
        if ($this->authService->isLogged()) {
            $result = $this->hospitalService->edit([
                'name'        => $this->getPostParam('name'),
                'alt_name'    => $this->getPostParam('alt_name'),
                'description' => $this->getPostParam('description'),
            ], $this->authService->getLoggedUser()['id'], $this->getPostParam('id'));
        } else {
            $result = false;
        }

        return [
            'success' => $result
        ];
    }

    public function delete() {
        if ($this->authService->isLogged()) {
            $result = $this->hospitalService->delete(
                $this->getPostParam('id'),
                $this->authService->getLoggedUser()['id']
            );
        } else {
            $result = false;
        }

        return [
            'success' => $result
        ];
    }
}
