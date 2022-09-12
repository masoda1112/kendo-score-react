// import styles from '../styles/Home.module.css'
import { Button } from '@mui/material'
import Discription from '../components/discription'
import Login from '../components/loginModal'
import Register from '../components/registerModal'
import React, { useEffect, useContext } from 'react'
import { ModalContext } from './App'

const TopPage = () => {
  const discriptionArray = [
    {
      title : "有効打の構成比",
      description: "自分がどのような技で一本を取得しているか、どのような技を打たれやすのかを円グラフで視覚的に把握できます。",
      image: "/img/skillRate.png"
    },
    {
      title : "機会の構成比",
      description: "自分がどのような機会に一本を取得しているか、どのような機会に打たれやすいのかを円グラフで視覚的に把握できます。",
      image: "/img/opportunity.png"
    }
  ]

  const value = useContext(ModalContext)

  const onClickRegister =()=>{
    value.setRegisterModalOpen(true)
  }

  useEffect(() => {window.scrollTo(0, 0)}, []);
  
  return (
    <>
      <div className={(value.loginModalOpen) ? "login-modal" : "hide login-modal"}>
        <Login />
      </div>
      <div className={(value.registerModalOpen) ? "register-modal" : "hide register-modal"}>
        <Register />
      </div>
      <div className='top-page'>
        <div className='top-section'>
          <div className='top-section-container'>
            <h1 className="top-section-title">少し踏み込んだスコア表</h1>
            <p className="top-section-description white">スコア表に打突の機会まで記録することで、課題を明確化します。</p>
            <Button variant="contained" onClick={() => onClickRegister()}>無料登録</Button>
          </div>
        </div>
        <div className='discriptions-section'>
          <h2 className="discriptions-section-title">KSBでわかるようになること</h2>
          <div className ='discriptions-list'>
            {
              discriptionArray.map((content,index)=>(
                <div className="discription" key={index}>
                  <Discription title={content.title} description={content.description} image={content.image}/>
                </div>
              ))
            }
          </div>
        </div>
      </div>
    </>
  )
}

export default TopPage
