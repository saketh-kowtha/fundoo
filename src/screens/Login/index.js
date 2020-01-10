import React from 'react'
import Card from '../../components/Card'
import Link from '../../components/Link'
import Button from '../../components/Button'

import './Login.scss'
export default class Login extends React.Component {
    constructor() {
        super()
    }

    render() {
        return <div className="login-container">
            <Card>
                <div className="form">
                    <div className="header">
                        <p style={{fontSize: '30px'}}>
                            <span style={{'color': 'rgb(80, 134,236)'}}>F</span>
                            <span style={{'color': 'rgb(216, 80, 64)'}}>u</span>
                            <span style={{'color': 'rgb(240, 188, 66)'}}>n</span>
                            <span style={{'color': 'rgb(80, 134,236)'}}>d</span>
                            <span style={{'color': 'rgb(119, 181, 123)'}}>o</span>
                            <span style={{'color': 'rgb(216, 80, 64)'}}>o</span>
                        </p>
                        <h3>Sign in</h3>
                        <p>to continue to Fundoo</p>
                    </div>
                    <div className="input-group">
                        <input type="text" name="" />
                        <span>Email or phone</span>
                    </div>

                    <div>
                        <Link name="Forgot email?" small/>
                    </div>

                    <div role="warning" style={{marginTop: "50px", textAlign: "left", color: 'gray', fontSize: '15px'}}>
                        Not your computer? Use a Private Window to sign in.
                        <div style={{marginTop: '2px'}}>
                            <Link name="Learn More" small/>
                        </div>
                    </div>

                    <div style={{display: 'flex', marginTop: '50px',alignItems: 'center', justifyContent: 'space-between'}}>
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
