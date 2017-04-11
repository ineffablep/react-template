import React from 'react';
import {shallow} from 'enzyme';

import PolygonComponent from './PolygonComponent';

describe('<PolygonComponent/>', () => {
    let wrapper;

    const props = {
        style: {},
        points: ''
    };

    beforeEach(() => {
        wrapper = shallow(
            <PolygonComponent {...props}/>
        );
    });

    it('Component is rendered', () => {
        expect(wrapper.find('polygon').length).toBe(1);
    });
});
