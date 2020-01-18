import React from 'react'
import {WARNING, ACTIVE} from '../../../../constants'

class LoginInput extends React.PureComponent {

    constructor(props) {
        super(props)
        this.state = {
            input: this.props.value || "",
            errorMsg: "" ,
        }
    }


    componentDidUpdate(prevProps, prevState){
        if (this.props.errorMsg !== prevProps.errorMsg) {
            this.setState({errorMsg: this.props.errorMsg || ""})
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
            if (ipValidateReponse != true && this.state.input !=""){
                this.setState({errorMsg: ipValidateReponse})
            }
            else{
                this.setState({ errorMsg: "" })
            }
        }
    }


    render() {
        let className = ["input-group"]
        if (this.state.input != "" && this.state.input.length > 0)
            className.push(ACTIVE)

        if(this.state.errorMsg != ""){
            className.push(WARNING)
        }


        return <div className={className.join(" ")}>
                    <input value={this.state.input} name={this.props.name.toLowerCase().replace(/\s/g,'')} type={this.props.secret ? "password" : "text"} onChange={this.handleInput} onKeyDown={this.handleInputKeyPress}/>
                    <span>{this.props.label}</span>
                    <span className="input-error-msg">{this.state.errorMsg}</span>
                </div>
    }

}


export default LoginInput