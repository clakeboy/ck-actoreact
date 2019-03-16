const { ipcRenderer,remote } = require('electron');
const { spawn } = require('child_process');
const {dialog} = remote;
const path = require('path');
const accesscmd = path.join(__dirname,'accesscmd/AccessExport.exe');
window.remote = {
    process : remote.process,
    openFile : (cb)=>{
        // let win  = ipcRenderer.sendSync('getMainWindow','');
        console.log(dialog.showOpenDialog(remote.getCurrentWindow(),{
            title:'Choose file', properties: ['openFile'],
            filters:[
                { name: 'Access', extensions: ['mdb', 'acdb'] }
            ]
        },cb));
    },
    openDirectory: (cb)=>{
        // let win  = ipcRenderer.sendSync('getMainWindow','');
        // console.log(dialog.showSaveDialog(win,{title:'choose directory'},cb));
        console.log(dialog.showOpenDialog(remote.getCurrentWindow(),{title:'Choose directory', properties: ['openDirectory']},cb));
    },
    getWindowList: (file,cb)=>{
        let AccessExport = spawn(accesscmd,['-f',file,'--windows']);
        AccessExport.stdout.on('data', (data) => {
            try {
                let window_list = JSON.parse(data.toString());
                cb(window_list);
            } catch(e) {
                cb(`${e.toString()}:${data.toString()}`);
            }
        });
    },
    exportAccess: (file,wfile,exportDir,cb)=>{
        let AccessExport = spawn(accesscmd,['-f',file,'-w',wfile,'-d',exportDir]);
        AccessExport.stdout.on('data', (data) => {
            cb(data.toString());
        });
        AccessExport.on('close',()=>{
            cb('done',true);
        });
    },
    exportSelected: (file,wfile,exportDir,filter,cb)=>{
        let AccessExport = spawn(accesscmd,['-f',file,'-w',wfile,'-d',exportDir,'--filter',filter.join(',')]);
        AccessExport.stdout.on('data', (data) => {
            cb(data.toString());
        });
        AccessExport.on('close',()=>{
            cb('done',true);
        });
    }
};