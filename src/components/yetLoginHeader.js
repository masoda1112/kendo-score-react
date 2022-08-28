import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { ModalContext } from '../pages/App'

const YetLoginHeader =()=> {
    const value = useContext(ModalContext)
    const onClickRegister =()=> {
        value.setRegisterModalOpen(true)
    }

    const onClickLogin =()=> {
        value.setLoginModalOpen(true)
    }

    return (
        <div className="header">
            <div className="header-inner">
                <div className="header-left">
                <p onClick={() => onClickLogin()}>ログイン</p>
                </div>
                <div className="header-right">
                    <Link to="/" onClick={() => onClickRegister()}><span className="header-btn" onClick={() => onClickRegister()}>無料登録</span></Link>
                </div>
            </div>
        </div>
    )
}

export default YetLoginHeader