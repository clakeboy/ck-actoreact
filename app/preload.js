const { ipcRenderer,remote } = require('electron');
const { spawn } = require('child_process');
const {dialog} = remote;
const path = require('path');
const os = require('os');
const fs = require('fs');
const accesscmd = path.join(__dirname,'accesscmd/AccessExport.exe');
const tmpDir = path.join(os.tmpdir(),'actojs/');

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
        window.remote.clearTmpDir();
        let AccessExport = spawn(accesscmd,['-f',file,'-w',wfile,'-d',tmpDir]);
        AccessExport.stdout.on('data', (data) => {
            cb(data.toString());
        });
        AccessExport.on('close',()=>{
            cb('done',true);
        });
    },
    exportSelected: (file,wfile,exportDir,filter,cb)=>{
        window.remote.clearTmpDir();
        let AccessExport = spawn(accesscmd,['-f',file,'-w',wfile,'-d',tmpDir,'--filter',filter.join(',')]);
        AccessExport.stdout.on('data', (data) => {
            cb(data.toString());
        });
        AccessExport.on('close',()=>{
            cb('done',true);
        });
    },
    clearTmpDir: ()=>{
        let files = [];
        if(fs.existsSync(tmpDir)){
            files = fs.readdirSync(tmpDir);
            files.forEach((file, index) => {
                let curPath = tmpDir + file;
                if(fs.statSync(curPath).isDirectory()){
                    window.remote.clearTmpDir(curPath); //递归删除文件夹
                } else {
                    fs.unlinkSync(curPath); //删除文件
                }
            });
        }
    }
};