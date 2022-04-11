import React from 'react'
import { analysisTypes } from '../../utils'
import AssetQuantity from '../Evaluations/AssetQuantity'
import AssetSales from '../Evaluations/AssetSales'
import CountryAsset from '../Evaluations/CountryAsset'
import CountrySales from '../Evaluations/CountrySales'
import DateSale from '../Evaluations/DateSale'
import OEMQuantity from '../Evaluations/OEMQuantity'
import OEMSales from '../Evaluations/OEMSales'
import RegionQuantity from '../Evaluations/RegionQuantity'
import TopProducts from '../Evaluations/TopProducts'
import TopProductsQuantity from '../Evaluations/TopProductsQuantity'

const Evaulation = ({setAnalysis,analysis}) => {
  return (
    <div>
      {analysis===analysisTypes.AssetQuantity&&<AssetQuantity/>}
      {analysis===analysisTypes.AssetSales&&<AssetSales/>}
      {analysis===analysisTypes.CountryAsset&&<CountryAsset/>}
      {analysis===analysisTypes.DateSale&&<DateSale/>}
      {analysis===analysisTypes.RegionQuantity&&<RegionQuantity/>}
      {analysis===analysisTypes.CountrySales&&<CountrySales/>}
      {analysis===analysisTypes.TopProducts&&<TopProducts/>}
      {analysis===analysisTypes.TopProductsQuantity&&<TopProductsQuantity/>}
      {analysis===analysisTypes.OEMQuantity&&<OEMQuantity/>}
      {analysis===analysisTypes.OEMSale&&<OEMSales/>}
    </div>
  )
}

export default Evaulation