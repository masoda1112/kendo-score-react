// import BarGraphSection from "../../components/barGraphSection"
import React, { useState, useEffect, useContext } from 'react'
import { useCookies } from "react-cookie"
// import dynamic from "next/dynamic"
import axios from 'axios'

import GameOverView from "../components/gameOverView"
import { LOCALBASEURL, getUserName } from '../utils/constants'
import { useNavigate, useLocation } from 'react-router-dom'
import BarGraphSection from '../components/barGraphSection'
import CircleGraphSection from '../components/circleGraphSection'
import { ModalContext } from './App'
import { Button } from '@mui/material'



const Game =()=>{
    const [gameInfo, setGameInfo] = useState("")
    const location = useLocation()
    const userName = getUserName(location.pathname)
    const [cookies, setCookie, removeCookie] = useCookies(["access_token"])
    const headers = {Authorization : 'Bearer ' + cookies.access_token}
    const context = useContext(ModalContext)

    // gameId取得
    const navigate = useNavigate()
    const slicePosition = location.pathname.indexOf('/', location.pathname.indexOf('/') + 1)
    const gameId = Number(location.pathname.substring(slicePosition + 1))
    const data = {"game_id": gameId}

    useEffect(() => {
        window.scrollTo(0, 0)
        getRequest()
    },[])


    const getRequest = async() => {
        context.setIsLoading(true)
        axios.get(LOCALBASEURL + "/" + userName + "/" + gameId,  {headers})
        .then((response) => {
            setGameInfo(response["data"])
            context.setIsLoading(false)
        })
        .catch ((error) => {
            console.error(error)
            navigate("/")
            context.setIsLoading(false)
        })
    }

    const destroyGame = () => {
        axios.post(LOCALBASEURL + "/" + userName + "/" + gameId + "/destroy", data,  {headers})
        .then((response) => {
            console.log(response)
            navigate("/" + userName + "/games")
        })
        .catch ((error) => {
            console.error(error)
            navigate("/")
        })
    }


    return (
        <div className="game">
            <div className="game-overview-section">
                <div className="game-overview-section-container">
                    <GameOverView 
                        id={gameInfo.id} 
                        date={gameInfo.date} 
                        userName={userName} 
                        attacks={gameInfo.valid_attack_list} 
                        competitorName={gameInfo.competitor_name} 
                        // competitorValidAttacks={gameInfo.competitor_valid_attack_list}
                    />
                    <div className="game-overview-section-bottom">
                        <p className="game-overview-section-attack">有効打突:
                            {
                                (!gameInfo.valid_attack_skill_name) ? <></> :
                                gameInfo.valid_attack_skill_name.map((value, index)=>{
                                    return <span className="game-overview-section-foul" key={index}>{" " + value + "(" + userName + ")" + ","}</span>
                                })
                            }
                            {
                                (!gameInfo.competitor_valid_attack_skill_name) ? <></> :
                                gameInfo.competitor_valid_attack_skill_name.map((value, index)=>{
                                    return <span className="game-overview-section-foul" key={index}>{" " + value + "(" + gameInfo.competitor_name + ")" + ","}</span>
                                })
                            }
                        </p>
                        <p className="game-overview-section-foul">反則:
                            {
                            (!gameInfo.foul_list) ? <></> :
                            gameInfo.foul_list.map((value, index)=>{
                                return <span className="game-overview-section-foul" key={index}>{" " + value + "(" + userName + ")" + ","}</span>
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
            <div className="game-buttom-section">
                <Button className="game-destroy-btn" variant="outlined" color="error" onClick={()=>destroyGame()}>ゲームを削除</Button>
            </div>
        </div>
    )
}


export default Game