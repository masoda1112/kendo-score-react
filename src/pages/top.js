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
      title : "一本を取る力",
      description: "1分あたりどのくらいの技を出しているのか、出した技はどのくらいの確率で一本になるのか数値にして把握することができます。",
      image: "/img/attackCountImg.png"
    },
    {
      title : "有効打となる確率",
      description: "自分が出した技の内どのくらいの数が有効打となっているのか、数値にして把握することができます。",
      image: "/img/skillValidCount.png"
    },
    {
      title : "出した技の構成比",
      description: "自分がどの技をどのくらい繰り出しているのか、円グラフで視覚的に把握できます。",
      image: "/img/skillRate.png"
    },
    {
      title : "打たれた技の構成比",
      description: "自分がどのような技を打たれやすいのか、円グラフで視覚的に把握できます。",
      image: "/img/competitorAttackRate.png"
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
            <h1 className="top-section-title">試合を振り返ろう。</h1>
            <p className="top-section-description white">スコア表に残らない、一本にはならなかった技。それらを記録することで、新たな気づきが得られるかもしれません。</p>
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
