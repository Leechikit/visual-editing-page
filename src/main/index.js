import { app, BrowserWindow } from 'electron'
const path = require('path')

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

const testConfig = require('../../static/test/webpack.test.config')
// const webpack = require('webpack')
// const WebpackDevServer = require('webpack-dev-server')
// const webpackHotMiddleware = require('webpack-hot-middleware')
// let hotMiddleware

let mainWindow
let testWindow
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`

const winTestURL = `http://localhost:9081`

function createWindow () {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    height: 563,
    useContentSize: true,
    width: 1000
  })

  mainWindow.loadURL(winURL)

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

function createTestWindow () {
  /**
   * Initial window options
   */
  testWindow = new BrowserWindow({
    height: 563,
    useContentSize: true,
    width: 1000
  })

  testWindow.loadURL(winTestURL)

  testWindow.on('closed', () => {
    testWindow = null
  })
}

// function startTest() {
//   return new Promise((resolve, reject) => {
//     testConfig.entry.renderer = [path.join(__dirname, 'dev-client')].concat(
//       testConfig.entry.renderer
//     )
//     testConfig.mode = 'development'
//     const compiler = webpack(testConfig)
//     hotMiddleware = webpackHotMiddleware(compiler, {
//       log: false,
//       heartbeat: 2500
//     })

//     compiler.hooks.compilation.tap('compilation', compilation => {
//       compilation.hooks.htmlWebpackPluginAfterEmit.tapAsync(
//         'html-webpack-plugin-after-emit',
//         (data, cb) => {
//           hotMiddleware.publish({ action: 'reload' })
//           cb()
//         }
//       )
//     })

//     compiler.hooks.done.tap('done', stats => {
//       logStats('RendererTest', stats)
//     })
//     const server = new WebpackDevServer(compiler, {
//       contentBase: path.join(__dirname, '../'),
//       quiet: true,
//       before(app, ctx) {
//         app.use(hotMiddleware)
//         ctx.middleware.waitUntilValid(() => {
//           resolve()
//         })
//       }
//     })

//     server.listen(9081)
//   })
// }

app.on('ready', ()=>{
  createWindow()
  // startTest()
  // createTestWindow()
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
  // if(testWindow === null) {
  //   createTestWindow()
  // }
})

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */
