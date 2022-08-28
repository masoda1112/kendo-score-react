// import '../styles/App.css';
// import styles from '../styles/Home.module.css'

import React, {useState} from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import TopPage from './top'
import Home from './home'
import Games from './games'
import RecordGame from './add'
import Game from './game'
import { CookiesProvider } from 'react-cookie'
import Layout from '../components/layout'
export const ModalContext = React.createContext()

function App() {
  const [loginModalOpen, setLoginModalOpen] = useState(false)
  const [registerModalOpen, setRegisterModalOpen] = useState(false)
  return (
    <div className="App">
      <CookiesProvider>
        <ModalContext.Provider value={{loginModalOpen, setLoginModalOpen, registerModalOpen, setRegisterModalOpen}}>
            <Router>
            <Layout>
              <Routes>
                <Route path='/' element={<TopPage />}/>
                <Route path='/:user' element={<Home />}/>
                <Route path='/:user/games' element={<Games />}/>
                <Route path='/:user/:game' element={<Game />}/>
                <Route path='/:user/add' element={<RecordGame />}/>
              </Routes>
            </Layout>
            </Router>
        </ModalContext.Provider>
      </CookiesProvider>
    </div>
  )
}

export default App;
