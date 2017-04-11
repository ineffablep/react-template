import React from 'react';
import Panel from './PanelComponent';

const AlertComponent = (props) => (
    <Panel
        classHeader={props.class}
        styleHeaderText={props.style}
        showAlert={props.showAlert}
        autoClose={props.autoClose}
        autoCloseAfter={props.autoCloseAfter}
        headerText={props.headerText}>
        <div className={props.class} style={props.style}>
            {props.children}
        </div>
    </Panel>
);

AlertComponent.propTypes = {
    headerText: React.PropTypes.string,
    class: React.PropTypes.string,
    style: React.PropTypes.object,
    children: React.PropTypes.node,
    showAlert: React.PropTypes.bool,
    autoClose: React.PropTypes.bool,
    autoCloseAfter: React.PropTypes.number

};

AlertComponent.defaultProps = {
    headerText: '',
    class: '',
    style: {},
    autoClose: true,
    autoCloseAfter: 7000
};

export default AlertComponent;