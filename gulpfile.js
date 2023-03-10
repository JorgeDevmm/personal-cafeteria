const { src, dest, watch, series, parallel } = require('gulp'); //{} mas de una función,watc = tarea repetitiva, dest guardar

// CSS Y SASS
const sass = require('gulp-sass')(require('sass')); //compilar
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');

// IMAGENES
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
const avif = require('gulp-avif');

// Compilar sass
function css(done) {
  // pasos: 1 - identificar archivo, 2 - Compilarla, 3 - Guardar el .css
  src('src/scss/app.scss')
    .pipe(sass())
    .pipe(postcss([autoprefixer()]))
    .pipe(dest('build/css'));

  done(); //Finalizar tareas
}

function versionWebp(done) {
  const opciones = {
    quality: 50,
  };
  src('src/img/**/*.{png,jpg}').pipe(webp(opciones)).pipe(dest('build/img'));

  done();
}

function versionAvif() {
  const opciones = {
    quality: 50,
  };
  return src('src/img/**/*.{png,jpg}')
    .pipe(avif(opciones))
    .pipe(dest('build/img'));
}

function imagenes(done) {
  // se puede poner return en vez de done
  src('src/img/**/*')
    .pipe(imagemin({ optimizationLevel: 3 })) //minimizar img
    .pipe(dest('build/img'));

  done();
}

// función cuando existan nuevos cambios
function dev() {
  // revisar, ejecutar
  watch('src/scss/**/*.scss', css);
  watch('src/img/**/*', imagenes);
}

exports.css = css;
exports.dev = dev;
exports.imagenes = imagenes;
exports.versionWebp = versionWebp;
exports.versionAvif = versionAvif;
exports.default = series(imagenes, versionWebp, versionAvif, css, dev); //tarea por default - gulp

// series - Se inicia una tarea, y hasta que finaliza, inicia la siguiente
// parallel - Todas inician al mismo tiempo
