// Konfigurasi
var gulp  = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;
var plumber = require('gulp-plumber');
var notify = require('gulp-notify');
var merge = require('merge-stream');
var clean = require('gulp-clean');
var cssnano = require('gulp-cssnano');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');
var htmlmin = require('gulp-htmlmin');
var zip = require('gulp-zip');
var gutil = require('gulp-util');
var clean = require('gulp-clean');

gulp.task('sass', function(){
    var onError = function(err) {
        notify.onError({
            title: "Gulp",
            subtitle: "Failure!",
            message: "Error: <%= error.message %>",
            sound: "Beep"
        })(err);
        this.emit('end');
    };
   return gulp.src('./app/scss/*.scss')
       .pipe(plumber({errorHandler: onError}))
       .pipe(sass({ style: 'expanded' }))
       .pipe(gulp.dest('./app/css'))
       .pipe(gulp.dest('./app/css'))
       .pipe(notify({
           title: 'Gulp',
           subtitle: 'success',
           message: 'Sass task success'
       }));
});

// Clean Build Directory
gulp.task('cleanBuild',function(){
     return gulp.src('dist/**/*', {read: false})
     .pipe(clean());
});

// Deploy to Build Directory
gulp.task('deploy', gulp.series(['cleanBuild']), function(){
 
// optimasi css
 var cssOptimize = gulp.src('app/css/*.css')
    .pipe(cssnano())
    .pipe(gulp.dest('dist/css/'));

// menggabung semua file js dan optimasi
var jsOptimize = gulp.src('app/js/*.js')
    .pipe(concat('all.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'));

// optimasi image
var imgOptimize = gulp.src('app/images/*')
    .pipe(imagemin())
    .pipe(gulp.dest('dist/images'))

// optimasi html
var htmlOptimize = gulp.src('app/*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('dist'));

// fonts folder
var fonts= gulp.src('app/fonts/**')
    .pipe(gulp.dest('dist/fonts'));

return merge(cssOptimize,jsOptimize,imgOptimize,htmlOptimize,fonts); 

});

// Deploy to Zip file
gulp.task('deployZip', gulp.series(['deploy']),function(){
    var zipNow = gulp.src('dist/**')
    .pipe(zip('deploy.zip'))
    .pipe(gulp.dest('dist'));
});

gulp.task('cfonts',function(){
    gulp.src('app/fonts/**')
    .pipe(gulp.dest('dist/fonts'));
});

// Default Task. Local webserver dan sinkronisasi dengan browser. 
gulp.task('default', function(){
    browserSync.init({
        server: {
            baseDir: "./app"
        }
    });
    gulp.watch('./app/**/*').on('change', reload);
    gulp.watch('./app/scss/*.scss', gulp.series(['sass']));
});
