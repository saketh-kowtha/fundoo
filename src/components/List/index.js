/**
 * @author Kowtha Saketh
 * @description List Component
 */

import React from 'react'
import {Link} from 'react-router-dom'
import './list.scss'

const List = (props) =>  {
  
        const active = props.active
        return <div className="list">
                    <ul {...props}>
                        {
                            props.data.map(
                                item => <li key={item.label || item.heading} name={item.label} onClick={() => props.onSelect ?  props.onSelect(item.label) : null}>
                                {
                                    item.heading 
                                        ? <a className="list-heading">{item.heading}</a>
                                            : <Link to={item.to ? "/" + item.to : "#"} onClick={item.onClick ? item.onClick : ()=>{ }} className={"list-item" + (active === item.label ? " active" : "")} >
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



export default List


