import { Button , TextField, Select, MenuItem, InputLabel, FormControl, InputAdornment, LinearProgress} from '@mui/material'
import React, { useState, useEffect } from 'react'
// import { useRouter } from 'next/router'
import { useNavigate, useLocation } from 'react-router-dom'
import { useCookies } from "react-cookie"
import axios from 'axios'

import AddActionComponent from '../components/addActionComponent'
import Validator from '../components/validator'
import { SKILLOPTIONLIST, LOCALBASEURL , getUserName} from '../utils/constants'

// Modalのループ表示関数
const modalListLoop = (mapCount, setActionCount, actionArray, setActionList, actionName,  optionList, opportunityList, isAttack) => {
    const items = []
    for(let i = 0; i < mapCount; i++){
        items.push(
            <AddActionComponent
                key={i}
                index={i}
                count={mapCount}
                setCount={setActionCount}
                array={actionArray} 
                setArray={setActionList} 
                actionName={actionName} 
                actionList={optionList}
                opportunityList={opportunityList}
                isAttack={isAttack}
            />
        )
    }
    return <>{items}</>
}

const RecordGame =()=>{
    // postの準備
    const navigate = useNavigate()
    const [cookies, setCookie, removeCookie] = useCookies(["access_token"])
    const location = useLocation()
    const userName = getUserName(location.pathname)
    // const [skillInfo, setSkillInfo] = useState("")
    const [skillOptionList, setSkillOptionList] =  useState("")
    const headers = {Authorization : 'Bearer ' + cookies.access_token}

    // 入力step制御
    const [count, setCount] = useState(0)

    // gameの基本情報のvalidationを制御
    const [inValid, setInValid] = useState(false)

    // 各Modalの個数
    const [foulCount, setfoulCount] = useState(0)
    // const [competitorFoulCount, setCompetitorFoulCount] = useState(0)
    // const [competitorValidAttackCount, setCompetitorValidAttackCount] = useState(0)
    const [validAttackCount, setValidAttackCount] = useState(0)
    
    // gameの基本情報（hashにしたらスッキリするかも）
    const [competitorName, setCompetitorName] = useState("")
    const [resultId, setResultId] = useState("")
    // const [gameTime, setGameTime] = useState("")

    // 各Actionの一覧を格納（hashにしたらスッキリするかも）
    const [validAttackList, setValidAttackList] = useState([])
    // const [competitorValidAttackList, setCompetitorValidAttackList] = useState([])
    // const [defeatAttackList, setDefeatAttackList] = useState([])
    // const [attackList, setAttackList] = useState([])
    const [foulList, setFoulList] = useState([])
    // const [competitorFoulList, setCompetitorFoulList] = useState([])

    // buttonに表示する文字列と反則のリスト
    const nextStepList = ["有効打の入力に進む", "反則の入力に進む", "送信"]

    const foulOptionList = [
        {id: 0, name: "選択してください"},
        {id: 1, name: "場外反則"},
        {id: 2, name: "竹刀落とし"},
        {id: 3, name: "時間空費"},
        {id: 4, name: "その他"},
    ]

    const opportunityList = [
        "選択してください",
        "入り際",
        "鍔迫り合い",
        "出鼻",
        "応じ",
        "近間",
        "避けたところ",
        "居着き",
        "後打ち",
    ]

    useEffect(() => {
        axios.get(LOCALBASEURL + "/" + userName + "/skills", {headers})
        .then((response) => {
            setSkillOptionList(response["data"]["skills"])
        })
        .catch ((error) => {
            console.error(error)
        })
    },[])

    console.log(skillOptionList)


    const changeBtnString =()=>{
        if(count == 0){
            if(competitorName == "" || resultId == ''){
                setInValid(true)
            }else{
                setInValid(false)
                setCount(count + 1)
            }
        }else if(count != 0 && count != 2){
            setCount(count + 1)
        }else if(count == 2){
            // ここでaxios.post
            // postのための準備
            
            const data = {
                'competitor_name': competitorName,
                'result_id': resultId,
                // 'time': gameTime,
                'valid_attacks': validAttackList,
                // 'defeat_attacks': defeatAttackList,
                // 'competitor_valid_attacks': competitorValidAttackList,
                // 'attacks': attackList,
                'fouls': foulList,
                // 'competitor_fouls': competitorFoulList,
            }

            
            axios.post(LOCALBASEURL + "/" + userName + "/add", data, {headers})
            .then((response) => {
                navigate("/" + userName + "/games")
            })
            .catch ((error) => {
                console.error(error)
                navigate("/")
            })
            setCount(0)
        }
    }


    // 各Modalを追加する処理
    const addValidAttack = () => {
        setValidAttackCount(validAttackCount + 1)
        setValidAttackList([...validAttackList, null])
    }

    // const addCompetitorValidAttack = () => {
    //     setCompetitorValidAttackCount(competitorValidAttackCount + 1)
    //     setCompetitorValidAttackList([...competitorValidAttackList, null])
    // }

    const addFoul = () => {
        setfoulCount(foulCount + 1)
        setFoulList([...foulList, null])
    }

    // const addCompetitorFoul = () => {
    //     setCompetitorFoulCount(competitorFoulCount + 1)
    //     setCompetitorFoulList([...competitorFoulList, null])
    // }

    useEffect(() => {window.scrollTo(0, 0)}, []);

    console.log("validAttackList",validAttackList,"foulList",foulList )

    return (
        <div className="addgame">
            {/* ここに進捗具合がわかるメータを入れる */}
            <div className="addgame-container">
                <LinearProgress value={count * (100 / 2)} variant="determinate"/>
                <form>
                    <div className={(count != 0) ? "remove valid-attack-wrapper" : "valid-attack-wrapper"}>
                        <p className="modal-list-title">試合概要</p>
                        <div className='game-overview-wrapper'>
                            <div className='input-form name-input'>
                                <TextField value={competitorName} label="相手の名前" variant="standard" fullWidth required type="text" name="name" onChange={(e) => setCompetitorName(e.target.value)}/>
                            </div>
                            <div className='input-form result-input'>
                                <FormControl variant="standard" required fullWidth>
                                    <InputLabel id="result-label">結果</InputLabel>
                                    <Select
                                        labelId="result-label"
                                        id="result"
                                        value={resultId}
                                        label="結果"
                                        onChange={(e) => setResultId(e.target.value)}
                                    >
                                        <MenuItem value=""></MenuItem>
                                        <MenuItem value={1}>勝利</MenuItem>
                                        <MenuItem value={2}>敗北</MenuItem>
                                        <MenuItem value={3}>引き分け</MenuItem>
                                    </Select>
                                </FormControl>
                            </div>
                        </div>
                    </div>
                    <div className={(count != 1) ? "remove valid-attack-wrapper" : "valid-attack-wrapper"}>
                        <p className="modal-list-title">有効打突</p>
                        { modalListLoop(validAttackCount, setValidAttackCount, validAttackList, setValidAttackList, "有効打突", skillOptionList, opportunityList, true )}
                        {(validAttackCount < 3) ? <Button variant='outlined' className="add-modal-btn" onClick={() => addValidAttack()}>＋ {(validAttackCount + 1) + "本目の有効打突を追加する"}</Button> : <></>}
                    </div>
                    {/* <div className={(count != 2) ? "remove competitor-attack-wrapper" : "foul-wrapper"}>
                        <p className="modal-list-title">相手の有効打突</p>
                        {modalListLoop(competitorValidAttackCount, setCompetitorValidAttackCount, competitorValidAttackList, setCompetitorValidAttackList, "相手の有効打突", skillOptionList , opportunityList, true)}
                        {(competitorValidAttackCount < 2) ? <p className="add-modal-btn" onClick={() => addCompetitorValidAttack()}>＋ 相手の有効打を追加する</p> : <></>}
                    </div> */}
                    <div className={(count != 2) ? "remove foul-wrapper" : "foul-wrapper"}>
                        <p className="modal-list-title">反則</p>
                        { modalListLoop(foulCount, setfoulCount, foulList, setFoulList, "反則", foulOptionList, opportunityList, false )}
                        { (foulCount < 8) ? <Button variant='outlined' className="add-modal-btn" onClick={() => addFoul()}>＋　{(foulCount + 1) + "回目の反則を追加する"}</Button> : <></>}
                    </div>
                    {/* <div className={(count != 4) ? "remove competitor-foul-wrapper" : "foul-wrapper"}>
                        <p className="modal-list-title">相手の反則</p>
                        { modalListLoop(competitorFoulCount, setCompetitorFoulCount, competitorFoulList, setCompetitorFoulList, "相手の反則", foulOptionList, opportunityList, false )}
                        { (competitorFoulCount < 4) ? <p className="add-modal-btn" onClick={() => addCompetitorFoul()}>＋ 相手の反則を追加する</p> : <></>}
                    </div> */}
                </form>
                {(inValid) ? <Validator /> : <></>}
                <Button className="input-progress-btn"variant="contained" onClick={() => changeBtnString()}>{nextStepList[count]}</Button>
            </div>
        </div>
    )
}


export default RecordGame