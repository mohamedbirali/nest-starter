
import { GluegunToolbox } from 'gluegun'


module.exports = {
  name: 'index',
  alias: ['idx'],

  run: async (toolbox: GluegunToolbox) => {
    const { filesystem, print } = toolbox;

    const files = await filesystem.listAsync(".");

    for (let i = 0; i < files.length; i++)
    {
      if (filesystem.isDirectory(files[i]))
      {
        const subFiles = await filesystem.listAsync(`./${files[i]}`);
        let subFilesExports = "";
        for (let j = 0; j < subFiles.length; j++)
        {
          if (filesystem.isFile(`${files[i]}/${subFiles[j]}`)) subFilesExports += `export * from './${subFiles[j].slice(0, subFiles[j].length - 3)}';\n`;
        }
        filesystem.writeAsync(`./${files[i]}/index.ts`, subFilesExports);
      }
    }

    filesystem.writeAsync("public-api.ts", files.map((fName) => {
      return filesystem.isDirectory(`./${fName}`) ? `export * from './${fName}';\n` : "";
    }).join(''));

    filesystem.writeAsync('../index.ts', "export * from './lib/public-api';");

    print.warning(files.map((fName) => {
      return filesystem.isDirectory(`./${fName}`) ? `export * from './${fName}';\n` : "";
    }).join(''));

    print.success("created");
  },
}
