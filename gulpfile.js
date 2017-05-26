var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var inject = require("gulp-inject");
var ngHtml2Js = require("gulp-ng-html2js");

var buildDir = 'web';
var jsDest  = buildDir + '/js/';
var cssDest = buildDir + '/css/';

gulp.task('create-templates', function() {
    return gulp
        .src('src_frontend/**/*.html')
        .pipe(ngHtml2Js({
            moduleName: "app.templates",
            rename: function(url) {
                return url.replace('src_frontend/', '');
            }
        }))
        .pipe(concat("app.templates.js"))
        .pipe(gulp.dest("src_frontend/"));
});

gulp.task('js', function() {
    gulp
        .src([
            'bower_components/angular/angular.min.js',
            'bower_components/angular-route/angular-route.min.js',
            'src_frontend/app.js',
            'src_frontend/app.routes.js',
            'src_frontend/app.constants.js',
            'src_frontend/app.templates.js',
            'src_frontend/app/home/home.controller.js',
            'src_frontend/app/login/login.controller.js',
            'src_frontend/app/signup/signup.controller.js',
            'src_frontend/app/common/base.controller.js',
            'src_frontend/app/hospital/base_hospital.controller.js',
            'src_frontend/app/hospital/services/hospital.service.js',
            'src_frontend/app/hospital/services/hospital_structure.service.js',
            'src_frontend/app/common/services/auth.service.js',
            'src_frontend/app/hospital/hospital_list.controller.js',
            'src_frontend/app/hospital/hospital_create.controller.js',
            'src_frontend/app/hospital/hospital_edit.controller.js',
            'src_frontend/app/hospital/hospital_view.controller.js',
            'src_frontend/app/hospital/hospital_branch_view.controller.js',
            'src_frontend/app/hospital/hospital_branch_create.controller.js',
            'src_frontend/app/hospital/hospital_branch_edit.controller.js'
        ])
        .pipe(concat('all.js'))
        .pipe(uglify())
        .pipe(gulp.dest(jsDest));
});

gulp.task('css', function() {
    gulp
        .src([
            'bower_components/slick-carousel/slick/slick.css',
            'bower_components/font-awesome/css/font-awesome.min.css',
            'bower_components/bootstrap/dist/css/bootstrap.min.css',
            'node_modules/viewerjs/dist/viewer.min.css',
            cssDest + 'app.css'
        ])
        .pipe(concat('all.css'))
        .pipe(gulp.dest(cssDest));
});

gulp.task('build', ['create-templates', 'js', 'css']);
