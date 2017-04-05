// Include gulp
var gulp = require('gulp');

// Include Our Plugins
var minify = require('gulp-minify-css');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename'),
    sourcemaps = require("gulp-sourcemaps"),
    del = require('del'),
    babel = require("gulp-babel"),
    browserSync = require('browser-sync').create();
var tinypng = require('gulp-tinypng-compress');

//Define the app path
var path = {
    all:['./template/*.html','./src/assets/css/*.css','./src/assets/js/*.js','./src/assets/js/lib/*.js'],
    template:['./src/*.html'],
    css:['./src/assets/css/*.css'],
    js:['./src/assets/js/lib/zepto.min.js','./src/assets/js/lib/pre-loader.js','./src/assets/js/lib/reqAnimate.js','./src/assets/js/rem.js','./src/assets/js/common.js','./src/assets/js/wxshare.js','./src/assets/js/api.js','./src/assets/js/home.js'],
    welcomejs: ['./src/assets/js/lib/zepto.min.js','./src/assets/js/lib/reqAnimate.js','./src/assets/js/lib/pre-loader.js','./src/assets/js/lib/lrz.all.bundle.js','./src/assets/js/lib/fabric2.js','./src/assets/js/orientation.js','./src/assets/js/rem.js','./src/assets/js/common.js','./src/assets/js/api.js','./src/assets/js/wxshare.js','./src/assets/js/controller.js'],
    rankjs: ['./src/assets/js/lib/zepto.min.js','./src/assets/js/lib/pre-loader.js','./src/assets/js/rem.js','./src/assets/js/common.js','./src/assets/js/api.js','./src/assets/js/wxshare.js','./src/assets/js/rank.js'],
    joinjs: ['./src/assets/js/lib/zepto.min.js','./src/assets/js/rem.js','./src/assets/js/common.js','./src/assets/js/api.js','./src/assets/js/join.js'],
    exchangejs: ['./src/assets/js/lib/zepto.min.js','./src/assets/js/rem.js','./src/assets/js/common.js','./src/assets/js/api.js','./src/assets/js/exchange.js'],
    images:['./src/assets/images/*'],
};
// Browser-sync
gulp.task('browser-sync', function() {
    browserSync.init(path.all,{
        server: {
            baseDir: "./",
            startPath: ''
        }
    });
});

// Not all tasks need to use streams
// A gulpfile is just another node program and you can use any package available on npm
gulp.task('clean', function() {
    // You can use multiple globbing patterns as you would with `gulp.src`
    return del(['build']);
});


//css
gulp.task('css',['clean'],function () {
    // 1. 找到文件
    gulp.src(path.css)
        //.pipe(concat('style.css'))
        // 2. 压缩文件
        .pipe(minify())
        // 3. 另存为压缩文件
        .pipe(gulp.dest('./src/dist/css'));
});

// Concatenate & Minify
gulp.task('scripts_welcome',['clean'], function() {
    return gulp.src(path.welcomejs)
        .pipe(concat('welcome_all.js'))
        .pipe(gulp.dest('./src/dist'))
        .pipe(rename('welcome_all.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./src/dist/js'));
});
gulp.task('scripts_rank',['clean'], function() {
    return gulp.src(path.rankjs)
        .pipe(concat('rank_all.js'))
        .pipe(gulp.dest('./src/dist'))
        .pipe(rename('rank_all.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./src/dist/js'));
});
gulp.task('scripts_exchange',['clean'], function() {
    return gulp.src(path.exchangejs)
        .pipe(concat('exchange_all.js'))
        .pipe(gulp.dest('./src/dist'))
        .pipe(rename('exchange_all.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./src/dist/js'));
});

// Concatenate & Minify
gulp.task("tinypng", function(){
    gulp.src(['./image-src/*.{png,jpg,jpeg}'])
        .pipe(tinypng({
            key: '-ID8TBnbSlRuMCc_mMagta65Q7IDyaQ-',
            sigFile: './src/.tinypng-sigs',
            log: true
        })).on('error', function(err) {
            console.error(err.message);
        })
        .pipe(gulp.dest('./images/'));
});

// Watch Files For Changes
gulp.task('watch', ['clean'],function() {
    gulp.watch(path.welcomejs, ['scripts_welcome']);
    gulp.watch(path.rankjs, ['scripts_rank']);
    gulp.watch(path.css,['css']);
});

// Default Task
gulp.task('default', ['browser-sync']);


