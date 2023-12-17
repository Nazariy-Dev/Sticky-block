const gulp = require("gulp")
const browserSync = require('browser-sync').create();
const pug = require("gulp-pug")
const sass = require('gulp-sass')(require('sass'));
const rimraf = require('gulp-rimraf');
const rename = require("gulp-rename")
const uglify = require('gulp-uglify')
const concat = require('gulp-concat')
const autoprefixer = require('autoprefixer')
const postcss = require('gulp-postcss')
const sourcemaps = require('gulp-sourcemaps')



// ------------------ Server ------------------
function server() {
    browserSync.init({
        server: {
            port: 9000,
            baseDir: "build",
        },
        browser: "google chrome"
    })

    gulp.watch("build/**/*").on("change", browserSync.reload)
}

// ------------------ Pug Compile ------------------
function buildHTML() {
    return gulp.src('source/templates/index.pug')
        .pipe(pug({
            pretty: true
        }))
        .pipe(gulp.dest("build"))
}

// ------------------ SASS to CSS ------------------
function buildCSS() {
    return gulp.src('source/styles/main.scss')
        .pipe(sass({ outputStyle: "compressed" }).on('error', sass.logError))
        .pipe(sourcemaps.init())
        .pipe(postcss([autoprefixer()]))
        .pipe(sourcemaps.write('.'))
        .pipe(rename("main.min.css"))
        .pipe(gulp.dest("build/css"))
}

// ------------------ Delete ------------------
function del(cb) {
    return rimraf("build", cb())
}

// ------------------ Copy fonts------------------
function copyFonts() {
    return gulp.src('./source/fonts/**/*') // much faster
        .pipe(gulp.dest("build/fonts"))
}

// ------------------ js ------------------
function js() {
    return gulp.src([
        // 'source/js/init.js',
        // 'source/js/validation.js',
        // 'source/js/form.js',
        // 'source/js/navigation.js',
        'source/js/main.js'
    ])
        .pipe(sourcemaps.init())
        .pipe(concat('main.min.js'))
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('build/js'))
}

// ------------------ Watchers ------------------
function watch() {
    gulp.watch("source/templates/**/*.pug", gulp.series(buildHTML))
    gulp.watch("source/styles/**/*.scss", gulp.series(buildCSS))
    gulp.watch("source/js/**/*.js", gulp.series(js))
}

exports.default = gulp.series(del, gulp.parallel(buildHTML, buildCSS, js),
    gulp.parallel(watch, server))



