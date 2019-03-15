const { ipcRenderer,remote } = require('electron');
const { spawn } = require('child_process');
const {dialog} = remote;

window.remote = {
    process : remote.process,
    openFile : (cb)=>{
        // let win  = ipcRenderer.sendSync('getMainWindow','');
        console.log(dialog.showOpenDialog(remote.getCurrentWindow(),{
            title:'choose file', properties: ['openFile'],
            filters:[
                { name: 'Access', extensions: ['mdb', 'acdb'] }
            ]
        },cb));
    },
    openDirectory: (cb)=>{
        // let win  = ipcRenderer.sendSync('getMainWindow','');
        // console.log(dialog.showSaveDialog(win,{title:'choose directory'},cb));
        console.log(dialog.showOpenDialog(remote.getCurrentWindow(),{title:'choose directory', properties: ['openDirectory']},cb));
    },
    getWindowList: (file,cb)=>{
        let AccessExport = spawn('C:\\Users\\Clake IDE\\source\\repos\\AccessExport\\ConsoleApp3\\bin\\Release\\AccessExport.exe',['-f',file,'--windows']);
        AccessExport.stdout.on('data', (data) => {
            console.log(data.toString());
            cb(JSON.parse(data.toString()));
        });
    }
};