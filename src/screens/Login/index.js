import React from 'react'
import Card from '../../components/Card'
import Link from '../../components/Link'
import Button from '../../components/Button'
import Input from './controllers/Input/Input'
import { 
    validateUsername, 
    validatePassword,
    validateEmail,
    validateLogin,
    validateSignUp
} from './controllers/Input/InputValidation'
import './Login.scss'
import {
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
    userName
} from '../../strings'

export default class Login extends React.Component{
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
                value: "",
                errMsg: ""
            },
            lastname: {
                value: "",
                errMsg: ""
            },
            password: {
                value: "",
                errMsg: ""
            },
            confirmpassword: {
                value: "",
                errMsg: ""
            },
            email: {
                value: "",
                errMsg: ""
            }
        },
        state: "login"
    }

    handleUserInput = (name, input) =>{
        const stateData = {...this.state}
        stateData[this.state.state === "login" ? "login" : "signUp"][name].value = input
        this.setState({stateData})
    }

    validate = () => {
        if(this.state.state === "login")
        {
            const loginValidation = validateLogin(this.state.login)
            if(loginValidation != true)
            {
                const stateData = {...this.state.login}
                stateData[loginValidation.feild].errMsg = loginValidation.errorMsg
                setTimeout(() => {
                    stateData[loginValidation.feild].errMsg = ""
                    this.setState({login: stateData})
                }, 3000)
                this.setState({login: stateData})
            }
        }
        else if(this.state.state === "resetPassword"){
            const resetValidation = validateEmail(this.state.login)
            if(resetValidation != true){
                const stateData = {...this.state.reset}
                stateData[resetValidation.feild].errMsg = resetValidation.errorMsg
                setTimeout(() => {
                    stateData[resetValidation.feild].errMsg = ""
                    this.setState({reset: stateData})
                }, 3000)
                this.setState({reset: stateData})    
            }
        }
        else
        {
            
            const signUpValidation = validateSignUp(this.state.signUp)
            if(signUpValidation != true)
            {
                const stateData = {...this.state.signUp}
                stateData[signUpValidation.feild].errMsg = signUpValidation.errorMsg
                setTimeout(() => {
                    stateData[signUpValidation.feild].errMsg = ""
                    this.setState({signup: stateData})
                }, 3000)
                this.setState({signup: stateData})
            }
        }
    }

    ForgetPassword = () => {
        return <div className="login-container">
                    <Card className="form">
                        <div>
                            <div className="header">
                                <p>{title.split("").map((char, index) => <span key={index}>{char}</span>)}</p>
                                <h2>Find your email</h2>
                                <p>Enter your phone number or recovery email</p>
                            </div>
                            <div>
                                <Input name={email} errorMsg={this.state.reset.email.errMsg} onChange={this.handleUserInput} validate={validateUsername}/>
                            </div>
                            <div className="footer">
                                <div>
                                    <Link name={signIn} small onClick={() => this.setState({state: "login"})}/>
                                </div>
                                <div>
                                    <Button onClick={this.validate}>Send</Button>
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>
    }

    SignUp = () => {
        return <div className="login-container">
                    <Card className="form">
                        <div>
                            <div className="header">
                                <p>{title.split("").map((char, index) => <span key={index}>{char}</span>)}</p>
                                <h2>{signUp}</h2>
                                <p>{signUpDesc}</p>
                            </div>
                            <div className="row">
                                <Input name={firstName} errorMsg={this.state.signUp.firstname.errMsg} onChange={this.handleUserInput} validate={validateUsername}/>
                                <Input name={lastName} errorMsg={this.state.signUp.lastname.errMsg} onChange={this.handleUserInput} secret={true} validate={validateUsername}/>
                            </div>
                            <div className="row" >
                                <Input name={email} errorMsg={this.state.signUp.email.errMsg} onChange={this.handleUserInput} validate={validateEmail}/>
                            </div>
                            <div className="row">
                                <Input name={password} errorMsg={this.state.signUp.password.errMsg} onChange={this.handleUserInput} validate={validatePassword}/>
                                <Input name={confirmPassword} errorMsg={this.state.signUp.confirmpassword.errMsg} onChange={this.handleUserInput} secret={true} validate={validatePassword}/>
                            </div>
                            <div className="footer">
                                <div>
                                    <Link name={signIn} small onClick={() => this.setState({state: "login"})}/>
                                </div>
                                <div>
                                    <Button onClick={this.validate}>{signUp}</Button>
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>
    }

    Login = () => {
        return <div className="login-container">
                    <Card className="form">
                        <div>
                            <div className="header">
                                <p>{title.split("").map((char, index) => <span key={index}>{char}</span>)}</p>
                                <h2>{signInDesc} </h2>
                                <p>{signIn}</p>
                            </div>
                            <div>
                                <Input name={userName} errorMsg={this.state.login.username.errMsg} onChange={this.handleUserInput} validate={validateUsername}/>
                                <Input name={password} errorMsg={this.state.login.password.errMsg} onChange={this.handleUserInput} secret={true} validate={validatePassword}/>
                            </div>
                            <div>                                
                                <Link name={forgotPasswd} small onClick={() => this.setState({state: "resetPassword"})}/>
                            </div>
                            <div className="footer">
                                <div>
                                    <Link name={createAccount} small onClick={() => this.setState({state: "signup"})}/>
                                </div>
                                <div>
                                    <Button onClick={this.validate}>{signIn}</Button>
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>
    }
    
    render(){
        if(this.state.state === "login")
            return this.Login()
        else if(this.state.state === "signup")
            return this.SignUp()
        else
            return this.ForgetPassword()
    }

}



// export default Login