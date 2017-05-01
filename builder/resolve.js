import path from 'path';


export default {
    resolve: {
        alias: {
            Src: path.resolve(process.cwd() + '/src'),
            Lib: path.resolve(process.cwd() + '/lib')
        }
    }
}