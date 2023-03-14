const { src, dest, watch, series, parallel } = require('gulp'); //{} mas de una función,watc = tarea repetitiva, dest guardar
const sass = require('gulp-sass')(require('sass')); //compilar
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');

function css(done) {
  // Compilar sass
  // pasos: 1 - identificar archivo, 2 - Compilarla, 3 - Guardar el .css

  src('src/scss/app.scss')
    .pipe(sass())
    .pipe(postcss([autoprefixer()]))
    .pipe(dest('build/css'));

  done(); //Finalizar tareas
}

function imagenes(done) {
  // se puede poner return en vez de done
  src('src/img/**/*').pipe(dest('build/img'));

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
exports.default = series(imagenes, css, dev); //tarea por default - gulp

// series - Se inicia una tarea, y hasta que finaliza, inicia la siguiente
// parallel - Todas inician al mismo tiempo
