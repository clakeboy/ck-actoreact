import React from 'react';

import classNames from 'classnames/bind';

class MysqlHost extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    getClasses() {
        let base = '';

        return classNames(base,this.props.className);
    }

    render() {
        return (
            <div className={this.getClasses()}>

            </div>
        );
    }
}

export default MysqlHost;