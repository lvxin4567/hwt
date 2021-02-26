const gulp = require("gulp");
const ts = require("gulp-typescript");
const lodash = require("lodash");
const fs = require("fs");
const upath = require('upath');
const globby = require('globby');
const jsonfile = require('jsonfile')
const gulpsequence = require('gulp-sequence');
const clean = require('gulp-clean');
const archiver = require('archiver');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const crypto = require('crypto');
const strformat = require('string-format')
const sourcemaps = require('gulp-sourcemaps');
const path = require("path");

//微信组件
const adapterWx = require("./weixin/plugin/adapter")

gulp.task('clean-dist', function () {
    console.log('清理 dist');
    return gulp.src('dist', {
            read: false
        })
        .pipe(clean());
});


gulp.task('default', function () {
    console.log('gulp build-plugins');
    console.log('gulp web');
    console.log('gulp native')
});

const tsLibsProject = ts.createProject("libtsconfig.json");
gulp.task("buildtslibs", ['clean-dist'], function () {
    console.log('开始构建TS lib文件');
    return tsLibsProject.src()
        .pipe(tsLibsProject())
        .js.pipe(gulp.dest("dist"));
});

const tsProject = ts.createProject("protsconfig.json", {
    declaration: true
});
gulp.task("buildts", ['buildtslibs'], function () {
    console.log('开始构建TS文件');
    // console.log(tsProject);
    return tsProject.src()
        .pipe(tsProject())
        .js.pipe(gulp.dest("dist"));
});


gulp.task('clean-kaayou-heads', function () {
    console.log('清理 dist');
    return gulp.src('tsheads/kaayou', {
            read: false
        })
        .pipe(clean());
});


gulp.task("buildTsHeads:or", function () {
    console.log('开始构建  头文件');
    var tsResult = gulp.src(["tssrc/**/*.ts", "tsheads/cocos/**/*"]) // or tsProject.src()
        .pipe(ts({
            "lib": ["dom", "es5", "es2015.promise"],
            "target": "es5",
            "module": "amd",
            "allowJs": false,
            "declaration": true,
            "strict": false,
            "strictNullChecks": false,
            "strictPropertyInitialization": false,
            "esModuleInterop": true,
            "experimentalDecorators": true
        })).on('error', () => {
            /* Ignore compiler errors */
        })
    return tsResult.dts.pipe(gulp.dest('tsheads/kaayou')); //tsResult.js.pipe(gulp.dest('release'));
})

gulp.task("buildTsHeads", ['clean-kaayou-heads'], function (cb) {
    gulpsequence("clean-kaayou-heads", "buildTsHeads:or", cb)
});


