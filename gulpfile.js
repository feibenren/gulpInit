var gulp=require('gulp');
var gulpLoadPlugins=require('gulp-load-plugins');
var $=gulpLoadPlugins();
var del=require('del');
var browserSync=require('browser-sync').create();
var reload=browserSync.reload;
var dev=true;

gulp.task('css',()=>{
    return gulp.src('./app/scss/**/*.scss')
        .pipe($.plumber())
        .pipe($.if(dev,$.sourcemaps.init()))
        .pipe($.sass())
        .pipe($.autoprefixer())
        .pipe($.if(dev,$.sourcemaps.write()))
        .pipe(gulp.dest('./tmp/css'))
        .pipe(reload({stream:true}))
});
//
gulp.task('js',()=>{
    return gulp.src('./app/js/*.js')
        .pipe($.plumber())
        .pipe($.babel())
        .pipe($.if(dev,$.uglify()))
        .pipe(gulp.dest('./tmp/js/'))
        .pipe(reload({stream:true}))
});
gulp.task('img',()=>{
    return gulp.src('./app/img/*')
        .pipe($.plumber())
        .pipe(gulp.dest('./tmp/img/'))
        .pipe(reload({stream:true}))
});    
//服务器
gulp.task('serve',['clean','css','js','img'],()=>{
    browserSync.init({
        server:['./tmp/','./app/']
    });
    gulp.watch('./app/scss/**/*.scss',['css']);
    gulp.watch('./app/js/*.js',['js']);
    gulp.watch('./app/*.html',reload);
    gulp.watch('./app/img/*',reload);
});

gulp.task('clean',()=>{
    return del.sync(['./tmp/**/*']);
});

