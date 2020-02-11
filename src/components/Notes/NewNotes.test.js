import React from 'react';
import { shallow, mount } from 'enzyme';
import NewNote from './NewNotes';

import Layout from '../../scenes/Dashboard/modules/Content/modules/Layout'

import { Provider } from 'react-redux';
import store from '../../store'

import {HashRouter} from 'react-router-dom'



const sleep = m => new Promise(r => setTimeout(r, m))

const flushPromises = () => new Promise(setImmediate);


// describe('Testing with New Notes',  () => {
//     const component = mount(<Provider store={store}><NewNote type={"Notes"}/></Provider>);
//     it("Should Show error if two feilds are empty while creating card", async () => {
//         component.find("input[name='description']").simulate("click")
//         component.find('i[name="close"]').simulate("click")
//         await sleep(1000)
//         expect(document.querySelectorAll("div[class='toast success']")[0].innerHTML).toBe("Please provide title or description of notes")
//     })

//     it("Should Save on closing new card", async () => {
//         component.find("input[name='description']").simulate("click")
//         component.find("input[name='description']").simulate("change", {target: {value: "Hello World from enzyme", name: "description"}})
//         component.find("input[name='title']").simulate("change", {target: {value: "Hello World from enzyme", name: "title"}})
//         component.find('i[name="close"]').simulate("click")
//         await sleep(1000)
//         expect(document.querySelectorAll("div[class='toast success']")[0].innerHTML).toBe("Updated Successfully")
//     })
// });



describe('Testing with existing Notes', () => {

    // describe("Notes View", () => {
    //     it("Should pin notes", async () => {
    //         await flushPromises();
    //         await sleep(2000)
    //         component.update()
    //         const notes = component.find(`div[id='${ID}']`)
    //         component.find(`div[id='${ID}']`).simulate("mouseenter", {})
    //         notes.find('i[title="Pin"]').simulate("click")
    //         await sleep(1000)
    //         expect(document.querySelectorAll("div[class='toast success']")[0].innerHTML).toBe("Updated Successfully")
    //     })

    
    //     it("Should Archive notes", async () => {
    //         await flushPromises();
    //         await sleep(2000)
    //         component.update()
    //         const notes = component.find(`div[id='${ID}']`)
    //         component.find(`div[id='${ID}']`).simulate("mouseenter", {})
    //         notes.find('i[title="Archive"]').simulate("click")
    //         await sleep(1000)
    //         expect(document.querySelectorAll("div[class='toast success']")[0].innerHTML).toBe("Updated Successfully")
    //     })


    // })

    // describe("Archive View", () => {
    //     const ID = "5e413027874d2e00225f97e0" 
    //     const component = mount(<Provider store={store}><HashRouter><Layout name={"Archive"} /></HashRouter></Provider>);
    //     it("Should Unarchive notes", async () => {
    //         await flushPromises();
    //         await sleep(2000)
    //         component.update()
    //         const notes = component.find(`div[id='${ID}']`)
    //         component.find(`div[id='${ID}']`).simulate("mouseenter", {})
    //         notes.find('i[title="Unarchive"]').simulate("click")
    //         await sleep(1000)
    //         expect(document.querySelectorAll("div[class='toast success']")[0].innerHTML).toBe("Updated Successfully")
    //     })

    // })

    describe("Reminder View", () => {
        //Color
        const ID = "5e413310874d2e00225f97e7" 
        const component = mount(<Provider store={store}><HashRouter><Layout name={"Reminders"} /></HashRouter></Provider>);
        it("Should Color notes", async () => {
            await flushPromises();
            await sleep(2000)
            component.update()
            const notes = component.find(`div[id='${ID}']`)
            component.find(`div[id='${ID}']`).simulate("mouseenter", {})
            notes.find('i[title="Add Color"]').simulate("click")
            notes.update()
            await sleep(2000)
            let colors = shallow(component.find())
            notes.find("div[value='#d1b2f6']").simulate("click")
            expect(document.querySelectorAll("div[class='toast success']")[0].innerHTML).toBe("Updated Successfully")
        })

            // it("Should Delete notes", async () => {
            //     await flushPromises();
            //     await sleep(2000)
            //     component.update()
            //     const notes = component.find(`div[id='${ID}']`)
            //     component.find(`div[id='${ID}']`).simulate("mouseenter", {})
            //     notes.find('i[name="more"]').simulate("click")
            //     await sleep(1000)
            //     notes.find('li[label="Delete Notes"]').simulate("click")
            //     expect(document.querySelectorAll("div[class='toast success']")[0].innerHTML).toBe("Updated Successfully")
            // })
    })

    // describe("Delete View", () => {
    //     //Delete Perminently
    // })

});