gulp.task("buildTsModlue", ['clean-dist'], function (cb) {

    var __dirpath = "tssrc";
    var __realityPath = "src";

    var subdir = fs.readdirSync(__dirpath);
    var gamemodule = [];
    subdir.forEach(function (param) {
        var subpath = __dirpath + "/" + param;
        var stat = fs.statSync(subpath);
        if (stat.isDirectory()) {
            var relative = upath.relative(__dirpath, subpath);
            gamemodule.push(relative);
        }
    });


    var createmodlue = function (module) {
        return new Promise(function (resolve, reject) {
            console.log('开始构建模块文件' + module);
            var ignorelist = [`tsheads/kaayou/${module}/**/*`];
            let distPath = `dist/${module}`;
            if (module == 'kaayoulibs') {
                ignorelist.push(`tsheads/kaayou/**/*`);
                distPath = `dist`;
            }
            if (module == 'common') {
                var otherModlues = lodash.difference(gamemodule, ['kaayoulibs', 'common']);
                for (var x in otherModlues) {
                    ignorelist.push(`tsheads/kaayou/${otherModlues[x]}/**/*`);
                    ignorelist.push(`tssrc/${otherModlues[x]}/**/*`);
                }
            }

            let list = globby.sync(["tsheads/kaayou/**/*"], {
                ignore: ignorelist
            });
            list = list.concat([`tssrc/${module}/**/*.ts`, "tsheads/cocos/**/*"]);
            var tsResult = gulp.src(list)
                .pipe(ts({
                    "lib": ["dom", "es5", "es2015.promise"],
                    "target": "es5",
                    "module": "amd",
                    "allowJs": false,
                    "declaration": false,
                    "outFile": `${module}.module.js`,
                    "strict": false,
                    "strictNullChecks": false,
                    "strictPropertyInitialization": false,
                    "esModuleInterop": true,
                    "experimentalDecorators": true,
                    "removeComments": true,
                })).on('error', () => {
                    /* Ignore compiler errors */
                });

            tsResult.js.pipe(gulp.dest(distPath)).on('end', function () {
                console.log(`${module} 模块构建完成`);
                resolve();
            });
        })
    }



    var createAppFile = function () {
        return new Promise(function (resolve, reject) {
            console.log('开始构建模app.js');
            var ignorelist = [`tsheads/kaayou/*.ts`];
            let list = globby.sync(["tsheads/kaayou/**/*"], {
                ignore: ignorelist
            });
            list = list.concat([`tssrc/app.ts`, "tsheads/cocos/**/*"]);
            var tsResult = gulp.src(list)
                .pipe(ts({
                    "lib": ["dom", "es5", "es2015.promise"],
                    "target": "es5",
                    "module": "amd",
                    "allowJs": false,
                    "declaration": false,
                    // "outFile": `${module}.module.js`,
                    "strict": false,
                    "strictNullChecks": false,
                    "strictPropertyInitialization": false,
                    "esModuleInterop": true,
                    "experimentalDecorators": true,
                    "removeComments": true,
                })).on('error', () => {
                    /* Ignore compiler errors */
                });
            tsResult.js.pipe(gulp.dest(`dist`)).on('end', function () {
                console.log(`app.js 模块构建完成`);
                resolve();
            });
        })
    }


    var mc = async function () {
        //查询模块
        console.log(`开始查询模块`);

        await createAppFile();

        var modluelist = gamemodule;
        lodash.pullAll(modluelist, ['kaayoulibs', 'common']);
        console.log(modluelist);
        var v = [];

        for (var x in modluelist) {
            // await createmodlue(modluelist[x]);
            v.push(createmodlue(modluelist[x]));
        }
        Promise.all(v).then(function () {
            console.log('所有模块构建完成');
            cb();
        });
    }
    createmodlue('kaayoulibs').then(function () {
        return createmodlue('common');
    }).then(function () {
        mc();
    });

});

























