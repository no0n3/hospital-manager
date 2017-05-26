<?php

namespace app\core\web;

abstract class Controller {
    public function config() {
        return [
            'index' => [
                'method' => 'any'
            ]
        ];
    }

    public function index() {
        return [];
    }

    protected function getPostParam($name) {
        $r = json_decode(file_get_contents("php://input"));

        return isset($_POST[$name]) ? $_POST[$name] : (isset($r->$name) ? $r->$name : null);
    }

    protected function getGetParam($name) {
        return isset($_GET[$name]) ? $_GET[$name] : null;
    }
}
