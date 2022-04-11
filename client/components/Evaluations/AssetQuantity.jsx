import React, {useState, useEffect} from 'react'
import Graph from '../Graph';
import { GRAPH_TYPES } from '../../utils/optionsForGraphs';
import { getAssetQuantityAPI } from '../../api';
import decodedData from '../../response.json'
import FilterLabel from '../EvaluationComponents/FilterLabel';
import Key from '../EvaluationComponents/Key';
import {BsGraphUp, BsGraphDown} from 'react-icons/bs'
import {GoGraph} from 'react-icons/go';
import {MdClear} from 'react-icons/md';
import {Triangle} from 'react-loader-spinner';
import LoadingComponent from '../EvaluationComponents/LoadingComponent';


const AssetQuantity = () => {
  
const [assetQuantity, setAssetQuantity] = useState({
  labels : [],
  values : [],
  max : 0,
  min : 0,
  avg : 0,
});

const [width,setWidth] = useState('750px');
const [loading,setLoading] = useState(true);

const [graphType,setGraphType] = useState(GRAPH_TYPES.BAR_CHART);

useEffect(()=>{
  const fetchData = async()=>{
     //result-1 Asset Vs Quantity
     const result1 = await getAssetQuantityAPI();
     setAssetQuantity({
       labels : Object.keys(result1.data.data["Asset Quantity"]["Ordered Qty"]).map(key=>decodedData.Category[key]),
       values : Object.values(result1.data.data["Asset Quantity"]["Ordered Qty"]),
       max : parseInt(result1.data.data['Max']['Ordered Qty']),
       min : parseInt(result1.data.data['Min']['Ordered Qty']),
       avg : parseInt(result1.data.data['Mean']['Ordered Qty'])
     })
     setLoading(false);
  }
  fetchData();
          
}, [])
if (loading) return <LoadingComponent/>

return (
    <div>
      <div className='grid grid-cols-3 gap-8'>
        <Key title='Maximum Expenditure Prediction' value={assetQuantity.max} icon={<BsGraphUp size={25}/>}/>
        <Key title='Minimum Expenditure Prediction' value={assetQuantity.min} icon={<BsGraphDown size={25}/>}/>
        <Key title='Average Yearly Expenditure' value={assetQuantity.avg} icon={<GoGraph size={25}/>}/>
      </div>
      <div className='mt-16 px-5 flex justify-between items-end'>
        <div>
        <div className='font-semibold'>Filters :</div>
        <div className='flex space-x-3 mt-4'>
          <FilterLabel title='Location : Delhi'/>
          <FilterLabel title='Expenditure < 30,000'/>
        </div>
        </div>
        <div>
          <select onChange={(e)=>{setGraphType(e.target.value)}} className=' bg-bgcolor p-2 text-sm border-primary outline-none border-[1px] rounded-md' name="graphType" defaultValue={GRAPH_TYPES.BAR_CHART}>
            <option value={GRAPH_TYPES.BAR_CHART}>Bar Chart</option>
            <option value={GRAPH_TYPES.PIE_CHART}>Pie Chart</option>
            <option value={GRAPH_TYPES.POLAR_AREA_CHART}>Polar Area Chart</option>
          </select>
        </div>
      </div>
      <div className='mt-16' style={{width : width}}>
      <Graph type={GRAPH_TYPES.BAR_CHART} labels={assetQuantity.labels} datasets={[{
          label : 'Asset vs Quantity',
          data : assetQuantity.values,
          backgroundColor : '#429FAD',
          borderColor : 'blue',
        }]}/>
      </div>
    </div>
  )

}

export default AssetQuantity