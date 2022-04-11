
import React, { useState, useEffect } from "react";
import Graph from "../Graph";
import { GRAPH_TYPES } from "../../utils/optionsForGraphs";
import { getCountryWiseSalesAPI } from "../../api";
import decodedData from "../../response.json";
import {BsGraphUp, BsGraphDown} from 'react-icons/bs'
import {GoGraph} from 'react-icons/go';
import {MdClear} from 'react-icons/md';
import Key from '../EvaluationComponents/Key';
import FilterLabel from '../EvaluationComponents/FilterLabel'
import LoadingComponent from "../EvaluationComponents/LoadingComponent";

const CountrySales = () => {
  const [countryWiseSales, setCountryWiseSales] = useState({
    labels: [],
    values: [],
    min : 0,
    max : 0,
    avg : 0
  });
  const [loading,setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      const result4 = await getCountryWiseSalesAPI();
      setCountryWiseSales({
        labels: Object.keys(
          result4.data.data["Region Wise Sales"]["Total Sales"]
        ).map((key) => decodedData.Country[key]),
        values: Object.values(
          result4.data.data["Region Wise Sales"]["Total Sales"]
        ),
        min :Math.ceil(result4.data.data['Min']['Total Sales']),
        max : Math.ceil(result4.data.data['Max']['Total Sales']),
        avg : Math.ceil(result4.data.data['Mean']['Total Sales']),
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
        <Key title='Maximum Expenditure Prediction' value={countryWiseSales.max} icon={<BsGraphUp size={25}/>}/>
        <Key title='Minimum Expenditure Prediction' value={countryWiseSales.min} icon={<BsGraphDown size={25}/>}/>
        <Key title='Average Yearly Expenditure' value={countryWiseSales.avg} icon={<GoGraph size={25}/>}/>
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
          labels={countryWiseSales.labels}
          datasets={[
            {
              label: "Country Wise Sales",
              data: countryWiseSales.values,
              backgroundColor: "#429FAD",
              borderColor: "blue",
            },
          ]}
        />
      </div>
    </div>
  )
};

export default CountrySales;
