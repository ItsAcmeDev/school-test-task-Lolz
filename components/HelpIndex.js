const fs = require('fs');
const path = require('path');
const {readdirSync} = require("fs");

function flatten(lists) {
    return lists.reduce((a, b) => a.concat(b), []);
}

function getDirectories(srcpath) {
    return fs.readdirSync(srcpath)
        .map(file => path.join(srcpath, file))
        .filter(path => fs.statSync(path).isDirectory());
}

function getDirectoriesRecursive(srcpath) {
    return [srcpath, ...flatten(getDirectories(srcpath).map(getDirectoriesRecursive))];
}

const e = {};

let countPackageAdmin = 0;

let countPackageUser = 0;

for(const directory of getDirectoriesRecursive(__dirname + '/User')) {
    for (const file of readdirSync(directory)) {
        const newFile = require(directory + `/${file}`);
        e[newFile.callBack] = newFile;
        countPackageUser += 1;
    }
}


module.exports = e;
module.exports.packageCount = {admin: countPackageAdmin, user: countPackageUser}