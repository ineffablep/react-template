import React, {PropTypes} from 'react';

const CircleComponent = (props) => {
    return (
        <circle className="circle" style={props.style} cx={props.cx} cy={props.cy} r={props.r}>
            {props.children}
        </circle>

    );
};

CircleComponent.propTypes = {
    children: PropTypes.element,
    style: PropTypes.object.isRequired,
    cx: PropTypes.number.isRequired,
    cy: PropTypes.number.isRequired,
    r: PropTypes.number.isRequired
};

export default CircleComponent;