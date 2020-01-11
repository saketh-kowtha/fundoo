import React from 'react'
import ErrorMessage from './ErrorMessage'

class LoginInput extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            input: "",
            isValid: this.props.errorMsg !== "",
            errorMsg: ""
        }
    }

    handleInput = (event) => {
        this.setState({ input: event.target.value })
        if (this.props.onChange)
                this.props.onChange(event.target.value)
    }

    render() {

        let className = "input-group"
        let ipValidateReponse = {}

        if (this.props.validate && this.state.input) {
            ipValidateReponse = this.props.validate(this.state.input)
            if (!ipValidateReponse.status)
                this.setState({isValid: false})
            else
                this.setState({ isValid: true })
        }

        if (this.state.input != "" && this.state.input.length > 0)
            className += " active"
        if (!this.state.isValid && this.state.input != "") {
            className += " warning" 
        }



        return <div className={className}>
            <input value={this.state.input} name={this.props.name.toLowerCase()} type="text" onChange={this.handleInput} />
            <span >{this.props.name}</span>
            <ErrorMessage message={this.state.errorMsg} />
        </div>
    }

}


export default LoginInput