import React from 'react';
import {shallow, mount} from 'enzyme';
import sinon from 'sinon';

import PanelComponent from './PanelComponent';

describe('<PanelComponent/>', () => {
    let wrapper;

    const props = {
        headerIcon: '',
        headerText: '',
        classHeader: '',
        classHeaderText: '',
        styleHeader: {},
        styleHeaderText: {},
        showAlert: true
    };

    it('should Default state of Component is rendered', () => {
        props.showAlert = false;
        wrapper = shallow(<PanelComponent {...props}/>);
        expect(wrapper.find('.e2e-panel-default').length).toBe(1);
    });

    it('should toggleVisible state of Component is rendered', () => {
        props.showAlert = true;
        wrapper = shallow(<PanelComponent {...props}/>);
        expect(wrapper.find('.e2e-panel').length).toBe(1);
    });

    it('should append HeaderClass Prop', () => {
        props.classHeader = 'e2e-header';
        wrapper = shallow(<PanelComponent {...props}/>);
        expect(wrapper.find('.e2e-header').length).toBe(1);
    });

    it('should append header Style Prop', () => {
        props.styleHeader = {
            color: '#000'
        };
        wrapper = mount(<PanelComponent {...props}/>);
        let style = wrapper
            .html()
            .match(/style="([^"]*)"/i)[1];
        expect(style).toBe("color: rgb(0, 0, 0);");
    });

    it('should append headerIcon Prop', () => {
        props.headerIcon = 'icon-header';
        wrapper = shallow(<PanelComponent {...props}/>);
        expect(wrapper.find('.icon-header').length).toBe(1);
    });

    it('should append headerText Prop', () => {
        props.headerText = 'Test header';
        wrapper = shallow(<PanelComponent {...props}/>);
        expect(wrapper.find('h3').text().trim()).toBe('Test header');
    });

    it('should class container present', () => {
        props.showAlert = true;
        wrapper = shallow(<PanelComponent {...props}/>);
        expect(wrapper.find('.container').length).toBe(2);
    });

    it('should Close button is present', () => {
        props.showAlert = true;
        wrapper = shallow(<PanelComponent {...props}/>);
        expect(wrapper.find('.e2e-closebtn').length).toBe(1);
    });

    it('should  calls componentWillMount', () => {
        sinon.spy(PanelComponent.prototype, 'componentWillMount');
        wrapper = mount(<PanelComponent {...props}/>);
        expect(PanelComponent.prototype.componentWillMount.callCount).toBe(1);
        PanelComponent
            .prototype
            .componentWillMount
            .restore();
    });

    it('should calls componentWillReceiveProps', () => {
        props.showAlert = false;
        const spy = sinon.spy(PanelComponent.prototype, 'componentWillReceiveProps');
        wrapper = mount(<PanelComponent {...props}/>);
        expect(spy.calledOnce).toBe(false);
        wrapper.setProps({showAlert: true});
        expect(spy.calledOnce).toBe(true);
        spy.restore();
    });

    it('should calls toggleAlert', () => {
        props.showAlert = false;
        props.autoClose = false;
        const clock = sinon.useFakeTimers(),
            spy = sinon.spy(PanelComponent.prototype, 'toggleAlert');
        wrapper = mount(<PanelComponent {...props}/>);
        expect(spy.calledOnce).toBe(false);
        wrapper.setProps({showAlert: true});
        clock.tick(7000);
        expect(spy.calledOnce).toBe(false);
        clock.restore();
        spy.restore();
    });

    it('should calls componentWillUnmount ', () => {
        props.showAlert = true;
        const willUnmount = sinon.spy(PanelComponent.prototype, 'componentWillUnmount');
        wrapper = mount(<PanelComponent {...props}/>);
        expect(willUnmount.callCount).toBe(0);
        wrapper.unmount();
        expect(willUnmount.callCount).toBe(1);
        willUnmount.restore();
    });

    it('should render childer ', () => {
        props.showAlert = true;
        wrapper = shallow(
            <PanelComponent {...props}>
                <div className="unique"/>
            </PanelComponent>
        );
        expect(wrapper.contains(<div className="unique"/>)).toBe(true);

    });

    it('should call hanldeClose ', () => {
        props.showAlert = true;
        const spy = sinon.spy(PanelComponent.prototype, 'handleClose');

        wrapper = mount(<PanelComponent {...props}/>);
        wrapper
            .find('.e2e-closebtn')
            .simulate('click');
        expect(spy.callCount).toBe(1);
        spy.restore();

    });

});