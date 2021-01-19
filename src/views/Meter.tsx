import React, {useState, useEffect} from 'react';
import {
    Container,
    Tabs,
    Row,
    Tab,
    Col,
    Card,
    Form,
} from 'react-bootstrap';
import {
    BarChart, Bar, XAxis, YAxis, Tooltip,
} from 'recharts';
import {connect} from 'react-redux';
import UnitContainer from '../components/UnitContainer';
import {MeterData} from '../types/meter';
import {getUnit} from '../utils/meterUnit';

const CustomizedLabel = (props:any) => {
    const {x, y, width, height, value} = props;
    const dx = (x+(width/2));
    const dy = height >= 30 ? y+20 : y+(height/2);
    return <text x={dx} y={dy} fill={'white'} fontSize={14} textAnchor="middle" dominantBaseline="middle">{value} %</text>
}

interface BarItem {
    name: string;
    value: number;
}

const Meter = (props:any) => {
    const [voltSelector, setVoltSelector] = useState("l1v");
    const [curSelector, setCurSelector] = useState("l1a");
    const [voltBar, setVoltBar] = useState<Array<BarItem>>([]);
    const [curBar, setCurBar] = useState<Array<BarItem>>([]);
    const [thd, setTHD] = useState(true);
    const [odd, setOdd] = useState(false);
    const [even, setEven] = useState(false);
    const [meter, setMeter] = useState<MeterData>({} as MeterData);

    useEffect(() => {
        setMeter(props.meter);
    },[props]);

    useEffect(()=>{
        setVoltBar(generateVoltageData);
        setCurBar(generateCurrentData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[thd,odd,even,curSelector,voltSelector])

    const generateVoltageData = () : Array<BarItem> => {
        let harmonics = null;
        let currTHD = 0;
        let data: Array<BarItem> = [];

        switch(voltSelector){
            case "l1v":
                harmonics = meter.volt_l1_harmonic;
                currTHD = meter.volt_thd_l1;
                break;
            case "l2v":
                harmonics = meter.volt_l2_harmonic;
                currTHD = meter.volt_thd_l2;
                break;
            case "l3v":
                harmonics = meter.volt_l3_harmonic;
                currTHD = meter.volt_thd_l3;
                break;
            default:
                break;
        }

        if(thd){
            const currData : BarItem = {
                name: '',
                value: 0
            };
            currData.name = "THD";
            currData.value = currTHD;
            data.push(currData);
        }

        harmonics?.forEach((val,i)=>{
            const currItem : BarItem = {
                name: String(i+1),
                value: val
            };
            if(odd && even){
                return data.push(currItem);
            }
            if(odd && (i%2 === 0)){
                data.push(currItem);
            }
            if(even && (i%2 === 1)){
                data.push(currItem);
            }
            return;
        });
        return data;
    }

    const generateCurrentData = () : Array<BarItem> => {
        let harmonics = null;
        let currTHD = 0;
        let data: Array<BarItem> = [];

        switch(curSelector){
            case "l1a":
                harmonics = meter.curr_l1_harmonic;
                currTHD = meter.curr_thd_l1;
                break;
            case "l2a":
                harmonics = meter.curr_l2_harmonic;
                currTHD = meter.curr_thd_l2;
                break;
            case "l3a":
                harmonics = meter.curr_l3_harmonic;
                currTHD = meter.curr_thd_l3;
                break;
            default:
                break;
        }

        if(thd){
            const currData : BarItem = {
                name: '',
                value: 0
            };
            currData.name = "THD";
            currData.value = currTHD;
            data.push(currData);
        }

        harmonics?.forEach((val,i)=>{
            const currItem : BarItem = {
                name: String(i+1),
                value: val
            };
            if(odd && even){
                return data.push(currItem);
            }
            if(odd && (i%2 === 0)){
                data.push(currItem);
            }
            if(even && (i%2 === 1)){
                data.push(currItem);
            }
            return;
        });
        return data;
    }

    const onChangeVoltage = (param:any) => {
        setVoltSelector(param.target.value);
    }

    const onChangeCurrent = (param:any) => {
        setCurSelector(param.target.value);
    }

    return (
        <Container fluid>
            <Tabs defaultActiveKey="metering" id="tabs">
                <Tab eventKey="metering" title="Metering">
                    <Row>
                        <Col sm="12" md="6">
                            <Card className="h-100">
                                <Card.Body>
                                    <Row className="justify-content-center">
                                        <h5>Voltage Line to Line</h5>
                                    </Row>
                                    <Row className="justify-content-around">
                                        <Col sm="12" md="3" className="meter-block">
                                            <div className="meter-title l1">L1 - L2</div>
                                            <UnitContainer unit={getUnit("volt_l1_l2")} value={meter.volt_l1_l2} />
                                        </Col>
                                        <Col sm="12" md="3" className="meter-block">
                                            <div className="meter-title l2">L2 - L3</div>
                                            <UnitContainer unit={getUnit("volt_l2_l3")} value={meter.volt_l2_l3} />
                                        </Col>
                                        <Col sm="12" md="3" className="meter-block">
                                            <div className="meter-title l3">L3 - L1</div>
                                            <UnitContainer unit={getUnit("volt_l3_l1")} value={meter.volt_l3_l1} />
                                        </Col>
                                        <Col sm="12" md="3" className="meter-block">
                                            <div className="meter-title total">Average</div>
                                            <UnitContainer unit={getUnit("avg_l2l")} value={meter.avg_l2l} />
                                        </Col>
                                    </Row>
                                    <Row className="justify-content-center">
                                        <h5>Voltage Line to Neutral</h5>
                                    </Row>
                                    <Row className="justify-content-around">
                                        <Col sm="12" md="3" className="meter-block">
                                            <div className="meter-title l1">L1</div>
                                            <UnitContainer unit={getUnit("volt_l1")} value={meter.volt_l1} />
                                        </Col>
                                        <Col sm="12" md="3" className="meter-block">
                                            <div className="meter-title l2">L2</div>
                                            <UnitContainer unit={getUnit("volt_l2")} value={meter.volt_l2} />
                                        </Col>
                                        <Col sm="12" md="3" className="meter-block">
                                            <div className="meter-title l3">L3</div>
                                            <UnitContainer unit={getUnit("volt_l3")} value={meter.volt_l3} />
                                        </Col>
                                        <Col sm="12" md="3" className="meter-block">
                                            <div className="meter-title total">Average</div>
                                            <UnitContainer unit={getUnit("avg_volt_ln")} value={meter.avg_volt_ln} />
                                        </Col>
                                    </Row>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col sm="12" md="6">
                            <Card className="h-100">
                                <Card.Body>
                                <Row className="justify-content-center">
                                        <h5>Voltage Line to Line THD</h5>
                                    </Row>
                                    <Row className="justify-content-around">
                                        <Col sm="12" md="3" className="meter-block">
                                            <div className="meter-title l1">L1 - L2</div>
                                            <UnitContainer unit={getUnit("volt_l1_l2_thd")} value={meter.volt_l1_l2_thd} />
                                        </Col>
                                        <Col sm="12" md="3" className="meter-block">
                                            <div className="meter-title l2">L2 - L3</div>
                                            <UnitContainer unit={getUnit("volt_l2_l3_thd")} value={meter.volt_l2_l3_thd} />
                                        </Col>
                                        <Col sm="12" md="3" className="meter-block">
                                            <div className="meter-title l3">L3 - L1</div>
                                            <UnitContainer unit={getUnit("volt_l3_l1_thd")} value={meter.volt_l3_l1_thd} />
                                        </Col>
                                        <Col sm="12" md="3" className="meter-block">
                                            <div className="meter-title total">Average</div>
                                            <UnitContainer unit={getUnit("avg_thd_ln")} value={meter.avg_thd_ln} />
                                        </Col>
                                    </Row>
                                    <Row className="justify-content-center">
                                        <h5>Voltage Line to Neutral THD</h5>
                                    </Row>
                                    <Row className="justify-content-around">
                                        <Col sm="12" md="3" className="meter-block">
                                            <div className="meter-title l1">L1</div>
                                            <UnitContainer unit={getUnit("volt_thd_l1")} value={meter.volt_thd_l1} />
                                        </Col>
                                        <Col sm="12" md="3" className="meter-block">
                                            <div className="meter-title l2">L2</div>
                                            <UnitContainer unit={getUnit("volt_thd_l2")} value={meter.volt_thd_l2} />
                                        </Col>
                                        <Col sm="12" md="3" className="meter-block">
                                            <div className="meter-title l3">L3</div>
                                            <UnitContainer unit={getUnit("volt_thd_l3")} value={meter.volt_thd_l3} />
                                        </Col>
                                        <Col sm="12" md="3" className="meter-block">
                                            <div className="meter-title total">Average</div>
                                            <UnitContainer unit={getUnit("avg_volt_thd")} value={meter.avg_volt_thd} />
                                        </Col>
                                    </Row>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                    <Row className="mt-3">
                        <Col sm="12" md="6">
                            <Card className="h-100">
                                <Card.Body>
                                    <Row className="justify-content-center">
                                        <h5>Current</h5>
                                    </Row>
                                    <Row className="justify-content-around">
                                        <Col sm="12" md="3" className="meter-block">
                                            <div className="meter-title l1">L1</div>
                                            <UnitContainer unit={getUnit("curr_l1")} value={meter.curr_l1} />
                                        </Col>
                                        <Col sm="12" md="3" className="meter-block">
                                            <div className="meter-title l2">L2</div>
                                            <UnitContainer unit={getUnit("curr_l2")} value={meter.curr_l2} />
                                        </Col>
                                        <Col sm="12" md="3" className="meter-block">
                                            <div className="meter-title l3">L3</div>
                                            <UnitContainer unit={getUnit("curr_l3")} value={meter.curr_l3} />
                                        </Col>
                                        <Col sm="12" md="3" className="meter-block">
                                            <div className="meter-title total">Average</div>
                                            <UnitContainer unit={getUnit("avg_curr_ln")} value={meter.avg_curr_ln} />
                                        </Col>
                                    </Row>
                                    <Row className="justify-content-center">
                                        <h5>Current THD</h5>
                                    </Row>
                                    <Row className="justify-content-around">
                                        <Col sm="12" md="3" className="meter-block">
                                            <div className="meter-title l1">L1</div>
                                            <UnitContainer unit={getUnit("curr_thd_l1")} value={meter.curr_thd_l1} />
                                        </Col>
                                        <Col sm="12" md="3" className="meter-block">
                                            <div className="meter-title l2">L2</div>
                                            <UnitContainer unit={getUnit("curr_thd_l2")} value={meter.curr_thd_l2} />
                                        </Col>
                                        <Col sm="12" md="3" className="meter-block">
                                            <div className="meter-title l3">L3</div>
                                            <UnitContainer unit={getUnit("curr_thd_l3")} value={meter.curr_thd_l3} />
                                        </Col>
                                        <Col sm="12" md="3" className="meter-block">
                                            <div className="meter-title total">Average</div>
                                            <UnitContainer unit={getUnit("avg_curr_thd")} value={meter.avg_curr_thd} />
                                        </Col>
                                    </Row>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col sm="12" md="6">
                            <Card className="h-100">
                                <Card.Body>
                                    <Row className="justify-content-center">
                                        <h5>Total Current</h5>
                                    </Row>
                                    <Row className="justify-content-around">
                                        <Col sm="12" md="6" className="meter-block">
                                            <div className="meter-title total">Total Current</div>
                                            <UnitContainer unit={getUnit("total_curr_ln")} value={meter.total_curr_ln} />
                                        </Col>
                                        <Col sm="12" md="6" className="meter-block">
                                            <div className="meter-title total">Neutral Current</div>
                                            <UnitContainer unit={getUnit("curr_neut")} value={meter.curr_neut} />
                                        </Col>
                                    </Row>
                                    <Row className="mt-2 justify-content-center">
                                        <h5>Frequency</h5>
                                    </Row>
                                    <Row>
                                        <Col sm="9" className="meter-block">
                                            <UnitContainer unit={getUnit("freq")} value={meter.freq} />
                                        </Col>
                                    </Row>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Tab>
                <Tab eventKey="harmonic" title="Harmonics">
                    <Row>
                        <Col sm="12">
                            <Card>
                                <Card.Body>
                                    <Row className="w-100">
                                        <Col sm="2">
                                            <div>Display Channel</div>
                                        </Col>
                                        <Col sm="6">
                                            <Row>
                                                <Form.Check 
                                                    type="checkbox"
                                                    id="l1v"
                                                    checked={voltSelector === "l1v"}
                                                    value="l1v"
                                                    onChange={onChangeVoltage}
                                                    label="L1N (V)"
                                                />
                                                <Form.Check 
                                                    checked={voltSelector === "l2v"}
                                                    value="l2v"
                                                    onChange={onChangeVoltage}
                                                    type="checkbox"
                                                    id="l2v"
                                                    label="L2N (V)"
                                                />
                                                <Form.Check 
                                                    type="checkbox"
                                                    id="l3v"
                                                    label="L3N (V)"
                                                    checked={voltSelector === "l3v"}
                                                    value="l3v"
                                                    onChange={onChangeVoltage}
                                                />
                                                <Form.Check 
                                                    type="checkbox"
                                                    id="l1a"
                                                    label="L1 (A)"
                                                    checked={curSelector === "l1a"}
                                                    value="l1a"
                                                    onChange={onChangeCurrent}
                                                />
                                                <Form.Check 
                                                    type="checkbox"
                                                    id="l2a"
                                                    label="L2 (A)"
                                                    checked={curSelector === "l2a"}
                                                    value="l2a"
                                                    onChange={onChangeCurrent}
                                                />
                                                <Form.Check 
                                                    type="checkbox"
                                                    id="l3a"
                                                    label="L3 (A)"
                                                    checked={curSelector === "l3a"}
                                                    value="l3a"
                                                    onChange={onChangeCurrent}
                                                />
                                            </Row>
                                        </Col>
                                        <Col sm="1">
                                            <div>Ordo</div>
                                        </Col>
                                        <Col sm="3">
                                            <Row>
                                                <Form.Check 
                                                    type="checkbox"
                                                    id="thd"
                                                    label="THD"
                                                    checked={thd}
                                                    onChange={()=>setTHD(!thd)}
                                                />
                                                <Form.Check 
                                                    type="checkbox"
                                                    id="odd"
                                                    label="ODD"
                                                    checked={odd}
                                                    onChange={()=>setOdd(!odd)}
                                                />
                                                <Form.Check 
                                                    type="checkbox"
                                                    id="even"
                                                    label="EVEN"
                                                    checked={even}
                                                    onChange={()=>setEven(!even)}
                                                />
                                            </Row>
                                        </Col>
                                    </Row>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                    <Row className="mt-2">
                        <Col sm="12">
                            <Card>
                                <Card.Body>
                                    <Row>
                                        <Col sm="12">
                                            {voltBar.length > 0 ? 
                                                <BarChart height={200} width={(11/12*window.innerWidth)} data={voltBar}>
                                                <XAxis dataKey="name" />
                                                <Tooltip />
                                                <YAxis label={{ value: '%HL1N (V)', angle: -90, position: 'insideLeft' }} axisLine={false} tickLine={false} tickSize={0}/>
                                                <Bar dataKey="value" fill="#1565C0" label={<CustomizedLabel />}/>
                                            </BarChart> :
                                                <div></div>
                                            }
                                        </Col>
                                    </Row>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                    <Row className="mt-2">
                        <Col sm="12">
                            <Card>
                                <Card.Body>
                                    <Row>
                                        <Col sm="12">
                                            {voltBar.length > 0 ? 
                                                <BarChart height={200} width={(11/12*window.innerWidth)} data={curBar}>
                                                    <XAxis dataKey="name" />
                                                    <Tooltip />
                                                    <YAxis label={{ value: '%HL1N (A)', angle: -90, position: 'insideLeft' }} axisLine={false} tickLine={false} tickSize={0}/>
                                                    <Bar dataKey="value" fill="#1565C0" label={<CustomizedLabel />}/>
                                                </BarChart> :
                                                    <div></div>
                                            }
                                        </Col>
                                    </Row>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Tab>
            </Tabs>
        </Container>
    );
}

const mapStateToProps = (state: any) => ({
    meter: {
        ...state.meter
    }
});

export default connect(mapStateToProps)(Meter);