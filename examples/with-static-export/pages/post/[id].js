import Link from 'next/link'
import Head from 'next/head'
import {useState, useEffect} from 'react'
import axios from 'axios'
import {useRouter} from 'next/router'

export async function getStaticPaths() {
  const response = await fetch(
    'https://jsonplaceholder.typicode.com/posts?_page=1'
  )
  const postList = await response.json()
  return {
    paths: postList.map((post) => {
      return {
        params: {
          id: `${post.id}`,
        },
      }
    }),
    fallback: false,
  }
}

export async function getStaticProps({ params }) {

  const post = {no: 'no'}
  return {
    props: post,
  }
}

export default function Post(props) {

  const [data, setData] = useState({});

  const router = useRouter();

  useEffect(() => {
    let id = router.asPath.slice(6);
    axios(`https://jsonplaceholder.typicode.com/posts/${id}`)
    .then(res => res.data)
    .then(data => {
      setData(data);
      console.log(data);
    })
  }, []);

  return (
    <main>
      <Head>
        <title>{data.title}</title>
      </Head>

      <h1>{data.title}</h1>

      <p>{data.body}</p>

      <Link href="/">
        <a>Go back to home</a>
      </Link>
    </main>
  )
}
