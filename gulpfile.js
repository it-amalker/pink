let gulp = require('gulp'),
  sass = require('gulp-sass'),
  browserSync = require('browser-sync'),
  concat = require('gulp-concat'),
  rename = require('gulp-rename'),
  del = require('del'),
  autoprefixer = require('gulp-autoprefixer'),
  svgSprite = require('gulp-svg-sprite'),
  svgmin = require('gulp-svgmin'),
  cheerio = require('gulp-cheerio'),
  replace = require('gulp-replace'),
  terser = require('gulp-terser');

gulp.task('html', function () {
  return gulp.src('src/*.html')
    .pipe(browserSync.reload({ stream: true }))
});

gulp.task('css-libs', function () {
  return gulp.src([
    'node_modules/normalize.css/normalize.css'
  ])
    .pipe(concat('_libs.scss'))
    .pipe(gulp.dest('src/scss/base'))
    .pipe(browserSync.reload({ stream: true }))
});

gulp.task('scss', function () {
  return gulp.src('src/scss/**/*.scss')
    .pipe(sass({ outputStyle: 'expanded' }))
    .pipe(autoprefixer({
      overrideBrowserslist: ['last 30 versions'],
      cascade: false
    }))
    .pipe(gulp.dest('src/css'))
    .pipe(sass({ outputStyle: 'compressed' }))
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('src/css'))
    .pipe(browserSync.reload({ stream: true }))
});

gulp.task('js', function () {
  return gulp.src('src/js/main.js')
    .pipe(terser({
      output: {
        comments: false
      }
    }))
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('src/js'))
    .pipe(browserSync.reload({ stream: true }))
});

gulp.task('js-libs', function () {
  return gulp.src([
    'node_modules/svg4everybody/dist/svg4everybody.js',
    'src/js/libs/modernizr-custom.js',
    'src/js/libs/picturefill.js',
    'src/js/libs/run.svg4everybody.js'
  ])
    .pipe(concat('libs.min.js'))
    .pipe(terser({
      output: {
        comments: false
      }
    }))
    .pipe(gulp.dest('src/js'))
    .pipe(browserSync.reload({
      stream: true
    }))
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

// SVG sprite

gulp.task('svgSpriteBuild', function () {
  return gulp.src('src/img/*.svg')
    .pipe(svgmin({
      js2svg: {
        pretty: true
      }
    }))

    .pipe(cheerio({
      run: function ($) {
        // $('[fill]').removeAttr('fill');
        $('[stroke]').removeAttr('stroke');
        $('[style]').removeAttr('style');
      },
      parserOptions: { xmlMode: true }
    }))

    .pipe(replace('&gt;', '>'))

    .pipe(svgSprite({
      mode: {
        stack: {
          sprite: '../sprite.svg'
        }
      }
    }))

    .pipe(gulp.dest('src/img/sprites/'))
    .pipe(browserSync.reload({ stream: true }))
})

// Final Build tasks

gulp.task('clean', async function () {
  del.sync('build')
});

gulp.task('pack', async function () {
  let moveHTML = gulp.src('src/*.html')
    .pipe(gulp.dest('build'));

  let moveCSS = gulp.src('src/css/*.min.css')
    .pipe(gulp.dest('build/css'));

  let moveJS = gulp.src('src/js/*.min.js')
    .pipe(gulp.dest('build/js'));

  let moveFonts = gulp.src('src/fonts/*.*')
    .pipe(gulp.dest('build/fonts'));

  let moveImg = gulp.src(['src/img/*.webp', 'src/img/*.jpg', 'src/img/*.png', 'src/img/sprites/*.svg'], { base: './src/img' })
    .pipe(gulp.dest('build/img'));
});

// Watch tasks

gulp.task('watch', function () {
  gulp.watch('src/scss/**/*.scss', gulp.parallel('scss'))
  gulp.watch('src/*.html', gulp.parallel('html'))
  gulp.watch('src/*.js', gulp.parallel('js'))
  gulp.watch('src/img/*.*', gulp.parallel('img'))
  gulp.watch('src/img/*.svg', gulp.parallel('svgSpriteBuild'))
});

gulp.task('build', gulp.series('clean', 'pack'))

gulp.task('default', gulp.parallel('css-libs', 'html', 'scss', 'js-libs', 'js', 'img', 'svgSpriteBuild', 'browser-sync', 'watch'));

