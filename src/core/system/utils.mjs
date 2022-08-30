import { basename } from 'path';
import { sync } from 'globby';

const getFiles = (srcPath) => sync(srcPath);

const getDirs = (srcPath) => sync(srcPath, { onlyDirectories: true })
  .map((dir) => basename(dir));

export default {
  getFiles,
  getDirs,
};
