import React, { useEffect, useState } from "react"
import { Select, MenuItem, InputLabel, FormControl} from '@mui/material'

const AddActionComponent = ({index, count, setCount, array, setArray, actionName, actionList, opportunityList, isAttack}) => {
    const [remove, setRemove] = useState(false)
    const [action, setAction] = useState("")
    const [actionId, setActionId] = useState(0)
    const [opportunity, setOpportunity] = useState("")
    const [competitor, setCompetitor] = useState("")
    const [selectNumber, setSelectNumber] = useState("")
    const [selected, setSelected] = useState(false)

    const users = ["自分", "相手"]

    const classToggle = () => {
        setRemove(true)
        // ×が押されたモーダルのindexを把握する
        setArray(
            array.map((value, i) => (i === index ? null : value))
        )
        setCount(count - 1)
    }

    const addAction=(target)=>{
        setAction(target.value["name"])
        setActionId(target.value["id"])
        setSelectNumber(target.index)
    }

    useEffect(() => {
        if(isAttack){
            if(competitor != "" && actionId != 0 && opportunity != ""){
                setSelected(true)
                setArray(
                    array.map((v, i) => (i === index ? {competitor: competitor, action: actionId, opportunity: opportunity} : v))
                )
            }
        }else{
            if(competitor != "" && actionId != 0){
                setSelected(true)
                setArray(
                    array.map((v, i) => (i === index ? {competitor: competitor, action: actionId} : v))
                )
            }
        }
    },[competitor, actionId, opportunity])

    console.log(action, opportunity)

    return (
        <div className={(remove) ? 'remove' : 'action-component'}>
            <p className="close-btn" onClick={() => classToggle()}>×</p>
            {
                (selected) ? <div className="selected-action-container">
                    <p className="selected-action">{(isAttack) ? "打った人:" + competitor : "反則した人:" + competitor}<br/>
                        {(isAttack) ? "技:" + action : "反則:" + action}<br/>
                        {(isAttack) ? "機会:" + opportunity : ""}
                    </p>
                </div> :
                <div className='input-form name-input'>
                    <FormControl fullWidth className="select-form">
                        <InputLabel id="competitor" className="action-select-label">{(isAttack) ? "打った人" : "反則した人"}</InputLabel>
                        <Select
                            labelId="competitor"
                            id="competitor"
                            // value={competitor}
                            label="competitor"
                            onChange={(e) => setCompetitor(e.target.value)}
                            fullWidth
                            className="action-select"
                        >

                            {/* <MenuItem value={0}>自分</MenuItem>
                            <MenuItem value={1}>相手</MenuItem> */}
                            {
                                users.map((v) => {
                                    return <MenuItem key={v} value={v}>{v}</MenuItem>
                                })
                            }
                        </Select>
                    </FormControl>
                    {
                            (!isAttack) ? <></> :
                            <FormControl fullWidth>
                                <InputLabel id="opportunity" className="action-select-label">打突の機会</InputLabel>
                                <Select
                                    labelId="opportunity"
                                    id="opportunity"
                                    value={opportunity}
                                    label="opportunity"
                                    onChange={(e) => setOpportunity(e.target.value)}
                                    fullWidth
                                    className="action-select"
                                >
                                    {
                                        opportunityList.map((v) => {
                                            return (
                                                <MenuItem key={v} value={v}>{v}</MenuItem>
                                            )
                                        })
                                    }
                                </Select>
                            </FormControl>
                    }
                    <FormControl fullWidth>
                        <InputLabel id="action" className="action-select-label">{actionName}</InputLabel>
                        <Select
                            labelId="action"
                            id="action"
                            value={action}
                            label="action"
                            onChange={(e) => addAction(e.target)}
                            fullWidth
                            className="action-select"
                        >
                            {
                                actionList.map((v) => {
                                    return (
                                        <MenuItem key={v["name"]} value={v}>{v["name"]}</MenuItem>
                                    )
                                })
                            }
                        </Select>
                    </FormControl>
                </div>
            }
        </div>
    )
}

export default AddActionComponent