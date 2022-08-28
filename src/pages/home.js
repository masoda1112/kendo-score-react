import Login from '../components/loginModal'
import Register from '../components/registerModal'
import Discription from '../components/discription'
import { Button } from '@mui/material'

import React, { useState, useEffect } from 'react'

// import CircleGraphSection from '../../components/circleGraphSection'
import RatioItem from '../components/ratioItem'
import { useCookies } from "react-cookie"
import axios from 'axios'
import { useNavigate, useLocation } from 'react-router-dom'

import { LOCALBASEURL, getUserName } from '../utils/constants'
import CircleGraphSection from '../components/circleGraphSection'
import BarGraphSection from '../components/barGraphSection'

// const CircleGraphSection = dynamic(() => import("../../components/circleGraphSection"), { ssr: false });
// const BarGraphSection = dynamic(() => import("../../components/barGraphSection"), { ssr: false });

// export async function getStaticPaths() {
//     return {
//       paths: [
//         { params: {userName} }
//       ],
//       fallback: true // false or 'blocking'
//     };
// }


const Home = () => {
    // ここでapiリクエストで円グラフに使用するデータを取得し、配列に定義。
    const [resData, setResData] = useState([])
    const [circleGraphData, setCircleGraphData] = useState([])
    const [barGraphData, setBarGraphData] = useState([])
    const [competitorCircleGraphData, setCompetitorCircleGraphData] = useState([])
    const [graphDataStateCount, setGraphDataStateCount] = useState(0)
    const [cookies, setCookie, removeCookie] = useCookies(["access_token"])
    const location = useLocation()
    const userName = getUserName(location.pathname)
    const headers = {Authorization : 'Bearer ' + cookies.access_token}
    const navigate = useNavigate()


    useEffect(() => {
        getRequest()
    },[])

    useEffect(() => {
        if(resData){
            hashLoop(resData.circleGraphRate, false, 1)
            hashLoop(resData.barGraphRate, true, 2)
            hashLoop(resData.competitorCircleGraphRate, false, 3)
        }
    }, [resData]);

    const getRequest = () =>{
        axios.get(LOCALBASEURL + "/" + userName, {headers})
        .then((response) => {
            setResData(response["data"])
            console.log(response["data"])
        })
        .catch ((error) => {
            console.error(error)
            navigate("/")
        })
    }

    const hashLoop = (hash, bar, graphId) =>{
        setGraphDataStateCount(graphDataStateCount + 1)
        if(graphDataStateCount == 1){
            Object.keys(hash).forEach( function(v, index){
                let data = {name: v, value: this[v]}
                if(bar) data = {name: v, 有効打: this[v]["有効打"], 無効打: this[v]["無効打"]}
                if(graphId == 1){
                    setCircleGraphData((prevState)=> [...prevState, data])
                }else if(graphId == 2){
                    setBarGraphData((prevState)=> [...prevState, data])
                }else if(graphId == 3){
                    setCompetitorCircleGraphData((prevState)=> [...prevState, data])
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
                    <RatioItem title="有効打突率" childCount={resData["validAttackCount"]} parentCount={resData["attackCount"]} unit="%"/>
                    <RatioItem title="1分あたりの手数" childCount={resData["attackCount"]} parentCount={resData["totalGameTime"]} unit="本"/>
                </div>
            </div>
            <CircleGraphSection title="打った技の構成" data={circleGraphData}/>
            <BarGraphSection title="各技の有効打突数" data={barGraphData}/>
            <CircleGraphSection title="打たれた技の構成" data={competitorCircleGraphData}/>
        </div>
    )
}

// export async function getStaticPaths() {
//     return {
//       paths: [
//         { params: {} } // See the "paths" section below
//       ],
//       fallback: false// See the "fallback" section below
//     };
// }

// export async function getStaticProps({ params: { userName } }) {
//     return {
//       props: {userName}, // ページコンポーネントに props として渡されます。
//     }
// }

export default Home