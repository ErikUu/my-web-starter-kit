'use strict';

var gulp        = require("gulp"),
    concat      = require("gulp-concat"),
    uglify      = require("gulp-uglify"),
    rename      = require("gulp-rename"),
    sass        = require("gulp-sass"),
    maps        = require("gulp-sourcemaps"),
    del         = require("del"),
    browserSync = require('browser-sync').create(),
    bower       = require('gulp-bower'),
    mainBowerFiles = require('main-bower-files');


//Configurations
var config = {
    bowerDir    : './bower_components',
    pathAssets  : "app/assets",
    pathAppRoot : "app"
};

//Concat and map scripts
gulp.task("concatScripts" ,function () {
    return gulp.src([config.pathAssets + "/js/**/*.js", "!" + config.pathAssets + "/js/main*.js*"])
        .pipe(maps.init())
        .pipe(concat("main.js"))
        .pipe(maps.write("/."))
        .pipe(gulp.dest(config.pathAssets + "/js"))
        .pipe(browserSync.stream());
});

//Bower
gulp.task('bower', ["bowerInstall"], function() {
    return gulp.src(mainBowerFiles())
        .pipe(gulp.dest('app/lib'))
});

gulp.task('bowerInstall', function() {
    return bower()
        .pipe(gulp.dest(config.bowerDir))
});

//Minify scripts
gulp.task("minifyScripts", ["concatScripts"], function () {
    return gulp.src(config.pathAssets + "/js/main.js")
        .pipe(uglify())
        .pipe(rename("main.min.js"))
        .pipe(gulp.dest(config.pathAssets + "/js"));
});

//Concat, compile and maps sass
gulp.task("compileSass", function () {
    return gulp.src(config.pathAssets + "/styles/main.scss")
        .pipe(maps.init())
        .pipe(sass())
        .pipe(maps.write("./"))
        .pipe(gulp.dest(config.pathAssets + "/styles"))
        .pipe(browserSync.stream());
});

//serves html/css/js
gulp.task("serve", function () {

    browserSync.init({
        server: "./app",
        notify: false
    });

    gulp.watch(config.pathAssets + "/styles/**/*.scss", ["compileSass"]);
    gulp.watch(config.pathAssets + "/js/*.js", ["concatScripts"]).on('change', browserSync.reload);
    gulp.watch(config.pathAppRoot + "/*.html").on('change', browserSync.reload);

});

//Remove dist folder and all compiled/minified files
gulp.task("clean", function () {
    del(["dist", config.pathAssets + "/styles/main.css*", config.pathAssets + "/js/main*.js*", "./bower_components", config.pathAppRoot + "/lib"]);
});

//todo: Concat js/css lib with assets
//Builds entire project and stores it in dist folder
gulp.task("build", ["minifyScripts", "compileSass"], function () {
    return gulp.src([ config.pathAssets + "/styles/main.css", config.pathAssets + "/js/main.min.js", config.pathAppRoot + "/*.html", "img/**", config.pathAppRoot + "/bower_components/jquery/dist/jquery.js"], { base: "./app" })
        .pipe(gulp.dest("dist"));
});

//Default task
gulp.task("default", ["clean"], function () {
    gulp.start("build");
});