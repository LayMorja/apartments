import * as nodePath from 'path';
const rootFolder = nodePath.basename(nodePath.resolve());

const buildFolder = `./dist`;
const srcFolder = `./src`;

export const path = {
  build: {
    html: `${buildFolder}/`,
    js: `${buildFolder}/js/`,
    css: `${buildFolder}/css/`,
    images: `${buildFolder}/img/`,
    fonts: `${buildFolder}/fonts/`,
    files: `${buildFolder}/files/`,
  },
  src: {
    html: `${srcFolder}/*.html`,
    pug: `${srcFolder}/pug/*.pug`,
    js: `${srcFolder}/js/app.js`,
    scss: `${srcFolder}/scss/*.scss`,
    vendors: `${srcFolder}/scss/vendors.scss`,
    images: `${srcFolder}/img/**/*.{jpg,jpeg,png,gif,webp}`,
    svg: `${srcFolder}/img/**/*.svg`,
    fonts: `${srcFolder}/fonts/*.*`,
    files: `${srcFolder}/files/**/*.*`,
    sprite: `${srcFolder}/sprite/*.svg`,
    resources: `${srcFolder}/resources/**/*.*`,
  },
  clean: buildFolder,
  buildFolder: buildFolder,
  rootFolder: rootFolder,
  srcFolder: srcFolder,
  ftp: `www/laymorja.ru/`,
};

// Настройка FTP соединения
export const configFTP = {
  host: '31.31.196.183',
  user: 'u2014622',
  password: 'ZgX7YC35Efb0aF6a',
  parallel: 5,
};
