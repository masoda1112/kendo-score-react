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
//   import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import React, { useState, useContext } from 'react'
import { ModalContext } from '../pages/App'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth"
import { useCookies } from "react-cookie"
import firebaseApp from "../Firebase/firebase"
import axios from 'axios'
import { useNavigate } from "react-router-dom"
import { LOCALBASEURL } from "../utils/constants"

import Validator from "./validator"

const Register = () => {
    const [userName, setName] = useState("")
    const [userEmail, setEmail] = useState()
    const [userPassword, setPassword] = useState("")
    const [validator, setValidator] = useState(false)
    const [cookies, setCookie, removeCookie] = useCookies(["access_token"])
    const context = useContext(ModalContext)
    const navigate = useNavigate()

    const closeRegister =()=>{
        context.setRegisterModalOpen(false)
    }

    const requestRegister = async() =>{
        if(userName == "" || userEmail == "" || userPassword == "") setValidator(true)
        const auth = getAuth()
        createUserWithEmailAndPassword(auth, userEmail, userPassword)
        .then(async(userCredential) => {
            const firebaseUser = userCredential.user
            context.setRegisterModalOpen(false)
            await registerServer(firebaseUser.accessToken)
            setValidator(false)
        })
        .catch((error) => {
            const errorCode = error.code
            const errorMessage = error.message
            context.setRegisterModalOpen(false)
            setValidator(true)
        });
    }

    const registerServer = async(token) => {
      context.setIsLoading(true)
      const data = {
          'name': userName,
          'email': userEmail,
          'password': userPassword
      }

      const headers = {
          'Authorization': token
      }

      axios.post(LOCALBASEURL + "/register", data, {headers})
      .then((response) => {
          setCookie("access_token",response.data.access_token)
          navigate("/" + response.data.user_name)
          context.setIsLoading(false)
      })
      .catch ((error) => {
          console.log(error.message)
          console.error(error)
          context.setIsLoading(false)
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
          <p className="closeModalButton" onClick={() => closeRegister()}>×</p>
          <Grid
            container
            direction="column"
            justifyContent="flex-start" //多分、デフォルトflex-startなので省略できる。
            alignItems="center"
          >
            <Typography variant={"h5"} sx={{ m: "30px" }}>
                サインアップ
            </Typography>
          </Grid>
          <TextField label="名前" variant="standard" fullWidth required  onChange={(e) => setName(e.target.value)}/>
          <TextField label="メールアドレス" variant="standard" fullWidth required onChange={(e) => setEmail(e.target.value)}/>
          <TextField
            type="password"
            label="パスワード（６文字以上）"
            variant="standard"
            fullWidth
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          {/* ラベルとチェックボックス */}
          <FormControlLabel
            labelPlacement="end"
            control={<Checkbox name="checkboxA" size="small" color="primary" />}
          />
          {(validator) ? <Validator /> : <div></div> }
          <Box mt={3}>
            <Button type="submit" color="primary" variant="contained" fullWidth onClick={() => requestRegister()}>
                サインアップ
            </Button>
            {/* <Typography variant="caption" display="block">
              アカウントを持っていますか？
              <Link href="#">ログイン</Link>
            </Typography> */}
          </Box>
        </Paper>
      </Grid>
    );
};

export default Register
