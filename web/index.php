<?php

use app\core\Zelivar;

require '../vendor/autoload.php';

Zelivar::run([
    'root_dir' => realpath('../'),
    'params'   => require '../config/params.php'
]);
Zelivar::getApp()->dispatch();
