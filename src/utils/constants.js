import { useLocation, useNavigate } from "react-router-dom"
// export const LOCALBASEURL = 'http://127.0.0.1:8000'
export const LOCALBASEURL = 'https://kendo-score-book.herokuapp.com'

    // 技と反則の選択肢
export const SKILLOPTIONLIST = [ 
        "選択してください", 
        '飛び込み面', 
        '出鼻面', 
        '小手から面',
        '面から面', 
        '面から裏面', 
        '面返し面', 
        '小手返し面',
        '面抜き面',
        '小手抜き面',
        '小手すりあげ面',
        '飛び込み小手',
        '面から小手',
        '小手から小手',
        '出鼻小手',
        '面返し小手',
        '面抜き小手',
        '小手返し小手',
        "小手抜き小手",
        "飛び込み胴",
        "面から胴",
        "面から逆胴",
        "小手から胴",
        "小手から逆胴",
        "抜き胴",
        "抜き逆胴",
        "返し胴",
        "両手突き",
        "片手突き",
        "後打ちの面",
        "後打ちの小手",
        "後打ちの胴",
        "後打ちの突き",
        "引き面",
        "引き小手",
        "引き胴"
]

export const getSkillOption = () => {
    
}

export const getUserName = (path) => {
    console.log(path)
    const slicePosition = path.indexOf('/', path.indexOf('/') + 1)
    var userName = ""
    if(slicePosition != -1){ userName = path.substring( 1,  slicePosition)} else {userName = path.substring(1)}
    return userName
}