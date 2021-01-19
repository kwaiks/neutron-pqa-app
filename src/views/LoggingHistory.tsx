import React, {useState, useEffect} from 'react';
import {
    Row,
    Col,
    Card,
    Form,
    Tab,
    Nav,
    Button
} from 'react-bootstrap';
import {Line} from 'react-chartjs-2';
import axios from 'axios';
import {CSVLink} from 'react-csv';
import DatePicker from 'react-datepicker';
import 'chartjs-plugin-zoom';
import "hammerjs";
import {ChartOptionsList} from '../utils/constants';
import Loader from 'react-loader-spinner';

import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import "react-datepicker/dist/react-datepicker.css";

export default function LoggingHistory(props:any) {
    const { id } = props.match.params;
    const [loaded, setLoaded] = useState(false);
    const [detail, setDetail] = useState({
        lh_name: "",
        lh_interval: 0,
        lh_duration: 0,
        lh_start_time: new Date(),
        lh_end_time: new Date()
    });
    const [dataSrc, setDataSrc] = useState<any>([]);
    const [chartDataVolt, setChartDataVolt] = useState<any>(null);
    const [chartDataAmp, setChartDataAmp] = useState<any>(null);
    const [chartDataPwr, setChartDataPwr] = useState<any>(null);

    const [timeRangeSet, setTimeRangeSet] = useState(false);
    const [timeRangeOption, setTimeRangeOption] = useState(false);
    const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
    const [startDate, setStartDate] = useState<Date>(new Date());
    const [endDate, setEndDate] = useState<Date>(new Date());
    const [dateRange, setDateRange] = useState({minDate: new Date(), maxDate: new Date()});

    useEffect(() => {
        const changeChartData = () => {
            let dataSource = dataSrc;
            if(timeRangeOption){
                dataSource = dataSrc.filter((data:any)=>new Date(data.time) >= startDate && new Date(data.time) <= endDate);
            }
            if(dataSrc.length > 0){
                let dataSets:any[] = [];
                let currDataSet;
                let dataChart;
    
                const labels = dataSource.map((o:any)=>o.time.replace('T'," ")
                                .substring(0,19));
                // Volt
                const voltOptions = selectedOptions.filter((item:string) => item.includes("volt"));
                voltOptions.forEach((data:string)=>{
                    currDataSet = dataSource.map((item:any)=>item[data]);
                    const {dataSet}= ChartOptionsList[data];
                    dataSet.data = currDataSet;
                    dataSets.push(dataSet);
                })
                dataChart = {
                    labels,
                    datasets: dataSets
                }
                setChartDataVolt({
                    data:dataChart,
                    options: {
                        scales: {
                            yAxes: [{
                                display: true,
                                    scaleLabel: {
                                    display: true,
                                    labelString: 'Volt (V)'
                                },
                                ticks: {
                                    min: 100,
                                    max: 300,
                                    stepSize: 10
                                }
                            }],
                            xAxes: [{
                                ticks: {
                                    autoSkip: true,
                                    maxTicksLimit: 5
                                }
                            }]
                        },
                        legend: {
                            position: 'bottom'
                        },
                        zoom: {
                            enabled: true,
                            mode: 'x',
                            speed: 1000,
                            sensitivity: 0.1,
                            threshold: 2,
                            rangeMin: {
                                x: 200,
                                y: 200
                            },
                            rangeMax: {
                                x: 200,
                                y: 200
                            },
                        },
                        pan: {
                            enabled: true,
                            mode: 'x',
                            rangeMin: {
                                x: 200,
                                y: 200
                            },
                            rangeMax: {
                                // Format of min pan range depends on scale type
                                x: 200,
                                y: 200
                            },
                        },
                    }
                });
    
                // Ampere
                dataSets = [];
                const ampOptions = selectedOptions.filter((item:string) => item.includes("curr"));
                ampOptions.forEach((data:string)=>{
                    currDataSet = dataSource.map((item:any)=>item[data]);
                    const {dataSet}= ChartOptionsList[data];
                    dataSet.data = currDataSet;
                    dataSets.push(dataSet);
                });
                dataChart = {
                    labels,
                    datasets: dataSets
                }
                setChartDataAmp({
                    data:dataChart,
                    options: {
                        scales: {
                            yAxes: [{
                                display: true,
                                    scaleLabel: {
                                    display: true,
                                    labelString: 'Current (A)'
                                },
                            }],
                            xAxes: [{
                                ticks: {
                                    autoSkip: true,
                                    maxTicksLimit: 5
                                }
                            }]
                        },
                        legend: {
                            position: 'bottom'
                        },
                        zoom: {
                            enabled: true,
                            mode: 'x',
                            speed: 1000,
                            sensitivity: 0.1,
                            threshold: 2,
                            rangeMin: {
                                x: 200,
                                y: 200
                            },
                            rangeMax: {
                                x: 200,
                                y: 200
                            },
                        },
                        pan: {
                            enabled: true,
                            mode: 'x',
                            rangeMin: {
                                x: 200,
                                y: 200
                            },
                            rangeMax: {
                                // Format of min pan range depends on scale type
                                x: 200,
                                y: 200
                            },
                        },
                    }
                });
    
                // Power
                dataSets = [];
                const pwrOptions = selectedOptions.filter((item:string) => item.includes("act"));
                pwrOptions.forEach((data:string)=>{
                    currDataSet = dataSource.map((item:any)=>item[data]);
                    const {dataSet}= ChartOptionsList[data];
                    dataSet.data = currDataSet;
                    dataSets.push(dataSet);
                });
                dataChart = {
                    labels,
                    datasets: dataSets
                }
                setChartDataPwr({
                    data:dataChart,
                    options: {
                        scales: {
                            yAxes: [{
                                display: true,
                                    scaleLabel: {
                                    display: true,
                                    labelString: 'Active Power (Wh)'
                                },
                            }],
                            xAxes: [{
                                ticks: {
                                    autoSkip: true,
                                    maxTicksLimit: 5
                                }
                            }]
                        },
                        legend: {
                            position: 'bottom'
                        },
                        zoom: {
                            enabled: true,
                            mode: 'x',
                            speed: 1000,
                            sensitivity: 0.1,
                            threshold: 2,
                            rangeMin: {
                                x: 200,
                                y: 200
                            },
                            rangeMax: {
                                x: 200,
                                y: 200
                            },
                        },
                        pan: {
                            enabled: true,
                            mode: 'x',
                            rangeMin: {
                                x: 200,
                                y: 200
                            },
                            rangeMax: {
                                // Format of min pan range depends on scale type
                                x: 200,
                                y: 200
                            },
                        },
                    }
                });
            }
        }
        changeChartData();
    }, [selectedOptions, timeRangeOption, timeRangeSet]);

    useEffect(()=>{
        const fetchData = async () => {
            try {
                const {data} = await axios.get(`${process.env.BASE_URL}/get-data/${id}`);
                data.detail['lh_start_time'] = new Date(data.detail['lh_start_time']);
                data.detail['lh_end_time'] = new Date(data.detail['lh_end_time']);
                setDetail(data.detail);
                setDataSrc(data.data);
                setLoaded(true);
                setDateRange({
                    minDate: new Date(data.data[0].time),
                    maxDate: new Date(data.data[data.data.length-1].time)
                });
                setStartDate(new Date(data.data[0].time));
                setEndDate(new Date(data.data[data.data.length-1].time));
            }catch(err){
                console.error(err)
            }
        }
        if(dataSrc.length < 1){
            fetchData();
        }
    },[id, dataSrc])
    
    const checkCheckedBox = (value:string):boolean => {
        return selectedOptions.includes(value);
    }

    const onCheck = (param: any) => {
        const {value}:{value:string} = param.target;
        const index = selectedOptions.indexOf(value);
        if(index > -1){
            const newList = selectedOptions.filter((val)=>val !== value);
            setSelectedOptions(newList)
        }else{
            setSelectedOptions([...selectedOptions,value]);
        }
    }

    return (
        <>
        {console.log(chartDataAmp)}
        <Card className="mx-5">
            <Card.Body>
            { loaded ?
                <Row>
                    <Col sm="12" md="9">
                        <Row>
                        {
                            chartDataVolt && 
                            chartDataVolt.data.datasets &&
                            chartDataVolt.data.datasets.length > 0 ?
                                <Line data={chartDataVolt.data} options={chartDataVolt.options}
                                ></Line>
                            :
                            <></>
                        }   
                        </Row>
                        <Row>
                        {
                            chartDataAmp && 
                            chartDataAmp.data.datasets &&
                            chartDataAmp.data.datasets.length > 0 ?
                                <Line data={chartDataAmp.data} options={chartDataAmp.options}
                                ></Line>
                            :
                            <></>
                        }   
                        </Row>
                        <Row>
                        {
                            chartDataPwr && 
                            chartDataPwr.data.datasets &&
                            chartDataPwr.data.datasets.length > 0 ?
                                <Line data={chartDataPwr.data} options={chartDataPwr.options}
                                ></Line>
                            :
                            <></>
                        }   
                        </Row>
                    </Col>
                    <Col sm="12" md="3">
                        <Row>
                            <Col className="m-0 p-0">
                                <Card>
                                <div className="logging-header">Logging Detail</div>
                                    <Card.Body>
                                        <Row>
                                            <Col>
                                                <Row><h5>{detail.lh_name}</h5></Row>
                                                <Row className="flex justify-content-between">
                                                    Start : {detail.lh_start_time.toUTCString()}
                                                </Row>
                                                <Row className="flex justify-content-between">
                                                    End : {detail.lh_end_time.toUTCString()}
                                                </Row>
                                                <Row className="mt-1 flex justify-content-between">
                                                    Interval : {detail.lh_interval} seconds
                                                </Row>
                                                <Row className="flex justify-content-between">
                                                    Duration : {detail.lh_duration} minutes
                                                </Row>
                                            </Col>
                                        </Row>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                        <Row>
                            <Col className="m-0 p-0">
                                <Card>
                                <div className="logging-header">
                                    Left Scale Options
                                </div>
                                    <Tab.Container defaultActiveKey="voltTab">
                                        <Card.Header>
                                            <Col className="p-0">
                                                <Nav variant="pills" className="flex-row">
                                                    <Nav.Item>
                                                        <Nav.Link
                                                            eventKey="voltTab">
                                                            Volt (V)
                                                        </Nav.Link>
                                                    </Nav.Item>
                                                    <Nav.Item>
                                                        <Nav.Link 
                                                            eventKey="currTab">
                                                            Curr (A)
                                                        </Nav.Link>
                                                    </Nav.Item>
                                                    <Nav.Item>
                                                        <Nav.Link 
                                                            eventKey="pwrTab">
                                                            Active Power (Wh)
                                                        </Nav.Link>
                                                    </Nav.Item>
                                                    <Nav.Item>
                                                        <Nav.Link 
                                                            eventKey="freqTab">
                                                            Freq (Hz)
                                                        </Nav.Link>
                                                    </Nav.Item>
                                                </Nav>
                                            </Col>
                                        </Card.Header>
                                        <Card.Body>
                                            <Tab.Content className="w-100">
                                                <Tab.Pane eventKey="voltTab">
                                                    <Row>
                                                        <Col sm="6">
                                                            <Form.Check 
                                                                type="checkbox"
                                                                id="volt_l1"
                                                                className="mb-1"
                                                                checked={checkCheckedBox('volt_l1')}
                                                                value="volt_l1"
                                                                onChange={onCheck}
                                                                label="L1N (V)"
                                                            />
                                                            <Form.Check 
                                                                type="checkbox"
                                                                id="volt_l2"
                                                                checked={checkCheckedBox('volt_l2')}
                                                                value="volt_l2"
                                                                className="mb-1"
                                                                onChange={onCheck}
                                                                label="L2N (V)"
                                                            />
                                                            <Form.Check 
                                                                type="checkbox"
                                                                id="volt_l3"
                                                                checked={checkCheckedBox('volt_l3')}
                                                                value="volt_l3"
                                                                onChange={onCheck}
                                                                label="L3N (V)"
                                                            />
                                                        </Col>
                                                        <Col sm="6">
                                                            <Form.Check 
                                                                type="checkbox"
                                                                id="l1v"
                                                                disabled
                                                                checked={checkCheckedBox('x')}
                                                                value="l1v"
                                                                onChange={onCheck}
                                                                label="Min/Max"
                                                            />
                                                        </Col>
                                                    </Row>
                                                </Tab.Pane>
                                                <Tab.Pane eventKey="currTab">
                                                    <Row>
                                                    <Col sm="6">
                                                    <Form.Check 
                                                                type="checkbox"
                                                                id="curr_l1"
                                                                className="mb-1"
                                                                checked={checkCheckedBox('curr_l1')}
                                                                value="curr_l1"
                                                                onChange={onCheck}
                                                                label="L1N (A)"
                                                            />
                                                            <Form.Check 
                                                                type="checkbox"
                                                                id="curr_l2"
                                                                checked={checkCheckedBox('curr_l2')}
                                                                value="curr_l2"
                                                                className="mb-1"
                                                                onChange={onCheck}
                                                                label="L2N (A)"
                                                            />
                                                            <Form.Check 
                                                                type="checkbox"
                                                                id="curr_l3"
                                                                checked={checkCheckedBox('curr_l3')}
                                                                value="curr_l3"
                                                                onChange={onCheck}
                                                                label="L3N (A)"
                                                            />
                                                    </Col>
                                                    </Row>
                                                </Tab.Pane>
                                                <Tab.Pane eventKey="pwrTab">
                                                    <Row>
                                                    <Col sm="6">
                                                    <Form.Check 
                                                                type="checkbox"
                                                                id="act_pwr_l1"
                                                                className="mb-1"
                                                                checked={checkCheckedBox('act_pwr_l1')}
                                                                value="act_pwr_l1"
                                                                onChange={onCheck}
                                                                label="L1N (W)"
                                                            />
                                                            <Form.Check 
                                                                type="checkbox"
                                                                id="act_pwr_l2"
                                                                checked={checkCheckedBox('act_pwr_l2')}
                                                                value="act_pwr_l2"
                                                                className="mb-1"
                                                                onChange={onCheck}
                                                                label="L2N (W)"
                                                            />
                                                            <Form.Check 
                                                                type="checkbox"
                                                                id="act_pwr_l3"
                                                                checked={checkCheckedBox('act_pwr_l3')}
                                                                value="act_pwr_l3"
                                                                onChange={onCheck}
                                                                label="L3N (W)"
                                                            />
                                                    </Col>
                                                    </Row>
                                                </Tab.Pane>
                                                <Tab.Pane eventKey="freqTab">
                                                    <Row>
                                                        <Col sm="6">
                                                            <Form.Check 
                                                                    type="checkbox"
                                                                    id="freq"
                                                                    className="mb-1"
                                                                    checked={checkCheckedBox('freq')}
                                                                    value="freq"
                                                                    onChange={onCheck}
                                                                    label="Freq (Hz)"
                                                                />
                                                        </Col>
                                                    </Row>
                                                </Tab.Pane>
                                            </Tab.Content>
                                        </Card.Body>
                                    </Tab.Container>
                                </Card>
                            </Col>
                        </Row>
                        {/* <Row>
                            <Col className="m-0 p-0">
                                <Card>
                                <div className="logging-header">Right Scale Options</div>
                                    <Tab.Container defaultActiveKey="vTHDTab">
                                        <Card.Header>
                                            <Col className="p-0">
                                                <Nav variant="pills" className="flex-row">
                                                    <Nav.Item>
                                                        <Nav.Link eventKey="vTHDTab">V THD [%]</Nav.Link>
                                                    </Nav.Item>
                                                    <Nav.Item>
                                                        <Nav.Link eventKey="aTHDTab">A THD [%]</Nav.Link>
                                                    </Nav.Item>
                                                </Nav>
                                            </Col>
                                        </Card.Header>
                                        <Card.Body>
                                            <Tab.Content className="w-100">
                                                <Tab.Pane eventKey="vTHDTab">
                                                    <Row>
                                                        <Col sm="6">
                                                            <Form.Check 
                                                                type="checkbox"
                                                                id="volt_thd_l1"
                                                                className="mb-1"
                                                                checked={checkCheckedBox('volt_thd_l1')}
                                                                value="volt_thd_l1"
                                                                onChange={onCheck}
                                                                label="L1N (%)"
                                                            />
                                                            <Form.Check 
                                                                type="checkbox"
                                                                id="volt_thd_l2"
                                                                checked={checkCheckedBox('volt_thd_l2')}
                                                                value="volt_thd_l2"
                                                                className="mb-1"
                                                                onChange={onCheck}
                                                                label="L2N (%)"
                                                            />
                                                            <Form.Check 
                                                                type="checkbox"
                                                                id="volt_thd_l3"
                                                                checked={checkCheckedBox('volt_thd_l3')}
                                                                value="volt_thd_l3"
                                                                onChange={onCheck}
                                                                label="L3N (%)"
                                                            />
                                                        </Col>
                                                        <Col sm="6">
                                                            <Form.Check 
                                                                type="checkbox"
                                                                id="l1v"
                                                                disabled
                                                                checked={false}
                                                                value="l1v"
                                                                onChange={onCheck}
                                                                label="Min/Max"
                                                            />
                                                        </Col>
                                                    </Row>
                                                </Tab.Pane>
                                                <Tab.Pane eventKey="aTHDTab">
                                                    <Row>
                                                    <Col sm="6">
                                                        <Form.Check 
                                                            type="checkbox"
                                                            id="curr_thd_l1"
                                                            className="mb-1"
                                                            checked={checkCheckedBox('curr_thd_l1')}
                                                            value="curr_thd_l1"
                                                            onChange={onCheck}
                                                            label="L1N (%)"
                                                        />
                                                        <Form.Check 
                                                            type="checkbox"
                                                            id="curr_thd_l2"
                                                            checked={checkCheckedBox('curr_thd_l2')}
                                                            value="curr_thd_l2"
                                                            className="mb-1"
                                                            onChange={onCheck}
                                                            label="L2N (%)"
                                                        />
                                                        <Form.Check 
                                                            type="checkbox"
                                                            id="curr_thd_l3"
                                                            checked={checkCheckedBox('curr_thd_l3')}
                                                            value="curr_thd_l3"
                                                            onChange={onCheck}
                                                            label="L3N (%)"
                                                        />
                                                    </Col>
                                                    <Col sm="6">
                                                    </Col>
                                                    </Row>
                                                </Tab.Pane>
                                            </Tab.Content>
                                        </Card.Body>
                                    </Tab.Container>
                                </Card>
                            </Col>
                        </Row> */}
                        <Row>
                            <Col className="m-0 p-0">
                                <Card>
                                <div className="logging-header">Time Range</div>
                                    <Card.Body>
                                        <Row>
                                            <Col>
                                                <Form.Check 
                                                    type="checkbox"
                                                    id="l1v"
                                                    checked={timeRangeOption}
                                                    value="l1v"
                                                    onChange={()=>setTimeRangeOption(!timeRangeOption)}
                                                    label="Set Time Range"
                                                />
                                                <Row className="mt-2">
                                                    <Col sm="6">
                                                        Start Date
                                                    <DatePicker selected={startDate} 
                                                    disabled={!timeRangeOption}
                                                    className="date-time-wrapper"
                                                    dateFormat="dd/MM/yyyy h:mm a"
                                                    showTimeInput
                                                    minDate={dateRange.minDate}
                                                    maxDate={dateRange.maxDate}
                                                    onChange={(date:Date) => setStartDate(date)} />
                                                    </Col>
                                                </Row>
                                                <Row className="mt-2">
                                                    <Col sm="6">
                                                        End Date
                                                    <DatePicker selected={endDate} 
                                                    showTimeInput
                                                    disabled={!timeRangeOption}
                                                    className="date-time-wrapper"
                                                    dateFormat="dd/MM/yyyy h:mm a"
                                                    minDate={dateRange.minDate}
                                                    maxDate={dateRange.maxDate}
                                                    onChange={(date:Date) => setEndDate(date)} />
                                                    </Col>
                                                </Row>
                                                <Row className="mt-2">
                                                    <Col>
                                                        <Button disabled={!timeRangeOption}
                                                        onClick={()=>setTimeRangeSet(!timeRangeSet)}
                                                        size="sm">Set</Button>
                                                    </Col>
                                                </Row>
                                            </Col>
                                        </Row>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                        <Row>
                            <Col className="m-0 p-0">
                                <Card>
                                <div className="logging-header">Download Data</div>
                                    <Card.Body>
                                        <Row>
                                            <Col>
                                                <CSVLink className="btn btn-primary" data={dataSrc} filename={`${id}_${detail.lh_name}.npi`}>Download</CSVLink>
                                            </Col>
                                        </Row>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            : <Row className="justify-content-center align-items-center" >
                <Loader
                type="ThreeDots"
                color="#00BFFF"
                height={100}
                width={100}
                timeout={3000} //3 secs
                />
            </Row>
                    }
            </Card.Body>
        </Card>
         </>
    )
}