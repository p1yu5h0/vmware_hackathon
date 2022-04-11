import React from 'react'
import { analysisTypes } from '../../utils'

const EvaluationComponent = ({title, text, onClick})=>{
  return (
    <div onClick={onClick} className='p-2 shadow-md bg-white hover:bg-slate-200 cursor-pointer transition-all '>
    <div className='text-gray-700 text-sm font-medium'>{title}</div>
    <div className='text-gray-500 text-xs'>{text}</div>
    </div>
  )
}

const EvaluationController = ({analysis,setAnalysis}) => {
  return (
    <div>
      <div className='text-gray-800 font-semibold'>Complete Analysis</div>
      <div className='mt-7 space-y-5 h-[420px] overflow-y-auto'>
        <EvaluationComponent onClick={()=>setAnalysis(analysisTypes.DateSale)} title="Product Expenditure basis month" text="Shows Complete Prediction of Product Sales with graphical analysis"/>
        <EvaluationComponent onClick={()=>setAnalysis(analysisTypes.AssetQuantity)} title="Asset-Quantity Analysis" text="Predicts Assets quantity required and represents graphically"/>
        <EvaluationComponent onClick={()=>setAnalysis(analysisTypes.AssetSales)} title="Assets-Expenditure Analysis" text="Forecasts assets sales and shows graphical analysis"/>
        <EvaluationComponent onClick={()=>setAnalysis(analysisTypes.CountryAsset)} title="Assets Quantity Requirement basis Country" text="Forecasts Assets requirements of different countries"/>
        <EvaluationComponent onClick={()=>setAnalysis(analysisTypes.CountrySales)} title="Expenditure analysis basis Country" text="Forecasts sales in different countries and depicts graphically"/>
        <EvaluationComponent onClick={()=>setAnalysis(analysisTypes.TopProducts)} title="Top Purchased Products basis Expenditure" text="Shows most purchased products for analysis."/>
        <EvaluationComponent onClick={()=>setAnalysis(analysisTypes.TopProductsQuantity)} title="Top Purchased Products basis Quantity" text="Shows most purchased products for analysis."/>
        <EvaluationComponent onClick={()=>setAnalysis(analysisTypes.RegionQuantity)} title="Quantity-Region Analysis" text="Shows region wise analysis of quantity"/>
        <EvaluationComponent onClick={()=>setAnalysis(analysisTypes.OEMSale)} title="Original Equipment Manufacturer Sales Analysis" text="Shows Manufacturer's analysis of sales and represents data through graphs."/>
        <EvaluationComponent onClick={()=>setAnalysis(analysisTypes.OEMQuantity)} title="Original Equipment Manufacturer Quantity Analysis" text="Shows Manufacturer's analysis of quantity and represents data through graphs."/>
      </div>
    </div>
  )
}

export default EvaluationController