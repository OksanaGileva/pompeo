const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const plumber = require('gulp-plumber');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync');
const sourceMaps = require('gulp-sourcemaps');
const imagemin = require('gulp-imagemin');
const pngquant= require('imagemin-pngquant');

gulp.task("sass", function() {
    return gulp.src("scss/style.scss")
        .pipe(plumber({
            errorHandler: function (err) {
                console.log(err);
                this.emit('end');
            }
        }))
        .pipe(sourceMaps.init())
        .pipe(sass())
        .pipe(autoprefixer({
            browsers: ["last 2 versions"]
        }))
        .pipe(sourceMaps.write())
        .pipe(gulp.dest("build/css"))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task("html", function () {
    return gulp.src("*.html")
        .pipe(gulp.dest("build"))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task("img", function () {
    return gulp.src("img/**/*.{png,jpg,svg}")
        .pipe(imagemin({
            interlased: true,
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))
        .pipe(gulp.dest("build/img"));
});

gulp.task("default", gulp.parallel("img", "sass"));

gulp.task("serve", function () {
    browserSync.init({
        server: "build"
    });

    gulp.watch("scss/**/*.scss", gulp.parallel("sass"));
    gulp.watch("*.html", gulp.parallel("html"));
});


