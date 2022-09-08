import React, { useState, useEffect, useContext } from 'react'

import RatioItem from '../components/ratioItem'
import { useCookies } from "react-cookie"
import { useNavigate, useLocation } from "react-router-dom"
import axios from 'axios'
import { ModalContext } from "../pages/App"
import { LOCALBASEURL, getUserName } from '../utils/constants'

const AverageModal = () => {
    const context = useContext(ModalContext)
    const [resData, setResData] = useState([])
    const [cookies, setCookie, removeCookie] = useCookies(["access_token"])
    const headers = {Authorization : 'Bearer ' + cookies.access_token}
    const navigate = useNavigate()

    useEffect(() => {
        getRequest()
    },[])

    const getRequest = () =>{
        context.setIsLoading(true)
        axios.get(LOCALBASEURL + "/" + "average", {headers})
        .then((response) => {
            setResData(response["data"])
            context.setIsLoading(false)
        })
        .catch ((error) => {
            console.error(error)
            console.log(error.message)
            navigate("/")
            context.setIsLoading(false)
        })
    }
    
    return (
        <div className="average-modal-container">
            <p className="closeModalButton" onClick={() => context.setAverageModalOpen(false)}>×</p>
            <p className="average-rate-title">平均のデータ</p>
            <RatioItem title="有効打突率" childCount={resData["validAttackCount"]} parentCount={resData["attackCount"]} unit="%"/>
            <RatioItem title="1分あたりの手数" childCount={resData["attackCount"]} parentCount={resData["totalGameTime"]} unit="本"/>
        </div>
    )
}

export default AverageModal