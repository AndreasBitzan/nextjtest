import React from "react";
import Link from "next/link";
import {useRouter}from"next/router";
import Error from "next/error";

//Welche Pfade prerendered werden können
export const getStaticPaths=async ()=>{

    const res = await fetch("https://iou-andreas.herokuapp.com/api/v1/users");
    const userData = await res.json();
    const users = userData.data;
    const paths= users.map(user=>{
        return{
         params: {slug: 'neuigkeiten', id: user.id} }
    });

    return {
        paths,
        fallback: true, 
      };
};

export const getStaticProps = async ({params}) => {
  const res = await fetch(`https://iou-andreas.herokuapp.com/api/v1/users/${params.id}`);
  const userData = await res.json();
  const user = userData.data;
  return {
    props: {
      user,
    },
    revalidate: 1,
  };
};

function UserView({ user }) {
    const {isFallback} = useRouter();

    if(isFallback){
        return <Error statusCode={404} title="User could not be found" />
    } 
    
    return (
      <>
         <h1>{user.attributes.name}</h1>
         <h2>{user.attributes.email}</h2>
      </>
    );
  }
  
  export default UserView;