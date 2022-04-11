import React from 'react'
import { verifyAuth } from '../utils/authVerification';


export const getServerSideProps = (ctx)=>{
  const isAuth = verifyAuth(ctx.req);
  if (!isAuth) {
    return {
      redirect : {
        destination : '/',
        permanent : false
      }
    }
  }
  return {
    props : {token : isAuth}
  }
}

const PastAnalysis = ({token}) => {
  return (
    <div>PastAnalysis</div>
  )
}

export default PastAnalysis