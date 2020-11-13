import React from "react";
import Link from "next/link";

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
        fallback: false, 
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
    return (
      <>
         <h1>{user.attributes.name}</h1>
         <h2>{user.attributes.email}</h2>
      </>
    );
  }
  
  export default UserView;