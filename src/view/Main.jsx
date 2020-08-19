import React from 'react';
import PropTypes from 'prop-types';
import ReactBootstrap4,{
    Container,
    Input,
    Button,
    Checkbox,
    Table,
    Pagination,
    Dropdown,
    Select,
    Calendar,
    TextArea,
    Switch,
    Label,
    TabsContent,
    Tabs,
    Icon,
    Card,
    LoaderComponent,
    Menu,
    Modal,
    ButtonGroup
} from '@clake/react-bootstrap4';
import Storage from "../common/Storage";
import {GetComponent} from "../common/Funcs";
class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mainAccessFile:'',
            wDbAccessFile:'',
            exportDir:'',
            currentTab:'list',
            windowList:null,
            running:false,
            output:[]
        };
    }

    componentDidMount() {
        // const {remote} = require('electron');
        // const {Menu, MenuItem} = remote;
        //
        // const menu = new Menu();
        // menu.append(new MenuItem({label: 'MenuItem1', click() { console.log('item 1 clicked') }}));
        // menu.append(new MenuItem({type: 'separator'}));
        // menu.append(new MenuItem({label: 'MenuItem2', type: 'checkbox', checked: true}));
        //
        // window.addEventListener('contextmenu', (e) => {
        //     e.preventDefault();
        //     menu.popup({window: remote.getCurrentWindow()})
        // }, false)
    }

    exportAll = () => {
        if (!this.check()) {
            return;
        }
        this.setState({
            currentTab:'log',
            output:[<span className='text-danger'>Start converting</span>],
            running:true
        },()=>{
            window.remote.exportAccess(
                this.state.mainAccessFile,
                this.state.wDbAccessFile,
                this.state.exportDir,
                (msg,done)=>{
                    if (done) {
                        this.pushLog(<span className='text-success'>{msg}</span>);
                        this.done();
                    } else {
                        this.pushLog(msg);
                    }
                }
            )
        });
    };

    exportSelection = ()=>{
        if (!this.check()) {
            return;
        }
        let filterList = [];
        let rows = this.selectTable.getSelectRows();
        if (rows.length <= 0) {
            this.modal.alert({
                header:false,
                content:'Please select some window to convert'
            });
            return false;
        }
        rows.forEach((row)=>{
            filterList.push(row.window_name);
        });
        this.setState({
            currentTab:'log',
            output:[<span className='text-danger'>Start converting</span>],
            running:true
        },()=>{
            window.remote.exportSelected(
                this.state.mainAccessFile,
                this.state.wDbAccessFile,
                this.state.exportDir,
                false,
                filterList,
                (msg,done)=>{
                    if (done) {
                        this.pushLog(<span className='text-success'>{msg}</span>);
                        this.done();
                    } else {
                        this.pushLog(msg);
                    }
                }
            )
        });
    };

    exportSelectionPreview = ()=>{
        if (!this.check()) {
            return;
        }
        let filterList = [];
        let rows = this.selectTable.getSelectRows();
        if (rows.length <= 0) {
            this.modal.alert({
                header:false,
                content:'Please select some window to convert'
            });
            return false;
        }
        rows.forEach((row)=>{
            filterList.push(row.window_name);
        });
        this.setState({
            currentTab:'log',
            output:[<span className='text-danger'>Start converting to preview</span>],
            running:true
        },()=>{
            window.remote.exportSelected(
                this.state.mainAccessFile,
                this.state.wDbAccessFile,
                this.state.exportDir,
                true,
                filterList,
                (msg,done)=>{
                    if (done) {
                        this.pushLog(<span className='text-success'>{msg}</span>);
                        this.done();
                    } else {
                        this.pushLog(msg);
                    }
                }
            )
        });
    };

    clearPreviewDir = () => {
        this.modal.loading('cleaning preview directory...');
        window.remote.clearPreviewDir();
        this.modal.alert('clean preview done');
    };

    convertDemoDatabase = ()=>{
        this.setState({
            currentTab:'log',
            output:[<span className='text-danger'>Start converting demo database to preview</span>],
            running:true
        },()=>{
            window.remote.convertDB2SQLite(
                this.state.mainAccessFile,
                (msg,done)=>{
                    if (done) {
                        this.pushLog(<span className='text-success'>{msg}</span>);
                        this.done();
                    } else {
                        this.pushLog(msg);
                    }
                }
            )
        });
    };

    convertMysqlDatabase = ()=>{
        if (this.state.mainAccessFile.trim() === '') {
            this.modal.alert({
                header:false,
                content:'Please choose convert access file'
            });
            return false;
        }
        this.modal.view({
            title: 'Connect mysql',
            width: '400px',
            content: <LoaderComponent loadPath='/db/MysqlHost' import={GetComponent} callback={(res,cancel) => {
                this.modal.close();
                if (cancel) {
                    return;
                }
                this.setState({
                    currentTab:'log',
                    output:[
                        <span className='text-danger'>Start converting access database to mysql</span>,
                        <span className='text-danger'>Host: {res.host}:{res.port}</span>,
                        <span className='text-danger'>Database: {res.db_name}</span>
                    ],
                    running:true
                },()=>{
                    window.remote.convertDB2Mysql(
                        this.state.mainAccessFile,
                        res.host,res.port,res.user,res.passwd,res.db_name,
                        (msg,done)=>{
                            if (done) {
                                this.pushLog(<span className='text-success'>{msg}</span>);
                                this.done();
                            } else {
                                this.pushLog(msg);
                            }
                        }
                    )
                });
            }}/>
        })
    };

    done() {
        this.setState({running:false});
    }

    check() {
        if (this.state.mainAccessFile.trim() === '') {
            this.modal.alert({
                header:false,
                content:'Please choose convert access file'
            });
            return false;
        }

        if (this.state.wDbAccessFile.trim() === '') {
            this.modal.alert({
                header:false,
                content:'Please choose wdatabase access file'
            });
            return false;
        }

        if (this.state.exportDir.trim() === '') {
            this.modal.alert({
                header:false,
                content:'Please choose export to directory'
            });
            return false;
        }

        if (this.state.mainAccessFile === this.state.wDbAccessFile) {
            this.modal.alert({
                header:false,
                content:'Convert access file and wdata access file must be different'
            });
            return false;
        }
        return true;
    }

    pushLog(msg) {
        let output = this.state.output;
        output.push(msg);
        this.setState({
            output:output
        },()=>{
            this.log.scrollTop = this.log.scrollHeight - 300;
        })
    }

    render() {
        return (
            <div className='p-3 h-100'>
                <div className="d-flex flex-column h-100">
                    <div>
                        <div className="row">
                            <div className="col-8">
                                <div className='pl-1 text-primary c-label'>Access file</div>
                                <div className="input-group input-group-sm mb-1">
                                    <input type="text" className="form-control" value={this.state.mainAccessFile} placeholder='Choose convert access file'/>
                                    <div className="input-group-append">
                                        <Button disabled={this.state.running} theme='secondary' onClick={()=>{
                                            window.remote.openFile((file)=>{
                                                if (file) {
                                                    this.setState({
                                                        mainAccessFile:file[0]
                                                    },()=>{
                                                        this.modal.loading({
                                                            header:false,
                                                            content:'load window list'
                                                        });
                                                        window.remote.getWindowList(this.state.mainAccessFile,(data)=>{
                                                            if (data instanceof Array) {
                                                                this.setState({
                                                                    windowList:data,
                                                                    currentTab:'list'
                                                                });

                                                                this.modal.close();
                                                            } else {
                                                                this.modal.alert(data);
                                                            }
                                                        });
                                                    });
                                                }
                                            });
                                        }}>Choose</Button>
                                    </div>
                                </div>
                                <div className='pl-1 text-primary c-label'>WDatabase Access file</div>
                                <div className="input-group input-group-sm mb-1">
                                    <input type="text" className="form-control" placeholder='Choose WDatabase Access file' value={this.state.wDbAccessFile}/>
                                    <div className="input-group-append">
                                        <Button disabled={this.state.running} theme='secondary' onClick={()=>{
                                            window.remote.openFile((file)=>{
                                                if (file) {
                                                    this.setState({
                                                        wDbAccessFile:file[0]
                                                    });
                                                }
                                            });
                                        }}>Choose</Button>
                                    </div>
                                </div>
                                <div className='pl-1 text-primary c-label'>Export directory</div>
                                <div className="input-group input-group-sm mb-2">
                                    <input type="text" className="form-control" value={this.state.exportDir} placeholder='Choose export directory'/>
                                    <div className="input-group-append">
                                        <Button disabled={this.state.running} theme='secondary' onClick={()=>{
                                            window.remote.openDirectory((dir)=>{
                                                if (dir) {
                                                    this.setState({
                                                        exportDir:dir[0]
                                                    });
                                                }
                                            });
                                        }}>Choose</Button>
                                    </div>
                                </div>
                            </div>
                            <div className='col'>
                                <div className='h-100 p-2 bg-white rounded border'>
                                    <div className='mb-1'>
                                        <Button className='mr-1' onClick={()=>{
                                            window.remote.openPreview();
                                        }} size='sm'>Preview</Button>
                                        <Button size='sm' theme='danger' icon='trash-alt' outline onClick={this.clearPreviewDir}>Clear Preview</Button>
                                    </div>
                                    <div className='mb-1'>
                                        <Button onClick={this.convertDemoDatabase} size='sm' theme='success'>Convert demo sqlite db</Button>
                                    </div>
                                    <div>
                                        <Button onClick={this.convertMysqlDatabase} size='sm'>Convert to mysql db</Button>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                    <div className='flex-grow-1'>
                        <Tabs showTab={this.state.currentTab} sm>
                            <TabsContent id='list' text='Export window list' disabled={this.state.running}>
                                <div className='p-3 bg-white'>
                                    <div className='mb-1'>
                                        <ButtonGroup>
                                        <Button disabled={this.state.running} size='sm' onClick={this.exportSelection}>Convert selected</Button>
                                        <Button disabled={this.state.running} size='sm' theme='success' outline onClick={this.exportSelectionPreview}>Preview selected</Button>
                                        </ButtonGroup>
                                        <Button disabled={this.state.running} className='float-right' size='sm' outline onClick={this.exportAll}>Convert all</Button>
                                    </div>
                                    <Table ref={c=>this.selectTable=c} hover={true} select={true} sm fontSm headerTheme='light' height='270px' emptyText='not window data' data={this.state.windowList}>
                                        <Table.Header text='Window Name' field='window_name'/>
                                    </Table>
                                </div>
                            </TabsContent>
                            <TabsContent id='log' text='Logs'>
                                <div className='p-3 bg-white'>
                                    <div ref={c=>this.log=c} className="logs p-2 text-white bg-dark rounded" style={{height:'300px'}}>
                                        {this.state.output.map((item)=>{
                                            return <div>{item}</div>
                                        })}
                                    </div>
                                </div>
                            </TabsContent>
                        </Tabs>
                    </div>
                </div>
                <Modal header={false} ref={c=>this.modal=c}/>
            </div>
        );
    }
}

Main.contextTypes = {
    router: PropTypes.object
};

export default Main;