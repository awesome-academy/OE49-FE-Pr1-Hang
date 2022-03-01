const { src, dest, parallel, watch, series } = require("gulp"),
  autoprefixer = require("gulp-autoprefixer"),
  concat = require("gulp-concat"),
  sass = require("gulp-sass")(require("sass")),
  pug = require("gulp-pug"),
  browserSync = require("browser-sync").create();

const FilesPath = {
  sassFiles: "src/sass/*.sass",
  htmlFiles: "src/pug/pages/*.pug",
  jsFiles: "src/js/*.js",
};
const { sassFiles, htmlFiles, jsFiles } = FilesPath;

function sassTask() {
  return src(FilesPath.sassFiles)
    .pipe(sass())
    .pipe(
      autoprefixer({
        overrideBrowserslist: ["last 2 versions"],
        cascade: false,
      })
    )
    .pipe(concat("style.css"))
    .pipe(dest("assets/css"))
    .pipe(browserSync.stream());
}

function htmlTask() {
  return src(htmlFiles)
    .pipe(pug({ pretty: true }))
    .pipe(dest("./"))
    .pipe(browserSync.stream());
}

function jsTask() {
  return src(jsFiles)
    .pipe(concat("all.js"))
    .pipe(dest("assets/js"))
    .pipe(browserSync.stream());
}

function assetsTask() {
  return src("assets/**/*").pipe(dest("assets"));
}

function serve() {
  browserSync.init({
    server: {
      baseDir: "./",
      directory: true,
    },
  });
  watch("src/sass/**/*.sass", sassTask);
  watch("src/pug/**/*.pug", htmlTask);
  watch("src/js/*.js", jsTask);
}

exports.sass = sassTask;
exports.html = htmlTask;
exports.js = jsTask;
exports.assets = assetsTask;
exports.default = series(parallel(htmlTask, sassTask, jsTask, assetsTask));
exports.serve = series(serve, parallel(htmlTask, sassTask, jsTask, assetsTask));
