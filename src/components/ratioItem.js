
const RatioItem =(props)=>{
    
    let answer = 0;
    (props.unit=="%") ? answer = Math.floor((props.childCount/props.parentCount)*10000)/100 : answer = Math.floor((props.childCount/props.parentCount)*100)/100
    if(!answer) answer = 0
    return (
        <div className="ratio-item">
            <h3 className="ratio-title">{props.title}</h3>
            <p className="ratio-value">{answer}{props.unit} <span className="ratio-unit">（{props.childCount} / {props.parentCount} ）</span></p>
        </div>
    )
}

export default RatioItem