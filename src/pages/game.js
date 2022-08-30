// import BarGraphSection from "../../components/barGraphSection"
import React, { useState, useEffect } from 'react'
import { useCookies } from "react-cookie"
// import dynamic from "next/dynamic"
import axios from 'axios'

import GameOverView from "../components/gameOverView"
import { LOCALBASEURL, getUserName } from '../utils/constants'
import { useNavigate, useLocation } from 'react-router-dom'
import BarGraphSection from '../components/barGraphSection'
import CircleGraphSection from '../components/circleGraphSection'

// const CircleGraphSection = dynamic(() => import("../../components/circleGraphSection"), { ssr: false });
// const BarGraphSection = dynamic(() => import("../../components/barGraphSection"), { ssr: false });

// export async function getStaticPaths() {
//     return {
//       paths: [
//         { params: {game} }
//       ],
//       fallback: true // false or 'blocking'
//     };
// }


const Game =()=>{
    const [gameInfo, setGameInfo] = useState("")
    const [graphDataState, setGraphDataState] = useState([])
    const [competitorGraphDataState, setCompetitorGraphDataState] = useState([])
    const [graphDataStateCount, setGraphDataStateCount] = useState(0)
    const location = useLocation()
    const userName = getUserName(location.pathname)
    const [cookies, setCookie, removeCookie] = useCookies(["access_token"])
    const headers = {Authorization : 'Bearer ' + cookies.access_token}

    // gameId取得
    const navigate = useNavigate()
    const slicePosition = location.pathname.indexOf('/', location.pathname.indexOf('/') + 1)
    const gameId = Number(location.pathname.substring(slicePosition + 1))

    useEffect(() => {
        window.scrollTo(0, 0)
        getRequest()
    },[])

    useEffect(() => {
        if(gameInfo){
            if(gameInfo.attack_list.length != 0){
                setGraphDataLoop(gameInfo.attack_list, false)
            }
            if(gameInfo.competitor_attack_list.length != 0){
                setGraphDataLoop(gameInfo.competitor_attack_list, true)
            }
        }
    }, [gameInfo]);

    const setGraphDataLoop = ($array, $competitor) => {
        Object.keys($array).forEach( function(v, index){
            const data = {name: v, 有効打: this[v]["有効打"], 無効打: this[v]["無効打"]};
            ($competitor) ? setCompetitorGraphDataState((prevState)=> [...prevState, data]) : setGraphDataState((prevState)=> [...prevState, data])
        }, $array)
    }

    const getRequest = async() => {
        axios.get(LOCALBASEURL + "/" + userName + "/" + gameId,  {headers})
        .then((response) => {
            setGameInfo(response["data"])
        })
        .catch ((error) => {
            console.error(error)
            navigate("/")
        })
    }


    return (
        <div className="game">
            <div className="game-overview-section" >
                <div className="game-overview-section-container">
                    <GameOverView 
                        id={gameInfo.id} 
                        date={gameInfo.date} 
                        userName={userName} 
                        validAttacks={gameInfo.valid_attack_list} 
                        competitorName={gameInfo.competitor_name} 
                        competitorValidAttacks={gameInfo.competitor_valid_attack_list}
                    />
                    <div className="game-overview-section-bottom">
                        <p className="game-overview-section-time">{"試合時間: " + gameInfo.time + "秒"}</p>
                        <p className="game-overview-section-foul">反則:
                            {
                            (!gameInfo.foul_list) ? <></> :
                            gameInfo.foul_list.map((value, index)=>{
                                return <span className="game-overview-section-foul" key={index}>{" " + userName + value + ","}</span>
                            })
                            }
                            {
                                (!gameInfo.competitor_foul_list) ? <></> :
                                gameInfo.competitor_foul_list.map((value, index)=>{
                                    return <span className="game-overview-section-foul" key={index}>{" " + value + "(" + gameInfo.competitor_name + ")" + ","}</span>
                                })
                            }
                        </p>
                    </div>
                </div>
            </div>
            <BarGraphSection title="出した技" data={graphDataState}/>
            <BarGraphSection title="出された技" data={competitorGraphDataState}/>
        </div>
    )
}

// export async function getStaticPaths() {
//     // ここで全てのidを取得してexportしておくといいのかも
//     return {
//       paths: [
//         { params: {} } // See the "paths" section below
//       ],
//       fallback: false// See the "fallback" section below
//     };
// }

// export async function getStaticProps({ params: { game } }) {
//     return {
//       props: {game}, // ページコンポーネントに props として渡されます。
//     }
// }

export default Game