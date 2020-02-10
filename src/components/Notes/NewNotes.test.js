import React from 'react';
import { shallow, mount } from 'enzyme';
import NewNotes from './NewNotes';


const sleep = m => new Promise(r => setTimeout(r, m))



//Login 
describe('New Card',  () => {
    const component = mount(<NewNote type={"Notes"}/>);
    it("Should Show error if two feilds are empty while creating card", async () => {
        component.find("span[class='closeBtn']").simulate("click")
        await sleep(500)
        expect(document.querySelectorAll("div[class='toast error']")[0].innerHTML).toBe("Please provide title or description of notes")
    })
});



 