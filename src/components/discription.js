import React from 'react'

const Discription = (props) => {
    return (
        <div className="discription-item">
            <h3 className="discription-title">{props.title}</h3>
            <p className="discription-description">{props.description}</p>
            {/* <img className="discription-image" src={props.image}/> */}
            <img src={props.image} alt="me" width="270"/>
        </div>
    )
}

export default Discription