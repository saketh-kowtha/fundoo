import React from 'react'
import './card.scss'

/**
 * Elevated Card Component
 * @param {*} props 
 */
const elevatedCard = (props) => {
    let className = ["card"]
    className.push("elevated")
    if(props.className)
        className.push(props.className)
    return <div className={className.join(" ")} >{props.children}</div>
}


/**
 * Ouline Card Component
 * @param {*} props 
 */
const oulinedCard = (props) => {
    let className = ["card"]
    className.push("outlined")
    if(props.className)
        className.push(props.className)
    return <div className={className.join(" ")} >{props.children}</div>
}

/**
 * Interactive Card Component
 * @param {*} props 
 */
const interactiveCard = (props) => {
    let className = ["card"]
    className.push("outlined")
    className.push("interactive")
    if(props.className)
        className.push(props.className)
    return <div className={className.join(" ")} >{props.children}</div>
}

/**
 * Card Component
 * @description Card is stateless Component
 * @param {*} props 
 */
const Card = (props) => {
    if(props.elevated)
        return elevatedCard(props)
    else if(props.interactive)
        return interactiveCard(props)
    else
        return oulinedCard(props)
}

export default Card