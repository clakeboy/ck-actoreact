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
class FTraTruckRate extends React.Component {
    constructor(props) {
        super(props);
        this.id = 'f_tra_truck_rate';
		this.title = 'Truck Rate';
        if (!this.props.width) {
            this.props.width = '652px';
        }
        if (!this.props.height) {
            this.props.height = '361px';
        }        
    }

    componentDidMount() {

    }

    render() {
        return (
            <React.Fragment>
                <Box absolute={true} x={'0px'} y={'0px'} width={'652px'} height={'29px'} borderWidth={'1px'} borderColor={'rgb(195,195,195)'} backColor={'rgb(73,88,105)'}/>
                <Input field={'ID'} size={'xs'} absolute={true} x={'123px'} y={'0px'} width={'88px'} align={'left'} tabIndex={'0'}  />
                <Label sm={true} text={'Trucking ID'} absolute={true} x={'24px'} y={'0px'} width={'92px'} height={'20px'} align={'left'} color={'rgb(255,255,255)'} backColor={'rgb()'}/>
                <Box absolute={true} x={'20px'} y={'89px'} width={'332px'} height={'64px'} borderWidth={'1px'} borderColor={'rgb(195,195,195)'} backColor={'rgb()'}/>
                <Input field={'city'} size={'xs'} absolute={true} x={'104px'} y={'173px'} width={'228px'} align={'left'} tabIndex={'0'}  />
                <Label sm={true} text={'City'} absolute={true} x={'40px'} y={'173px'} width={'56px'} height={'20px'} align={'left'} color={'rgb(0,0,0)'} backColor={'rgb()'}/>
                <TextArea field={'Email'} size={'xs'} absolute={true} x={'104px'} y={'297px'} width={'228px'} height={'20px'} tabIndex={'1'}  />
                <Label sm={true} text={'Email'} absolute={true} x={'40px'} y={'297px'} width={'56px'} height={'20px'} align={'left'} color={'rgb(0,0,0)'} backColor={'rgb()'}/>
                <Input field={'State'} size={'xs'} absolute={true} x={'104px'} y={'201px'} width={'48px'} align={'left'} tabIndex={'2'}  />
                <Label sm={true} text={'State'} absolute={true} x={'40px'} y={'201px'} width={'56px'} height={'20px'} align={'left'} color={'rgb(0,0,0)'} backColor={'rgb()'}/>
                <Input field={'trucker_name'} size={'xs'} absolute={true} x={'167px'} y={'49px'} width={'232px'} align={'left'} tabIndex={'3'}  />
                <Label sm={true} text={'Trucking Company'} absolute={true} x={'40px'} y={'49px'} width={'120px'} height={'20px'} align={'left'} color={'rgb(0,0,0)'} backColor={'rgb()'}/>
                <Box absolute={true} x={'352px'} y={'89px'} width={'280px'} height={'252px'} borderWidth={'1px'} borderColor={'rgb(195,195,195)'} backColor={'rgb()'}/>
                <Input field={'Zip_Code'} size={'xs'} absolute={true} x={'244px'} y={'201px'} width={'88px'} align={'left'} tabIndex={'4'}  />
                <Label sm={true} text={'Zip Code'} absolute={true} x={'172px'} y={'201px'} width={'64px'} height={'20px'} align={'left'} color={'rgb(0,0,0)'} backColor={'rgb()'}/>
                <Input field={'terminal_ramp'} size={'xs'} absolute={true} x={'168px'} y={'109px'} width={'164px'} align={'left'} tabIndex={'5'}  />
                <Label sm={true} text={'Terminal / Ramp'} absolute={true} x={'40px'} y={'109px'} width={'120px'} height={'20px'} align={'left'} color={'rgb(0,0,0)'} backColor={'rgb()'}/>
                <Input field={'Specific_Size'} size={'xs'} absolute={true} x={'500px'} y={'301px'} width={'112px'} align={'left'} tabIndex={'6'}  />
                <Label sm={true} text={'Specific Size'} absolute={true} x={'372px'} y={'301px'} width={'120px'} height={'20px'} align={'left'} color={'rgb(0,0,0)'} backColor={'rgb()'}/>
                <Input field={'Trucking_Rate'} size={'xs'} absolute={true} x={'500px'} y={'109px'} width={'112px'} align={'left'} tabIndex={'7'}  />
                <Label sm={true} text={'Trucking Rate'} absolute={true} x={'372px'} y={'109px'} width={'120px'} height={'20px'} align={'left'} color={'rgb(0,0,0)'} backColor={'rgb()'}/>
                <Input field={'Phone'} size={'xs'} absolute={true} x={'104px'} y={'269px'} width={'228px'} align={'left'} tabIndex={'8'}  />
                <Label sm={true} text={'Phone'} absolute={true} x={'40px'} y={'269px'} width={'56px'} height={'20px'} align={'left'} color={'rgb(0,0,0)'} backColor={'rgb()'}/>
                <Input field={'Additional_Charge'} size={'xs'} absolute={true} x={'500px'} y={'269px'} width={'112px'} align={'left'} tabIndex={'9'}  />
                <Label sm={true} text={'Additional Charge'} absolute={true} x={'372px'} y={'269px'} width={'120px'} height={'20px'} align={'left'} color={'rgb(0,0,0)'} backColor={'rgb()'}/>
                <Input field={'Waiting_time_Hr'} size={'xs'} absolute={true} x={'500px'} y={'237px'} width={'112px'} align={'left'} tabIndex={'10'}  />
                <Label sm={true} text={'Waiting Time HR'} absolute={true} x={'372px'} y={'237px'} width={'120px'} height={'20px'} align={'left'} color={'rgb(0,0,0)'} backColor={'rgb()'}/>
                <Input field={'Live_Free_Hr'} size={'xs'} absolute={true} x={'500px'} y={'205px'} width={'112px'} align={'left'} tabIndex={'11'}  />
                <Label sm={true} text={'Free Hour'} absolute={true} x={'372px'} y={'205px'} width={'120px'} height={'20px'} align={'left'} color={'rgb(0,0,0)'} backColor={'rgb()'}/>
                <Input field={'drop_fee'} size={'xs'} absolute={true} x={'500px'} y={'173px'} width={'112px'} align={'left'} tabIndex={'12'}  />
                <Label sm={true} text={'Drop Fee'} absolute={true} x={'372px'} y={'173px'} width={'120px'} height={'20px'} align={'left'} color={'rgb(0,0,0)'} backColor={'rgb()'}/>
                <Input field={'Fuel_percent'} size={'xs'} absolute={true} x={'500px'} y={'141px'} width={'112px'} align={'left'} tabIndex={'13'}  />
                <Label sm={true} text={'Fuel Percent'} absolute={true} x={'372px'} y={'141px'} width={'120px'} height={'20px'} align={'left'} color={'rgb(0,0,0)'} backColor={'rgb()'}/>
                <Box absolute={true} x={'20px'} y={'153px'} width={'332px'} height={'96px'} borderWidth={'1px'} borderColor={'rgb(195,195,195)'} backColor={'rgb()'}/>
                <Box absolute={true} x={'20px'} y={'249px'} width={'332px'} height={'92px'} borderWidth={'1px'} borderColor={'rgb(195,195,195)'} backColor={'rgb()'}/>
            </React.Fragment>
        );
    }
}

export default FTraTruckRate;
