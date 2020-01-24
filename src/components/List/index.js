/**
 * @author Kowtha Saketh
 * @description List Component
 */

import React from 'react'
import {Link} from 'react-router-dom'
import './list.scss'

class List extends React.Component  {
  
    render(){
        const activeEle = this.props.activeEle
        return <div className="list">
                    <ul {...this.props}>
                        {
                            this.props.data.map(
                                item => <li key={item.label || item.heading} name={item.label} onClick={() => this.props.onSelect ?  this.props.onSelect(item.label) : null}>
                                {
                                    item.heading 
                                        ? <a className="list-heading">{item.heading}</a>
                                        : <Link to={item.to ? "/"+ item.to : "#"} className={"list-item" + (activeEle === item.label ? " active" : "")} >
                                                <React.Fragment>
                                                    {item.icon ? <i className="material-icons-outlined">{item.icon}</i> : null}
                                                    <span>{item.label}</span>
                                                </React.Fragment>
                                            </Link>
                                        }
                                </li>)
                        }
                    </ul>
                </div>
    }
}


export default List


