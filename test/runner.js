import fsFileTree from 'fs-file-tree';
import fs         from 'fs';


const testFolder   = 'test/specs';

buildTree(fsFileTree.sync(process.cwd() + '/' + testFolder), testFolder);

function buildTree(tree, root) {
    _buildTree(tree, root, '/');
}

function _buildTree(tree, root, path) {
    for(let item in tree) {
        if(tree.hasOwnProperty(item)) {
            let itemStats = fs.lstatSync('./' + root + path + item);

            if(itemStats.isDirectory()) {
                describe(item + '/', () => {
                    _buildTree(tree[item], root, path + item + '/');
                });
            } else if(itemStats.isFile()) {
                describe(item, () => {
                    let file = require('./specs' + path + item);

                    if(typeof file.default === 'function')
                        file.default();
                });
            }
        }
    }
}
