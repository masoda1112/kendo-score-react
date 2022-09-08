import {
    Avatar,
    Box,
    Button,
    Checkbox,
    FormControlLabel,
    Grid,
    Link,
    Paper,
    Stack,
    TextField,
    Typography
  } from "@mui/material"
import { teal } from '@mui/material/colors'
// import { ModalContext } from '../pages/_app'
import React, { useState, useContext } from 'react'
import axios from 'axios'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"
import { useCookies } from "react-cookie"
import { useNavigate } from "react-router-dom"
import { ModalContext } from "../pages/App"

import { LOCALBASEURL } from "../utils/constants"
import Validator from "./validator"

const Login = () => {
    axios.defaults.withCredentials = true
    axios.defaults.headers.common['Content-Type'] = 'application/json'
    const [userEmail, setEmail] = useState("")
    const [userPassword, setPassword] = useState("")
    const [validator, setValidator] = useState(false)

    const [cookies, setCookie, removeCookie] = useCookies(["access_token"]);
    const context = useContext(ModalContext)
    const navigate = useNavigate()

    const closeLogin =()=> {
        context.setLoginModalOpen(false)
    }

    const requestLogin =()=> {
        if(userEmail == "" || userPassword == "") setValidator(true) 

        const data = {
            'email': userEmail,
            'password': userPassword
        }

        const headers = {
            'Access-Control-Allow-Origin': LOCALBASEURL
        }

        axios.post(LOCALBASEURL + "/login", data, {headers}).then((response) => {
            setCookie("access_token",response.data.access_token)
            navigate("/" + response.data.user_name)
            setValidator(false)
            context.setLoginModalOpen(false)
        })
        .catch ((error) => {
            console.error(error)
            setValidator(true)
        })
    }

    return (
      <Grid>
        <Paper
          elevation={3}
          sx={{
            p: 4,
            height: "70vh",
            width: "280px",
            m: "20px auto"
          }}
        >
          <p className="closeModalButton" onClick={() => closeLogin()}>×</p>
          <Grid
            container
            direction="column"
            justifyContent="flex-start" //多分、デフォルトflex-startなので省略できる。
            alignItems="center"
          >
            <Typography variant={"h5"} sx={{ m: "30px" }}>
              ログイン
            </Typography>
          </Grid>
          <TextField label="メールアドレス" variant="standard" fullWidth required onChange={(e) => setEmail(e.target.value)}/>
          <TextField
            type="password"
            label="パスワード（6文字以上）"
            variant="standard"
            fullWidth
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          {(validator) ? <Validator /> : <div></div> }
          {/* ラベルとチェックボックス */}
          <Box mt={3}>
            <Button type="submit" color="primary" variant="contained" fullWidth onClick={() => requestLogin()}>
              ログイン
            </Button>
  
            {/* <Typography variant="caption">
              <Link href="#">パスワードを忘れましたか？</Link>
            </Typography>
            <Typography variant="caption" display="block">
              アカウントを持っていますか？
              <Link href="#">アカウントを作成</Link>
            </Typography> */}
          </Box>
        </Paper>
      </Grid>
    );
};

export default Login
