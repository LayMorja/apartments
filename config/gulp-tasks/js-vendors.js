import uglify from 'gulp-uglify-es';
const uglifier = uglify.default;

export const jsVendors = () => {
  return app.gulp
    .src(`${app.path.src.js}/vendors/*.js`, { sourcemaps: app.isDev })
    .pipe(
      app.plugins.plumber(
        app.plugins.notify.onError({
          title: 'JS VENDORS',
          message: 'Error: <%= error.message %>',
        })
      )
    )
    .pipe(app.plugins.concat('vendors.js'))
    .pipe(app.plugins.if(app.isBuild, app.gulp.dest(app.path.build.js)))
    .pipe(app.plugins.rename({ extname: '.min.js' }))
    .pipe(app.plugins.if(app.isBuild, uglifier()))
    .pipe(app.gulp.dest(app.path.build.js));
};
