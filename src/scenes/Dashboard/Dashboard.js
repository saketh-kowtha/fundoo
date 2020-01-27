import React from 'react'

import './Dashboard.scss'

import Header from './modules/Header/Header'
import Sidebar from './modules/Sidebar/Sidebar'
import Content from './modules/Content/Content'
import { connect } from 'react-redux';


import { withRouter, HashRouter } from "react-router-dom";


class Dashboard extends React.Component {

    state={
        sideBar: true
    }

    handleToggle = () => {
        this.setState({sideBar: !this.state.sideBar})
    }



    render() {
        this.data = ["Label 1", "Label 2"]
        return <HashRouter hashType="noslash" basename={"/"}>
                    <div className="dashboard">
                        <Header toggle={this.handleToggle} image={this.props.user.imageUrl} />
                        <div>
                            <Sidebar labels={this.data} enable={this.state.sideBar}/>
                            <Content  />
                        </div>
                    </div>
                </HashRouter>
    }
}


const mapToProps = (state) =>{
    return {
        user: state.user
    }
}

export default withRouter(connect(mapToProps, null)(Dashboard))