// based on http://liginc.co.jp/web/html-css/177611
var packager = require('electron-packager');
var config = require('./package.json');

packager({
    dir: './',
    out: '../dist',
    name: config.name,
    platform: 'darwin',
    arch: 'x64',
    version: '0.37.8',

    'app-bundle-id': 'com.misakit.frontsnapwriter',
    'app-version': config.version,
    'helper-bundle-id': 'com.misakit.fronsnapwriter',
    overwrite: true,
    asar: true,
    prune: true,
    ignore: "node_modules/(electron-packager|electron-prebuilt|\.bin)|release.js",
    'version-string': {
	CompanyName: 'misakit',
	FileDescription: 'Simple DayOne2 writing app always on top',
	OriginalFilename: config.name,
	FileVersion: config.version,
	ProductVersion: config.version,
	ProductName: config.name,
	InternalName: config.name
    }
},function done (err, appPath) {
    if(err) {
	throw new Error(err);
    }
    console.log('Done!!');
});
