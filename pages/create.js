import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Link from "next/link"
import { useState } from 'react'
import {useRouter} from "next/router";




export default function Create() {

    const [username, setUsername]=useState("");
    const [email, setEmail]=useState("");
    const [password, setPassword]=useState("");
    const router=useRouter();

    const submit= async ()=>{
        let data={data:{
            type: "user",
         attributes: {
        name: username,
        email: email,
        password: password,
        },},};
        try{
        const response = await fetch("https://iou-andreas.herokuapp.com/api/v1/users", {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
              'Content-Type': 'application/json'
              // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            body: JSON.stringify(data) // body data type must match "Content-Type" header
          });
          let result=response.json();
          console.log(result);
          router.push("/forum/neuigkeiten")
        }
        catch(e){
            console.log(e);
        }
    }

  return (
    <>
      <p>Username</p>
        <input onChange={(e)=>setUsername(e.target.value)}type="text" name="username" value={username}></input><br />
        <p>email</p>
        <input onChange={(e)=>setEmail(e.target.value)}type="email" name="email" value={email}></input><br />
        <p>Password</p>
        <input onChange={(e)=>setPassword(e.target.value)} type="password" name="password" value={password}></input><br />
        <button onClick={()=>submit()}>Absenden</button>

    </>
  )
}
