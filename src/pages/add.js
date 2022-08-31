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
const modalListLoop = (mapCount, actionArray, setActionList, actionName,  optionList) => {
    const items = []
    for(let i = 0; i < mapCount; i++){
        items.push(
            <AddActionComponent
                key={i}
                index={i}
                array={actionArray} 
                setArray={setActionList} 
                actionName={actionName} 
                actionList={optionList}
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
    const [actionCount, setActionCount] = useState(
        {validAttackCount: 0, competitorValidAttackCount: 0, attackCount: 0, defeatAttackCount: 0, foulCount: 0, competitorFoulCount: 0}
    )
    
    // gameの基本情報（hashにしたらスッキリするかも）
    const [competitorName, setCompetitorName] = useState("")
    const [resultId, setResultId] = useState("")
    const [gameTime, setGameTime] = useState("")

    // 各Actionの一覧を格納（hashにしたらスッキリするかも）
    const [validAttackList, setValidAttackList] = useState([])
    const [competitorValidAttackList, setCompetitorValidAttackList] = useState([])
    const [defeatAttackList, setDefeatAttackList] = useState([])
    const [attackList, setAttackList] = useState([])
    const [foulList, setFoulList] = useState([])
    const [competitorFoulList, setCompetitorFoulList] = useState([])

    // buttonに表示する文字列と反則のリスト
    const nextStepList = ["有効打の入力に進む", "相手の有効打の入力に進む", "敗因となった技の入力に進む", "有効打にならなかった技の入力に進む", "反則の入力に進む", "相手の反則の入力に進む", "送信"]
    const foulOptionList = ["選択してください", "場外反則", "竹刀落とし", "時間空費", "その他"]

    useEffect(() => {
        axios.get(LOCALBASEURL + "/" + userName + "/skills", {headers})
        .then((response) => {
            setSkillOptionList(response["data"])
        })
        .catch ((error) => {
            console.error(error)
        })
    },[])

    const changeBtnString =()=>{
        if(count == 0){
            if(competitorName == "" || resultId == '' || gameTime == ""){
                setInValid(true)
            }else{
                setInValid(false)
                setCount(count + 1)
            }
        }else if(count != 0 && count != 6){
            setCount(count + 1)
        }else if(count == 6){
            // ここでaxios.post
            // postのための準備
            
            const data = {
                'competitor_name': competitorName,
                'result_id': resultId,
                'time': gameTime,
                'valid_attacks': validAttackList,
                'competitor_attacks': defeatAttackList,
                'competitor_valid_attacks': competitorValidAttackList,
                'attacks': attackList,
                'fouls': foulList,
                'competitor_fouls': competitorFoulList,
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
        // setValidAttackCount(validAttackCount + 1)
        setActionCount((prevState)=>({...prevState, validAttackCount: actionCount.validAttackCount + 1}))
        setValidAttackList([...validAttackList, null])
    }

    const addCompetitorValidAttack = () => {
        setActionCount((prevState)=>({...prevState, competitorValidAttackCount: actionCount.competitorValidAttackCount + 1}))
        setCompetitorValidAttackList([...competitorValidAttackList, null])
    }

    const addDefeatAttack = () => {
        setActionCount((prevState)=>({...prevState, defeatAttackCount: actionCount.defeatAttackCount + 1}))
        setDefeatAttackList([...defeatAttackList, null])
    }

    const addAttack = () => {
        setActionCount((prevState)=>({...prevState, attackCount: actionCount.attackCount + 1}))
        setAttackList([...attackList, null])
    }

    const addFoul = () => {
        setActionCount((prevState)=>({...prevState, foulCount: actionCount.foulCount + 1}))
        setFoulList([...foulList, null])
    }

    const addCompetitorFoul = () => {
        setActionCount((prevState)=>({...prevState, competitorFoulCount: actionCount.competitorFoulCount + 1}))
        setCompetitorFoulList([...competitorFoulList, null])
    }

    useEffect(() => {window.scrollTo(0, 0)}, []);

    return (
        <div className="addgame">
            {/* ここに進捗具合がわかるメータを入れる */}
            <div className="addgame-container">
                <LinearProgress value={count * (100 / 6)} variant="determinate"/>
                <form>
                    <div className={(count != 0) ? "remove valid-attack-wrapper" : "valid-attack-wrapper"}>
                        <p className="modal-list-title">試合概要</p>
                        <div className='game-overview-wrapper'>
                            <div className='input-form name-input'>
                                <TextField value={competitorName} label="相手の名前" variant="standard" fullWidth required type="text" name="name" onChange={(e) => setCompetitorName(e.target.value)}/>
                            </div>
                            <div className='input-form name-input'>
                                <TextField 
                                    fullWidth 
                                    label="試合時間（秒）"
                                    className="input-form-time" 
                                    type="number" 
                                    name="time"
                                    required
                                    variant="standard"
                                    step="0.1" 
                                    onChange={(e) => setGameTime(e.target.value)}
                                    InputProps={{
                                        endAdornment: <InputAdornment position="end">秒</InputAdornment>,
                                    }}
                                />
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
                        <p className="modal-list-title">自分の有効打突</p>
                        { modalListLoop(actionCount.validAttackCount, validAttackList, setValidAttackList, "有効打突", skillOptionList )}
                        <p className="add-modal-btn" onClick={() => addValidAttack()}>＋ 有効打突を追加する</p>
                    </div>
                    <div className={(count != 2) ? "remove competitor-attack-wrapper" : "foul-wrapper"}>
                        <p className="modal-list-title">相手の有効打突</p>
                        { modalListLoop(actionCount.competitorValidAttackCount, competitorValidAttackList, setCompetitorValidAttackList, "相手の有効打突", skillOptionList )}
                        <p className="add-modal-btn" onClick={() => addCompetitorValidAttack()}>＋ 相手の有効打を追加する</p>
                    </div>
                    <div className={(count != 3) ? "remove attack-wrapper" : "attack-wrapper"}>
                        <p className="modal-list-title">敗因になった技</p>
                        { modalListLoop(actionCount.defeatAttackCount, defeatAttackList, setDefeatAttackList, "敗因になった技", skillOptionList )}
                        <p className="add-attack-btn add-modal-btn" onClick={() => addDefeatAttack()}>＋ 敗因になった技を追加する</p>
                    </div>
                    <div className={(count != 4) ? "remove attack-wrapper" : "attack-wrapper"}>
                        <p className="modal-list-title">有効打にならなかった技</p>
                        { modalListLoop(actionCount.attackCount, attackList, setAttackList, "打った技", skillOptionList )}
                        <p className="add-attack-btn add-modal-btn" onClick={() => addAttack()}>＋ 有効打にならなかった技を追加する</p>
                    </div>
                    <div className={(count != 5) ? "remove foul-wrapper" : "foul-wrapper"}>
                        <p className="modal-list-title">反則</p>
                        { modalListLoop(actionCount.foulCount, foulList, setFoulList, "反則", foulOptionList )}
                        <p className="add-modal-btn" onClick={() => addFoul()}>＋ 反則を追加する</p>
                    </div>
                    <div className={(count != 6) ? "remove competitor-foul-wrapper" : "foul-wrapper"}>
                        <p className="modal-list-title">相手の反則</p>
                        { modalListLoop(actionCount.competitorFoulCount, competitorFoulList, setCompetitorFoulList, "相手の反則", foulOptionList )}
                        <p className="add-modal-btn" onClick={() => addCompetitorFoul()}>＋ 相手の反則を追加する</p>
                    </div>
                </form>
                {(inValid) ? <Validator /> : <></>}
                <Button variant="contained" onClick={() => changeBtnString()}>{nextStepList[count]}</Button>
            </div>
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


export default RecordGame