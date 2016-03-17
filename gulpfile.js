
//-----> DEPENDENCIAS
var gulp = require('gulp'),
	uglify = require('gulp-uglify'),
	clean = require('gulp-clean');

//-----> CONFIGURACIÓN DE LAS TAREAS
gulp.task('uglify', function() {
  gulp.src('js/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('minified/'))
});

gulp.task('clean', function () {
	return gulp.src('minified/', {read: false})
		.pipe(clean());
});
