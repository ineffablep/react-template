import React from 'react';
import {mount} from 'enzyme';
import sinon from 'sinon';
import OuterLabel from './LabelComponent';
import CircleIcon from './CircleIconComponent';
import ArcComponent from './ArcComponent';

describe('<ArcComponent/>', () => {
    let wrapper;

    const handleClick = sinon.spy();

    const props = {
        data: {},
        //onClick: ()=>{},
        innerRadius: 1,
        outerRadius: 1,
        startAngle: 1,
        endAngle: 1,
        iconFill: '',
        circleStyle: {},
        onClick: handleClick
    };

    beforeEach(() => {
        wrapper = mount(<ArcComponent {...props}/>);
    });

    it('Component is rendered', () => {
        expect(wrapper.find('g').first().length).toBe(1);
    });

    it('Component is rendered sub element path', () => {
        expect(wrapper.find('path').first().length).toBe(1);
    });

    it('should similate click event', () => {
        const g = wrapper
            .find('g')
            .first();
        g.simulate('click', {
            preventDefault: () => {}
        });
        expect(handleClick.calledOnce).toBe(true);
    });
  
    it('renderCircleButton Circle Transform', () => {
        props.circleIconTransform = null;
        props.showCircleIconButton = true;
        wrapper = mount(<ArcComponent {...props}/>);
        expect(wrapper.find(CircleIcon).first().length).toBe(1);
    });

      it('renderCircleButton CircleIconTransform', () => {
        props.circleIconTransform = 'translate(34, -106)';
        props.showCircleIconButton = true;
        wrapper = mount(<ArcComponent {...props}/>);
        expect(wrapper.find(CircleIcon).first().length).toBe(1);
    });

     it('renderOuterLabel', () => {
        props.outerLabelText= 'test 123';
        props.showOuterLabel= true;
        wrapper = mount(<ArcComponent {...props}/>);
        expect(wrapper.find(OuterLabel).first().length).toBe(1);
    });

    it('renderOuterLabel outer label Transform', () => {
        props.outerLabelText= 'test 1234';
        props.showOuterLabel= true;
        props.outerLabelTransform= ['translate(34, -106)'];
        wrapper = mount(<ArcComponent {...props}/>);
        expect(wrapper.find(OuterLabel).first().length).toBe(1);
    });
});
