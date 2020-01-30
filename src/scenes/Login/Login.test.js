import React from 'react';
import { shallow, mount } from 'enzyme';
import Login from './Login';


const sleep = m => new Promise(r => setTimeout(r, m))



//Login 
describe('Login', () => {
    const component = mount(<Login view="login" />);


    it("Should Show error message on Invalid Email", () => {
        component.find("input[name='username']").simulate('change', {target: {value: "abc", name: "username"}})
        component.find("button").simulate('click')
        expect(component.find("input[name='username']~span~span").text()).toBe("Must contain @ symbol")
    })

    it("Should Show error message on Empty Email", () => {
        component.find("input[name='username']").simulate('change', {target: {value: "", name: "username"}})
        component.find("button").simulate('click')
        expect(component.find("input[name='username']~span~span").text()).toBe("Must contain @ symbol")
    })

    it("Should Show error message on Empty Password", () => {
        component.find("input[name='username']").simulate('change', { target: { value: "abc@gmail.com", name: "username" } })
        component.find("input[name='password']").simulate('change', {target: {value: "", name: "password"}})
        component.find("button").simulate('click')
        expect(component.find("input[name='password']~span~span").text()).toBe("Password Should not be empty")
    })

    it("Should Show error message on Invalid Credintails", async () => {
        component.find("input[name='username']").simulate('change', { target: { value: "abc@gmail.com", name: "username" } })
        component.find("input[name='password']").simulate('change', {target: {value: "Amin@123", name: "password"}})
        component.find("button").simulate('click')
        await sleep(500)
        expect(document.querySelectorAll("div[class='toast error']")[0].innerHTML).toBe("Invalid Credintails")
    })

    it("Should match snapshot", async () => {
        component.find("input[name='username']").simulate('change', { target: { value: "aadarsh@gmail.com", name: "username" } })
        component.find("input[name='password']").simulate('change', {target: {value: "Admin@123", name: "password"}})
        component.find("button").simulate('click')
        await sleep(500)
        expect(component).toMatchSnapshot()
    })


});



//Signup 


describe('Signup', () => {
    const component = mount(<Login view="signUp" />);


    it("Should Show error message on Invalid Firstname", () => {
        component.find("input[name='firstname']").simulate('change', {target: {value: "", name: "firstname"}})
        component.find("button").simulate('click')
        expect(component.find("input[name='firstname']~span~span").text()).toBe("Username Should not be empty")
    })

    it("Should Show error message on Invalid Lastname", () => {
        component.find("input[name='firstname']").simulate('change', {target: {value: "abc", name: "firstname"}})
        component.find("input[name='lastname']").simulate('change', {target: {value: "", name: "lastname"}})
        component.find("button").simulate('click')
        expect(component.find("input[name='lastname']~span~span").text()).toBe("Username Should not be empty")
    })

    it("Should Show error message on Invalid Email", () => {
        component.find("input[name='firstname']").simulate('change', {target: {value: "abc", name: "firstname"}})
        component.find("input[name='lastname']").simulate('change', {target: {value: "xyz", name: "lastname"}})
        component.find("input[name='email']").simulate('change', {target: {value: "", name: "email"}})
        component.find("button").simulate('click')
        expect(component.find("input[name='email']~span~span").text()).toBe("Must contain @ symbol")
    })

    it("Should show error message when password and re-password not same", async () => {
        component.find("input[name='firstname']").simulate('change', {target: {value: "abc", name: "firstname"}})
        component.find("input[name='lastname']").simulate('change', {target: {value: "xyz", name: "lastname"}})
        component.find("input[name='email']").simulate('change', { target: { value: "abc@gmail.com", name: "email" } })
        component.find("input[name='password']").simulate('change', {target: {value: "", name: "password"}})
        component.find("button").simulate('click')
        expect(component.find("input[name='password']~span~span").text()).toBe("Password and Re-Password are mismached")
    }) 
    
    it("Should show error message when password is empty", async () => {
        component.find("input[name='firstname']").simulate('change', {target: {value: "abc", name: "firstname"}})
        component.find("input[name='lastname']").simulate('change', {target: {value: "xyz", name: "lastname"}})
        component.find("input[name='email']").simulate('change', { target: { value: "abc@gmail.com", name: "email" } })
        component.find("input[name='password']").simulate('change', {target: {value: "", name: "password"}})
        component.find("input[name='confirmpassword']").simulate('change', {target: {value: "", name: "confirmpassword"}})
        component.find("button").simulate('click')
        expect(component.find("input[name='password']~span~span").text()).toBe("Password Should not be empty")
    }) 

    it("Should show error toast when user already exist", async () => {
        component.find("input[name='firstname']").simulate('change', {target: {value: "abc", name: "firstname"}})
        component.find("input[name='lastname']").simulate('change', {target: {value: "xyz", name: "lastname"}})
        component.find("input[name='email']").simulate('change', { target: { value: "abc@gmail.com", name: "email" } })
        component.find("input[name='password']").simulate('change', {target: {value: "Admin@123", name: "password"}})
        component.find("input[name='confirmpassword']").simulate('change', {target: {value: "Admin@123", name: "confirmpassword"}})
        component.find("button").simulate('click')
        await sleep(500)
        expect(document.querySelectorAll("div[class='toast error']")[0].innerHTML).toBe("Email already exists")
    })
    
    it("Should show success toast when signup is success", async () => {
        component.find("input[name='firstname']").simulate('change', {target: {value: "abc", name: "firstname"}})
        component.find("input[name='lastname']").simulate('change', {target: {value: "xyz", name: "lastname"}})
        component.find("input[name='email']").simulate('change', { target: { value: "abcxyzmno" + Math.ceil(Math.random() * 10000) + "@gmail.com", name: "email" } })
        component.find("input[name='password']").simulate('change', {target: {value: "Admin@123", name: "password"}})
        component.find("input[name='confirmpassword']").simulate('change', {target: {value: "Admin@123", name: "confirmpassword"}})
        component.find("button").simulate('click')
        await sleep(500)
        expect(document.querySelectorAll("div[class='toast success']")[0].innerHTML).toBe("User registered sucessfully")
    })

});



//Reset password

describe('Reset Password', () => {
    const component = mount(<Login view="reset" />);
    it("Should Show Success Toast on valid Email in reset password", async () => {
        component.find("input[name='email']").simulate('change', {target: {value: "abcxyzmno2555155@gmail.com", name: "email"}})
        component.find("button").simulate('click')
        await sleep(500)
        expect(document.querySelectorAll("div[class='toast success']")[0].innerHTML).toBe("Set password link sent to you registered email, please check.")
    })


    it("Should Show Error Toast on Invalid Email in reset password", async () => {
        component.find("input[name='email']").simulate('change', {target: {value: "rliohrg@gmail.com", name: "email"}})
        component.find("button").simulate('click')
        await sleep(500)
        expect(document.querySelectorAll("div[class='toast error']")[0].innerHTML).toBe("Invalid EMail")
    })
    
});




