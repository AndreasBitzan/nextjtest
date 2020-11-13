import React from "react";
import Link from "next/link";

//Welche Pfade prerendered werden können
export const getStaticPaths=async ()=>{
    return {
        paths: [
         { params: { slug: 'neuigkeiten' } }
        ],
        fallback: false, 
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
  return (
    <>
        <ul>
            {users.map(user=>{
                return <li key={user.id}><Link href={`${slug}/${user.id}`}>{user.attributes.name}</Link></li>
            })}
        </ul>
    </>
  );
}

export default Subforum;
