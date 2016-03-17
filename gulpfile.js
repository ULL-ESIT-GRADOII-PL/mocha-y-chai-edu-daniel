
//-----> DEPENDENCIAS
var gulp = require('gulp'),
	uglify = require('gulp-uglify');

//-----> CONFIGURACIÓN DE LAS TAREAS
gulp.task('uglify', function() {
  gulp.src('js/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('minified/'))
});
