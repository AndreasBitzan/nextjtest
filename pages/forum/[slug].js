import React, { useEffect } from "react";
import Link from "next/link";
import {useRouter}from"next/router";
import Error from "next/error";
import useSWR from "swr";

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
// export async function getServerSideProps(context) {
//       const res = await fetch("https://iou-andreas.herokuapp.com/api/v1/users");
//   const userData = await res.json();
//   const users = userData.data;
//   const slug=context.params.slug;
//     return {
//       props: {users,slug}, // will be passed to the page component as props
//     }
//   }
  
const fetcher = url => fetch(url).then(r => r.json())

function Subforum({ users, slug }) {

    const { data } = useSWR("https://iou-andreas.herokuapp.com/api/v1/users" , fetcher,{users, revalidateOnMount: true, refreshInterval: 1});

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

        <h2>This is the result of SWR:</h2>
        <p>
          {JSON.stringify(data,null,2)};
        </p>

        <Link href="/create">Create a new user</Link>
    </>
  );
}

export default Subforum;
