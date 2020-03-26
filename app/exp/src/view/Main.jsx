import React from 'react';
import PropTypes from 'prop-types';
import {GetComponent} from "../common/Funcs";
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
import {
    Window,
    WindowGroup,
    TopMenu,
    WModal
} from '@clake/react-bootstrap4-window';
import windowList from './window/windows';
import Storage from "../common/Storage";
import Fetch from "../common/Fetch";

class Main extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            menu:[],
            loadingMenu:true,
        };
    }

    componentDidMount() {
        this.loadMenu();
    }

    loadMenu() {
        Fetch('/service/login/menu',{},(res)=>{
            if (res) {
                this.setState({
                    menu:res.data,
                    loadingMenu:false
                })
            }
        },(e)=>{
            this.modal.alert(e);
        })
    }

    loginOut() {
        Storage.remove('login_user');
        this.props.setLogin(null,false);
    }

    menuOpen = (field) => {
        this.manage.open(field);
    };

    render() {
        return (
            <Container className='mt-5'>
                <TopMenu top>
                    <div className='ck-top-menu-item'><Icon icon='copyright'/></div>
                    {this.state.loadingMenu?<div>loading...</div>:this.renderMenu()}
                    <div>|</div>
                    <TopMenu.Item text='Preview'>
                        <Menu onClick={this.menuOpen}>
                            {windowList.map((item)=>{
                                return <Menu.Item field={item.name}>{item.title}</Menu.Item>
                            })}
                        </Menu>
                    </TopMenu.Item>
                </TopMenu>
                <h1 className='demo-title'>React Bootstrap v4 Window Demo</h1>
                <WindowGroup ref={c=>this.manage=c}>
                    <Window name='test' marginTop={25} title='Test CTable' width='700px' height='500px' backColor={'#f3f3f4'}>
                        <LoaderComponent loadPath='/test/CTableTest' parent={this} import={GetComponent}/>
                    </Window>
                    {windowList.map((item)=>{
                        return (<Window name={item.name} marginTop={25} title={item.title} width={item.width} height={item.height} backColor={'#f3f3f4'}>
                            <LoaderComponent loadPath={`/window/${item.uname}.jsx`} import={GetComponent}/>
                        </Window>)
                    })}
                </WindowGroup>
                <WModal ref={c=>this.modal = c}/>
            </Container>
        );
    }

    renderMenu() {
        return this.state.menu.map((item)=>{
            return <TopMenu.Item text={item.menu_caption}>
                <Menu onClick={this.menuOpen}>
                    {item.children?.map((childItem)=>{
                        return this.renderMenuItem(childItem);
                    })}
                </Menu>
            </TopMenu.Item>
        })
    }

    renderMenuItem(menu) {
        if (!menu.children) {
            if (menu.split_sw === 1) {
                return <Menu.Item step/>
            } else {
                return <Menu.Item field={menu.form_name}>{menu.menu_caption}</Menu.Item>
            }
        }
        return <Menu.Item field={menu.menu_id} text={menu.menu_caption} child>
            {menu.children.map((item)=>{
                return this.renderMenuItem(item)
            })}
        </Menu.Item>
    }
}

Main.contextTypes = {
    router: PropTypes.object
};

export default Main;