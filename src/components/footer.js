import { Button } from "@mui/material"
import { useNavigate } from "react-router-dom"
import { useCookies } from "react-cookie"
const Footer =()=> {
    const [cookies, setCookie, removeCookie] = useCookies(["access_token"])
    const navigate = useNavigate()
    const logout = () => {
        removeCookie(["access_token"])
        navigate("/")
    }
    return (
        <div className="footer">
            <div className="footer-inner">
                <Button fullWidth variant="contained" color="error" onClick={() => logout()}>ログアウト</Button>
                <p className="copy-light">Copyright © 2022 Masahiro Odakura All Rights Reserved</p>
            </div>
        </div>
    )
}

export default Footer