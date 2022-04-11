import React, {useState, useEffect} from 'react'
import { verifyAuth } from '../utils/authVerification';
import Graph from '../components/Graph';
import { GRAPH_TYPES } from '../utils/optionsForGraphs';
import AnalysisController from '../components/AnalysisController';
import { analysisNavigation, analysisTypes } from '../utils';
import Loading from '../components/Loading';
import {getAssetQuantityAPI, getCountryWiseAssetQuantityAPI,getAssetWiseSalesAPI,getDateVSaleAPI,getDecodedDataAPI,getRegionWiseAssetQuantityAPI,getTopTenProductAPI,getCountryWiseSalesAPI, getToptenprodQuanAPI} from '../api';
import Evaulation from '../components/analysisComponents/Evaulation';
import decodedData from '../response.json';

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
    props : {}
  }
}


const Analysis = () => {
  const [view,setView] = useState(analysisNavigation.Evaluation)



  const [loading,setLoading] = useState(false);


  const [analysis,setAnalysis] = useState(analysisTypes.AssetQuantity)


  if (loading) return <Loading text={loading}/>

  
  const handleClick =async ()=>{
   

  }
  return (
    <div className='flex  space-x-16 items-center justify-between pt-10 px-28 py-4'>
      <div>
        <Evaulation analysis={analysis} setAnalysis={setAnalysis} />
      </div>
      <div>
      <AnalysisController view={view} analysis={analysis} setAnalysis={setAnalysis} setView={setView}/>
      </div>
    </div>
  )
}

export default Analysis