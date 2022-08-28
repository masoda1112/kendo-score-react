import React, { useState } from "react"
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
        setAction(actionList[value])
        setArray(
            array.map((v, i) => (i === index ? value : v))
        )
        setSelected(true)
    }


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
                                actionList.map((valueName, index) => {
                                    return (
                                        <MenuItem key={index} value={index}>{valueName}</MenuItem>
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