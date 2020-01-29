import React from 'react';
import { shallow, mount } from 'enzyme';
import Button from './index';

describe('Button', () => {
    const component = mount(<Button type="small">Button</Button>);
    
    it('should have class btn ', () => {
        let child = component.find("button").text()
        expect(child).toEqual("Button")        
    });

    it('Should have Children ', () => {
        let prop = component.find("button").prop("className")
        expect(prop).toBe("btn")
    })
   
    it("should render Correctly", () => {
        expect(component).toMatchSnapshot()
    })

    it("should update Correctly", () => {
        const component2 = mount(<Button type="small">Click</Button>);
        expect(component2).toMatchSnapshot()
    })

});