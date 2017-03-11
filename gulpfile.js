// Include gulp
var gulp = require('gulp');
// Include Our Plugins
var sass = require('gulp-sass');
var uglifycss = require('gulp-uglifycss');

var browserSync = require('browser-sync').create();
var autoprefixer = require('gulp-autoprefixer');
var autoprefixerOptions = {
  browsers: ['Android >= 2.3',
    'BlackBerry >= 7',
    'Chrome >= 9',
    'Firefox >= 4',
    'Explorer >= 9',
    'iOS >= 5',
    'Opera >= 11',
    'Safari >= 5',
    'OperaMobile >= 11',
    'OperaMini >= 6',
    'ChromeAndroid >= 9',
    'FirefoxAndroid >= 4',
    'ExplorerMobile >= 9']
};




// Compile Our Sass
gulp.task('sass', function() {
    return gulp.src('scss/*.scss')
        .pipe(sass())
//		.pipe(autoprefixer(autoprefixerOptions))
        .pipe(gulp.dest('./'));
});


// Initiate BrowserSync. Check for CSS changes and reload. Don't forget to change the proxy to the correct domain!
gulp.task('browser-sync', function (cb) {
browserSync.init({
                proxy: "www.domain.local",
           open: 'external',
        host: 'www.domain.local',
        proxy: 'www.domain.local',
        port: 8080
    }, function() {
            gulp.watch('*').on('change', function () {
            gulp.src('*')
            .pipe(browserSync.stream());
        });
        cb();
    });
});

gulp.task('uglify', function () {
  gulp.src('style.css')
    .pipe(uglifycss({ "max-line-len": 80 }))
    .pipe(gulp.dest('./'));
});


gulp.task('watch', function() {
    gulp.watch('scss/*/*.scss', ['sass']);
    gulp.watch('*.php', ['browser-sync']);
    gulp.watch('scss/*.scss', ['sass']);
    gulp.watch('style.css', ['uglify'] );


});

// Default Task
gulp.task('default', ['watch',  'sass', 'uglify', 'browser-sync']);
