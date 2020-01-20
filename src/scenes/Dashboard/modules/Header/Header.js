import React from 'react'
import './Header.scss'

const Header = (props) => {
    return <div className="header">
        <div className="left">
            <div>Drawer</div>
            <div>Drawer</div>
        </div>
        <div className="center">
            <input type="text" />
        </div>
        <div className="right">
            <div>Grid</div>
            <div>Profile</div>
        </div>
    </div>
}


export default Header