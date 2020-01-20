import React from 'react'

import './Dashboard.scss'
import Header from './modules/Header/Header'
import Sidebar from './modules/Sidebar/Sidebar'

class Dashboard extends React.Component {
    render() {
        return <div className="dashboard">
            <Header />
            <Sidebar/>
            {/* <Content /> */}
        </div>
    }
}


export default Dashboard