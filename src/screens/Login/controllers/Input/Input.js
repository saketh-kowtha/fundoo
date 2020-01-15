import React from 'react'
import ErrorMessage from './ErrorMessage'

class LoginInput extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            input: "",
            errorMsg: "",
        }
    }

    handleInput = (event) => {
        const {name, value} = event.target
        this.setState({input: value})
        this.props.onChange(name, value)
    }

    handleInputKeyPress = (event) =>{
        let ipValidateReponse = ""
        if (this.props.validate && this.state.input) {
            ipValidateReponse = this.props.validate(this.state.input)
            if (ipValidateReponse != true && this.state.input !="")
                this.setState({errorMsg: ipValidateReponse})
            else
                this.setState({ errorMsg: false })
        }
    }

    render() {
        let className = "input-group"

        if (this.state.input != "" && this.state.input.length > 0)
            className += " active"

        if(this.state.errorMsg != "")
            className += " warning"

        return <div className={className}>
            <input name={this.props.name.toLowerCase()} type={this.props.secret ? "password" : "text"} onChange={this.handleInput} onKeyUp={this.handleInputKeyPress}/>
            <span >{this.props.name}</span>
            { this.state.errorMsg != "" ? <ErrorMessage message={this.state.errorMsg} /> : ""}
        </div>
    }

}


export default LoginInput