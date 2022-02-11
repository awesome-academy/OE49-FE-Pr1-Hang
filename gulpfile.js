const { src, dest, parallel, watch, series } = require("gulp"),
  concat = require("gulp-concat"),
  sass = require("gulp-sass")(require("sass")),
  pug = require("gulp-pug"),
  browserSync = require("browser-sync").create();

const FilesPath = {
  sassFiles: "src/sass/*.sass",
  htmlFiles: "src/pug/pages/*.pug",
};
const { sassFiles, htmlFiles } = FilesPath;

function sassTask() {
  return src(FilesPath.sassFiles)
    .pipe(sass())
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

function assetsTask() {
  return src("assets/**/*").pipe(dest("assets"));
}

function serve() {
  browserSync.init({ server: { baseDir: "./" } });
  watch(sassFiles, sassTask);
  watch(htmlFiles, htmlTask);
}

exports.sass = sassTask;
exports.html = htmlTask;
exports.assets = assetsTask;
exports.default = series(parallel(htmlTask, sassTask, assetsTask));
exports.serve = series(serve, parallel(htmlTask, sassTask, assetsTask));
