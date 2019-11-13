let gulp = require('gulp'),
  sass = require('gulp-sass'),
  browserSync = require('browser-sync'),
  uglify = require('gulp-uglify'),
  concat = require('gulp-concat'),
  rename = require('gulp-rename'),
  del = require('del'),
  autoprefixer = require('gulp-autoprefixer');

gulp.task('html', function () {
  return gulp.src('src/*.html')
    .pipe(browserSync.reload({ stream: true }))
});

gulp.task('css-libs', function () {
  return gulp.src([
    'node_modules/normalize.css/normalize.css'
  ])
    .pipe(concat('_libs.scss'))
    .pipe(gulp.dest('src/scss'))
    .pipe(browserSync.reload({ stream: true }))
});

gulp.task('scss', function () {
  return gulp.src('src/scss/*.scss')
    .pipe(sass({ outputStyle: 'expanded' }))
    /*
    .pipe(sass({ outputStyle: 'compressed' }))
    .pipe(rename({ suffix: '.min' })) */
    .pipe(gulp.dest('src/css'))
    .pipe(browserSync.reload({ stream: true }))
});

gulp.task('js', function () {
  return gulp.src('src/js/*.js')
    .pipe(browserSync.reload({ stream: true }))
});

gulp.task('js-libs', function () {
  return gulp.src([
    '',
    ''
  ])
    .pipe(concat('libs.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('src/js'))
    .pipe(browserSync.reload({ stream: true }))
});

gulp.task('img', function () {
  return gulp.src('src/img/*.*')
    .pipe(browserSync.reload({ stream: true }))
});

gulp.task('browser-sync', function () {
  browserSync.init({
    server: {
      baseDir: "src/"
    }
  });
});

gulp.task('clean', async function () {
  del.sync('build')
});

gulp.task('pack', async function () {
  let moveHTML = gulp.src('src/*.html')
    .pipe(gulp.dest('build'));

  let moveCSS = gulp.src('src/css/*.css')
    .pipe(autoprefixer({
      overrideBrowserslist: ['last 10 versions'],
      cascade: false
    }))
    .pipe(sass({ outputStyle: 'compressed' }))
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('build/css'));

  let moveJS = gulp.src('src/js/*.js')
    .pipe(gulp.dest('build/js'));

  let moveFonts = gulp.src('src/fonts/*.*')
    .pipe(gulp.dest('build/fonts'));

  let moveImg = gulp.src('src/img/*.*')
    .pipe(gulp.dest('build/img'));
});

gulp.task('watch', function () {
  gulp.watch('src/scss/*.scss', gulp.parallel('scss'))
  gulp.watch('src/*.html', gulp.parallel('html'))
  gulp.watch('src/*.js', gulp.parallel('js'))
  gulp.watch('src/img/*.*', gulp.parallel('img'))
});

gulp.task('build', gulp.series('clean', 'pack'))

gulp.task('default', gulp.parallel('css-libs', 'html', 'scss', 'js', 'img', 'browser-sync', 'watch'));

