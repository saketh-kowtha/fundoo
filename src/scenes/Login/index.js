import React from 'react'
import {Card, Link, Button, LanguageSelection} from '../../components/'
import Input from './controllers/Input/Input'
import { 
    validateUsername, 
    validatePassword,
    validateEmail,
    validateLogin,
    validateSignUp
} from './controllers/Input/InputValidation'
import './Login.scss'
import geti18N from '../../strings'
const {
    title, 
    firstName, 
    lastName,
    email, 
    password, 
    confirmPassword, 
    signIn, 
    signUp, 
    signUpDesc, 
    signInDesc,
    forgotPasswd,
    createAccount,
    userName,
    send,
    forgetPasswordDesc,
    findYourMail
} = geti18N()
import http from '../../services/http'
import showToast from '../../components/Toast'
import { LOGIN, RESETPASSWORD, ERROR, SIGNUP } from '../../constants'
import { withRouter } from "react-router-dom";

/**
 * @name Login
 */
class Login extends React.Component{

    state={
        login: {
            username: {
                value: "",
                errMsg: ""
            },
            password: {
                value: "",
                errMsg: ""
            }
        },
        reset:{
            email: {
                value: "",
                errMsg: ""
            }
        },
        signUp: {
            firstname: {
                value: "Afs",
                errMsg: ""
            },
            lastname: {
                value: "Als",
                errMsg: ""
            },
            password: {
                value: "Admin@123",
                errMsg: ""
            },
            confirmpassword: {
                value: "Admin@123",
                errMsg: ""
            },
            email: {
                value: "aadarsh@gmail.com",
                errMsg: ""
            }
        },
        state: this.props.view || LOGIN
    }

    componentDidMount = () =>{
        this._isMount = true
    }

    componentWillUnmount = () =>{
        this._isMount = false
    }

    updateSate = (feild, value) => {
        if(!this._isMount)
            return
        if(!feild)
            this.setState({value})
        this.setState({feild: value})
    }

    handleUserInput = (name, input) =>{
        const stateData = {...this.state}
        stateData[this.state.state][name].value = input
        // this.setState({stateData})
        this.updateSate(null, stateData)
    }


    signupResponseHandler = (err, data) =>{
        if(err){
            const stateData = {...this.state.signUp}
            Object.keys(err).forEach(key => {
                let errMsg = (Array.isArray(err[key]) ? err[key].join(",") : err[key])
                stateData[key].errMsg = errMsg
                showToast(errMsg, ERROR)
            })
            // this.setState({[this.state.state]: stateData})
            this.updateSate([this.state.state], stateData)
        }
        else
            showToast(data)
    }

    resetResponseHandler = (err, data) => {
        if(err)
            showToast(err, ERROR)
        else
            showToast(data)
    }

    loginResponseHandler = (err, data) =>{
        if(err){
            showToast(err, ERROR)
        }
    }

    clearErrorMsgs = () => {
        let stateData = {...this.state[this.state.state]}
        Object.keys(stateData).forEach(feild => {
            stateData[feild].errMsg = ""
        })
        this.updateSate([this.state.state], stateData)
        // this.setState({
        //     [this.state.state] : stateData
        // })
    }

    validate =  () => {
        this.clearErrorMsgs()
        if(this.state.state === LOGIN)
        {
            const stateData = {...this.state.login}
            const loginValidation = validateLogin(this.state.login)
            if(loginValidation != true)
            {
                stateData[loginValidation.feild].errMsg = loginValidation.errorMsg
                // console.log(loginValidation, stateData[loginValidation.feild])
                this.updateSate("login", stateData)
                // this.setState({login: stateData})
            }
            else if(loginValidation === true)
            {
                http.login(stateData, this.loginResponseHandler)
            }
        }
        else if(this.state.state === RESETPASSWORD){
            const resetValidation = validateEmail(this.state.reset.email.value)
            const stateData = {...this.state.reset}
            if(resetValidation != true){
                stateData['email'].errMsg = resetValidation
                // this.setState({reset: stateData})    
                this.updateSate("reset", stateData)
            }
            else
                http.forgotPassword(stateData, this.resetResponseHandler)
        }
        else
        {
            const signUpValidation = validateSignUp(this.state.signUp)
            const stateData = {...this.state.signUp}
            if(signUpValidation != true)
            {
                stateData[signUpValidation.feild].errMsg = signUpValidation.errorMsg
                // this.setState({signUp: stateData})
                this.updateSate("signUp", stateData)

            }
            else if(signUpValidation === true)
            {
                http.signUp(stateData, this.signupResponseHandler)
            }
        }
    }