gulp.task("web::buildTsModlue", ['clean-dist'], function (cb) {


    var __dirpath = "tssrc";
    var __realityPath = "src";

    var subdir = fs.readdirSync(__dirpath);
    var gamemodule = [];
    subdir.forEach(function (param) {
        var subpath = __dirpath + "/" + param;
        var stat = fs.statSync(subpath);
        if (stat.isDirectory()) {
            var relative = upath.relative(__dirpath, subpath);
            gamemodule.push(relative);
        }
    });


    var createmodlue = function (module) {

        return new Promise(function (resolve, reject) {
            console.log('开始构建模块文件' + module);
            var ignorelist = [`tsheads/kaayou/${module}/**/*`];
            let distPath = `dist/${module}`;
            if (module == 'kaayoulibs') {
                ignorelist.push(`tsheads/kaayou/**/*`);
                distPath = `dist`;
            }
            if (module == 'common') {
                var otherModlues = lodash.difference(gamemodule, ['kaayoulibs', 'common']);
                for (var x in otherModlues) {
                    ignorelist.push(`tsheads/kaayou/${otherModlues[x]}/**/*`);
                    ignorelist.push(`tssrc/${otherModlues[x]}/**/*`);
                }
            }

            let list = globby.sync(["tsheads/kaayou/**/*"], {
                ignore: ignorelist
            });
            list = list.concat([`tssrc/${module}/**/*.ts`, "tsheads/cocos/**/*"]);
            var tsResult = gulp.src(list)
                .pipe(sourcemaps.init())
                .pipe(ts({
                    "lib": ["dom", "es5", "es2015.promise"],
                    "target": "es5",
                    "module": "amd",
                    "allowJs": false,
                    "declaration": false,
                    "outFile": `${module}.module.js`,
                    "strict": false,
                    "strictNullChecks": false,
                    "strictPropertyInitialization": false,
                    "esModuleInterop": true,
                    "experimentalDecorators": true,
                    "removeComments": false,
                })).on('error', () => {
                    /* Ignore compiler errors */
                })
                .pipe(sourcemaps.write())
                .pipe(gulp.dest(distPath))
                .on('end', function () {
                    console.log(`${module} 模块构建完成`);
                    resolve();
                });
            // tsResult.js.pipe(gulp.dest(distPath)).on('end', function () {
            //     console.log(`${module} 模块构建完成`);
            //     resolve();
            // });
        })
    }



    var createAppFile = function () {
        return new Promise(function (resolve, reject) {
            console.log('开始构建模app.js');
            var ignorelist = [`tsheads/kaayou/*.ts`];
            let list = globby.sync(["tsheads/kaayou/**/*"], {
                ignore: ignorelist
            });
            list = list.concat([`tssrc/app.ts`, "tsheads/cocos/**/*"]);
            var tsResult = gulp.src(list)
                .pipe(sourcemaps.init())
                .pipe(ts({
                    "lib": ["dom", "es5", "es2015.promise"],
                    "target": "es5",
                    "module": "amd",
                    "allowJs": false,
                    "declaration": false,
                    // "outFile": `${module}.module.js`,
                    "strict": false,
                    "strictNullChecks": false,
                    "strictPropertyInitialization": false,
                    "esModuleInterop": true,
                    "experimentalDecorators": true,
                    "removeComments": true,
                })).on('error', () => {
                    /* Ignore compiler errors */
                })
                .pipe(sourcemaps.write())
                .pipe(gulp.dest(`dist`))
                .on('end', function () {
                    console.log(`app.js 模块构建完成`);
                    resolve();
                });
            // tsResult.js.pipe(gulp.dest(`dist`)).on('end', function () {
            //     console.log(`app.js 模块构建完成`);
            //     resolve();
            // });
        })
    }


    var mc = async function () {
        //查询模块
        console.log(`开始查询模块`);

        await createAppFile();

        var modluelist = gamemodule;
        modluelist = lodash.difference(modluelist, ['kaayoulibs', 'common']);
        console.log(modluelist);
        var v = [];

        for (var x in modluelist) {
            // await createmodlue(modluelist[x]);
            v.push(createmodlue(modluelist[x]));
        }
        Promise.all(v).then(function () {
            console.log('所有模块构建完成');
            cb();
        });
    }

    createmodlue('kaayoulibs').then(function () {
        return createmodlue('common');
    }).then(function () {
        mc();
    });
});




gulp.task('clean-dist-klibs', function () {
    console.log('清理 klibs');
    return gulp.src('dist/klibs', {
            read: false
        })
        .pipe(clean());
});


gulp.task("buildcompilegamemodule", function (cb) {
    console.log('开始自动构建模块link');
    var __dirpath = "dist";
    var __realityPath = "src";
    var subdir = fs.readdirSync(__dirpath);
    var gamemodule = [];
    subdir.forEach(function (param) {
        var subpath = __dirpath + "/" + param;
        var stat = fs.statSync(subpath);
        if (stat.isDirectory()) {
            var relative = upath.relative(__dirpath, subpath);
            gamemodule.push(relative);
        }
    });

    //排序把common 排到第一个
    // var ci = gamemodule.indexOf("common");
    // if (ci > -1) {
    //     gamemodule.splice(ci, 1);
    //     gamemodule.unshift('common');
    // }

    var mustModuleNames = ["common", "lobby"];
    var mustModules = [];
    var otherModules = [];
    for (var x in gamemodule) {
        var bmust = false;
        var mustindex = -1;
        for (var i in mustModuleNames) {
            if (gamemodule[x].indexOf(mustModuleNames[i]) > -1) {
                mustindex = Number(i);
                bmust = true;
                break;
            }
        }
        if (bmust) {
            mustModules[mustindex] = gamemodule[x];
        } else {
            otherModules.push(gamemodule[x]);
        }
    }

    let overModules = mustModules.concat(otherModules);

    jsonfile.writeFileSync(upath.join(__dirpath, `modulelist.json`), overModules, {
        spaces: 2
    });



    //  jsonfile.writeFileSync( `${__dirpath}/${sbpat}/${sbpat}_jslist.json`, reqFils , { spaces: 2 }) 
    // gamemodule.forEach(function (sbpat) {
    //     var files = globby.sync([upath.join(__dirpath, sbpat) + "/**/*.js"])
    //     var reqFils = [];
    //     files.forEach(function (sbpat) {
    //         var relative = upath.relative(__dirpath, sbpat);
    //         relative = upath.join(__realityPath, relative);
    //         reqFils.push(relative);
    //     });
    //     jsonfile.writeFileSync(upath.join(__dirpath, sbpat, `${sbpat}_jslist.json`), reqFils, { spaces: 2 })
    // });
    console.log('当前模块', gamemodule);
    console.log('模块link完成');
    cb();
});



