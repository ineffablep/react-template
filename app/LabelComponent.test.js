import React from 'react';
import {shallow} from 'enzyme';

import LabelComponent from './LabelComponent';

describe('<LabelComponent/>', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(
            <LabelComponent />
        );
    });

    it('Component is rendered', () => {
        expect(wrapper.find('text').length).toBe(1);
    });
});