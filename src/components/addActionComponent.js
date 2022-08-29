import React, { useEffect, useState } from "react"
import { Select, MenuItem, InputLabel, FormControl} from '@mui/material'

const AddActionComponent = ({index, array, setArray, actionName, actionList}) => {
    const [remove, setRemove] = useState(false)
    const [action, setAction] = useState(0)
    const [selected, setSelected] = useState(false)

    const classToggle = () => {
        setRemove(true)
        // ×が押されたモーダルのindexを把握する
        setArray(
            array.map((value, i) => (i === index ? null : value))
        )
    }

    const addAction=(value)=>{
        console.log(value)
        setAction(value["name"])
        setArray(
            array.map((v, i) => (i === index ? value["id"] : v))
        )
    }

    useEffect(() => {
        if(action != 0) setSelected(true)
    },[action])

    console.log(array)


    return (
        <div className={(remove) ? 'remove' : 'action-component'}>
            <p className="close-btn" onClick={classToggle}>×</p>
            {
                (selected) ? <div className="selected-action-container"><p className="selected-action">{action}</p></div> :
                <div className='input-form name-input'>
                    <FormControl fullWidth>
                        <InputLabel id="action">{actionName}</InputLabel>
                        <Select
                            labelId="action"
                            id="action"
                            value={action}
                            label="action"
                            onChange={(e) => addAction(e.target.value)}
                            fullWidth
                        >
                            {
                                actionList.map((v, index) => {
                                    return (
                                        <MenuItem key={index} value={v}>{v["name"]}</MenuItem>
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