var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var gulp = require('gulp');
var gutil = require('gulp-util');
var watch = require('gulp-watch');
var server = require('gulp-server-livereload');
var livereload = require('gulp-livereload');
var del = require('del');
var streamify = require('gulp-streamify');
var gulpsync = require('gulp-sync')(gulp);
var gulpif = require("gulp-if");
var argv = require('yargs').argv;
var uglifycss = require('gulp-uglifycss');
var uglify = require('gulp-uglify');
 
var source = require('vinyl-source-stream');
var rename = require('gulp-rename');
/**
 * 
 * if the dev goal is called as 
 * 
 * gulp dev --production 
 * 
 * the css and js files will be uglified and min added to the file name
 * 
 *   otherwise they are not
 * 
 */


var buildDir = './build';
var srcDir = './src';
//var pageURL = 'http://127.0.0.1:8080';
var SASS_FILES = srcDir + '/bootstrap-src/**/*.scss';
//var WATCH_JS = [srcDir +'/js/**/*.js'];
//var HTML_FILES = ['./src/html/**/*'];



 var sassProcess =
        function () {

            return gulp.src(SASS_FILES)
                    .pipe(sass().on('error', sass.logError))
                    .pipe(concat('bootstrap-new.css'))
                   // .pipe(gulpif(argv.production, uglifycss()))
                   // .pipe(gulpif(argv.production, rename({suffix: '.min'})))
                    .pipe(gulp.dest(buildDir+'/css'));
        };




gulp.task('default', function () {
    // place code for your default task here
});


gulp.task('build-bootstrap', function () {
    
        
            sassProcess();
        
  

});
 
/*
gulp.task('copy-html', function () {


    // base allows to copy the folders above the file
    // return gulp.src(HTML_FILES,{'cwd': './src/html','base':'./..'} )
    return gulp.src(HTML_FILES).pipe(gulp.dest(buildDir))
            .on('finish', function ( ) {
                gutil.log("processing change in html");
                livereload.reload(pageURL);
               // cb();
            });
 

});

 
 
gulp.task('watch', function () {

    watch(SASS_FILES, function (events, done) {

        sassProcess()
                .on('finish', function ( ) {
                    gutil.log("processing change in css");
                    livereload.reload(pageURL);
                });

    });

    watch(WATCH_JS, function (events, done) {

        gulp.start('build-js');
    });

    watch(HTML_FILES, function (events, done) {
        gutil.log("starting html change");
        gulp.start('copy-html');
    });

});





gulp.task('build-js', function () {
    
    
    function Bundle() {

        var Bundler = browserify({
            entries: './src/js/index.js',
            transform: [["babelify", {"presets": ["es2015"]}]],
            extensions: ['.js'],
            debug: true,
            cache: {},
            packageCache: {},
            fullPaths: true
        });
        return Bundler
                .bundle()
                .on('error', gutil.log);
}
    
    
    
    
    
    Bundle()
            .pipe(source('bundle.js'))
            .pipe(gulpif(argv.production, streamify(uglify())))
            .pipe(gulpif(argv.production, rename({suffix: '.min'})))
            .pipe(gulp.dest(buildDir))
            .on('finish', function ( ) {
                gutil.log("build bundle end");
                 livereload.reload(pageURL);
            });
    ;
});


gulp.task('serve', function (done) {
   // livereload.listen();
    gulp.src(buildDir).on('error', gutil.log)
            .pipe(server({
                livereload: {
                    enable: true
                },
                host: '127.0.0.1',
                port: 8080,
                defaultFile: 'index.html',
                directoryListing: false,
                open: true
            }));
});
*/

gulp.task('clean', function ( ) {

    del.sync([buildDir]);

});


/*
gulp.task('dev', gulpsync.sync(['copy-css','copy-html','build-js','watch', 'serve']),function(done)
{
    console.log("finished dev")
});


gulp.task('build-prod', gulpsync.sync(['copy-css','build-js']),function(done)
{
    console.log("finished build-prod")
});
*/


 
//gulp.task('build', ['clean', 'copy-assets']);

//gulpsync.sync(['clean', 'build', 'sass', 'copy-html', 'watch', 'serve'])