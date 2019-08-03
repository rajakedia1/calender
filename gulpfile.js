var gulp = require("gulp");
var concat = require("gulp-concat");
var uglify = require("gulp-uglify");
var minify = require("gulp-minify-css");
var babel = require("gulp-babel");

gulp.task("js", function() {
  gulp
    .src("js/*.js")
    .pipe(concat("scripts.js"))
    .pipe(
      babel({
        presets: ["es2015"] // es5检查机制
      })
    )
    .pipe(uglify())
    .pipe(gulp.dest("build/"));
});

gulp.task("css", function() {
  gulp
    .src("styles/*.css")
    .pipe(concat("styles.css"))
    .pipe(minify())
    .pipe(gulp.dest("build/"));
});

gulp.task("default", ["js", "css"], function() {});
