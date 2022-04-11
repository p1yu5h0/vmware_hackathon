import React, {useState, useEffect} from 'react'
import Graph from '../Graph'
import { GRAPH_TYPES } from '../../utils/optionsForGraphs'
import { getDateVSaleAPI } from '../../api'
import {BsGraphUp, BsGraphDown} from 'react-icons/bs'
import {GoGraph} from 'react-icons/go';
import {MdClear} from 'react-icons/md';
import LoadingComponent from '../EvaluationComponents/LoadingComponent'

const Item = ({title,icon,value})=>{
  return (
    <div>
      <div className='flex space-x-5'>
        <div className='pt-2'>{icon}</div>
        <div >
          <div className='font-semibold text-gray-200'>{title}</div>
          <div className='mt-1 text-lg'>{value}</div>
        </div>
      </div>
      
    </div>
  )
}

const Filter = ({title})=>{
  return (
    <div className='flex items-center hover:bg-[#045663] transition-all cursor-pointer space-x-4 rounded-md bg-primary px-2 py-1'>
      <div className='text-sm'>{title}</div>
      <div><MdClear/></div>
    </div>
  )
}

const DateSale = () => {
  const [dateVSale, setDateVSale] = useState({
    labels : [],
    values : [],
    max : 0,
    min : 0,
    avg : 0,
  })
  const [loading,setLoading] = useState(true);
  useEffect(()=>{
    const fetchData = async()=>{

    //result 8- sales vs API
    const result8 = await getDateVSaleAPI();
    setDateVSale({
      labels : Object.keys(result8.data.data['Total Sales']),
      values : Object.values(result8.data.data['Total Sales']),
      min : Math.round(result8.data['min']),
      max : Math.round(result8.data['max']),
      avg : Math.round(result8.data['mean']),
    })
    setLoading(false)
    }
    fetchData();
  }, [])

  const [width,setWidth] = useState('750px');

  const [graphType,setGraphType] = useState(GRAPH_TYPES.BAR_CHART);
  if (loading) return <LoadingComponent/>


  return (
    <div>
      <div className='grid grid-cols-3 gap-8'>
        <Item title='Maximum Expenditure Prediction' value={dateVSale.max} icon={<BsGraphUp size={25}/>}/>
        <Item title='Minimum Expenditure Prediction' value={dateVSale.min} icon={<BsGraphDown size={25}/>}/>
        <Item title='Average Yearly Expenditure' value={dateVSale.avg} icon={<GoGraph size={25}/>}/>
      </div>
      <div className='mt-16 px-5 flex justify-between items-end'>
        <div>
        <div className='font-semibold'>Filters :</div>
        <div className='flex space-x-3 mt-4'>
          <Filter title='Location : Delhi'/>
          <Filter title='Expenditure < 30,000'/>
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
        <Graph type={graphType} labels={dateVSale.labels} datasets={[{
          label : 'Month Vs Expenditure',
          data : dateVSale.values,
          backgroundColor :[ '#429FAD','#216c77', '#045663'],
          borderColor : '#426aad',
        }]}/>
      </div>
    </div>
  )
}

export default DateSale