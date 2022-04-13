//Gulp
import gulp from 'gulp';
//Scss
import plumber from 'gulp-plumber';
const sass = require('gulp-sass')(require('sass'));
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';
import postcss from 'gulp-postcss';
//Pug
import pug from 'gulp-pug';
// Constantes y utilidades
const cssPlugins = [
    cssnano(),
    autoprefixer()
];

gulp.task('pug', () =>{
    return gulp
    .src('./dev/views/pages/*.pug')
    .pipe(pug({
        pretty: false
    }))
    .pipe(gulp.dest('./docs'));
});

gulp.task('scss', () =>{
    return gulp
    .src('./dev/scss/*.scss')
    .pipe(plumber())
    .pipe(sass({
        OutputStyle: 'compressed'
    }))
    .pipe(postcss(cssPlugins))
    .pipe(gulp.dest('./docs/scss'));
});

gulp.task('default', ()=>{
    gulp.watch('./dev/scss/*.scss', gulp.series('scss'))
    gulp.watch('./dev/views/**/*.pug', gulp.series('pug'))
});