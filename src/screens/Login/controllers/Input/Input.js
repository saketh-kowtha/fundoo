import React from 'react'
import ErrorMessage from './ErrorMessage'

class LoginInput extends React.PureComponent {

    constructor(props) {
        super(props)
        this.state = {
            input: "",
            errorMsg: "" ,
        }
    }

    componentDidUpdate(prevProps, prevState){
        if (this.props.errorMsg !== prevProps.errorMsg) {
            this.setState({errorMsg: this.props.errorMsg || ""});
        }       
    }

    componentWillUnmount(){
        console.log("unnnnn")
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
        let className = "input-group"
        if (this.state.input != "" && this.state.input.length > 0)
            className += " active"

        if(this.state.errorMsg != ""){
            className += " warning"
        }
        return <div className={className}>
                    <input name={this.props.name.toLowerCase()} type={this.props.secret ? "password" : "text"} onChange={this.handleInput} onKeyPress={this.handleInputKeyPress}/>
                    <span >{this.props.name}</span>
                    { this.state.errorMsg != "" ? <ErrorMessage message={this.state.errorMsg} /> : ""}
                </div>
    }

}


export default LoginInput