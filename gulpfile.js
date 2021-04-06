const gulp = require("gulp");
const sass = require("gulp-sass");
const browserSync = require("browser-sync").create();
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");

function styleScssToCss() {
  return gulp
    .src("./scss/**/*.scss")
    .pipe(sass())
    .pipe(gulp.dest("./css"))
    .pipe(browserSync.stream());
}

function cssAutoprefixer() {
  const plugin = [autoprefixer()];

  return gulp
    .src("./css/*.css")
    .pipe(postcss(plugin))
    .pipe(gulp.dest("./css"));
}

function watch() {
  browserSync.init({
    server: {
      baseDir: "./",
    },
  });

  gulp.watch("./*.html").on("change", browserSync.reload);
  gulp.watch("./scss/**.*scss", gulp.series(styleScssToCss, cssAutoprefixer));
  gulp.watch("./js/**.*js").on("change", browserSync.reload);
}

function copyHTMLToDest() {
  return gulp
    .src("./*.html")
    .pipe(gulp.dest("./dist/"));
}

function copyCSSToDest() {
  return gulp
    .src("./css/*.css")
    .pipe(gulp.dest("./dist/css/"));
}

function copyJSToDest() {
  return gulp
    .src("./js/*.js")
    .pipe(gulp.dest("./dist/js/"));
}

gulp.task("copyHTMLToDest", copyHTMLToDest);
gulp.task("copyCSSToDest", copyCSSToDest);
gulp.task("copyJSToDest", copyJSToDest);

function build() {
  return gulp.series("copyHTMLToDest", "copyCSSToDest", "copyJSToDest");
}

exports.style = styleScssToCss;

// TODO: watch with BROWSERSYNC and convert scss->css->autoprefixer
exports.watch = watch;

// TODO: BUILD FOR EVERY PROJECT FOR PRODUCTION
exports.build = build();