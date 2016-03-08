import gulp from 'gulp';

gulp.task('clean', () => {
  let del = require('del');
  return del(['build/'])
});

gulp.task('build:lib', ['clean'], () => {
  let babel = require('gulp-babel');
  return gulp.src('postcss-pure-grid.js')
    .pipe(babel())
    .pipe(gulp.dest('build'));
});

gulp.task('build:docs', ['clean'], () => {
    let ignore = require('fs').readFileSync('.npmignore').toString()
        .trim().split(/\n+/)
        .concat(['.npmignore', 'index.js', 'package.json',
                 'lib/*', 'test/*', 'node_modules/**/*'])
        .map( i => '!' + i );
    return gulp.src(['**/*'].concat(ignore))
        .pipe(gulp.dest('build'));
});


gulp.task('build:package', ['clean'], () => {
  let editor = require('gulp-json-editor');
  return gulp.src('./package.json')
    .pipe(editor(json => {
      json.main = 'postcss-pure-grid';
      for ( let i in json.dependencies ) {
        if ( /^babel-/.test(i) ) {
          json.devDependencies[i] = json.dependencies[i];
          delete json.dependencies[i];
        }
       }
       return json;
    }))
    .pipe(gulp.dest('build'))
});

gulp.task('build', ['build:lib', 'build:docs', 'build:package']);
