import React, {PropTypes} from 'react';

const LabelComponent = (props) => {
    return (
        <text
            className="label-text"
            transform={props.transform}
            style={props.style}
            textAnchor={props.textAnchor}>
            {props.label}
        </text>

    );
};

LabelComponent.propTypes = {
    transform: PropTypes.string,
    textAnchor: PropTypes.string,
    label: PropTypes.string,
    style: PropTypes.object
};

LabelComponent.defaultProps = {
    textAnchor: 'middle',
    style: { fill:'black',wordBreak: 'break-all'},
    label: '',
    transform: ''
};

export default LabelComponent;