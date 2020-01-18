import React from 'react'
import {LANGUAGES} from '../../constants'
import {languageChangeEvent} from '../../helper'

const LanguageSelection = () => {
    return <div style={{margin: "10px"}}>
        {Object.keys(LANGUAGES).map(e => <a style={{margin: "10px"}} onClick={() => languageChangeEvent(e)} key={e} href="#">{LANGUAGES[e]}</a>)}
    </div>
}

export default LanguageSelection