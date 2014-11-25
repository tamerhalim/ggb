var gulp = require('gulp');
var gutil = require('gulp-util');
var coffee = require('gulp-coffee');
var concat = require('gulp-concat');
var browserify = require('gulp-browserify');
var compass = require('gulp-compass');
var connect = require('gulp-connect');



//Source locations
var coffeeSources = ['components/coffee/tagline.coffee'];
var jsSources =  [
	'components/scripts/pixgrid.js',
	'components/scripts/rclick.js',
	'components/scripts/tagline.js',
	'components/scripts/template.js',
];
var sassSources = ['components/sass/style.scss'];
var HTMLSources = ['builds/development/*.html'];
var JSONSources = ['builds/development/js/*.json'];

// ********* TASKS *********** //

gulp.task('html', function(){
	gulp.src(HTMLSources).
		pipe(connect.reload());
});

gulp.task('json', function(){
	gulp.src(JSONSources).
			pipe(connect.reload());
});

gulp.task('coffee', function(){
	gulp.src(coffeeSources).
		pipe(coffee({bare:true}).on('error', gutil.log)).
			pipe(gulp.dest('components/scripts'));
});

gulp.task('js', function() {
	gulp.src(jsSources).
		pipe(concat('scripts.js')).
			pipe(browserify()).
			pipe(gulp.dest('builds/development/js')).
			pipe(connect.reload());
});

gulp.task('compass', function() {
	gulp.src(sassSources).
		pipe(compass({
			sass: 'components/sass',
			image: 'builds/development/images',
			style: 'expanded'
		})).on('error', gutil.log).
		pipe(gulp.dest('builds/development/css')).
		pipe(connect.reload());
}); 

// Watch
gulp.task('watch', function(){
	gulp.watch(coffeeSources, ['coffee']);
	gulp.watch(jsSources, ['js']);
	gulp.watch('components/sass/*.scss', ['compass']);
	gulp.watch(HTMLSources, ['html']);	
	gulp.watch(JSONSources, ['json']);	
})

//Connect
gulp.task('connect', function(){
	connect.server({
		root:'builds/development/',
		livereload: true
	});
});
// RUN all the tasks and watches
gulp.task('default', ['html', 'json', 'coffee', 'js', 'compass', 'watch', 'connect']);
