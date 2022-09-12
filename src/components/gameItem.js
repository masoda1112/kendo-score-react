import Link from 'next/link'
import { useLocation, useNavigation } from 'react-router-dom'
import { getUserName } from '../public/constants'

const judgeArray = ($value) => {
    if(!$value){
        return <></>
    }else if(!Array.isArray($value)){
        return <p className="game-result-card-validattack">{attackToNickName($value)}</p>
    }else{
        return $value.map((value, index)=> {
            <p className="game-result-card-validattack" key={index}>{attackToNickName($value)}</p>
        })
    }
}

const attackToNickName =(value, index)=>{
    if(value == "面"){
        return (index == 0) ? "㋱" :  "メ"
    }else if(value == "小手"){
        return  (index == 0) ? "㋙" :  "コ"
    }else if(value == "胴"){
        return  (index == 0) ? "㋣" :  "ド"
    }
    else if(value == "突き"){
        return  (index == 0) ? "㋡" :  "ツ"
    }else{
        return "？"
    }
}

const GameItem =(props)=> {
    const location = useLocation()
    const navigation = useNavigation()
    const userName = getUserName(location.pathname)

    console.log("gameItem", props)

    return (
        <div className="game-list-item-container" key={props.id} onClick={() => navigation("/" + userName + "/" + props.id)}>
            {/* <Link href={'/masahiro/' + props.id}><a className="game-list-item-id">{props.id}</a></Link> */}
            <p className="game-list-item-date">{props.date}</p>
            <div className="game-result-card">
                <div className="game-result-card-left">
                    <p className="game-result-card-name">{userName}</p>
                    <div className="game-result-card-attacks">
                        {
                            (!props.attacks) ? <div></div> :
                            props.attacks.map((value, index)=> {
                                if(!value.competitor) {
                                    return <p className="game-result-card-validattack" key={index}>{attackToNickName(value.part, index)}</p>
                                }
                            })
                        }
                    </div>
                </div>
                <div className="game-result-card-center">
                    <p className="game-result-card-center-crossmark">×</p>
                </div>
                <div className="game-result-card-right">
                    <p className="game-result-card-competitorname">{props.name}</p>
                    <div className="game-result-card-attacks">
                        {    
                            (!props.attacks) ? <div></div> :
                            props.attacks.map((value, index)=> {
                                if(value.competitor) {
                                    return <p className="game-result-card-validattack" key={index}>{attackToNickName(value.part, index)}</p>
                                }
                            })              
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default GameItem