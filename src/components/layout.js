import Header from "./header"
import YetLoginHeader from "./yetLoginHeader"
import Footer from "./footer"
import YetLoginFooter from "./yetLoginFooter"
// import { useRouter } from 'next/router'
import { useLocation } from "react-router-dom"

const Layout =({children})=> {
    const location = useLocation()
    console.log(location.pathname)
    return (
        <>
            {(location.pathname == "/" || location.pathname == "/login") ? <YetLoginHeader /> : <Header /> }
                <main>{children}</main>
            {(location.pathname == "/" || location.pathname == "/login") ? <YetLoginFooter /> : <Footer /> }
        </>
    )
}

export default Layout