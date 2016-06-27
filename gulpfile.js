var gulp = require('gulp'),
    concat = require('gulp-concat');

var appPath = './static/angular/';

gulp.task('js', function () {

    return gulp.src([

        appPath + 'app.js',
        appPath + 'services/*.js',
        appPath + 'controllers/*.js'

    ]).pipe(concat('app.js'))
        .pipe(gulp.dest('./static/dist/js/'));
});

gulp.task('watch', function () {
    gulp.watch([
        appPath + 'app.js',
        appPath + 'services/*.js',
        appPath + 'controllers/*.js'
    ], ['js']);
});

gulp.task('default', ['js']);