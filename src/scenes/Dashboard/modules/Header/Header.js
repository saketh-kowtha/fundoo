import React from 'react'
import Card from '../../../../components/Card'
import {Menu, Replay, GridOnSharp,  SettingsSharp, Search, ArrowBack, ViewModuleOutlined, ViewColumn, ViewStream,CloseOutlined } from '@material-ui/icons/'
import './Header.scss'
import logo from '../../../../../assets/logo.png'
import {connect} from 'react-redux'
import { Button } from '../../../../components'
import showToast from '../../../../components/Toast'
import { updateImage } from '../../../../actions/userActions'
import { toggleSidebar, gridView } from '../../../../actions/layoutActions'
import http from '../../../../services/http'
import geti18N from '../../../../strings'
import {withRouter} from 'react-router-dom'
import {getRandomcolor} from '../../../../helper'

const {signOut, search, notes} = geti18N()

class Header extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            mobileSearchView: false,
            showActionCard: false,
            searchQuery: "",
            queryCount: 0,
            height: window.matchMedia && window.matchMedia("(max-width: 768px)") || {}
        }
        this.count = 0
    }
   

    toggleMobileSearchView = () => {
        this.setState({mobileSearchView: !this.state.mobileSearchView})
        if(this.state.mobileSearchView)
            this.handleCloseBtn()
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

    queryNotesList = (event) => {
        if(!this.state.searchQuery)
            this.setState({closeBtn: true})
        this.setState({searchQuery: event.target.value, queryCount: this.state.queryCount + 1}, () => {
            this.props.history.push("/Search/" + this.state.searchQuery)
        })
    }

    handleCloseBtn = () => {
        this.props.history.go((this.state.queryCount * -1))
        this.setState({closeBtn: false, searchQuery: "", queryCount: 0})
    }

    render() {
        
        const image = this.props.user.imageUrl
            ? <img alt="Profile Pic" className="nav-icon profile" src={`http://fundoonotes.incubation.bridgelabz.com/${this.props.user.imageUrl}`} />
            : <span className={`nav-icon profile text ${getRandomcolor(this.props.user.email[0])}`}>{this.props.user.email[0].toLocaleUpperCase()}</span>
                
        return <div className="navbar">
            <div className="left">
                <div className="nav-icon" tabIndex="0" onKeyDown={(event) => event.keyCode === 13 ? this.props.toggle() : null} onClick={this.props.toggle}><Menu/></div>
                <div> { this.props.title === notes ?  <img src={logo} /> : null }</div>
                <div><strong>{this.props.title}</strong></div>
            </div>

            <div className="center" >
                {
                        !this.state.mobileSearchView
                            ? <Search className="search-icon nav-icon"/>
                            : <ArrowBack onClick={this.toggleMobileSearchView} className="nav-icon left-icon"/>
                }
                {
                    !this.state.height.matches || this.state.mobileSearchView
                        ? <input type="text" value={this.state.searchQuery} onChange={this.queryNotesList} placeholder={search}/>
                        : null
                }
                {
                    this.state.closeBtn 
                        ? <CloseOutlined onClick={this.handleCloseBtn} className="nav-icon close-btn"/>
                        : null
                }

            </div>

            <div className="right">
                <div className="nav-icon" tabIndex="0">
                    {
                        !this.state.height.matches 
                            ? <Replay />
                            : (() => !this.state.mobileSearchView ? <Search  onClick={this.toggleMobileSearchView} />  : null)()
                    }
                </div>
                <div className="nav-icon" tabIndex="0" onKeyDown={(event) => event.keyCode === 13 ? this.props.gridView() : null} onClick={this.props.gridView} title={ this.props.grid === "column" ? "Column View" : "Row View"}>{ this.props.grid === "column"? <ViewColumn /> : <ViewStream />}</div>
                <div className="nav-icon" tabIndex="0"><SettingsSharp /></div>
                <div>
                    <div tabIndex="0" onKeyDown={(event) => event.keyCode === 13 ? this.setState({ showActionCard: !this.state.showActionCard }) : null} onClick={() => this.setState({ showActionCard: !this.state.showActionCard })}>{image}</div>
                    {
                        this.state.showActionCard
                            ?   <Card className="account-card">
                                    <div>
                                        <div tabIndex="0" onKeyDown={(event) => event.keyCode === 13 ? this.openFileDilog() : null } onClick={this.openFileDilog}>{image}</div><label><strong>{this.props.user.firstName} {this.props.user.lastName}</strong><br />{this.props.user.email}</label>
                                    </div>
                                    <hr className="border"/>
                                    <div>
                                        <Button tabIndex="0" type="small" onClick={this.signOut}>{signOut}</Button>
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
        user: state.user,
        grid: state.layout.grid || "row",
        notes: state.notes.data
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateImage: (imgPath) => dispatch(updateImage(imgPath)),
        toggle: () => dispatch(toggleSidebar()),
        gridView: () => dispatch(gridView())
        // queryNotesList: () => 
    }
}


export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Header))
