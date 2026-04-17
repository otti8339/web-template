const { src, dest, watch, series, parallel } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const sourcemaps = require('gulp-sourcemaps');
const browserSync = require('browser-sync').create();
const del = require('del');

// パス設定
const paths = {
  html: {
    src: 'src/**/*.html',
    dest: 'dist/'
  },
  styles: {
    src: 'src/sass/**/*.scss',
    dest: 'dist/css/'
  },
  scripts: {
    src: 'src/js/**/*.js',
    dest: 'dist/js/'
  },
  images: {
    src: 'src/images/**/*',
    dest: 'dist/images/'
  }
};

// distフォルダーをクリーン
function clean() {
  return del(['dist/**', '!dist']);
}

// HTML
function html() {
  return src(paths.html.src)
    .pipe(dest(paths.html.dest))
    .pipe(browserSync.stream());
}

// SCSS → CSS
function styles() {
  return src('src/sass/style.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({ outputStyle: 'expanded' }).on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(dest(paths.styles.dest))
    .pipe(cleanCSS())
    .pipe(rename({ suffix: '.min' }))
    .pipe(sourcemaps.write('.'))
    .pipe(dest(paths.styles.dest))
    .pipe(browserSync.stream());
}

// JS
function scripts() {
  return src(paths.scripts.src)
    .pipe(sourcemaps.init())
    .pipe(dest(paths.scripts.dest))
    .pipe(uglify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(sourcemaps.write('.'))
    .pipe(dest(paths.scripts.dest))
    .pipe(browserSync.stream());
}

// 画像コピー
function images() {
  return src(paths.images.src)
    .pipe(dest(paths.images.dest))
    .pipe(browserSync.stream());
}

// ブラウザ同期
function serve() {
  browserSync.init({
    server: {
      baseDir: 'dist'
    },
    notify: false
  });

  watch(paths.html.src, html);
  watch(paths.styles.src, styles);
  watch(paths.scripts.src, scripts);
  watch(paths.images.src, images);
}

// ビルド（本番用）
const build = series(clean, parallel(html, styles, scripts, images));

// 開発サーバー起動
const dev = series(build, serve);

exports.build = build;
exports.default = dev;
