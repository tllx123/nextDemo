import Link from 'next/link'
import { useState, useEffect, useContext } from 'react'
import { useRouter } from 'next/router'
import PageStackProvider from '@component/PageStackProvider'

const Test = function () {
  const [count, useCount] = useState(0);
  const click = () => {
    useCount(count + 1)
  }
  return <div onClick={click}>子页面,开始点击{count}次</div>
}



export default function Page() {
  const router = useRouter()

  useEffect(() => {

    router.beforePopState(({ url, as, options }) => {
      // I only want to allow these two routes!
      if (as !== '/' && as !== '/two') {
        // Have SSR render bad routes as a 404.
        window.location.href = as
        return false
      }

      return true
    })
  }, [])
  const [count, setCount] = useState(0)
  // useEffect(() => {
  //   setCount(0)
  // }, [router.query.a])
  debugger
  const level = useContext(PageStackProvider.Context).topLevel + 1;
  return (
    <div>
      <h1>Page: {router.query.a}{router.query.modal}</h1>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increase count</button>
      <Link href="/one">
        <a>one</a>
      </Link> <div onClick={() => router.push({pathname:'/two',query : {modal : JSON.stringify(['login','loginout'])}})}>
        <a>two</a>
      </div>
      <Test />
    </div>
  )
}