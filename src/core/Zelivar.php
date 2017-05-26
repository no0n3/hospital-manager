<?php

namespace app\core;

/**
 * 
 */
class Zelivar {
    private static $app;

    private $data;
    private $params;

    private function __construct(array $data = []) {
        // prevent public instantiation
        $this->data = $data;
        $this->params = isset($this->data['params']) ? $this->data['params'] : [];
    }

    public function __get($name) {
        if ('params' === $name) {
            return $this->getParams();
        }

        return null;
    }

    public static function getApp() {
        return static::$app;
    }

    public function getParams() {
        return $this->params;
    }

    public static function run(array $data = []) {
        if (null === static::$app) {
            static::$app = new static($data);

            if (PHP_SAPI !== 'cli') {
                session_start();
            }
        }
    }

    public function dispatch() {
        $names = $this->getControllerAndActionNames();

        $controllerFile = $this->getControllerPath($names['controller']);

        $notFound = true;
        $result = [];

        if (file_exists($controllerFile)) {
            $controller = new $names['controller'];
            $config = $controller->config();
            $action = $names['action'];

            if (method_exists($controller, $names['action']) &&
                $this->validateActionMethod($config, $action)
            ) {
                $notFound = false;

                $result = $controller->$action();
            }
        }

        if ($notFound) {
            echo 'NOT FOUND<br/>';
        } else {
            if (is_array($result)) {
                echo json_encode($result);
            } else {
                echo $result;
            }
        }
    }

    private function getControllerPath($name) {
        $a = explode('\\', $name);
        $a[0] = 'src';
        $result = $controllerFile = $this->data['root_dir']
            . DIRECTORY_SEPARATOR
            . implode(DIRECTORY_SEPARATOR, $a)
            . '.php';

        return $result;
    }

    private function getControllerAndActionNames() {
        $pathInfo = $this->getPathInfoAsArray();
        $pathInfoSize = count($pathInfo);

        if (0 === $pathInfoSize) {
            $pathInfo[0] = 'main';
            $pathInfo[1] = 'index';
        } else if (1 === $pathInfoSize) {
            $pathInfo[1] = 'index';
        }

        $result = [
            'controller' => 'app\main\controllers\\' . ucfirst($pathInfo[0]) . 'Controller',
            'action'     => $pathInfo[1]
        ];

        return $result;
    }

    private function getPathInfoAsArray() {
        $result = $this->getPathInfo();
        $result = explode('/', $result);

        $resultArray = [];

        foreach ($result as $item) {
            if ('' !== trim($item)) {
                $resultArray[] = $item;
            }
        }

        return $resultArray;
    }

    private function getPathInfo() {
        $result = isset($_SERVER['PATH_INFO']) ? $_SERVER['PATH_INFO'] : null;

        return $result;
    }

    private function validateActionMethod(array $config, $action) {
        if (isset($config[$action]) && isset($config[$action]['method'])) {
            $methods = [];
            $method = $config[$action]['method'];

            foreach (is_array($method) ? $method : [$method] as $methodItem) {
                $methods[] = strtolower($methodItem);
            }

            return in_array(strtolower($_SERVER['REQUEST_METHOD']), $methods);
        }
    }
}
