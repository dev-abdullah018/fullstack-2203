import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios';


const EmailVerifyLink = () => {
  let param = useParams()
  let navigate = useNavigate()

  console.log(param.token);

  useEffect(()=>{
    async function verify(){
      let data = await axios.post("http://localhost:8000/api/v1/auth/linkverification",{
     token: param.token,
    })

    navigate("/login")

   console.log(data);
    }
    verify()
  },[])

  return (
    <div>
      Logding
    </div>
  )
}

export default EmailVerifyLink
