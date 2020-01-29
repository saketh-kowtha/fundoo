import React from 'react';
import {  mount } from 'enzyme';
import Card from './index';

describe('Button', () => {
    const component = mount(<Card >Card</Card>);
    
    it('Should have Children ', () => {
        let child = component.find("div").text()
        expect(child).toEqual("Card")        
    });

    it('Should have class btn and oulined', () => {
        let prop = component.find("div").prop("className")
        expect(prop.indexOf("card") > -1 && prop.indexOf("outlined") > -1).toBe(true)
    })

});