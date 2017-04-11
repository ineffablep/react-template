import React from 'react';
import './PanelComponent.less';

class PanelComponent extends React.Component {
    constructor(props) {
        super(props);
        this.handleClose = this
            .handleClose
            .bind(this);
        this.isUnmount = false;
    }

    componentWillMount() {
        this.state = {
            toggleVisible: this.props.showAlert
        };
         if (this.props.autoClose) {
            setTimeout(() => this.toggleAlert(), this.props.autoCloseAfter);
            this.isUnmount = false;
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({toggleVisible: nextProps.showAlert});
        if (this.props.autoClose) {
            clearTimeout(this.props.autoCloseAfter);
            setTimeout(() => this.toggleAlert(), this.props.autoCloseAfter);
            this.isUnmount = false;
        }
    }

    componentWillUnmount() {
        clearTimeout(this.props.autoCloseAfter);
        this.isUnmount = true;
    }

    toggleAlert() {
        if (!this.isUnmount) {
            this.setState({toggleVisible: false});
            clearTimeout(this.props.autoCloseAfter);
            this.isUnmount = true;
        }
    }

    handleClose() {
        this.toggleAlert();
    }

    renderPanel() {
        return (
            <div className="e2e-panel">
                <div
                    className={'container ' + this.props.classHeader}
                    style={this.props.styleHeader}>
                    <header>
                        <h3
                            className={'e2e-margin-0 ' + this.props.classHeaderText}
                            style={this.props.styleHeaderText}>
                            <i className={this.props.headerIcon}/> {this.props.headerText}</h3>
                    </header>
                </div>
                <div className="container">
                    <button onClick={this.handleClose} aria-label="Close" className="e2e-closebtn">X</button>
                    {this.props.children}
                </div>
            </div>
        );
    }
    render() {
        return this.state.toggleVisible
            ? this.renderPanel()
            : <span className="e2e-panel-default"/>;
    }
}

PanelComponent.propTypes = {
    headerIcon: React.PropTypes.string,
    headerText: React.PropTypes.string,
    classHeader: React.PropTypes.string,
    styleHeader: React.PropTypes.object,
    classHeaderText: React.PropTypes.string,
    styleHeaderText: React.PropTypes.object,
    children: React.PropTypes.node,
    showAlert: React.PropTypes.bool,
    autoClose: React.PropTypes.bool,
    autoCloseAfter: React.PropTypes.number
};

PanelComponent.defaultProps = {
    headerIcon: '',
    headerText: '',
    classHeader: '',
    classHeaderText: '',
    styleHeader: {},
    autoClose: true,
    autoCloseAfter: 7000,
    styleHeaderText: {}
};
export default PanelComponent;