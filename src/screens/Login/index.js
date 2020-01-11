import React from 'react'
import Card from '../../components/Card'
import Link from '../../components/Link'
import Button from '../../components/Button'
import Input from './components/Input'
import './Login.scss'
export default class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            username: "",
            password: ""
        }

        setInterval(() => this.setState({errmsg: !this.state.errmsg}), 1000)

    }

    handleInput = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }


    render() {
        return  <div className="login-container">
                    <Card>
                        <div className="form">
                            <div className="header">
                                <p>{['F', 'u', 'n', 'd', 'o', 'o'].map((char, index) => <span key={index}>{char}</span>)}</p>
                                <h3>Sign in</h3>
                                <p>to continue to Fundoo</p>
                            </div>
                            <div>
                                <Input name="Username" validate={(input) => ({ status: isNaN(input), message: "Invalid Input" })} onChange={this.handleInput}/>
                                <Input name="Password" />
                                <Link name="Forgot Pasword" small/>
                            </div>

                            <div className="footer">
                                <div>
                                    <Link name="Create Account" small/>
                                </div>

                                <div>
                                    <Button>Next</Button>
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>
    }
}
