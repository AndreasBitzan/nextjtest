import React from "react";
import Link from "next/link";
import {useRouter}from"next/router";
import Error from "next/error";

//Welche Pfade prerendered werden können
export const getStaticPaths=async ()=>{
    return {
        paths: [
         { params: { slug: 'neuigkeiten' } }
        ],
        fallback: true, 
      };
};

export const getStaticProps = async ({params}) => {
  const res = await fetch("https://iou-andreas.herokuapp.com/api/v1/users");
  const userData = await res.json();
  const users = userData.data;
  const slug=params.slug;
  return {
    props: {
      users,
      slug
    },
    revalidate: 1,
  };
};


function Subforum({ users, slug }) {
    const {isFallback} = useRouter();

    if(isFallback){
        return <Error statusCode={404} title="URL could not be found" />
    } 

  return (
    <>
        <ul>
            {users.map(user=>{
                return <li key={user.id}><Link href={`${slug}/${user.id}`}>{user.attributes.name}</Link></li>
            })}
        </ul>
        <Link href="/">Back to Index</Link>
    </>
  );
}

export default Subforum;
