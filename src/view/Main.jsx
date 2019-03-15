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
    Menu
} from '@clake/react-bootstrap4';
import Storage from "../common/Storage";

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mainAccessFile:'',
            wDbAccessFile:'',
            exportDir:''
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
        console.log(window.winProcess);
    }

    render() {
        return (
            <div className='p-3 h-100'>
                <div className="d-flex flex-column h-100">
                    <div className='mb-2 pl-1'>Access file</div>
                    <div className="input-group input-group-sm">
                        <input type="text" className="form-control" value={this.state.mainAccessFile} placeholder='Choose convert access file'/>
                        <div className="input-group-append">
                            <button className="btn btn-primary" onClick={()=>{
                                window.remote.openFile((file)=>{
                                    if (file) {
                                        this.setState({
                                            mainAccessFile:file[0]
                                        });
                                    }
                                });
                            }}>Choose</button>
                        </div>
                    </div>
                    <div className='mb-2 mt-2 pl-1'>WDatabase Access file</div>
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
                    <div className='mb-2 mt-2 pl-1'>Export directory</div>
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
                    <Card className='mt-2 flex-grow-1 h-100' divider>
                        <div>Export window list</div>
                        <hr/>
                        <Table hover={true} select={true} sm fontSm headerTheme='light' emptyText='not window data'>
                            <Table.Header text='Window Name' field='window_name'/>
                        </Table>
                    </Card>
                </div>
            </div>
        );
    }
}

Main.contextTypes = {
    router: PropTypes.object
};

export default Main;