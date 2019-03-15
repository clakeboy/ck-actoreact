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
    CKModal
} from '@clake/react-bootstrap4';
import Storage from "../common/Storage";

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mainAccessFile:'',
            wDbAccessFile:'',
            exportDir:'',
            windowList:null
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

    render() {
        return (
            <div className='p-3 h-100'>
                <div className="d-flex flex-column h-100">
                    <div>
                        <div className='pl-1 text-primary'>Access file</div>
                        <div className="input-group input-group-sm">
                            <input type="text" className="form-control" value={this.state.mainAccessFile} placeholder='Choose convert access file'/>
                            <div className="input-group-append">
                                <button className="btn btn-primary" onClick={()=>{
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
                                                        this.setState({windowList:data});
                                                    }
                                                    this.modal.close();
                                                });
                                            });
                                        }
                                    });
                                }}>Choose</button>
                            </div>
                        </div>
                        <div className='pl-1 text-primary'>WDatabase Access file</div>
                        <div className="input-group input-group-sm">
                            <input type="text" className="form-control" placeholder='Choose WDatabase Access file' value={this.state.wDbAccessFile}/>
                            <div className="input-group-append">
                                <button className="btn btn-primary" onClick={()=>{
                                    window.remote.openFile((file)=>{
                                        if (file) {
                                            this.setState({
                                                wDbAccessFile:file[0]
                                            });
                                        }
                                    });
                                }}>Choose</button>
                            </div>
                        </div>
                        <div className='pl-1 text-primary'>Export directory</div>
                        <div className="input-group input-group-sm">
                            <input type="text" className="form-control" value={this.state.exportDir} placeholder='Choose export directory'/>
                            <div className="input-group-append">
                                <button className="btn btn-primary" onClick={()=>{
                                    window.remote.openDirectory((dir)=>{
                                        console.log(dir);
                                        if (dir) {
                                            this.setState({
                                                exportDir:dir[0]
                                            });
                                        }
                                    });
                                }}>Choose</button>
                            </div>
                        </div>
                    </div>

                    <div className='flex-grow-1'>
                        <Tabs className='mt-3' sm>
                            <TabsContent id='list' text='Export window list'>
                                <div className='p-3 bg-white'>
                                    <Table hover={true} select={true} sm fontSm headerTheme='light' height='300px' emptyText='not window data' data={this.state.windowList}>
                                        <Table.Header text='Window Name' field='window_name' width='500px'/>
                                    </Table>
                                </div>
                            </TabsContent>
                            <TabsContent id='log' text='Logs'>

                            </TabsContent>
                        </Tabs>
                    </div>
                </div>
                <CKModal header={false} ref={c=>this.modal=c}/>
            </div>
        );
    }
}

Main.contextTypes = {
    router: PropTypes.object
};

export default Main;