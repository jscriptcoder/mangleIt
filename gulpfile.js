var gulp = require('gulp'),
    less = require('gulp-less'),
    tsc = require('gulp-typescript'),
    templateCache = require('gulp-angular-templatecache');


gulp.task('less', function () {
    gulp.src('src/less/main.less')
        .pipe(less())
        .pipe(gulp.dest('build/css/'));
});

gulp.task('tsc', function () {
    gulp.src('src/ts/**/*.ts')
        .pipe(tsc({
            module: 'system', 
            target: 'ES5'
        }))
        .pipe(gulp.dest('build/js/'))
});

gulp.task('compile', ['less', 'tsc']);
gulp.task('default', ['compile']);