gulp.task("buildgamemodule", function (cb) {
    console.log('开始自动构建模块link');
    var __dirpath = "dist";
    var __realityPath = "src";
    var subdir = fs.readdirSync(__dirpath);
    var gamemodule = [];
    subdir.forEach(function (param) {
        var subpath = __dirpath + "/" + param;
        var stat = fs.statSync(subpath);
        if (stat.isDirectory()) {
            var relative = upath.relative(__dirpath, subpath);
            gamemodule.push(relative);
        }
    });
    jsonfile.writeFileSync(upath.join(__dirpath, `modulelist.json`), gamemodule, {
        spaces: 2
    });
    //  jsonfile.writeFileSync( `${__dirpath}/${sbpat}/${sbpat}_jslist.json`, reqFils , { spaces: 2 }) 
    gamemodule.forEach(function (sbpat) {
        var files = globby.sync([upath.join(__dirpath, sbpat) + "/**/*.js"])
        var reqFils = [];
        files.forEach(function (sbpat) {
            var relative = upath.relative(__dirpath, sbpat);
            relative = upath.join(__realityPath, relative);
            reqFils.push(relative);
        });
        jsonfile.writeFileSync(upath.join(__dirpath, sbpat, `${sbpat}_jslist.json`), reqFils, {
            spaces: 2
        })
    });
    console.log('当前模块', gamemodule);
    console.log('模块link完成');
    cb();
});

gulp.task('web::clean-src', function () {
    console.log('清理src');
    return gulp.src('src', {
            read: false
        })
        .pipe(clean());
});


gulp.task('web::copy-dist-to-src', ['web::clean-src'], function (cb) {
    console.log('拷贝dist 到 src');
    gulp.src('dist/**/*', {
            read: true
        })
        .pipe(gulp.dest('src')).on('end', function () {
            gulp.src('hotBuilder.json', {
                    read: true
                })
                .pipe(gulp.dest('src')).on('end', function () {
                    cb();
                });;
        });;
});






