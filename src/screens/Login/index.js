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
        state: true
    }

    handleUserInput = (name, input) =>{
        const stateData = {...this.state}
        stateData[this.state.state ? "login" : "signUp"][name].value = input
        this.setState({stateData})
    }

    validate = () => {
        if(this.state.state)
        {
            const loginValidation = validateLogin(this.state.login)
            if(loginValidation != true)
            {
                const stateData = {...this.state.login}
                stateData[loginValidation.feild] = loginValidation.errorMsg
                this.setState({login: stateData})
            }
        }
        else
        {
            
            const loginValidation = validateSignUp(this.state.signUp)
            if(loginValidation != true)
            {
                const stateData = {...this.state.login}
                stateData[loginValidation.feild] = loginValidation.errorMsg
                this.setState({login: stateData})
            }
        }
    }

    SignUp = () => {
        return <div className="login-container">
                    <Card className="form">
                        <div>
                            <div className="header">
                                <p>{title.split("").map((char, index) => <span key={index}>{char}</span>)}</p>
                                <h3>{signUp}</h3>
                                <p>{signUpDesc}</p>
                            </div>
                            <div className="row">
                                <Input name={firstName} onChange={this.handleUserInput} validate={validateUsername}/>
                                <Input name={lastName} onChange={this.handleUserInput} secret={true} validate={validateUsername}/>
                            </div>
                            <div className="row" >
                                <Input name={email} onChange={this.handleUserInput} validate={validateEmail}/>
                            </div>
                            <div className="row">
                                <Input name={password} onChange={this.handleUserInput} validate={validatePassword}/>
                                <Input name={confirmPassword} onChange={this.handleUserInput} secret={true} validate={validatePassword}/>
                            </div>
                            <div className="footer">
                                <div>
                                    <Link name={signIn} small onClick={() => this.setState({signIn: true})}/>
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
                                <h3>{signInDesc} </h3>
                                <p>{signIn}</p>
                            </div>
                            <div>
                                <Input name={userName} onChange={this.handleUserInput} validate={validateUsername}/>
                                <Input name={password} onChange={this.handleUserInput} secret={true} validate={validatePassword}/>
                            </div>
                            <div>                                
                                <Link name={forgotPasswd} small/>
                            </div>
                            <div className="footer">
                                <div>
                                    <Link name={createAccount} small onClick={() => handleStateChange(false)}/>
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
        return this.state.signIn ? this.Login() : this.SignUp()
    }

}



// export default Login