var gulp = require('gulp');
var plumber = require('gulp-plumber');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');
var wait = require('gulp-wait');
var rename = require('gulp-rename');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync').create();

gulp.task('scripts', function() {
    return gulp.src('js/scripts.js')
        .pipe(plumber(plumber({
            errorHandler: function (err) {
                console.log(err);
                this.emit('end');
            }
        })))
        .pipe(uglify({
            output: {
                comments: '/^!/'
            }
        }))
        .pipe(rename({extname: '.min.js'}))
        .pipe(gulp.dest('js'))
        .pipe(browserSync.reload({
          stream: true
        }));
});

gulp.task('styles', function () {
    return gulp.src('./scss/styles.scss')
        .pipe(wait(250))
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(gulp.dest('./css'))
        .pipe(browserSync.reload({
          stream: true
        }));
});

gulp.task('html', function () {
  return gulp.src('./index.html')
      .pipe(wait(250))
      .pipe(browserSync.reload({
        stream: true
      }));
});

gulp.task('watch', ['scripts', 'styles', 'browserSync'], function() {
    gulp.watch('js/*.js', ['scripts']);
    gulp.watch('scss/*.scss', ['styles']);
    gulp.watch('./*.html', ['html']);
});

gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: ['./', 'css', 'js']
    },
  })
});