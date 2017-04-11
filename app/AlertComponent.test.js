import React from 'react';
import {mount} from 'enzyme';

import AlertComponent from './AlertComponent';

describe('<AlertComponent/>', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = mount(
            <AlertComponent/>
        );
    });

    it('Default state of Component is rendered', () => {
        expect(wrapper.find('.e2e-panel-default').length).toBe(1);
    });

});