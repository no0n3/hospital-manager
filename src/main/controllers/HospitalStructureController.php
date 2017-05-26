<?php

namespace app\main\controllers;

use app\core\web\Controller;
use app\core\web\AuthService;
use app\main\services\HospitalService;
use app\main\services\HospitalStructureService;

class HospitalStructureController extends Controller {
    private $hospitalService;
    private $hospitalStructureService;
    private $authService;

    public function __construct() {
        $this->authService = new AuthService();
        $this->hospitalService = new HospitalService();
        $this->hospitalStructureService = new HospitalStructureService($this->hospitalService);
    }

    public function config() {
        $config = parent::config();

        $config['getAll'] = [
            'method' => ['GET']
        ];
        $config['get'] = [
            'method' => ['GET']
        ];
        $config['getByIdAndType'] = [
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

    public function getByIdAndType() {
        if ($this->authService->isLogged()) {
            $result = $this->hospitalStructureService->getByIdUserIdAndType(
                $this->getGetParam('id'),
                $this->authService->getLoggedUser()['id'],
                $this->getGetParam('type')
            );
        } else {
            $result = null;
        }

        return [
            'item' => $result
        ];
    }

    public function get() {
        $result = $result = $this->hospitalStructureService->getByIdAndType(
            $this->getGetParam('id'),
            $this->getGetParam('type')
        );

        return [
            'item' => $result
        ];
    }

    public function create() {
        if ($this->authService->isLogged()) {
            $result = $this->hospitalStructureService->create(
                [
                    'name'        => $this->getPostParam('name'),
                    'alt_name'    => $this->getPostParam('alt_name'),
                    'description' => $this->getPostParam('description'),
                ],
                $this->getPostParam('type'),
                $this->authService->getLoggedUser()['id'],
                $this->getPostParam('addTo')
            );
        } else {
            $result = false;
        }

        return [
            'success' => $result
        ];
    }

    public function edit() {
        if ($this->authService->isLogged()) {
            $result = $this->hospitalStructureService->edit([
                    'name'        => $this->getPostParam('name'),
                    'alt_name'    => $this->getPostParam('alt_name'),
                    'description' => $this->getPostParam('description'),
                ],
                $this->authService->getLoggedUser()['id'],
                $this->getPostParam('id'),
                $this->getPostParam('type')
            );
        } else {
            $result = false;
        }

        return [
            'success' => $result
        ];
    }

    public function delete() {
        if ($this->authService->isLogged()) {
            $result = $this->hospitalStructureService->delete(
                $this->getPostParam('id'),
                $this->authService->getLoggedUser()['id'],
                $this->getPostParam('type')
            );
        } else {
            $result = false;
        }

        return [
            'success' => $result
        ];
    }
}