gulp.task('archiver-modules', (cb) => {
    var __realityPath = "src";
    var __dirpath = "dist";
    var subdir = fs.readdirSync(__dirpath);
    var gamemodule = [];
    subdir.forEach(function (param) {
        var subpath = __dirpath + "/" + param;
        var stat = fs.statSync(subpath);
        if (stat.isDirectory()) {
            var relative = upath.relative(__dirpath, subpath);
            gamemodule.push(relative);
        }
    });
    let promArr = [];
    let allarchivefiles = [];
    let AllhotBuilder = JSON.parse(fs.readFileSync("hotBuilder.json"));
    gamemodule.forEach(mname => {
        promArr.push((function (modulename) {
            return new Promise(function (resolve, reject) {
                let manifest = null;
                if (AllhotBuilder[modulename]) {
                    var hotBuilder = AllhotBuilder[modulename];
                    manifest = {
                        packageUrl: strformat(hotBuilder.packageUrl, {
                            ver: hotBuilder.hotversion
                        }),
                        remoteManifestUrl: strformat(hotBuilder.remoteManifestUrl, {
                            ver: hotBuilder.hotversion
                        }),
                        remoteVersionUrl: strformat(hotBuilder.remoteVersionUrl, {
                            ver: hotBuilder.hotversion
                        }),
                        version: hotBuilder.hotversion,
                        assets: {},
                        searchPaths: []
                    };
                }
                let isinGameLobby = AllhotBuilder['GameLobby'].modules.indexOf(modulename) > -1;

                if (!isinGameLobby) {
                    var output = fs.createWriteStream(`build/${modulename}.zip`);
                    var archive = archiver('zip');
                    output.on('close', function () {
                        console.log(modulename + '模块打包完成' + (archive.pointer() / 1024).toFixed(2) + 'kb total');
                        resolve(modulename);
                    });
                    archive.on('error', function (err) {
                        // throw modulename + err;
                        reject(modulename + err);
                    });
                    archive.pipe(output);
                }
                let srcfile = globby.sync(`${__dirpath}/${modulename}/**/*`);
                srcfile.some(sbpat => {
                    let relative = upath.join(__realityPath, upath.relative(__dirpath, sbpat));
                    if (isinGameLobby) {
                        allarchivefiles.push({
                            p: sbpat,
                            r: upath.join(modulename, __realityPath, upath.relative(__dirpath, sbpat))
                        });
                        // allarchivefiles.push({ p: sbpat, r: upath.join(modulename, sbpat) });
                        return false;
                    }
                    archive.file(sbpat, {
                        name: relative
                    });
                    if (manifest) {
                        let stat = fs.statSync(sbpat);
                        let size = stat['size'];
                        let md5 = crypto.createHash('md5').update(fs.readFileSync(sbpat, 'binary')).digest('hex');
                        let compressed = upath.extname(sbpat).toLowerCase() === '.zip';
                        manifest.assets[relative] = {
                            'size': size,
                            'md5': md5
                        };
                        if (compressed) {
                            manifest.assets[relative].compressed = true;
                        }
                    }
                });

                var __resdestpath = "res";
                let resfiles = globby.sync(`${__resdestpath}/${modulename}/**/*`);
                console.log(resfiles);

                resfiles.some(sbpat => {
                    var relative = sbpat;

                    if (isinGameLobby) {
                        allarchivefiles.push({
                            p: sbpat,
                            r: upath.join(modulename, sbpat)
                        });
                        return false;
                    }
                    archive.file(sbpat, {
                        name: relative
                    });
                    if (manifest) {
                        let stat = fs.statSync(sbpat);
                        let size = stat['size'];
                        let md5 = crypto.createHash('md5').update(fs.readFileSync(sbpat, 'binary')).digest('hex');
                        let compressed = upath.extname(sbpat).toLowerCase() === '.zip';
                        manifest.assets[relative] = {
                            'size': size,
                            'md5': md5
                        };
                        if (compressed) {
                            manifest.assets[relative].compressed = true;
                        }
                    }
                });
                if (isinGameLobby) {
                    console.log(modulename + '模块无需打包');
                    resolve(modulename);
                    return;
                }
                if (manifest) {
                    var destproject = upath.join("", 'project.manifest');
                    var destVersion = upath.join("", 'version.manifest');
                    archive.append(JSON.stringify(manifest), {
                        name: destproject
                    });
                    delete manifest.assets;
                    delete manifest.searchPaths;
                    archive.append(JSON.stringify(manifest), {
                        name: destVersion
                    });
                }


                archive.finalize();
            });
        })(mname));
    })

    Promise.all(promArr).then(function (modulenames) {
        // console.log(allarchivefiles);


        var AppFiles = function () {

            let files = globby.sync("dist", {
                onlyFiles: true,
                deep: 0
            });
            files.forEach(sbpat => {
                // var relative = upath.join(__realityPath, upath.relative(__dirpath, sbpat));
                allarchivefiles.push({
                    p: sbpat,
                    r: upath.join("App", __realityPath, upath.relative(__dirpath, sbpat))
                });
            });

            var __resdestpath = "res";
            var ignorelist = [];
            for (var x in gamemodule) {
                ignorelist.push(`${__resdestpath}/${gamemodule[x]}`);
            }

            let resfiles = globby.sync(`${__resdestpath}/**/*`, {
                ignore: ignorelist
            });
            resfiles.forEach(sbpat => {
                // var relative = upath.join(__realityPath, upath.relative(__dirpath, sbpat));
                allarchivefiles.push({
                    p: sbpat,
                    r: upath.join("App", sbpat)
                });
            });
        }
        AppFiles();



        var output = fs.createWriteStream(`build/GameLobby.zip`);
        var archive = archiver('zip');
        output.on('close', function () {
            console.log((archive.pointer() / 1024).toFixed(2) + 'kb total');
            console.log('模块全部打包完成');

            cb();
        });
        archive.on('error', function (err) {
            throw err;
        });
        archive.pipe(output);




        let lobbyhotBuilder = AllhotBuilder['GameLobby'];
        let lobbymanifest = {
            packageUrl: strformat(lobbyhotBuilder.packageUrl, {
                ver: lobbyhotBuilder.hotversion
            }),
            remoteManifestUrl: strformat(lobbyhotBuilder.remoteManifestUrl, {
                ver: lobbyhotBuilder.hotversion
            }),
            remoteVersionUrl: strformat(lobbyhotBuilder.remoteVersionUrl, {
                ver: lobbyhotBuilder.hotversion
            }),
            version: lobbyhotBuilder.hotversion,
            assets: {},
            searchPaths: []
        };

        allarchivefiles.forEach(sub => {
            if (lobbymanifest) {
                let sbpat = sub.p;
                let stat = fs.statSync(sbpat);
                let size = stat['size'];
                let md5 = crypto.createHash('md5').update(fs.readFileSync(sbpat, 'binary')).digest('hex');
                let compressed = upath.extname(sbpat).toLowerCase() === '.zip';
                lobbymanifest.assets[sub.r] = {
                    'size': size,
                    'md5': md5
                };
                if (compressed) {
                    lobbymanifest.assets[sub.r].compressed = true;
                }
            }
            archive.file(sub.p, {
                name: sub.r
            });
        });

        if (lobbymanifest) {
            var destproject = upath.join("", 'project.manifest');
            var destVersion = upath.join("", 'version.manifest');
            archive.append(JSON.stringify(lobbymanifest), {
                name: destproject
            });
            delete lobbymanifest.assets;
            delete lobbymanifest.searchPaths;
            archive.append(JSON.stringify(lobbymanifest), {
                name: destVersion
            });
        }

        console.log('allarchivefiles', lobbymanifest);
        archive.finalize();
    });
    console.log(gamemodule);

    // var output = fs.createWriteStream(`GameLobby.zip`);
    // var archive = archiver('zip');

    // output.on('close', function () {
    //     console.log((archive.pointer() / 1024).toFixed(2) + 'kb total');
    //     console.log('archiver has been finalized and the output file descriptor has closed.');
    //     cb();
    // });


    // archive.on('error', function (err) {
    //     throw err;
    // });
    // archive.pipe(output);
    // let srcfile = globby.sync("dist/*/*");
    // srcfile.forEach(sbpat => {
    //     var relative = upath.join(__realityPath, upath.relative(__dirpath, sbpat));
    //     archive.file(sbpat, { name: relative });
    // });
    // archive.finalize();
});

