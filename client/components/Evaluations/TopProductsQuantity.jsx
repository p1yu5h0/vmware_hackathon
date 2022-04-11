import React, { useState, useEffect } from "react";
import Graph from "../Graph";
import { GRAPH_TYPES } from "../../utils/optionsForGraphs";
import { getToptenprodQuanAPI } from "../../api";
import decodedData from "../../response.json";
import {BsGraphUp, BsGraphDown} from 'react-icons/bs'
import {GoGraph} from 'react-icons/go';
import {MdClear} from 'react-icons/md';
import Key from '../EvaluationComponents/Key';
import FilterLabel from '../EvaluationComponents/FilterLabel'
import LoadingComponent from "../EvaluationComponents/LoadingComponent";



const TopProductsQuantity = () => {
  const [topTenProductsQunatity, setTopTenProductsQunatity] = useState({
    labels : [],
    values : [],
    max : 0,
    min : 0,
    avg : 0
  })
  const [loading,setLoading] = useState(true);
  useEffect(()=>{
    const fetchData =async ()=>{
      const result6 = await getToptenprodQuanAPI();
      setTopTenProductsQunatity({
        labels :Object.keys(result6.data.data['Ordered Qty']).map(key=>decodedData['Product Name'][key]),
        values : Object.values(result6.data.data['Ordered Qty']),
        max : Math.ceil(result6.data.data['Max']['Ordered Qty']),
        min : Math.ceil(result6.data.data['Min']['Ordered Qty']),
        avg : Math.ceil(result6.data.data['Mean']['Ordered Qty']),
 
      })
      setLoading(false);
   
    }
    fetchData();
  }, [])

  const [width,setWidth] = useState('750px');

  const [graphType,setGraphType] = useState(GRAPH_TYPES.BAR_CHART);
  if (loading) return <LoadingComponent/>


  return (
    <div>
      <div className='grid grid-cols-3 gap-8'>
        <Key title='Maximum Expenditure Prediction' value={topTenProductsQunatity.max} icon={<BsGraphUp size={25}/>}/>
        <Key title='Minimum Expenditure Prediction' value={topTenProductsQunatity.min} icon={<BsGraphDown size={25}/>}/>
        <Key title='Average Yearly Expenditure' value={topTenProductsQunatity.avg} icon={<GoGraph size={25}/>}/>
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
      <Graph type={GRAPH_TYPES.BAR_CHART} labels={topTenProductsQunatity.labels} datasets={[{
          label : 'Products vs Quantity',
          data : topTenProductsQunatity.values,
          backgroundColor : '#429FAD',
          borderColor : 'blue',
        }]}/>
      </div>
    </div>
  )
}

export default TopProductsQuantity