import React, { useState, useEffect, useContext } from 'react'

import RatioItem from '../components/ratioItem'
import { useCookies } from "react-cookie"
import axios from 'axios'
import { useNavigate, useLocation, Link } from 'react-router-dom'

import { Button } from '@mui/material'
import { LOCALBASEURL, getUserName } from '../utils/constants'
import CircleGraphSection from '../components/circleGraphSection'
import { ModalContext } from './App'
import AllUserModal from './allUserData'

const Home = () => {
    // ここでapiリクエストで円グラフに使用するデータを取得し、配列に定義。
    const [resData, setResData] = useState([])
    const [circleGraphData, setCircleGraphData] = useState([])
    const [competitorCircleGraphData, setCompetitorCircleGraphData] = useState([])
    const [opportunityGraphData, setOpportunityGraphData] = useState([])
    const [competitorOpportunityGraphData, setCompetitorOpportunityGraphData] = useState([])
    const [graphDataStateCount, setGraphDataStateCount] = useState(0)
    const [cookies, setCookie, removeCookie] = useCookies(["access_token"])
    const location = useLocation()
    const userName = getUserName(location.pathname)
    const headers = {Authorization : 'Bearer ' + cookies.access_token}
    const navigate = useNavigate()
    const context = useContext(ModalContext)

    useEffect(() => {
        window.scrollTo(0, 0)
        getRequest()
    },[])

    console.log(resData)

    useEffect(() => {
        if(resData){
            hashLoop(resData.circleGraphRate, false, 1)
            hashLoop(resData.competitorCircleGraphRate, false, 2)
            hashLoop(resData.opportunityGraphRate, false, 3)
            hashLoop(resData.competitorOpportunityGraphRate, false, 4)
        }
    }, [resData]);

    const getRequest = () =>{
        context.setIsLoading(true)
        axios.get(LOCALBASEURL + "/" + userName, {headers})
        .then((response) => {
            setResData(response["data"])
            context.setIsLoading(false)
        })
        .catch ((error) => {
            console.error(error)
            console.log(error.message)
            context.setIsLoading(false)
            navigate("/")
        })
    }

    const hashLoop = (hash, bar, graphId) =>{
        setGraphDataStateCount(graphDataStateCount + 1)
        if(graphDataStateCount == 1){
            Object.keys(hash).forEach( function(v, index){
                let data = {name: v, value: this[v]}
                // if(bar) data = {name: v, 有効打: this[v]["有効打"], 無効打: this[v]["無効打"], 被有効打: this[v]["被有効打"]}
                if(graphId == 1){
                    setCircleGraphData((prevState)=> [...prevState, data])
                }else if(graphId == 2){
                    setCompetitorCircleGraphData((prevState)=> [...prevState, data])
                }else if(graphId == 3){
                    setOpportunityGraphData((prevState) => [...prevState, data])
                }else if(graphId == 4){
                    setCompetitorOpportunityGraphData((prevState) => [...prevState, data])
                }
            }, hash)
        }
    }

    return (
        <div className="home">
            <div className="top-section">
                <div className="top-section-container">
                    <RatioItem title="勝率" childCount={resData["winGameCount"]} parentCount={resData["totalGameCount"]} unit="%"/>
                    <RatioItem title="敗率" childCount={resData["loseGameCount"]} parentCount={resData["totalGameCount"]} unit="%"/>
                    <Link to={'/' + userName + '/allUser'}>
                        <Button variant='outlined'>みんなのデータを見る ▶︎</Button>
                    </Link>
                </div>
            </div>
            <CircleGraphSection title="有効打突の構成" data={circleGraphData}/>
            <CircleGraphSection title="打たれた技の構成" data={competitorCircleGraphData}/>
            <CircleGraphSection title="有効打突の機会の構成" data={opportunityGraphData}/>
            <CircleGraphSection title="打たれた機会の構成" data={competitorOpportunityGraphData}/>
            {/* {(context.allUserModalOpen) ? <div className="all-user-modal"><AllUserModal /></div> : <></>} */}
        </div>
    )
}


export default Home