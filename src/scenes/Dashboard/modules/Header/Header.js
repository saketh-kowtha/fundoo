import React from 'react'
import Card from '../../../../components/Card'
import {Menu, Replay, GridOnSharp,  SettingsSharp, Search, ArrowBack } from '@material-ui/icons/'
import './Header.scss'
import logo from '../../../../../assets/logo.png'
import {connect} from 'react-redux'
import { Button } from '../../../../components'
import showToast from '../../../../components/Toast'
import { updateImage } from '../../../../actions/userActions'
import { toggleSidebar } from '../../../../actions/layoutActions'
import http from '../../../../services/http'
import geti18N from '../../../../strings'
import {withRouter} from 'react-router-dom'

const {signOut, search} = geti18N()

class Header extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            mobileSearchView: false,
            showActionCard: false,
            height: window.matchMedia && window.matchMedia("(max-width: 768px)") || {}
        }
        this.colors=["purple", "blue", "green", "pink", "orange", "merun"]
    }
   

    toggleMobileSearchView = () => {
        this.setState({mobileSearchView: !this.state.mobileSearchView})
    }

    openFileDilog = () => {
        this.fileUpload.click();
    }

    uploadPicture = (e) => {
        const formData = new FormData();
        formData.append("file", e.target.files[0])
        http.updateProfilePic(formData, (msg, path) => {
            if(path)
                this.props.updateImage(path)
            showToast(msg)
        })
    }

    signOut = () =>{
        http.signOut((data) => {
            if (data === "OK")
            {
                sessionStorage.clear()
                window.location.href = "/"
            }
        })
    }

    render() {
        const color = Math.ceil(Math.random() * 10 % this.colors.length) - 1
        
        const image = this.props.user.imageUrl
            ? <img className="nav-icon profile" src={`http://fundoonotes.incubation.bridgelabz.com/${this.props.user.imageUrl}`} />
            : <span className={`nav-icon profile text ${this.colors[color]}`}>{this.props.user.email[0].toLocaleUpperCase()}</span>
                
        return <div className="navbar">
            <div className="left">
                <div className="nav-icon" onClick={this.props.toggle}><Menu/></div>
                <div> { this.props.title === "Notes" ?  <img src={logo} /> : null }</div>
                <div><strong>{this.props.title}</strong></div>
            </div>

            <div className="center">
                {
                        !this.state.mobileSearchView
                            ? <Search className="search-icon nav-icon"/>
                            : <ArrowBack onClick={this.toggleMobileSearchView} className="nav-icon left-icon"/>
                }
                <input type="text" placeholder={search}/>

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
                    <div onClick={() => this.setState({ showActionCard: !this.state.showActionCard })}>{image}</div>
                    {
                        this.state.showActionCard
                            ?   <Card className="account-card">
                                    <div>
                                        <div onClick={this.openFileDilog}>{image}</div><label><strong>{this.props.user.firstName} {this.props.user.lastName}</strong><br />{this.props.user.email}</label>
                                    </div>
                                    <hr className="border"/>
                                    <div>
                                        <Button type="small" onClick={this.signOut}>{signOut}</Button>
                                    </div>
                                </Card>
                            : null
                    }
                    <input type="file" id="file" onChange={this.uploadPicture} ref={(ref) => this.fileUpload = ref} style={{display: "none"}}/>
                </div>
            </div>
        </div>
    }
}


const mapStateToProps = (state) => {
    return {
        title: state.title,
        user: state.user
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateImage: (imgPath) => dispatch(updateImage(imgPath)),
        toggle: () => dispatch(toggleSidebar())
    }
}


export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Header))
