var gulp        = require('gulp'),
    gutil       = require('gulp-util'),
    sass        = require('gulp-sass'),
    //csso        = require('gulp-csso'),
    //uglify      = require('gulp-uglify'),
    jade        = require('gulp-jade'),
    concat      = require('gulp-concat'),
    livereload  = require('gulp-livereload'), // Livereload plugin needed: https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei
    tinylr      = require('tiny-lr'),
    express     = require('express'),
    app         = express(),
    marked      = require('marked'), // For :markdown filter in jade
    path        = require('path'),
    server      = tinylr(),
    sourcemaps  = require('gulp-sourcemaps');

var browserify = require('gulp-browserify');
var babelify = require('babelify');
var babelPresetEs2015 = require('babel-preset-es2015');

var NODE_MODULES_PATH = './node_modules';
var FOUNDATION_PATH = NODE_MODULES_PATH + '/foundation-sites';
var FOUNDATION_JS_PATH = FOUNDATION_PATH + '/js';

gulp.task('css', function() {
    return gulp.src('src/assets/stylesheets/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({
            includePaths: ['src/assets/stylesheets', 'node_modules/foundation-sites/scss'],
            errLogToConsole: true
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('dist/assets/stylesheets/'))
        .pipe(livereload(server));
});

gulp.task('js', function() {
    return gulp.src('src/assets/scripts/*.js')
        .pipe(sourcemaps.init())
        .pipe(browserify({
            debug: true,
            paths: [ NODE_MODULES_PATH, FOUNDATION_JS_PATH ],
            insertGlobals: true,
            ignore: ['jquery'],
            transform: [
                babelify.configure({
                    sourceMaps: true,
                    presets: [babelPresetEs2015]
                })
            ],
            extensions: ['.js']
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('dist/assets/scripts/'))
        .pipe(livereload(server));
});

gulp.task('templates', function() {
    return gulp.src('src/*.jade')
        .pipe(jade({
            pretty: true
        }))
        .pipe(gulp.dest('dist/'))
        .pipe(livereload(server));
});

gulp.task('express', function() {
    app.use(express.static(path.resolve('./dist')));
    app.listen(1337);
    gutil.log('Listening on port: 1337');
});

gulp.task('watch', function () {
    server.listen(35729, function (err) {
        if (err) {
            return console.log(err);
        }
        gulp.watch(['src/assets/stylesheets/*.scss', 'src/assets/stylesheets/partials/*.scss'], {follow:true}, ['css']);
        gulp.watch('src/assets/scripts/*.js', {follow:true}, ['js']);
        gulp.watch(['src/*.jade', 'src/partials/*.jade', 'src/layouts/*.jade'], {follow:true}, ['templates']);
    });
});

gulp.task('default', ['js','css','templates','express','watch']);
