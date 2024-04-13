export const mask = () => {
    return app.gulp.src(app.path.src.mask)
        .pipe(app.gulp.dest(app.path.build.mask))
}
