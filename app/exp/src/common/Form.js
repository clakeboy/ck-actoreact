import React from 'react';

import PropTypes from 'prop-types';
import ReactBootstrap4,{
    Input,
    CCheckbox,
    Dropdown,
    Select,
    TextArea,
    Switch,
} from '@clake/react-bootstrap4';
import {
    CTable,
} from '@clake/react-bootstrap4-window';

class Form extends React.PureComponent {
    constructor(props) {
        super(props);
        this.vals = {};
        this.components = {};
        this.events = {};
        this.newColumn = {};
        this.loadTables = [];
    }

    componentDidMount() {

    }

    getValues()  {
        return this.vals;
    }

    getNew() {
        return Object.assign({},this.newColumn);
    }

    setValue(field,val) {
        this.vals[field] = val;
        if (this.components[field]) {
            console.log(this.components.current);
            // this.components[field].setValue(val);
        }
    }

    setValues(vals) {
        this.vals = Object.assign(this.vals,vals);
        map(vals,(item,key)=>{
            if (this.components[key]) {
                console.log(this.components);
                // this.components[key].setValue(item);
            }
        });
    }

    inputChangeHandler(field) {
        return (val)=>{
            this.vals[field] = val;
            if (typeof this.props.onChange === 'function') {
                this.props.onChange(field,val);
            }
            if (typeof this.events[field] === 'function') {
                this.events[field](val);
            }
        };
    };

    comboChangeHandler(field,searchField) {
        return (val,row)=>{
            this.vals[field] = {text:val,value:row};
            if (typeof this.props.onChange === 'function') {
                this.props.onChange(field,val,row,'combo',searchField);
            }
            if (typeof this.events[field] === 'function') {
                this.events[field](val,row);
            }
        };
    };

    selectChangeHandler(field) {
        return (e)=>{
            this.vals[field] = e.target.value;
            if (typeof this.props.onChange === 'function') {
                this.props.onChange(field,e.target.value);
            }
            if (typeof this.events[field] === 'function') {
                this.events[field](e);
            }
        };
    };

    dropdownChangeHandler(field) {
        return (text,val)=>{
            this.vals[field] = text;
            if (typeof this.props.onChange === 'function') {
                this.props.onChange(field,text,val);
            }
            if (typeof this.events[field] === 'function') {
                this.events[field](text,val);
            }
        }
    }

    checkChangeHandler(field) {
        return (checkd)=>{
            this.vals[field] = checkd;
            if (typeof this.props.onChange === 'function') {
                this.props.onChange(field,checkd);
            }
            if (typeof this.events[field] === 'function') {
                this.events[field](checkd);
            }
        };
    };

    switchChangeHandler(field) {
        return (checked)=>{
            this.vals[field] = checked;
            if (typeof this.props.onChange === 'function') {
                this.props.onChange(field,checked);
            }
            if (typeof this.events[field] === 'function') {
                this.events[field](checked);
            }
        };
    }

    refComponent(field) {
        return (c)=>{
            this.components[field] = c;
            console.log(this.components);
        }
    }

    bindingComponent(item) {
        if (typeof item !== 'object') {
            return;
        }
        if (typeof item.props.children === 'object') {
            React.Children.map(item.props.children,(child_item)=>{
                this.bindingComponent(child_item);
            });
        } else {
            let field;
            if (typeof item.props.field === 'string') {
                field = item.props.field;
            } else if (typeof item.props.field === 'object') {
                field = item.props.field.key;
            } else {
                return;
            }
            if (item.type === Input) {
                if (typeof item.props.onChange === 'function') {
                    this.events[field] = item.props.onChange;
                }

                item.props.ref = this.refComponent(field);
                if (item.props.combo) {
                    item.props.onChange = this.comboChangeHandler(field,item.props.field.text_key);
                    this.newColumn[field] = {text:'',value:'',text_key:item.props.field.text_key};
                    return;
                } else {
                    item.props.onChange = this.inputChangeHandler(field);
                }
                // this.components[field] = React.createRef();
                // item.props.ref = this.components[field];

            } else if (item.type === Select) {
                if (typeof item.props.onSelect === 'function') {
                    this.events[field] = item.props.onSelect;
                }
                item.props.onSelect = this.selectChangeHandler(field);
                // item.props.ref = this.refComponent(field);
            } else if (item.type === CCheckbox) {
                if (typeof item.props.onChange === 'function') {
                    this.events[field] = item.props.onChange;
                }
                item.props.onChange = this.checkChangeHandler(field);
                // item.props.ref = this.refComponent(field);
            } else if (item.type === TextArea) {
                if (typeof item.props.onChange === 'function') {
                    this.events[field] = item.props.onChange;
                }
                item.props.onChange = this.inputChangeHandler(field);
                // item.props.ref = this.refComponent(field);
            } else if (item.type === Dropdown) {
                if (typeof item.props.onChange === 'function') {
                    this.events[field] = item.props.onChange;
                }
                item.props.onChange = this.dropdownChangeHandler(field);
            } else if (item.type === Switch) {
                if (typeof item.props.onChange === 'function') {
                    this.events[field] = item.props.onChange;
                }
                item.props.onChange = this.switchChangeHandler(field);
            } else if (item.type === CTable) {
                this.loadTables.push({
                    source:item.source,

                })
            } else {
                return;
            }
            this.newColumn[field] = '';
        }
    }

    render() {
        return (
            <React.Fragment>
                {React.Children.map(this.props.children,(item)=>{
                    this.bindingComponent(item);
                    return item;
                })}
            </React.Fragment>
        );
    }
}

Form.propTypes = {
    onChange: PropTypes.func,
};

Form.defaultProps = {

};

export default Form;