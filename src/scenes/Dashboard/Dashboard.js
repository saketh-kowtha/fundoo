import React from 'react'

import './Dashboard.scss'

import Header from './modules/Header/Header'
import Sidebar from './modules/Sidebar/Sidebar'
import Content from './modules/Content/Content'


import { HashRouter } from "react-router-dom";


class Dashboard extends React.Component {

    render() {
        this.data = ["Label 1", "Label 2"]
        return <HashRouter hashType="noslash" basename={"/"}>
                    <div className="dashboard">
                        <Header />
                        <div>
                            <Sidebar labels={this.data}/>
                            <Content  />
                        </div>
                    </div>
                </HashRouter>
    }
}


export default Dashboard