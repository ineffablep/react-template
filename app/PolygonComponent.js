import React, {PropTypes} from 'react';
const PolygonComponent = (props) => {

    return (
        <polygon className="polygon" style={props.style} points={props.points}>
            {props.children}
        </polygon>
    );
};

PolygonComponent.propTypes = {
    children: PropTypes.element,
    style: PropTypes.object.isRequired,
    points: PropTypes.string.isRequired
};

export default PolygonComponent;