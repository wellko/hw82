import path from "path";

const rootPath = __dirname;
const config = {
    rootPath,
    publicPath: path.join(rootPath, 'public'),
    db: {
        host:'localhost',
        database: 'player'
    }
};

export default config;