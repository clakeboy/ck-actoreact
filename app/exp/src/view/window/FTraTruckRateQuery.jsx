import React from 'react';
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
    Box
} from '@clake/react-bootstrap4';
import {
    CTable
} from '@clake/react-bootstrap4-window';
class FTraTruckRateQuery extends React.Component {
    constructor(props) {
        super(props);
        this.id = 'f_tra_truck_rate_query';
		this.title = 'Query Truck Rate';
        if (!this.props.width) {
            this.props.width = '1001px';
        }
        if (!this.props.height) {
            this.props.height = '560px';
        }        
    }

    componentDidMount() {

    }

    render() {
        return (
            <React.Fragment>
                <Box absolute={true} x={'0px'} y={'0px'} width={'1000px'} height={'28px'} borderWidth={'1px'} borderColor={'rgb(195,195,195)'} backColor={'rgb(83,112,128)'}/>
                <CTable absolute={true} x={'12px'} y={'92px'} width={'979px'} height={'464px'} scroll={true} headerTheme={'light'} hover={true} select={true} sm={true} fontSm={true}>
                    <Table.Header text={'Seq No.'} field={'ID'} width={'52px'}/>
                    <Table.Header text={'Trucking Company'} field={'trucker_short_name'} width={'124px'}/>
                    <Table.Header text={'From Terminal / Ramp'} field={'terminal_ramp'} width={'176px'}/>
                    <Table.Header text={'to  City'} field={'city'} width={'96px'}/>
                    <Table.Header text={'State'} field={'state'} width={'52px'}/>
                    <Table.Header text={'Zip Code'} field={'zip_code'} width={'60px'}/>
                    <Table.Header text={'Truck Rate'} field={'Trucking_Rate'} width={'84px'}/>
                    <Table.Header text={'Fuel %'} field={'Fuel_percent'} width={'60px'}/>
                    <Table.Header text={'Drop Fee'} field={'drop_fee'} width={'76px'}/>
                    <Table.Header text={'Free HR'} field={'Live_Free_Hr'} width={'60px'}/>
                    <Table.Header text={'Wait Rate'} field={'Waiting_time_Hr'} width={'60px'}/>
                    <Table.Header text={'Extra Fee'} field={'Additional_Charge'} width={'92px'}/>
                    <Table.Header text={'Specific Size'} field={'Specific_Size'} width={'100px'}/>
                    <Table.Header text={'Phone'} field={'Phone'} width={'124px'}/>
                    <Table.Header text={'Email'} field={'Email'} width={'212px'}/>
                </CTable>
                <Input field={'trucking_company_name'} size={'xs'} absolute={true} x={'124px'} y={'60px'} width={'152px'} align={'left'} tabIndex={'1'}  />
                <Label sm={true} text={'Trucking Co.'} absolute={true} x={'12px'} y={'60px'} width={'104px'} height={'20px'} align={'left'} color={'rgb(0,0,0)'} backColor={'rgb()'}/>
                <Input field={'terminal_ramp'} size={'xs'} absolute={true} x={'124px'} y={'36px'} width={'152px'} align={'left'} tabIndex={'2'}  />
                <Label sm={true} text={'Terminal / Ramp'} absolute={true} x={'12px'} y={'36px'} width={'104px'} height={'20px'} align={'left'} color={'rgb(0,0,0)'} backColor={'rgb()'}/>
                <Input field={'city'} size={'xs'} absolute={true} x={'348px'} y={'36px'} width={'96px'} align={'left'} tabIndex={'3'}  />
                <Label sm={true} text={'City'} absolute={true} x={'292px'} y={'36px'} width={'48px'} height={'20px'} align={'left'} color={'rgb(0,0,0)'} backColor={'rgb()'}/>
                <Input field={'state'} size={'xs'} absolute={true} x={'348px'} y={'60px'} width={'96px'} align={'left'} tabIndex={'4'}  />
                <Label sm={true} text={'State'} absolute={true} x={'292px'} y={'60px'} width={'48px'} height={'20px'} align={'left'} color={'rgb(0,0,0)'} backColor={'rgb()'}/>
                <Button size={'xs'} absolute={true} x={'8px'} y={'2px'} width={'52px'} height={'24px'}>Query</Button>
                <Button size={'xs'} absolute={true} x={'60px'} y={'2px'} width={'52px'} height={'24px'}>Clear</Button>
                <Input field={'zip_code'} size={'xs'} absolute={true} x={'532px'} y={'36px'} width={'60px'} align={'left'} tabIndex={'7'}  />
                <Label sm={true} text={'ZIP Code'} absolute={true} x={'460px'} y={'36px'} width={'64px'} height={'20px'} align={'left'} color={'rgb(0,0,0)'} backColor={'rgb()'}/>
            </React.Fragment>
        );
    }
}

export default FTraTruckRateQuery;
