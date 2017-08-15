const gulp = require('gulp');
const sass = require('gulp-sass');
const watch = require('gulp-watch');
const notify = require('gulp-notify');
const browserSync = require('browser-sync').create();
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const fs = require("fs");
const data = require('gulp-data');
const imagemin = require('gulp-imagemin');

var path = {
    css: {
        'dev': 'dev/assets/scss/*.scss',
        'watch': 'dev/assets/scss/**/*.scss',
        'vendor': './dev/assets/css/vendor/**/*.css',
        'prod': './assets/stylesheets/'
    },
    js: {
        'dev': 'dev/assets/js/**/*.js',
        'watch': 'dev/assets/js/**/*.js',
        'prod': './assets/javascripts/'
    },
    image: {
        dev: './dev/assets/images/**/*.*',
        prod: './assets/images/'
    }
};

//------------------------------------------------------------------------------
//----------------------CSS-----------------------------------------------------
//------------------------------------------------------------------------------
/**
 * This task generates CSS from all SCSS files and compresses them down.
 */
gulp.task('sass', function () {
    return gulp.src(path.css.dev)
            .pipe(sourcemaps.init())
            .pipe(sass({
                noCache: true,
                outputStyle: "compressed",
                lineNumbers: false
            })).on('error',
            function (error) {
                gutil.log(error);
                this.emit('end');
            })
            .pipe(gulp.dest(path.css.prod))
            .pipe(notify({
                title: "SASS Compiled",
                message: "All SASS files have been recompiled to CSS.",
                onLast: true
            }));
});

gulp.task('css_vendor', function () {
    return gulp.src(path.css.vendor)
            .pipe(gulp.dest(path.css.prod+'/vendor'))
            .pipe(notify({
                title: "css vendor",
                message: "All CSS vendor files have been copied to CSS.",
                onLast: true
            }));
});

//------------------------------------------------------------------------------
//----------------------JS------------------------------------------------------
//------------------------------------------------------------------------------
/**
 * This task minifies javascript in the js/js-src folder and places them in the js directory.
 */
gulp.task('compress', function () {
    return gulp.src(path.js.dev)
            .on('error', console.log)
            .pipe(sourcemaps.init())
            .pipe(uglify())
            .pipe(sourcemaps.write('./map'))
            .pipe(gulp.dest(path.js.prod))
            .pipe(notify({
                title: "JS Minified",
                message: "All JS files in the theme have been minified.",
                onLast: true
            }));
});

//------------------------------------------------------------------------------
//----------------------IMAGES--------------------------------------------------
//------------------------------------------------------------------------------
gulp.task('image_min', () =>
    gulp.src(path.image.dev)
        .pipe(imagemin())
        .pipe(gulp.dest(path.image.prod))
);


//------------------------------------------------------------------------------

//------------------------------------------------------------------------------
//----------------------DEFAULT-------------------------------------------------
//------------------------------------------------------------------------------

/**
 * Set up the watcher.
 */
gulp.task('watch', ['sass', 'compress'], function () {
    gulp.watch([path.css.vendor], ['css_vendor']);
    gulp.watch([path.css.watch], ['sass']);
    gulp.watch([path.js.watch], ['compress']);
    gulp.watch([path.image.dev], ['image_min']);
});

gulp.task('default', ['watch', 'sass', 'compress', 'image_min', 'css_vendor'], function () {
});
