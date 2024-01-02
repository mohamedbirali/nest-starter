import { GluegunToolbox } from 'gluegun'

module.exports = {
  name: 'dspec',
  alias: ['ds'],

  run: async (toolbox: GluegunToolbox) => {
    const { filesystem, print } = toolbox

    const specFiles = await filesystem.findAsync({
      directories: false,
      files: true,
      recursive: true,
      matching: '*.spec.ts',
    })

    if (specFiles.length > 0)
      for (let i = 0; i < specFiles.length; i++) {
        const element = specFiles[i]
        await filesystem.removeAsync(element)
        print.success(`deleted: ${element}`)
      }

    console.log(
      '============================= \n',
      'number of files deleted: ',
      specFiles.length,
      '\n============================= \n'
    )
  },
}