gulp.task('native::clean-res', function () {
    return gulp.src('build/res', {
            read: false
        })
        .pipe(clean());
});

gulp.task('native::copy-res', ['native::clean-res'], function () {
    var __dirpath = "dist";
    var subdir = fs.readdirSync(__dirpath);
    var gamemodule = [];
    subdir.forEach(function (param) {
        var subpath = __dirpath + "/" + param;
        var stat = fs.statSync(subpath);
        if (stat.isDirectory()) {
            var relative = upath.relative(__dirpath, subpath);
            gamemodule.push(relative);
        }
    });
    var ignorelist = [];
    for (var x in gamemodule) {
        ignorelist.push(`res/${gamemodule[x]}`);
    }
    var __resdestpath = "res";
    let resfiles = globby.sync(`${__resdestpath}/**/*`, {
        ignore: ignorelist
    });
    console.log(resfiles);
    return gulp.src(resfiles, {
            base: "res"
        })
        .pipe(gulp.dest('build/res'));
});


gulp.task('native::clean-src', function () {
    console.log('清理src');
    return gulp.src('build/src', {
            read: false
        })
        .pipe(clean());
});

gulp.task('native::copy-dist-to-src', ['native::clean-src'], function () {
    console.log('拷贝dist 到 src');
    let files = globby.sync("dist", {
        onlyFiles: true,
        deep: 0
    });
    return gulp.src(files, {
            read: true
        })
        .pipe(gulp.dest('build/src'));
});



