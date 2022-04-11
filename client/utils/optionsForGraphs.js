export const verticalBarOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' ,
      },
      title: {
        display: true,
        text: 'Vertical Bar Chart',
      },
    },
  };

  export const horizontalBarOptions = {
    indexAxis: 'y',
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    responsive: true,
    plugins: {
      legend: {
        position: 'right',
      },
      title: {
        display: true,
        text: 'Horizontal Bar Chart',
      },
    },
  };
  
  export const stackedBarOptions = {
    plugins: {
      title: {
        display: true,
        text: 'Stacked Bar chart',
      },
    },
    responsive: true,
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
      },
    },
  };

  export const groupdBarOptions = {
    plugins: {
      title: {
        display: true,
        text: 'Grouped Bar Chart',
      },
    },
    responsive: true,
    interaction: {
      mode: 'index' ,
      intersect: false,
    },
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
      },
    },
  };
  
  export const LineChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Line Chart',
      },
    },
  };


  export const MultiAxisOptions = {
    responsive: true,
    interaction: {
      mode: 'index' ,
      intersect: false,
    },
    stacked: false,
    plugins: {
      title: {
        display: true,
        text: ' Multi Axis',
      },
    },
    scales: {
      y: {
        type: 'linear',
        display: true,
        position: 'left' ,
      },
      y1: {
        type: 'linear',
        display: true,
        position: 'right' ,
        grid: {
          drawOnChartArea: false,
        },
      },
    },
  };
  
  
export const scatterBubblePlotOptions = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };
  
export const GRAPH_TYPES = {
    BAR_CHART : 'BAR_CHART',
    PIE_CHART : 'PIE_CHART',
    DOUGHNUT_CHART : 'DOUGHNUT_CHART',
    POLAR_AREA_CHART : 'POLAR_AREA_CHART',
    BUBBLE_CHART : 'BUBBLE_CHART',
    STACKED_BAR_CHART : 'STACKED_CHART',
    GROUPED_BAR_CHART : 'GROUPED_BAR_CHART',
    LINE_CHART : 'LINE_CHART'
}

export const barOptions = {
  scales: {
    y: {
      grid: {
        color: '#18393e'
      }
    },
    x: {
      grid: {
        color: '#18393e'
      }
    }
  }
}
