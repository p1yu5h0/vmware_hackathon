import React from 'react'
import Header from './Header'
import {useRouter} from 'next/router';

const Layout = ({children}) => {
    const router = useRouter();
  return (
   <>
   {router.pathname!=='/'&&<Header/>}
   <div>
       {children}
   </div>
   </>
  )
}

export default Layout