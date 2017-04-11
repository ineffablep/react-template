import React, {PropTypes} from 'react';
import Circle from './CircleComponent';
import Polygon from './PolygonComponent';
const CircleIconComponent = (props) => {
    return (
        <g className="circle-icon" transform={props.transform}>
            <Circle
                className="circle-icon-circle"
                style={props.circleStyle}
                cx={props.cx}
                cy={props.cy}
                r={props.r}/>
            <Polygon
                className="circle-icon-polygon"
                style={{
                fill: props.iconFill
            }}
                points={props.points}/>
        </g>
    );
};

CircleIconComponent.propTypes = {
    transform: PropTypes.string,
    points: PropTypes.string,
    cx: PropTypes.number,
    cy: PropTypes.number,
    r: PropTypes.number,
    iconFill: PropTypes.string.isRequired,
    circleStyle: PropTypes.object.isRequired
};

CircleIconComponent.defaultProps = {
    transform: '',
    points: '10.6747475 13.1612903 8.08888889 10.6451613 6.66666667 12 10.6747475 16 17.3333333 9.35483871 15.9111111 8',
    cx: 12,
    cy: 12,
    r: 12
};

export default CircleIconComponent;