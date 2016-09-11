import gulp from 'gulp';
import shell from 'gulp-shell';
import rimraf from 'rimraf';
import run from 'run-sequence';
import watch from 'gulp-watch';
import server from 'gulp-live-server';
import fs from 'fs';

const paths = {
  config: './config/',
  js: [ './src/**/*.js' ],
  destination: './app'
};

const CONFIG = JSON.parse(fs.readFileSync(paths.config + 'config.json'));

gulp.task('default', (callback) => {
  run("server", "build", "watch", callback);
});

gulp.task('build', (callback) => {
  run('clean', 'flow', 'babel', 'restart', callback);
});

gulp.task('clean', (callback) => {
  var a = 0;
  a += 10;
  rimraf(paths.destination, callback);
});

gulp.task('flow', shell.task([
  'flow'
], { ignoreErrors: true }));

gulp.task('babel', shell.task([
  'babel src --out-dir app'
]));

let express;

gulp.task('server', () => {
  express = server.new(paths.destination);
});

gulp.task('restart', () => {
  express.start.bind(express)();
});

gulp.task('watch', () => {
  return watch(paths.js, () => {
    gulp.start('build');
  })
});
