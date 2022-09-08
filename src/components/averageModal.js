import React, { useState, useEffect, useContext } from 'react'

import RatioItem from '../components/ratioItem'
import { useCookies } from "react-cookie"
import { useNavigate, useLocation } from "react-router-dom"
import axios from 'axios'
import { ModalContext } from "../pages/App"
import { LOCALBASEURL, getUserName } from '../utils/constants'

const AverageModal = () => {
    // axiosでget(cookie使用)
    // useNavigate
    const context = useContext(ModalContext)
    const [resData, setResData] = useState([])
    const [cookies, setCookie, removeCookie] = useCookies(["access_token"])
    const location = useLocation()
    const userName = getUserName(location.pathname)
    const headers = {Authorization : 'Bearer ' + cookies.access_token}
    const navigate = useNavigate()

    useEffect(() => {
        getRequest()
    },[])

    // const closeModal =()=> {
    //     context.setAverage(false)
    // }

    const getRequest = () =>{
        axios.get(LOCALBASEURL + "/" + userName, {headers})
        .then((response) => {
            setResData(response["data"])
        })
        .catch ((error) => {
            console.error(error)
            console.log(error.message)
            navigate("/")
        })
    }
    
    return (
        <div className="average-modal-container">
            <p className="closeModalButton" onClick={() => context.setAverageModalOpen(false)}>×</p>
            <p className="average-rate-title">平均のデータ</p>
            <RatioItem title="勝率" childCount={resData["winGameCount"]} parentCount={resData["totalGameCount"]} unit="%"/>
            <RatioItem title="敗率" childCount={resData["loseGameCount"]} parentCount={resData["totalGameCount"]} unit="%"/>
            <RatioItem title="有効打突率" childCount={resData["validAttackCount"]} parentCount={resData["attackCount"]} unit="%"/>
            <RatioItem title="1分あたりの手数" childCount={resData["attackCount"]} parentCount={resData["totalGameTime"]} unit="本"/>
        </div>
    )
}

export default AverageModal