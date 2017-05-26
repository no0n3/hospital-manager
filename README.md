Project description
-------------

Single page application using AngularJS communication with the backend via REST service.

Project structure
-------------

```
src             - backend code location
src_frontend    - fronted code location
config          - backend configuration
web             - public folder
    index.php   - backend front controller
    index.html  - frontend front controller
```

Set up project
-------------

* Install and run composer. [Composer's getting started page](https://getcomposer.org/doc/00-intro.md)
* Change config info in 'config/params.php' and 'src_frontend/app.constants.js'
* Run 'npm install'
* Run 'bower install'
* Run 'gulp build'
* Run the following console command in the project main directory to set up the database schema: php init.php