    ForgetPassword = () => {
        return <div>
                    <div className="header">
                        <p>{title.split("").map((char, index) => <span key={index}>{char}</span>)}</p>
                        <h2>{findYourMail}</h2>
                        <p>{forgetPasswordDesc}</p>
                    </div>
                    <div>
                        <Input 
                            name={"email"} 
                            key={email}
                            label={email} 
                            value={this.state.reset.email.value} 
                            errorMsg={this.state.reset.email.errMsg} 
                            onChange={this.handleUserInput} 
                            validate={validateEmail}/>
                    </div>
                    <div className="footer">
                        <div>
                            <Link 
                                name={signIn} 
                                small={"true"} 
                                onClick={() => this.props.history.push("/login")}/>
                        </div>
                        <div>
                            <Button onClick={this.validate}>{send}</Button>
                        </div>
                    </div>
                </div>
    }


    SignUp = () => {
        let _this = {...this.state.signUp}
        return  <div>
                    <div className="header">
                        <p>{title.split("").map((char, index) => <span key={index}>{char}</span>)}</p>
                        <h2>{signUp}</h2>
                        <p>{signUpDesc}</p>
                    </div>
                    <div className="row">
                        <Input 
                            name={"firstname"} 
                            key={firstName} 
                            label={firstName} 
                            value={_this.firstname.value} 
                            errorMsg={_this.firstname.errMsg} 
                            onChange={this.handleUserInput} 
                            validate={validateUsername}/>

                        <Input 
                            name={"lastname"} 
                            key={lastName} 
                            label={lastName} 
                            value={_this.lastname.value} 
                            errorMsg={_this.lastname.errMsg} 
                            onChange={this.handleUserInput}  
                            validate={validateUsername}/>
                    </div>
                    <div className="row" >
                        <Input 
                            name={"email"} 
                            key={email} 
                            label={email} 
                            value={_this.email.value} 
                            errorMsg={_this.email.errMsg} 
                            onChange={this.handleUserInput} 
                            validate={validateEmail}/>
                    </div>
                    <div className="row">
                        <Input 
                            name={"password"} 
                            key={password} 
                            label={password} 
                            value={_this.password.value} 
                            errorMsg={_this.password.errMsg} 
                            secret={true} 
                            onChange={this.handleUserInput} 
                            validate={validatePassword}/>
                        <Input 
                            name={"confirmPassword"} 
                            key={confirmPassword}  
                            label={confirmPassword}  
                            value={_this.confirmpassword.value} 
                            errorMsg={_this.confirmpassword.errMsg} 
                            onChange={this.handleUserInput} 
                            secret={true} 
                            validate={validatePassword}/>
                    </div>
                    <div className="footer">
                        <div>
                            <Link 
                                name={signIn} 
                                small={"true"} 
                                onClick={() => this.props.history.push("/login")}/>
                        </div>
                        <div>
                            <Button 
                                onClick={this.validate}>
                                    {signUp}
                            </Button>
                        </div>
                    </div>
                </div>
    }

    Login = () => {
        return  <div>
                    <div className="header">
                        <p>{title.split("").map((char, index) => <span key={index}>{char}</span>)}</p>
                        <h2>{signIn}</h2>
                        <p>{signInDesc} </p>
                    </div>
                    <div>
                        <Input 
                            name={"username"} 
                            key={userName}
                            label={userName}
                            errorMsg={this.state.login.username.errMsg} 
                            onChange={this.handleUserInput} 
                            validate={validateEmail}/>
                        <Input 
                            name={"password"} 
                            key={password}
                            label={password}
                            errorMsg={this.state.login.password.errMsg} 
                            onChange={this.handleUserInput} 
                            secret={true} 
                            validate={validatePassword}/>
                    </div>
                    <div>                                
                        <Link name={forgotPasswd} small={"true"} onClick={() => this.props.history.push("/resetpassword")}/>
                    </div>
                    <div className="footer">
                        <div>
                            <Link name={createAccount} small={"true"} onClick={() => this.props.history.push("/signup")}/>
                        </div>
                        <div>
                            <Button onClick={this.validate}>{signIn}</Button>
                        </div>
                    </div>
                </div>
    }
    

    Layout = (view) => {
        return <React.Fragment>
                    <div className="login-container">
                        <Card className="form">
                            {view}
                        </Card>
                        <LanguageSelection />
                    </div>
                </React.Fragment>

    }

    render(){
        if(this.state.state === "login")
            return this.Layout(this.Login())
        else if(this.state.state === "signUp")
            return this.Layout(this.SignUp())
        else
            return this.Layout(this.ForgetPassword())
    }

}



export default withRouter(Login)