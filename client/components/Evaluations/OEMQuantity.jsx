import React, { useState, useEffect } from "react";
import Graph from "../Graph";
import { GRAPH_TYPES } from "../../utils/optionsForGraphs";
import { getOemWiseQuantityAPI } from "../../api";
import decodedData from "../../response.json";
import {BsGraphUp, BsGraphDown} from 'react-icons/bs'
import {GoGraph} from 'react-icons/go';
import {MdClear} from 'react-icons/md';
import Key from '../EvaluationComponents/Key';
import FilterLabel from '../EvaluationComponents/FilterLabel'
import LoadingComponent from "../EvaluationComponents/LoadingComponent";

const RegionQuantity = () => {
  const [oemQuantity, setOemQuantity] = useState({
    labels: [],
    values: [],
    max : 0,
    min : 0,
    avg : 0
  });
  const [loading,setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      const result7 = await getOemWiseQuantityAPI();
      setOemQuantity({
        labels: Object.keys(
          result7.data.data["OEM Wise Quantity"]["Ordered Qty"]
        )
          .map((key) => decodedData["OEM"][key]),
        values: Object.values(
          result7.data.data["OEM Wise Quantity"]["Ordered Qty"]
        ),
        min : Math.ceil(result7.data.data['Max']['Ordered Qty']),
        max : Math.ceil(result7.data.data['Min']['Ordered Qty']),
        avg : Math.ceil(result7.data.data['Mean']['Ordered Qty'])
      });
      setLoading(false);
  
    };
    fetchData();
  }, []);
  const [width,setWidth] = useState('750px');

  const [graphType,setGraphType] = useState(GRAPH_TYPES.BAR_CHART);
  if (loading) return <LoadingComponent/>


  return (
    <div>
      <div className='grid grid-cols-3 gap-8'>
        <Key title='Maximum Expenditure Prediction' value={oemQuantity.max}icon={<BsGraphUp size={25}/>}/>
        <Key title='Minimum Expenditure Prediction' value={oemQuantity.min} icon={<BsGraphDown size={25}/>}/>
        <Key title='Average Yearly Expenditure' value={oemQuantity.avg} icon={<GoGraph size={25}/>}/>
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
      <Graph
          type={GRAPH_TYPES.BAR_CHART}
          labels={oemQuantity.labels}
          datasets={[
            {
              label: "OEM sales analysis",
              data: oemQuantity.values,
              backgroundColor: "#429FAD",
              borderColor: "blue",
            },
          ]}
        />
      </div>
    </div>
  )
};

export default RegionQuantity;
