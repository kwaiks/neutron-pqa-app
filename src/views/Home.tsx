import React from 'react';
import { 
    Container,
    Col,
    Row,
    Card
} from 'react-bootstrap';
import {connect} from 'react-redux';
import {MeterData} from '../types/meter';
import {getUnit} from '../utils/meterUnit';
import UnitContainer from '../components/UnitContainer';
import Phasor from '../components/PhasorDiagram';
import drawLine from '../utils/drawPhasorLine';

const Home = (props:any) => {
    const [meter, setMeter] = React.useState<MeterData>({} as MeterData);

    React.useEffect(() => {
        setMeter(props.meter)
    },[props])
    const draw = (ctx:any) => {
        drawLine(ctx, 240, '#ff0000', 'V3', false);
        drawLine(ctx, 0, '#0000ff', 'V1', false);
        drawLine(ctx, 120, '#00ff00', 'V2', false);
        drawLine(ctx, 250, '#ff0000', 'I3', true);
        drawLine(ctx, 10, '#0000ff', 'I1', true);
        drawLine(ctx, 100, '#00ff00', 'I2', true);
    }
    return(
        <Container fluid>
            <Row>
                <Col xs="12" sm="12" md="7" >
                    <Card className="h-100">
                        <Card.Body>
                            <Row className="justify-content-center">
                                <h4>POWER</h4>
                            </Row>
                            <Row  className="justify-content-around">
                                <Col sm="12" md="3" className="meter-block">
                                    <div className="meter-title l1">L1</div>
                                    <UnitContainer unit={getUnit("act_pwr_l1")} value={meter.act_pwr_l1} />
                                    <UnitContainer unit={getUnit("apt_pwr_l1")} value={meter.apt_pwr_l1} />
                                    <UnitContainer unit={getUnit("rct_pwr_l1")} value={meter.rct_pwr_l1} />
                                    <UnitContainer unit={getUnit("pf_l1")} value={meter.pf_l1} />
                                </Col>
                                <Col sm="12" md="3" className="meter-block">
                                    <div className="meter-title l2">L2</div>
                                    <UnitContainer unit={getUnit("act_pwr_l2")} value={meter.act_pwr_l2} />
                                    <UnitContainer unit={getUnit("apt_pwr_l2")} value={meter.apt_pwr_l2} />
                                    <UnitContainer unit={getUnit("rct_pwr_l2")} value={meter.rct_pwr_l2} />
                                    <UnitContainer unit={getUnit("pf_l2")} value={meter.pf_l2} />
                                </Col>
                                <Col sm="12" md="3" className="meter-block">
                                    <div className="meter-title l3">L3</div>
                                    <UnitContainer unit={getUnit("act_pwr_l3")} value={meter.act_pwr_l3} />
                                    <UnitContainer unit={getUnit("apt_pwr_l3")} value={meter.apt_pwr_l3} />
                                    <UnitContainer unit={getUnit("rct_pwr_l3")} value={meter.rct_pwr_l3} />
                                    <UnitContainer unit={getUnit("pf_l2")} value={meter.pf_l2} />
                                </Col>
                                <Col sm="12" md="3" className="meter-block">
                                    <div className="meter-title total">TOTAL</div>
                                    <UnitContainer unit={getUnit("total_act_pwr")} value={(Number(meter.act_pwr_l1)+Number(meter.act_pwr_l2)+Number(meter.act_pwr_l3))} />
                                    <UnitContainer unit={getUnit("total_apt_pwr")} value={(Number(meter.apt_pwr_l1)+Number(meter.apt_pwr_l2)+Number(meter.apt_pwr_l3))} />
                                    <UnitContainer unit={getUnit("total_rct_pwr")} value={(Number(meter.rct_pwr_l1)+Number(meter.rct_pwr_l2)+Number(meter.rct_pwr_l3))} />
                                    <UnitContainer unit={getUnit("total_pf")} value={meter.total_pf} />
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xs="12" sm="12" md="5">
                    <Card className="h-100">
                        <Card.Body>
                            <Row className="justify-content-center">
                                <h4>METER</h4>
                            </Row>
                            <Row className="justify-content-around">
                                <Col sm="12" md="4" className="meter-block">
                                    <div className="meter-title l1">L1</div>
                                    <UnitContainer unit={getUnit("volt_l1")} value={meter.volt_l1} />
                                    <UnitContainer unit={getUnit("curr_l1")} value={meter.curr_l1} />
                                    <UnitContainer unit={getUnit("freq")} value={meter.freq} />
                                </Col>
                                <Col sm="12" md="4" className="meter-block">
                                    <div className="meter-title l2">L2</div>
                                    <UnitContainer unit={getUnit("volt_l2")} value={meter.volt_l2} />
                                    <UnitContainer unit={getUnit("curr_l2")} value={meter.curr_l2} />
                                </Col>
                                <Col sm="12" md="4" className="meter-block">
                                    <div className="meter-title l3">L3</div>
                                    <UnitContainer unit={getUnit("volt_l3")} value={meter.volt_l3} />
                                    <UnitContainer unit={getUnit("curr_l3")} value={meter.curr_l3} />
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row className="mt-3">
                <Col sm="12" md="7">
                    <Card className="h-100">
                        <Card.Body>
                            <Row>
                                <Col sm="12" md="5">
                                    <Phasor draw={draw} width="250" height="250" />
                                </Col>
                                <Col sm="12" md="7">
                                    <Row className="justify-content-center">
                                        <h5>PHASOR</h5>
                                    </Row>
                                    <Row>
                                        <Col sm="12" md="4" className="meter-block">
                                            <div className="meter-title l1">L1</div>
                                            <UnitContainer unit={getUnit("volt_l1")} value={meter.volt_l1} />
                                            <UnitContainer unit={getUnit("curr_l1")} value={meter.curr_l1} />
                                            <UnitContainer unit={getUnit("pa_l1")} value={meter.pa_l1} />
                                        </Col>
                                        <Col sm="12" md="4" className="meter-block">
                                            <div className="meter-title l2">L2</div>
                                            <UnitContainer unit={getUnit("volt_l2")} value={meter.volt_l2} />
                                            <UnitContainer unit={getUnit("curr_l2")} value={meter.curr_l2} />
                                            <UnitContainer unit={getUnit("pa_l2")} value={meter.pa_l2} />
                                        </Col>
                                        <Col sm="12" md="4" className="meter-block">
                                            <div className="meter-title l3">L3</div>
                                            <UnitContainer unit={getUnit("volt_l3")} value={meter.volt_l3} />
                                            <UnitContainer unit={getUnit("curr_l3")} value={meter.curr_l3} />
                                            <UnitContainer unit={getUnit("pa_l3")} value={meter.pa_l3} />
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                            
                        </Card.Body>
                    </Card>
                </Col>
                <Col sm="12" md="5">
                    <Card className="h-100">
                        <Card.Body>
                            <Row className="pl-3 pb-1">
                                <h5>THD-V</h5>
                            </Row>
                            <Row className="justify-content-around">
                                <Col sm="12" md="4" className="meter-block">
                                    <div className="meter-title l1">L1</div>
                                    <UnitContainer unit={getUnit("volt_thd_l1")} value={meter.volt_thd_l1} />
                                </Col>
                                <Col sm="12" md="4" className="meter-block">
                                    <div className="meter-title l2">L2</div>
                                    <UnitContainer unit={getUnit("volt_thd_l2")} value={meter.volt_thd_l2} />
                                </Col>
                                <Col sm="12" md="4" className="meter-block">
                                    <div className="meter-title l3">L3</div>
                                    <UnitContainer unit={getUnit("volt_thd_l3")} value={meter.volt_thd_l3} />
                                </Col>
                            </Row>
                            <Row className="pl-3 py-1">
                                <h5>THD-A</h5>
                            </Row>
                            <Row className="justify-content-around">
                                <Col sm="12" md="4" className="meter-block">
                                    <div className="meter-title l1">L1</div>
                                    <UnitContainer unit={getUnit("curr_thd_l1")} value={meter.curr_thd_l1} />
                                </Col>
                                <Col sm="12" md="4" className="meter-block">
                                    <div className="meter-title l2">L2</div>
                                    <UnitContainer unit={getUnit("curr_thd_l2")} value={meter.curr_thd_l2} />
                                </Col>
                                <Col sm="12" md="4" className="meter-block">
                                    <div className="meter-title l3">L3</div>
                                    <UnitContainer unit={getUnit("curr_thd_l3")} value={meter.curr_thd_l3} />
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}

const mapStateToProps = (state: any) => ({
    meter: {
        ...state.meter
    }
});

export default connect(mapStateToProps)(Home);
