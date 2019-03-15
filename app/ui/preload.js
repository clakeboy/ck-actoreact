const { ipcRenderer,remote } = require('electron');
const {dialog} = remote;

window.remote = {
    process : remote.process,
    openFile : (cb)=>{
        // let win  = ipcRenderer.sendSync('getMainWindow','');
        console.log(dialog.showOpenDialog(remote.getCurrentWindow(),{title:'choose file', properties: ['openFile'] },cb));
    },
    openDirectory: (cb)=>{
        // let win  = ipcRenderer.sendSync('getMainWindow','');
        // console.log(dialog.showSaveDialog(win,{title:'choose directory'},cb));
        console.log(dialog.showOpenDialog(remote.getCurrentWindow(),{title:'choose directory', properties: ['openDirectory']},cb));
    }
};