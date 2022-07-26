import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { useEffect } from 'react';
import PageManager from '@component/PageManager'
import 'antd/dist/antd.min.css'
import './../styles/login.css'


function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  console.log(router.asPath)

  useEffect(() => {


    const handleRouteChange = (url, { shallow }) => {

      console.log(
        `App is changing to ${url} ${shallow ? 'with' : 'without'
        } shallow routing`
      )
      return false
    }
    // const routeChangeStart = (url, { shallow })=>{
    //   console.log(
    //     `App is changing to ${url} ${
    //       shallow ? 'with' : 'without'
    //     } shallow routing`
    //   )
    // }
    router.events.on('routeChangeStart', handleRouteChange)


    // If the component is unmounted, unsubscribe
    // from the event with the `off` method:
    return () => {
      router.events.off('routeChangeStart', handleRouteChange)
    }
  }, [])
  const page = <Component {...pageProps} />
  const title = router.query.title as string;
  const level = parseInt(router.query.modal as string, 10) || 0
  return <PageManager page={page} level={level} url={router.asPath} title={title} />

}

export default MyApp
