import React from 'react'

import './Dashboard.scss'

import Header from './modules/Header/Header'
import Sidebar from './modules/Sidebar/Sidebar'
import Content from './modules/Content/Content'
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";

class Dashboard extends React.Component {

    state={
        sideBar: true
    }

    handleToggle = () => {
        this.setState({sideBar: !this.state.sideBar})
    }

    render() {
        return <div className="dashboard">
            <Header toggle={this.handleToggle} image={this.props.user.imageUrl} />
            <div style={{display: 'flex'}}>
                <Sidebar enable={this.state.sideBar}/>
                <Content />
            </div>
        </div>
    }
}


const mapToProps = (state) =>{
    return {
        user: state.user
    }
}

export default connect(mapToProps, null)(Dashboard)