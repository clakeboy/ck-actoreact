import React from 'react';
import ReactBootstrap4,{
    Input,
    Button,
    ButtonGroup,
    RImage
} from '@clake/react-bootstrap4';
import Storage from "../../common/Storage";

class MssqlHost extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            host:'',
            port:'1433',
            db_name:'',
            user:'sa',
            passwd:'',
        };
    }

    componentDidMount() {
        let data = Storage.get('mssql_host');
        if (data) {
            this.setState(data);
        }
    }

    changeHandler(name) {
        return (val)=>{
            let data = {};
            data[name] = val;
            this.setState(data);
        }
    };

    saveAndConvert = () => {
        Storage.set('mssql_host',this.state);
        this.props.callback(this.state,false);
    };

    cancel = ()=>{
        this.props.callback(null,true);
    };

    render() {
        return (
            <div>
                <div>
                    <RImage src={require('../../img/sqlserver.jpg')}/>
                </div>
                <div className='row no-gutters'>
                    <div className="col-8">
                        <Input size='sm' label='database host' onChange={this.changeHandler('host')} data={this.state.host}/>
                    </div>
                    <div className="col">
                        <Input size='sm' label='database port' onChange={this.changeHandler('port')} data={this.state.port}/>
                    </div>
                </div>
                <Input size='sm' label='database name' onChange={this.changeHandler('db_name')} data={this.state.db_name}/>
                <Input size='sm' label='user' onChange={this.changeHandler('user')} data={this.state.user}/>
                <Input size='sm' label='password' onChange={this.changeHandler('passwd')} data={this.state.passwd}/>
                <div>
                    <ButtonGroup className='w-100'>
                        <Button className='w-100' onClick={this.saveAndConvert}>Begin Convert</Button>
                        <Button className='w-100' onClick={this.cancel} theme='danger' outline>Cancel</Button>
                    </ButtonGroup>

                </div>
            </div>
        );
    }
}

export default MssqlHost;