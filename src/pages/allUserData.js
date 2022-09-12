import React, { useState, useEffect, useContext } from 'react'
import { useCookies } from "react-cookie"
import { useNavigate, useLocation } from "react-router-dom"
import axios from 'axios'
import { ModalContext } from "./App"
import { LOCALBASEURL, getUserName } from '../utils/constants'
import CircleGraphSection from '../components/circleGraphSection'

const AllUserData = () => {
    console.log("open")
    const context = useContext(ModalContext)
    const [resData, setResData] = useState([])
    const [circleGraphData, setCircleGraphData] = useState([])
    const [opportunityGraphData, setOpportunityGraphData] = useState([])
    const [graphDataStateCount, setGraphDataStateCount] = useState(0)
    const [cookies, setCookie, removeCookie] = useCookies(["access_token"])
    const headers = {Authorization : 'Bearer ' + cookies.access_token}
    const navigate = useNavigate()

    useEffect(() => {
        getRequest()
    },[])

    useEffect(() => {
        if(resData){
            hashLoop(resData.circleGraphRate, 1)
            hashLoop(resData.opportunityGraphRate, 2)
        }
    }, [resData]);

    const getRequest = () =>{
        context.setIsLoading(true)
        axios.get(LOCALBASEURL + "/" + "allUserData", {headers})
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

    const hashLoop = (hash, graphId) =>{
        setGraphDataStateCount(graphDataStateCount + 1)
        if(graphDataStateCount == 1){
            Object.keys(hash).forEach( function(v, index){
                let data = {name: v, value: this[v]}
                if(graphId == 1){
                    setCircleGraphData((prevState)=> [...prevState, data])
                }else if(graphId == 2){
                    setOpportunityGraphData((prevState)=> [...prevState, data])
                }
            }, hash)
        }
    }
    
    return (
        <div className="all-user-page">
            {/* <p className="closeModalButton" onClick={() => context.setAllUserModalOpen(false)}>×</p> */}
            <p className="all-user-rate-title">全ユーザーの総計</p>
            <CircleGraphSection title="有効打突の構成" data={circleGraphData}/>
            <CircleGraphSection title="機会の構成" data={opportunityGraphData}/>
        </div>
    )
}

export default AllUserData