import React, {useState, useEffect} from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import TopPage from './top'
import Home from './home'
import Games from './games'
import RecordGame from './add'
import Game from './game'
import { CookiesProvider } from 'react-cookie'
import Layout from '../components/layout'
// import Loading from '../components/loading'
import Loading from '../components/loading'
import AllUserData from './allUserData'
export const ModalContext = React.createContext()

function App() {
  const [loginModalOpen, setLoginModalOpen] = useState(false)
  const [registerModalOpen, setRegisterModalOpen] = useState(false)
  const [ isLoading, setIsLoading ] = useState(false);

  useEffect(() => {
    if(loginModalOpen || registerModalOpen || isLoading){
      document.body.classList.add('no_scroll')
    }else{
      document.body.classList.remove('no_scroll')
    }
  },[loginModalOpen, registerModalOpen, isLoading])

  return (
    <div className="App">
      <CookiesProvider>
        <ModalContext.Provider value={{
          loginModalOpen,
          setLoginModalOpen,
          registerModalOpen, 
          setRegisterModalOpen, 
          isLoading,
          setIsLoading
        }}>
            <Router>
            {(isLoading) ? <Loading /> : <></>}
            <Layout>
              <Routes>
                <Route path='/' element={<TopPage />}/>
                <Route path='/:user' element={<Home />}/>
                <Route path='/:user/games' element={<Games />}/>
                <Route path='/:user/:game' element={<Game />}/>
                <Route path='/:user/add' element={<RecordGame />}/>
                <Route path='/:user/allUser' element={<AllUserData />}/>
              </Routes>
            </Layout>
            </Router>
        </ModalContext.Provider>
      </CookiesProvider>
    </div>
  )
}

export default App;
