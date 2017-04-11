import React, {PropTypes} from 'react';
import d3 from 'd3';
import OuterLabel from './LabelComponent';
import CircleIcon from './CircleIconComponent';
import uuid from 'uuid';

const ArcComponent = (props) => {

    const arc = d3
        .svg
        .arc()
        .innerRadius(props.innerRadius)
        .outerRadius(props.outerRadius)
        .startAngle(props.startAngle)
        .endAngle(props.endAngle);

    const renderOuterLabel = () => {

        let labels = props
            .outerLabelText
            .split(' ');
        return labels.map((s, i) => {
            let transform;
            if (props.outerLabelTransform) {
                transform = props.outerLabelTransform[i];
            } else {
                let [xc,xy] = arc.centroid(),
                    c = Math.sqrt(xc * xc + xy * xy),
                    cx = xc / c * (props.outerRadius + 30),
                    cy =  xy / c * (props.outerRadius + 30);
                    cx= labels.length>1? (cx<0? cx-30:cx+20):cx;
                    cy= i>0? (cy<0? cy+15:cy+15):cy;
                transform = `translate(${cx}, ${cy})`;

            }
            return <OuterLabel
                key={uuid.v4()}
                label={s}
                transform={transform}
                style={props.outerLabelStyle}/>;
        });
    };

    const renderCircleButton = () => {
        let transform;
        if (props.circleIconTransform) {
            transform = props.circleIconTransform;
        } else {
            let [xc,
                    xy] = arc.centroid(),
                c = Math.sqrt(xc * xc + xy * xy),
                yOffset = xy < 0
                    ? 12
                    : -12,
                xOffset = xc < 0
                    ? 12
                    : -12,
                cx = xc / c * (props.outerRadius + xOffset),
                cy = xy / c * (props.outerRadius + yOffset);
            transform = `translate(${cx}, ${cy})`;
        }
        return <CircleIcon
            transform={transform}
            points={props.iconPoints}
            iconFill={props.iconFill}
            circleStyle={props.circleStyle}/>;
    };

    const handleClick = () => {
        if(props.cursor=='pointer') {
           props.onClick(props.data);
        }
    };
     const outerLabelClss= props.outerLabelText? props.outerLabelText.replace(/ /g, '-').toLowerCase():'no-label';

    return (
        <g className={'arc-'+outerLabelClss} onClick={handleClick} style={{
            'cursor': props.cursor
        }}>
            <path d={arc()} style={props.arcStyle}/> {(props.outerLabelText && props.showOuterLabel) && renderOuterLabel()}
            {props.showCircleIconButton && renderCircleButton()}
        </g>
    );
};

ArcComponent.propTypes = {
    data: PropTypes.object.isRequired,
    arcNo: PropTypes.number,
    onClick: PropTypes.func.isRequired,
    innerRadius: PropTypes.number.isRequired,
    outerRadius: PropTypes.number.isRequired,
    startAngle: PropTypes.number.isRequired,
    endAngle: PropTypes.number.isRequired,
    arcStyle: PropTypes.object,
    outerLabelText: PropTypes.string,
    showOuterLabel: PropTypes.bool,
    showCircleIconButton: PropTypes.bool,
    iconFill: PropTypes.string,
    circleStyle: PropTypes.object,
    iconPoints: PropTypes.string,
    outerLabelStyle: PropTypes.object,
    cursor: PropTypes.string,
    circleIconTransform: PropTypes.string,
    outerLabelTransform: PropTypes.array
};

ArcComponent.defaultProps = {
    cursor: 'pointer',
    outerLabelText: '',
    showOuterLabel: true,
    showCircleIconButton: true,
    iconPoints: '10.6747475 13.1612903 8.08888889 10.6451613 6.66666667 12 10.6747475 16 17.33333' +
            '33 9.35483871 15.9111111 8',
    outerLabelStyle: {
        fill: 'black',
        wordBreak: 'break-all'
    }
};

export default ArcComponent;
