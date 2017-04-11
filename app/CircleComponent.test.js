import React from 'react';
import {shallow} from 'enzyme';

import CircleComponent from './CircleComponent';

describe('<CircleComponent/>', () => {
    let wrapper;

    const props = {
        style: {},
        cx: 1,
        cy: 1,
        r: 1
    };

    beforeEach(() => {
        wrapper = shallow(
            <CircleComponent {...props} />
        );
    });

    it('Component is rendered', () => {
        expect(wrapper.find('circle').length).toBe(1);
    });
});
