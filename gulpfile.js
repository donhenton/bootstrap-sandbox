/* gulpfile.js */
var gulp = require('gulp');
var del = require("del");
var sass = require('gulp-sass');
var server = require('gulp-server-livereload');
// source and distribution folder
var  source = 'src/';
var appRoot = 'public_html/chapter2';
var dest = appRoot + '/css/bootstrap/';

// Bootstrap scss source
var bootstrapSass = {
    in: './node_modules/bootstrap-sass/'
};

// fonts
var fonts = {
    in: [source + 'fonts/*.*', bootstrapSass.in + 'assets/fonts/**/*'],
    out: dest + 'fonts/'
};
var jsFiles = {
    in: [source+'js/vendor/*.*' ,source+'/js/main.js'],
    out: appRoot +'/js'
};

// css source file: .scss files
var scss = {
    in: source + 'scss/main.scss',
    out: dest + 'css/',
    watch: source + 'scss/**/*',
    sassOpts: {
        outputStyle: 'nested',
        precison: 3,
        errLogToConsole: true,
        includePaths: [bootstrapSass.in + 'assets/stylesheets']
    }
};

// copy bootstrap required fonts to dest
gulp.task('fonts', function () {
    return gulp
            .src(fonts.in)
            .pipe(gulp.dest(fonts.out));
});

gulp.task('js-files', function () {
    return gulp
            .src(jsFiles.in)
            .pipe(gulp.dest(jsFiles.out));
});

// compile scss
gulp.task('sass', ['fonts','js-files'], function () {
    return gulp.src(scss.in)
            .pipe(sass(scss.sassOpts))
            .pipe(gulp.dest(scss.out));
});

// default task
gulp.task('default', ['serve', 'sass'], function () {
    gulp.watch(scss.watch, ['sass']);
});


gulp.task('serve', function (done) {
    gulp.src(appRoot)
            .pipe(server({
                open: true,
              //  log: 'debug',
              //  clientLog: 'debug',
                livereload: {
                    
                    clientConsole: true,
                    enable: true,
                    filter: function (filePath, cb)
                    {
                        console.log("filepath " + filePath)
                        if (/index.html/.test(filePath)) {
                            console.log("hit " + filePath)
                            cb(true)
                        }
                    }



                },

            }))
})



gulp.task('clean', function ( ) {
    console.log("cleaning "+dest+" "+jsFiles.out);
    del.sync([dest,jsFiles.out]);

});