gulp.task('web::copy-pulugins-file', function () {
    console.log('pulugins 到 src');
    return gulp.src("plugins/**", {
            read: true
        })
        .pipe(gulp.dest('src'));
});

gulp.task('native::copy-pulugins-file', function () {
    console.log('pulugins 到 src');
    return gulp.src("plugins/**", {
            read: true
        })
        .pipe(gulp.dest('build/src'));
});

gulp.task('build-plugins', function (cb) {
    console.log(111);
    var b = browserify();
    b.require("lodash")
    b.require("crypto-js")
    b.require("css")
    b.require("htmlparser2")
    b.require("iconv-lite")
    b.require("es6-promise")
    b.bundle().pipe(source('plugins.js')).pipe(gulp.dest('plugins'));
});

gulp.task("weixin::build", function (cb) {

    var framework_dir = path.resolve("weixin", "framework");
    var output_dir = path.resolve("weixin", "release");
    var source_dir = path.resolve("res");
    var src_dir = path.resolve("src")

    console.log("拷贝框架")
    gulp.src(framework_dir + "/**/**/**", {
            read: true
        })
        .pipe(gulp.dest(output_dir))
        .on("end", function () {
            console.log("替换脚本变量")
            gulp.src(src_dir + "/**/**/**", {
                    read: true
                })
                .pipe(adapterWx({
                    global: ["kaayou", "Patch", "common", "NetImage",],
                    static: ["kaayou"],
                    // uglify: true,
                    minJSON: true
                }))
                .pipe(gulp.dest(output_dir + "/src"))
                .on("end", function () {
                    console.log("替换脚本变量完毕")
                    gulp.src(source_dir + "/**/**/**", {
                            read: true
                        })
                        .pipe(adapterWx({
                            minJSON: true
                        }))
                        .pipe(gulp.dest(output_dir + "/res"))
                        .on("end", function () {
                            console.log("拷贝资源完毕")
                            cb()
                        })

                })

        });
})

var pack = require("./weixin/plugin/resourcepack")

gulp.task('weixin::zipResource', cb => {

    var source_dir = path.resolve("res");
    var wx_dir = path.resolve("weixin");
    var sourcePath = wx_dir + "/resource.json";
    var config = require(sourcePath)

    pack({
        format: config.format,
        out_path: config.out_path,
        package: config.package
    })
    cb()
})

gulp.task('native', (cb) => {

    if (!fs.existsSync("build")) {
        fs.mkdirSync("build");
    }
    //分模块打包
    gulpsequence("buildTsHeads", "buildTsModlue", "buildcompilegamemodule", 'archiver-modules', 'native::copy-res', 'native::copy-dist-to-src', 'native::copy-pulugins-file', 'clean-dist', cb);

    console.log('native 完成');
    //gulpsequence("archiver",'cparchiver', cb);
});

gulp.task('web', (cb) => {

    gulpsequence("buildTsHeads", "web::buildTsModlue", "buildcompilegamemodule", 'web::copy-dist-to-src', "web::copy-pulugins-file", 'clean-dist', cb);
    console.log('完成');
    //gulpsequence("archiver",'cparchiver', cb);
});

gulp.task('weixin', (cb) => {

    gulpsequence("buildTsHeads", "web::buildTsModlue", "buildcompilegamemodule", 'web::copy-dist-to-src', "weixin::build", 'clean-dist', cb);

})
gulp.task("web::watch", function (cb) {
    gulp.watch("tssrc/**/*.ts", ["web"]);
});