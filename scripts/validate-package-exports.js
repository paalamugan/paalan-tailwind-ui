import path from 'path';

import fs from 'fs-extra';

const validatePackageExport = async (dir, prefix = '') => {
  const dirPath = path.join('.', 'src', dir);
  const dirFolders = await fs.readdir(dirPath);
  const folders = dirFolders.map((folder) => {
    const folderName = folder.replace(/\.ts$/, '');
    if (folderName === 'index') {
      return Promise.resolve();
    }
    const folderPath = path.join(dirPath, folderName);
    const indexFilePath = path.join(folderPath, 'index.ts');
    if (fs.existsSync(indexFilePath)) {
      return Promise.resolve(`export * from './${folderName}';`);
    }
    return fs.writeFile(indexFilePath, `export * from './${folderName}';`).then(() => {
      console.log(`Updated ${dir}/${folderName} exports`);
      return `export * from './${folderName}';`;
    });
  });

  const updatedFolders = await Promise.allSettled(folders);
  const updatedFolderValues = updatedFolders
    .filter((folder) => folder.status === 'fulfilled' && !!folder.value)
    .map((folder) => folder.value);
  if (!updatedFolderValues.length) {
    return;
  }
  await fs.writeFile(path.join(dirPath, 'index.ts'), `${prefix}${updatedFolderValues.join('\n')}\n`);
  console.log(`Updated "${dir}" folder exports`);
};

validatePackageExport('components', `'use client';\n\n`);
validatePackageExport('hooks', `'use client';\n\n`);
validatePackageExport('providers', `'use client';\n\n`);
validatePackageExport('layouts');
