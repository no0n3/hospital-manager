<?php

namespace app\core\db;

use PDO;
use app\core\Zelivar;

class DBConnection {

    private $con;

    public static function get() {
        static $inst = null;

        if (null === $inst) {
            $inst = new static();
        }

        return $inst;
    }

    private function __construct() {
        
    }

    public function __destruct() {
        $this->con = null;
    }

    public function query($query) {
        $this->initConnection();

        return $this->con->query($query);
    }

    public function execute($query) {
        $this->initConnection();

        return $this->con->exec($query);
    }

    public function prepare($query) {
        $this->initConnection();

        return $this->con->prepare($query);
    }

    public function lastInsertId() {
        $this->initConnection();

        return $this->con->lastInsertId();
    }

    private function initConnection() {
        if (null === $this->con) {
            $this->con = new PDO(
                sprintf(
                    'mysql:host=%s;dbname=%s',
                    Zelivar::getApp()->params['db']['server'],
                    Zelivar::getApp()->params['db']['name']
                ),
                Zelivar::getApp()->params['db']['username'],
                Zelivar::getApp()->params['db']['password']
            );
            $this->con->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        }
    }

}
