const { app, BrowserWindow, Menu } = require('electron')
const path = require('path')
const express = require('express');

const server = new express();
server.use(express.static('./'));
server.listen(80,()=>{
  console.log('your server is running... at here 80')
})

// 关闭electron提示
process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true'
function createWindow () {   
  // 创建浏览器窗口
  const win = new BrowserWindow({
  width: 460,
  height: 800,
  webPreferences: {
    nodeIntegration: true,
    webSecurity: false
  }
  })
  // 清除缓存的内容
  const clearObj = {
    storages: ['appcache', 'filesystem', 'indexdb', 'localstorage', 'shadercache', 'websql', 'serviceworkers', 'cachestorage'],
  };
  // 菜单模板设置
  let template = [
    {
      label: '设置',
      submenu: [
        {
          label: 'pda模式',
          click: () => {
            win.setSize(460,800)
          }
        },{
          label: '平板竖屏模式',
          click: () => {
            win.setSize(700,800)
          }
        },{
          label: '平板横屏模式',
          click: () => {
            win.setSize(1000,700)
          }
        }
      ]
    },
    {
      label: '帮助',
      submenu: [
        {
          label: '打开控制台',
          accelerator: 'CmdOrCtrl+F12',
          click: () => {
            win.webContents.openDevTools({ mode: 'undocked' })
          }
        },{
          label: '清除缓存',
          accelerator: 'CmdOrCtrl+Shift+Delete',
          click: () => {
              win.webContents.session.clearStorageData(clearObj);
          }
        },{
          label: '刷新本页',
          accelerator: 'CmdOrCtrl+R',
          click: () => {
            win.webContents.reload()
          }
        },{
          label: '返回上一页',
          click: () => {
            win.webContents.goBack()
          }
        }
      ]
    }
  ]
  // 加载菜单
  let m = Menu.buildFromTemplate(template)
  Menu.setApplicationMenu(m)

  console.log(path.join(__dirname, './dist/index.html'))
  // 这里是配置的入口文件，如果需要改变入口文件改这里就可以 为相对路径
  // win.loadFile(path.join(__dirname, './dist/index.html'))
  win.loadURL('http://localhost/dist/index.html')
  // 手动打开开发者工具
  // win.webContents.openDevTools()
 }
 
 // Electron会在初始化完成并且准备好创建浏览器窗口时调用这个方法
 // 部分 API 在 ready 事件触发后才能使用。
 app.whenReady().then(createWindow)
 
 //当所有窗口都被关闭后退出
 app.on('window-all-closed', () => {
 // 在 macOS 上，除非用户用 Cmd + Q 确定地退出，
 // 否则绝大部分应用及其菜单栏会保持激活。
 if (process.platform !== 'darwin') {
     app.quit()
 }
 })
 
 app.on('activate', () => {
 // 在macOS上，当单击dock图标并且没有其他窗口打开时，
 // 通常在应用程序中重新创建一个窗口。
 if (BrowserWindow.getAllWindows().length === 0) {
     createWindow()
 }
 })