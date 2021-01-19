export const ChartOptionsList:any =
{
    volt_l1:{
        options: {
            id: 'volt_l1',
            type: 'linear',
            position: 'left',
            scaleLabel: {
                display: true,
                labelString: "Volt L1(V)"
            }
        },
        dataSet: {
            label: 'Volt (L1)',
            borderColor: 'red',
            pointRadius: 0,
            //yAxisID: 'volt_l1',
            fill: false,
            data: []
        }
    },
    volt_l2:{
        options: {
            id: 'volt_l2',
            type: 'linear',
            position: 'left',
            scaleLabel: {
                display: true,
                labelString: "Volt L2(V)"
            }
        },
        dataSet: {
            label: 'Volt (L2)',
            borderColor: 'orange',
            //yAxisID: 'volt_l2',
            fill: false,
            data: []
        }
    },
    volt_l3:{
        options: {
            id: 'volt_l3',
            type: 'linear',
            position: 'left',
            scaleLabel: {
                display: true,
                labelString: "Volt L3(V)"
            }
        },
        dataSet: {
            label: 'Volt (L3)',
            borderColor: 'yellow',
            //yAxisID: 'volt_l3',
            fill: false,
            data: []
        }
    },
    curr_l1:{
        options: {
            id: 'curr_l1',
            type: 'linear',
            position: 'left',
            scaleLabel: {
                display: true,
                labelString: "Current L1(V)"
            }
        },
        dataSet: {
            label: 'Current (L1)',
            borderColor: 'blue',
            //yAxisID: 'curr_l1',
            fill: false,
            data: []
        }
    },
    curr_l2:{
        options: {
            id: 'curr_l2',
            type: 'linear',
            position: 'left',
            scaleLabel: {
                display: true,
                labelString: "Current L2(V)"
            }
        },
        dataSet: {
            label: 'Current (L2)',
            borderColor: 'green',
            //yAxisID: 'curr_l2',
            fill: false,
            data: []
        }
    },
    curr_l3:{
        options: {
            id: 'curr_l3',
            type: 'linear',
            position: 'left',
            scaleLabel: {
                display: true,
                labelString: "Current L3(V)"
            }
        },
        dataSet: {
            label: 'Current (L3)',
            borderColor: 'purple',
            yAxisID: 'curr_l3',
            fill: false,
            data: []
        }
    },
    act_pwr_l1:{
        options: {
            id: 'act_pwr_l1',
            type: 'linear',
            position: 'left',
            scaleLabel: {
                display: true,
                labelString: "Active Power L1(W)"
            }
        },
        dataSet: {
            label: 'Active Power (L1)',
            borderColor: 'red',
            pointRadius: 0,
            //yAxisID: 'volt_l1',
            fill: false,
            data: []
        }
    },
    act_pwr_l2:{
        options: {
            id: 'act_pwr_l2',
            type: 'linear',
            position: 'left',
            scaleLabel: {
                display: true,
                labelString: "Active Power L2(W)"
            }
        },
        dataSet: {
            label: 'Active Power (L2)',
            borderColor: 'orange',
            pointRadius: 0,
            //yAxisID: 'volt_l1',
            fill: false,
            data: []
        }
    },
    act_pwr_l3:{
        options: {
            id: 'act_pwr_l3',
            type: 'linear',
            position: 'left',
            scaleLabel: {
                display: true,
                labelString: "Active Power L3(W)"
            }
        },
        dataSet: {
            label: 'Active Power (L3)',
            borderColor: 'yellow',
            pointRadius: 0,
            //yAxisID: 'volt_l1',
            fill: false,
            data: []
        }
    },
    freq:{
        options: {
            id: 'freq',
            type: 'linear',
            position: 'left',
            scaleLabel: {
                display: true,
                labelString: "Frequency (Hz)"
            }
        },
        dataSet: {
            label: 'Frequency',
            borderColor: 'black',
            yAxisID: 'freq',
            fill: false,
            data: []
        }
    },
    volt_thd_l1:{
        options: {
            id: 'volt_l1_thd',
            type: 'linear',
            position: 'right',
            scaleLabel: {
                display: true,
                labelString: "Volt L1 THD (%)"
            }
        },
        dataSet: {
            label: 'Volt L1 THD',
            borderColor: 'orangered',
            yAxisID: 'volt_l1_thd',
            fill: false,
            data: []
        }
    },
    volt_thd_l2:{
        options: {
            id: 'volt_l2_thd',
            type: 'linear',
            position: 'right',
            scaleLabel: {
                display: true,
                labelString: "Volt L2 THD (%)"
            }
        },
        dataSet: {
            label: 'Volt L2 THD',
            borderColor: 'indianred',
            yAxisID: 'volt_l2_thd',
            fill: false,
            data: []
        }
    },
    volt_thd_l3:{
        options: {
            id: 'volt_l3_thd',
            type: 'linear',
            position: 'right',
            scaleLabel: {
                display: true,
                labelString: "Volt L3 THD (%)"
            }
        },
        dataSet: {
            label: 'Volt L3 THD',
            borderColor: 'sienna',
            yAxisID: 'volt_l3_thd',
            fill: false,
            data: []
        }
    },
    curr_thd_l1:{
        options: {
            id: 'curr_thd_l1',
            type: 'linear',
            position: 'right',
            scaleLabel: {
                display: true,
                labelString: "Current L1 THD (%)"
            }
        },
        dataSet: {
            label: 'Current L1 THD',
            borderColor: 'aquamarine',
            yAxisID: 'curr_thd_l1',
            fill: false,
            data: []
        }
    },
    curr_thd_l2:{
        options: {
            id: 'curr_thd_l2',
            type: 'linear',
            position: 'right',
            scaleLabel: {
                display: true,
                labelString: "Current L2 THD (%)"
            }
        },
        dataSet: {
            label: 'Current L2 THD',
            borderColor: 'lime',
            yAxisID: 'curr_thd_l2',
            fill: false,
            data: []
        }
    },
    curr_thd_l3:{
        options: {
            id: 'curr_thd_l3',
            type: 'linear',
            position: 'right',
            scaleLabel: {
                display: true,
                labelString: "Current L3 THD (%)"
            }
        },
        dataSet: {
            label: 'Current L3 THD',
            borderColor: 'cyan',
            yAxisID: 'curr_thd_l3',
            fill: false,
            data: []
        }
    }
}