import {
    Chart,
    ArcElement,
    LineElement,
    BarElement,
    PointElement,
    BarController,
    BubbleController,
    DoughnutController,
    LineController,
    PieController,
    PolarAreaController,
    RadarController,
    ScatterController,
    CategoryScale,
    LinearScale,
    LogarithmicScale,
    RadialLinearScale,
    TimeScale,
    TimeSeriesScale,
    Decimation,
    Filler,
    Legend,
    Title,
    Tooltip,
    SubTitle
  } from 'chart.js';
import { Bar, Bubble, Doughnut, Line, Pie, PolarArea } from 'react-chartjs-2';
  
  Chart.register(
    ArcElement,
    LineElement,
    BarElement,
    PointElement,
    BarController,
    BubbleController,
    DoughnutController,
    LineController,
    PieController,
    PolarAreaController,
    RadarController,
    ScatterController,
    CategoryScale,
    LinearScale,
    LogarithmicScale,
    RadialLinearScale,
    TimeScale,
    TimeSeriesScale,
    Decimation,
    Filler,
    Legend,
    Title,
    Tooltip,
    SubTitle
  );

  import {verticalBarOptions,stackedBarOptions, barOptions, scatterBubblePlotOptions,LineChartOptions,groupdBarOptions, GRAPH_TYPES} from '../utils/optionsForGraphs';

  
export default function Graph({labels,datasets, type, height,width}) {
  const data = {
        labels,
        datasets
      };
    const RenderedChart = ()=>{
        switch(type) {
            case GRAPH_TYPES.BAR_CHART:
                return <Bar options={barOptions} data={data}/>
            case GRAPH_TYPES.BUBBLE_CHART:
                return <Bubble options={scatterBubblePlotOptions} data={data}/>
            case GRAPH_TYPES.DOUGHNUT_CHART:
                return <Doughnut data={data}/>
            case GRAPH_TYPES.PIE_CHART : 
                return <Pie data={data} options={{responsive : true}}/>
            case GRAPH_TYPES.GROUPED_BAR_CHART : 
                return <Bar options={groupdBarOptions} data={data}/>
            case GRAPH_TYPES.LINE_CHART : 
                return <Line options={LineChartOptions} data={data}/>
            case GRAPH_TYPES.STACKED_BAR_CHART : 
                return <Bar options={stackedBarOptions} data={data}/>
            case GRAPH_TYPES.POLAR_AREA_CHART : 
                return <PolarArea data={data}/>
        }
    }

    return (
        <RenderedChart/>
    )

    

}


