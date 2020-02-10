import React, {useState} from 'react'

import "./Dropdown.scss"


const genTable = (props) => {
    console.log(props)
    const handleFilter = (event) => {
        setList([...props.items.filter(e => e.label.indexOf(event.target.value) > -1)])
    }

    let list, setList
    if(props.filter === true)
        [list, setList] = useState(props.items)
    else
        list = props.items

    return <ul>
                {
                    props.filter ?
                        <li key={"search"}><input type="text" placeholder="Search" autoFocus onChange={handleFilter}/></li>
                        : null
                }
                {
                    list.map(item => {
                        return <li key={item.id} {...item}>
                            <a>{item.label}</a>
                            {
                                item.type === "input" ?
                                    <input type={item.format} placeholder={item.label}/>
                                : item.type === "menu" ?
                                      genTable(item)
                                        :null
                            }
                        </li>
                    })
                }       
            </ul>
}

const Dropdown = (props) => {
    return <div className="custom-dropdown">
        {genTable(props)}
    </div>
}


export default  Dropdown