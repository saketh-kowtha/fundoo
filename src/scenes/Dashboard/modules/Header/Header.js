import React from 'react'
import {Menu, Replay, GridOnSharp,  SettingsSharp, InvertColors, Search, ArrowBack } from '@material-ui/icons/'
import './Header.scss'
import logo from '../../../../../assets/logo.png'


// class Header extends React.Component{
//     state = {
//         mobileSearchView: false,
//         height: window.matchMedia && window.matchMedia("(max-width: 768px)") || {}
//     }

//     toggleMobileSearchView = () => {
//         this.setState({mobileSearchView: !this.state.mobileSearchView})
//     }

//     render() {
//         return <div className="nav-header">
//         <div className="left">
//             <div className="nav-icon"><Menu onClick={this.props.toggle}/></div>
//             <div><img src={logo} /></div>
//             <div><strong>Fundoo</strong></div>
//         </div>
//         <div className={`center${this.state.mobileSearchView ? " mobile-search" : ""}`}>
//                 <div >
//                     {
//                         !this.state.mobileSearchView
//                             ? <Search className="search-icon nav-icon"/>
//                             : <ArrowBack onClick={this.toggleMobileSearchView} className="nav-icon left-icon"/>
//                     }
//                 <input type="text" placeholder="search"/>
//              </div>
//         </div>
//         <div className="right">
//             <div className="nav-icon" >
//                 {
//                     !this.state.height.matches 
//                         ? <Replay />
//                         : (() => !this.state.mobileSearchView ? <Search onClick={this.toggleMobileSearchView} />  : null)()
//                 }
//             </div>
//             <div className="nav-icon"><GridOnSharp /></div>
//             <div className="nav-icon"><SettingsSharp /></div>
//             <div className="nav-icon"><InvertColors /></div>
//             <div>
//                 <img className="profile" src={`http://fundoonotes.incubation.bridgelabz.com/${this.props.image}`} />
//             </div>
//         </div>
//     </div>
//     }
// }

class Header extends React.Component{
    state = {
        mobileSearchView: false,
        height: window.matchMedia && window.matchMedia("(max-width: 768px)") || {}
    }

    toggleMobileSearchView = () => {
        this.setState({mobileSearchView: !this.state.mobileSearchView})
    }

    render() {
        return <div className="nav-header">
            <div className="left">
                <div className="nav-icon"><Menu onClick={this.props.toggle}/></div>
                <div><img src={logo} /></div>
                <div><strong>Fundoo</strong></div>
            </div>
            <div className="center">
                <div>
                    {
                        !this.state.mobileSearchView
                            ? <Search className="search-icon nav-icon"/>
                            : <ArrowBack onClick={this.toggleMobileSearchView} className="nav-icon left-icon"/>
                    }
                    <input type="text" placeholder="search"/>
                    {/* <div className="input" contentEditable="true"></div> */}
                </div>
            </div>
            <div className="right">
                 3
            </div>
        </div>
    }
}






export default Header
