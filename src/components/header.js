import { Link, useLocation } from 'react-router-dom'

import React, { useState, useContext } from 'react'
import { getUserName } from '../utils/constants'

const Header =()=> {
    const location = useLocation()
    const userName = getUserName(location.pathname)
    return (
        <div className="header">
            <div className="header-inner">
                <div className="header-left">
                    <Link to={'/' + userName}>KSB</Link>
                </div>
                <div className="header-right">
                    <Link to={'/' + userName + '/games'}><span className="header-right-first">一覧</span></Link>
                    <Link to={'/' + userName + '/add'}><span className="header-btn">記録する</span></Link>
                </div>
            </div>
        </div>
    )
}

export default Header