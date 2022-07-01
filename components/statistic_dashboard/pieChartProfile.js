const chartColors = {
    primaryColorShade: 'rgba(54, 162, 235, 0.5)',
    successColorShade: 'rgba(40,218,198,0.8)',
    warningColorShade: '#ffe802',
    warningLightColor: '#FDAC34',
    infoColorShade: '#299AFF',
    redColor: '#F44336',
    orangeColor: '#ff9800',
    yellowColor: '#ffe800',
    greenColor: '#4CAF50',
    greyColor: '#4F5D70',
    blueColor: '#2c9aff',
    greenLightColor: '#BCF8E3',
    blueLightColor: '#84D0FF',
    greyLightColor: '#EDF1F4',
    tooltipShadow: 'rgba(0, 0, 0, 0.25)',
    lineChartPrimary: '#666ee8',
    lineChartDanger: '#ff4961',
    labelColor: '#6e6b7b',
    grid_line_color: 'rgba(200, 200, 200, 0.2)',
}
  
  export default {
    pieChart: {
        type: 'pie',
        data: {
            labels: [],
            datasets: [{
                data: [],
                backgroundColor: [
                    chartColors.greenColor,
                    chartColors.orangeColor,
                    chartColors.redColor,
                ],
            }],
        },
        options: {
            responsive: false,
            legend: {
                position: 'left',
            },
            tooltips: {
                callbacks: {
                    label: function(tooltipItem, data) {
                        var dataset = data.datasets[tooltipItem.datasetIndex];
                        var total = dataset.data.reduce(function(previousValue, currentValue, currentIndex, array) {
                            return previousValue + currentValue;
                        });
                        var currentValue = dataset.data[tooltipItem.index];
                        var percentage = ((currentValue/total) * 100).toFixed(2);         
                        return currentValue + " (" + percentage + "%" + ")";
                    }
                }
            },
        },
    },
    pieChart2Data: {
        type: 'pie',
        data: {
            labels: [],
            datasets: [{
                data: [],
                backgroundColor: [
                    chartColors.greenColor,
                    chartColors.orangeColor,
                ],
            }],
        },
        options: {
            responsive: false,
            legend: {
                position: 'left',
            },
            tooltips: {
                callbacks: {
                    label: function(tooltipItem, data) {
                        var dataset = data.datasets[tooltipItem.datasetIndex];
                        var total = dataset.data.reduce(function(previousValue, currentValue, currentIndex, array) {
                            return previousValue + currentValue;
                        });
                        var currentValue = dataset.data[tooltipItem.index];
                        var percentage = ((currentValue/total) * 100).toFixed(2);         
                        return currentValue + " (" + percentage + "%" + ")";
                    }
                }
            },
        },
    },
  }
  