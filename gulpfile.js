const gulp = require('gulp');

// gulp plugins and utils
const gutil = require('gulp-util');
const livereload = require('gulp-livereload');
const nodemon = require('gulp-nodemon');
const postcss = require('gulp-postcss');
const sourcemaps = require('gulp-sourcemaps');
const zip = require('gulp-zip');
const concat = require('gulp-concat');

// postcss plugins
const autoprefixer = require('autoprefixer');
const colorFunction = require('postcss-color-function');
const cssnano = require('cssnano');
const customProperties = require('postcss-custom-properties');
const easyimport = require('postcss-easy-import');

const swallowError = (error) => {
  gutil.log(error.toString());
  gutil.beep();
  this.emit('end');
};

const nodemonServerInit = () => {
  livereload.listen(1234);
};

gulp.task('build', ['css']);

gulp.task('server', ['css'], () =>
  nodemonServerInit());

gulp.task('css', () => {
  const processors = [
    easyimport,
    customProperties,
    colorFunction(),
    autoprefixer({browsers: ['last 2 versions']}),
    cssnano()
  ];

  return gulp.src([
    'assets/css/global.css',
    'assets/css/screen.css',
    'assets/css/screen.edited.css'
  ])
    .on('error', swallowError)
    .pipe(sourcemaps.init())
    .pipe(concat('bundle.css'))
    .pipe(postcss(processors))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('assets/css'))
    .pipe(livereload());
});

gulp.task('watch', () =>
  gulp.watch('assets/css/**', ['css']));

gulp.task('zip', ['css'], () => {
  const targetDir = 'dist/';
  const themeName = require('./package.json').name;
  const filename = themeName + '.zip';

  return gulp.src([
    '**',
    '!node_modules', '!node_modules/**',
    '!dist', '!dist/**'
  ])
    .pipe(zip(filename))
    .pipe(gulp.dest(targetDir));
});

gulp.task('default', ['server'], () => {
  gulp.start('watch');
});
