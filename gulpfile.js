/* eslint max-len:0, no-console:0, func-names: 0, no-mixed-operators:0 */
const gulp = require('gulp');
const changed = require('gulp-changed');
const size = require('gulp-size');
const imagemin = require('gulp-imagemin');
const imageminMozjpeg = require('imagemin-mozjpeg');
const merge = require('merge-stream');
const spritesmith = require('gulp.spritesmith');
const buffer = require('vinyl-buffer');
const rimraf = require('rimraf');

// https://github.com/twolfson/gulp.spritesmith
function createSprite(src, fileName, cssTemplate) {
  const spriteData = gulp.src(src)
    .pipe(spritesmith({
      imgName: `${fileName}.png`,
      cssName: `_${fileName}.styl`,
      padding: 4,
      imgOpts: {
        quality: 100,
      },
      cssTemplate,
      cssHandlebarsHelpers: {
        parseName(name) {
          return name;
          // return name.indexOf('-auto') === -1 ? name : name.replace('-auto', '');
        },
        /*
        isNameIndexOfAuto(name, options) {
          return name.indexOf('auto') === -1 ? options.inverse(this) : options.fn(this);
        },
        {{#isNameIndexOfAuto name}}
        {{/isNameIndexOfAuto }}
        */
        percent: (value, base) => `${(value / base) * 100}%`,
        bgPosition(spriteSize, imgSize, offset) {
          const result = (offset / (imgSize - spriteSize)) * 100;
          // eslint-disable-next-line
          if (isNaN(result)) {
            return '0';
          }
          return `${result}%`;
        },
      },
    }));
  const imgStream = spriteData.img
    .pipe(buffer())
    .pipe(gulp.dest('src/assets/original'));

  const cssStream = spriteData.css
    .pipe(gulp.dest('src/css'));
  return merge(imgStream, cssStream);
}

gulp.task('sprite', () => {
  const basicTemplate = 'src/css/handlebars/basic-stylus.hbs';
  const a = [
    createSprite('src/assets/sprite_src/*', 'sprite', basicTemplate),
  ];
  return merge(...a);
});

gulp.task('m', () => {
  const imgSrc = [
    'src/assets/original/**/*.+(jpg|png|gif)',
    '!src/assets/original/_*',
  ];
  const otherSrc = imgSrc.map((imgPath) => (imgPath.indexOf('!') === 0 ? imgPath.substr(1) : `!${imgPath}`));
  otherSrc.push('src/assets/original/**/*.+(svg)');
  const imgDest = 'src/assets/img';

  const taskOtherSrc = gulp.src(otherSrc)
    .pipe(changed(imgDest))
    .pipe(size({ showFiles: true }))
    .pipe(gulp.dest(imgDest));

  const taskImgSrc = gulp.src(imgSrc)
    .pipe(changed(imgDest))
    .pipe(size({ showFiles: true }))
    .pipe(imagemin([
      imageminMozjpeg({ quality: 90 }),
      imagemin.optipng({ optimizationLevel: 5 }),
    ]))
    .pipe(gulp.dest(imgDest));

  return merge(taskOtherSrc, taskImgSrc);
});

gulp.task('rimraf', (cb) => {
  // rimraf('./dist-build', cb);
  rimraf('../f2e-dist', cb);
});

// gulp.task('buildToWWW', () => {
//   const SRC = ['dist/**/*.*', '!dist/**/*.html'];
//   const DEST = '../code/www/';
//   const assetsPipe = gulp.src(SRC)
//     .pipe(gulp.dest(DEST));

//   const htmlPipe = gulp.src(['dist/**/*.html'])
//     .pipe(gulp.dest('dist-build'));

//   return merge(assetsPipe, htmlPipe);
// });

gulp.task('f2e-dist', () => gulp.src('dist/*.+(html|png|jpg)').pipe(gulp.dest('../f2e-dist')));

gulp.task('www', gulp.series('rimraf', 'f2e-dist'));

gulp.task('watch', () => {
  gulp.watch('src/assets/original/**/*', gulp.series('m'));
  gulp.watch('src/assets/sprite_src/**/*', gulp.series('sprite'));
});

gulp.task('default', gulp.series('m', 'watch'));
