import React from 'react';
import {shallow} from 'enzyme';

import CircleIconComponent from './CircleIconComponent';

describe('<CircleIconComponent/>', () => {
    let wrapper;
    const props ={
        iconFill: '',
        circleStyle: {}
    };
    beforeEach(() => {
        wrapper = shallow(
            <CircleIconComponent  {...props} />
        );
    });
    it('Component is rendered', () => {
        expect(wrapper.find('g').length).toBe(1);
    });
});