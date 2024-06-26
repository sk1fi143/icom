import dartSass from 'sass';
import gulpSass from 'gulp-sass';
import cleanCss from 'gulp-clean-css'; // Сжатие CSS файла
import webpcss from 'gulp-webpcss'; // вывод webp изображений
import autoprefixer from 'gulp-autoprefixer'; // добавление вендорных префиксов
import groupCssMediaQueries from 'gulp-group-css-media-queries'; // группировка media запросов

const sass = gulpSass(dartSass);

export const scss = () => {
    return app.gulp.src(app.path.src.scss, { sourcemaps: app.isDev })
        .pipe(app.plugins.plumber(
            app.plugins.notify.onError({
                title: "SCSS",
                message: "Error: <%= error.message %>"
            })))
        .pipe(app.plugins.replace(/@img\//g, '../img/'))
        .pipe(sass({
            outputStyle: 'expanded'
        }))
        .pipe(app.plugins.if(app.isBuild, groupCssMediaQueries()))
        .pipe(app.plugins.if(app.isBuild, webpcss(
            {
              webpClass: '.webp',
              noWebpClass: 'no-webp'
            }
        )))
        .pipe(app.plugins.if(app.isBuild, autoprefixer({
            grid: true,
            overrideBrowserslist: ['last 3 versions'],
            cascade: true
        })))
        // раскомментировать если нужен не сжатый файл стилей (копия)
        .pipe(app.gulp.dest(app.path.build.css))
        .pipe(app.plugins.if(app.isBuild, cleanCss()))
        .pipe(app.gulp.dest(app.path.build.css))
        .pipe(app.plugins.browsersync.stream());
}
