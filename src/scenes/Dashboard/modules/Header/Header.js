import React from 'react'
import {Menu, Replay, GridOnSharp,  SettingsSharp, InvertColors, Search, ArrowBack } from '@material-ui/icons/'
import './Header.scss'
import logo from '../../../../../assets/logo.png'
import {connect} from 'react-redux'

class Header extends React.Component{
    state = {
        mobileSearchView: false,
        height: window.matchMedia && window.matchMedia("(max-width: 768px)") || {}
    }

    toggleMobileSearchView = () => {
        this.setState({mobileSearchView: !this.state.mobileSearchView})
    }

    render() {
        return <div className="navbar">
            <div className="left">
                <div className="nav-icon"><Menu onClick={this.props.toggle}/></div>
                <div> { this.props.title === "Notes" ?  <img src={logo} /> : null }</div>
                <div><strong>{this.props.title}</strong></div>
            </div>

            <div className="center">
                {
                        !this.state.mobileSearchView
                            ? <Search className="search-icon nav-icon"/>
                            : <ArrowBack onClick={this.toggleMobileSearchView} className="nav-icon left-icon"/>
                }
                <input type="text" placeholder="Search"/>

            </div>

            <div className="right">
                <div className="nav-icon" >
                    {
                        !this.state.height.matches 
                            ? <Replay />
                            : (() => !this.state.mobileSearchView ? <Search onClick={this.toggleMobileSearchView} />  : null)()
                    }
                </div>
                <div className="nav-icon"><GridOnSharp /></div>
                <div className="nav-icon"><SettingsSharp /></div>
                <div>
                    <img className="nav-icon" src={`http://fundoonotes.incubation.bridgelabz.com/${this.props.image}`} />
                </div>
            </div>
        </div>
    }
}


const mapStateToProps = (state) => {
    return {
        title: state.title
    }
}



export default connect(mapStateToProps,null)(Header)
