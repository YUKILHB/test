const fs = require('fs')
const path = require('path')
const outPut = path.join(__dirname, '../packages/index.js')
const packagesPath = '../packages';
let render = require('json-templater/string')
let endOfLine = require('os').EOL
const pathResolve = (route) => {
  return path.resolve(__dirname, route)
}
let importText = [];
let exportText = []
const IMPORT_TEMPLATE = `import {{name}} from './{{name}}';`
const EXPORT_TEMPLATE = `export { {{name}} };`
let MAIN_TEMPLATE = `{{input}}

{{output}}
`

const judgeDirectory = (file) => {
  return new Promise((resolve, reject) => {
    fs.stat(pathResolve(`${packagesPath}/${file}`), (err, stats) => {
      if (stats && stats.isDirectory()) {
        resolve({
          is_directory: file
        })
      } else {
        resolve({
          is_not_directory: file
        })
      }
    });
  })
}

const getComponent = () => {
  return new Promise((resolve, reject) => {
    fs.readdir(pathResolve(packagesPath), (err, files) => {
      resolve(files);
    })
  })
}

// 获取所有组件名称
getComponent().then(res => {
  const components = res;

  const componentNameArr = components.map(c => {
    return judgeDirectory(c);
  });

  Promise.all(componentNameArr).then(result => {
    result.forEach(component => {
      if (component.is_directory) {
        importText.push(render(IMPORT_TEMPLATE, {
          name: `${uppercase(component.is_directory)}`
        }))
        exportText.push(render(EXPORT_TEMPLATE, {
          name: `${uppercase(component.is_directory)}`
        }))
      }
    })
    console.log(importText)

    let template = render(MAIN_TEMPLATE, {
      input: importText.join(endOfLine),
      output: exportText.join(endOfLine)
    })
    
    fs.writeFileSync(outPut, template)
  }).catch(err => {
    console.log(`读取入口出错了:${err}`)
  })
}).catch(err => {
  console.log(`编译入口出错了:${err}`)
})

function uppercase (val) {
  let arr = val.split('')
  arr[0] = arr[0].toUpperCase()
  return arr.join('')
}
