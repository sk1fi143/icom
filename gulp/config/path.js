import * as nodePath from 'path';

const rootFolder = nodePath.basename(nodePath.resolve());
const buildFolder = './build';
const srcFolder = './src';

export const path = {
  build: {
    mask: `${buildFolder}/js/`,
    js: `${buildFolder}/js/`,
    css: `${buildFolder}/css/`,
    html: `${buildFolder}/`,
    images: `${buildFolder}/img`,
    files: `${buildFolder}/`,
    data: `${buildFolder}/data/`,
  },
  src: {
    mask: `${srcFolder}/js/maskPosition.min.js`,
    js: `${srcFolder}/js/app.js`,
    scss: `${srcFolder}/css/*.css`,
    html: `${srcFolder}/*.html`,
    svg: `${srcFolder}/img/**/*.svg`,
    images: `${srcFolder}/img/**/*.{jpg,jpeg,png,gif,webp}`,
    files: `${srcFolder}/files/**`,
    data: `${srcFolder}/data/**`,
  },
  watch: {
    mask: `${srcFolder}/js/maskPosition.min.js`,
    js: `${srcFolder}/js/**/*.js`,
    scss: `${srcFolder}/css/**/*.css`,
    html: `${srcFolder}/**/*.html`,
    images: `${srcFolder}/img/**/*.{jpg,jpeg,png,gif,webp,svg,ico}`,
    files: `${srcFolder}/files/**`,
    data: `${srcFolder}/data/**`,
  },
  clean: buildFolder,
  srcFolder: srcFolder,
  rootFolder: rootFolder,
  ftp: '',
};
