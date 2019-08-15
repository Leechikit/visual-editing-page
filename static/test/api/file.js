import fs from 'fs'
import path from 'path'
import map from './map.js'

export function getViewsFile() {
  return map
}

export function getViewsCode(filePath) {
  return new Promise((resolve, reject) => {
    const fullPath = path.join(__static, 'source', filePath)
    if (fs.existsSync(fullPath)) {
      const text = fs.readFileSync(fullPath, 'utf8')
      let parser = new DOMParser()
      let doc = parser.parseFromString(text, 'text/html')
      let template = doc.querySelector('template')
      let script = doc.querySelector('script')
      let style = doc.querySelectorAll('style')
      return resolve({
        template: template ? template.innerHTML : '',
        script: script ? script.innerHTML : '',
        style:
          style && style.length > 0
            ? Array.from(style).map(item => item.innerHTML)
            : ''
      })
    } else {
      reject('没有找到该文件')
    }
  })
}
