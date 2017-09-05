'use strict';
import fs from 'fs';
import gulp from 'gulp';
import del from 'del';
import zip from 'gulp-zip';
import sftp from 'gulp-sftp';                           // 文件上传到远程服务器插件

const BUILD_PATH = 'build';                             // 编译文件
const DIST_PATH = 'dist';                               // 目的地文件
const config = JSON.parse(fs.readFileSync('./package.json'));
const PACKAGE_NAME = config.packageName;        // 打包生成的文件名, 如www.bbdservice.com

const dev = config.release.dev;
const test = config.release.test;

// 清除dist目录
gulp.task('clean', () => {
    return del([DIST_PATH]);
});
// 文件打包
gulp.task('package', ['clean'], () => {
    return gulp.src(`${BUILD_PATH}/**`)
        .pipe(gulp.dest(`${DIST_PATH}/${PACKAGE_NAME}/`));
});
// 将静态资源压缩为zip格式
gulp.task('zip', ['package'], () => {
    return gulp.src(`${DIST_PATH}/**`, {base: `${DIST_PATH}/`})
               .pipe(zip(`${PACKAGE_NAME}.zip`))
               .pipe(gulp.dest(DIST_PATH));
});
// 将静态资源发布到 dev 服务器
gulp.task('release_dev', ['package'], () => {
    return gulp.src(dev.zip ? [`${DIST_PATH}/*.zip`] : [`${DIST_PATH}/**`, `!${DIST_PATH}/*.zip`])
               .pipe(sftp(dev));
});
// 将静态资源发布到 test 服务器
gulp.task('release_test', ['zip'], () => {
    return gulp.src(test.zip ? [`${DIST_PATH}/*.zip`] : [`${DIST_PATH}/**`, `!${DIST_PATH}/*.zip`])
               .pipe(sftp(test));
});
// 同时部署到开发和测试服务器
gulp.task('release_both', ['release_dev', 'release_test']);

gulp.task('default', ['release_both']);