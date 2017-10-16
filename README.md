Project description
-------------

Simple hospital, clinic, department CRUD app.
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

Task description
-------------

Да се създаде REST API, което да администрира структура на медицинско заведение.

Пример:

УМБАЛ Александровска  - Медицинско заведение

        ІІ Клиника по коремна хирургия – Клиника

                Отделение по Висцерална хирургия – Отделение

                Операционен блок – Отделение

         Клиника по гастроентерология – Клиника

         Клиника по очни болести – Клиника

                I-во очно отделение (по глаукома и катаракта) – Отделение

                         Кабинет по очни болести – Кабинет

http://www.credoweb.bg/umbal-aleksandrovska-inst-19790.html?act_tab=structure
  

Описание: 

1. Потребителят трябва да може да се регистрира. След аутентикация, трябва да може да създава медицинско заведение и да управлява създадените досега медицински заведения и тяхната структура.
 Задължителни полета за медицинско заведение:
Hospital
Name 
Alt Name 
Description

2. След създаване на медицинско заведение, потребителят трябва да може да добавя структура в медицинското заведение.
3. Структурата трябва да се илюстрира под формата на дърво.
4. Не трябва да има ограничение в нивата на структурата. 
5. Потребителят трябва да може да извършва CRUD операции на медицинските заведения, които е създал, както и на тяхната структура.

Clinic/Department/Cabinet
Name
Alt Name
Description

6. Всеки потребител трябва да може да вижда списъка с всичките лечебни заведения.
7. Всяко лечебно заведение трябва да има отделна страница, на която да се вижда неговата информация и дървовидната му структура.
Технически изисквания:
1. Задачата трябва да бъде реализирана с PHP >= 5.4. Няма ограничение в използването на плъгини и библиотеки.
2. За базата данни трябва да се използва MySQL или MariaDb

Допълнителни изисквания:
1. Препоръчително е да не се използва рекурсия за реализацията на структурата на медицинско заведение.
