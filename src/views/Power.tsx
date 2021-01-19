import React from 'react';
import { 
    Container, 
    Row,
    Col,
    Card
} from 'react-bootstrap';
import {connect} from 'react-redux';
import {MeterData} from '../types/meter';
import {getUnit} from '../utils/meterUnit';
import UnitContainer from '../components/UnitContainer';
import Phasor from '../components/PhasorDiagram';
import drawLine from '../utils/drawPhasorLine';

const Power = (props: any) => {
    const [meter, setMeter] = React.useState<MeterData>({} as MeterData);

    React.useEffect(() => {
        setMeter(props.meter)
    },[props]);
    
    const draw = (ctx:any) => {
        drawLine(ctx, 240, '#ff0000', 'V3', false);
        drawLine(ctx, 0, '#0000ff', 'V1', false);
        drawLine(ctx, 120, '#00ff00', 'V2', false);
        drawLine(ctx, 250, '#ff0000', 'I3', true);
        drawLine(ctx, 10, '#0000ff', 'I1', true);
        drawLine(ctx, 100, '#00ff00', 'I2', true);
    }
    return (
        <Container>
            <Row>
                <Col sm="12">
                    <Card className="h-100">
                        <Card.Body>
                            <Row className="justify-content-center">
                                <Col sm="2">
                                </Col>
                                <Col sm="2">
                                    <div className="meter-title l1">L1</div>
                                </Col>
                                <Col sm="2">
                                    <div className="meter-title l2">L2</div>
                                </Col>
                                <Col sm="2">
                                    <div className="meter-title l3">L3</div>
                                </Col>
                                <Col sm="2">
                                    <div className="meter-title total">Total</div>
                                </Col>
                            </Row>
                            <Row className="justify-content-center">
                                <Col sm="2" className="meter-block">
                                    <Row>
                                        <Col className="meter-text text-left px-1">
                                            Active Power
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col className="meter-text text-left px-1">
                                            Apparent Power
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col className="meter-text text-left px-1">
                                            Reactive Power
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col className="meter-text text-left px-1">
                                            Power Factor
                                        </Col>
                                    </Row>
                                </Col>
                                <Col sm="2" className="meter-block">
                                    <UnitContainer unit={getUnit("act_pwr_l1")} value={meter.act_pwr_l1} />
                                    <UnitContainer unit={getUnit("apt_pwr_l1")} value={meter.apt_pwr_l1} />
                                    <UnitContainer unit={getUnit("rct_pwr_l1")} value={meter.rct_pwr_l1} />
                                    <UnitContainer unit={getUnit("pf_l1")} value={meter.pf_l1} />
                                </Col>
                                <Col sm="2">
                                    <UnitContainer unit={getUnit("act_pwr_l2")} value={meter.act_pwr_l2} />
                                    <UnitContainer unit={getUnit("apt_pwr_l2")} value={meter.apt_pwr_l2} />
                                    <UnitContainer unit={getUnit("rct_pwr_l2")} value={meter.rct_pwr_l2} />
                                    <UnitContainer unit={getUnit("pf_l2")} value={meter.pf_l2} />
                                </Col>
                                <Col sm="2">
                                    <UnitContainer unit={getUnit("act_pwr_l3")} value={meter.act_pwr_l3} />
                                    <UnitContainer unit={getUnit("apt_pwr_l3")} value={meter.apt_pwr_l3} />
                                    <UnitContainer unit={getUnit("rct_pwr_l3")} value={meter.rct_pwr_l3} />
                                    <UnitContainer unit={getUnit("pf_l3")} value={meter.pf_l3} />
                                </Col>
                                <Col sm="2">
                                    <UnitContainer unit={getUnit("total_act_pwr")} value={(Number(meter.act_pwr_l1)+Number(meter.act_pwr_l2)+Number(meter.act_pwr_l3))} />
                                    <UnitContainer unit={getUnit("total_apt_pwr")} value={(Number(meter.apt_pwr_l1)+Number(meter.apt_pwr_l2)+Number(meter.apt_pwr_l3))} />
                                    <UnitContainer unit={getUnit("total_rct_pwr")} value={(Number(meter.rct_pwr_l1)+Number(meter.rct_pwr_l2)+Number(meter.rct_pwr_l3))} />
                                    <UnitContainer unit={getUnit("total_pf")} value={meter.total_pf} />
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row className="mt-2">
                <Col>
                    <Card>
                        <Card.Body>
                            <Row>
                                <Col sm="12" md="8">
                                    <Row className="justify-content-center">
                                        <h5>PHASE ANGLE</h5>
                                    </Row>
                                    <Row>
                                        <Col sm="12" md="4" className="meter-block">
                                            <div className="meter-title l1">L1</div>
                                            <UnitContainer unit={getUnit("pa_l1")} value={meter.pa_l1} />
                                        </Col>
                                        <Col sm="12" md="4" className="meter-block">
                                            <div className="meter-title l2">L2</div>
                                            <UnitContainer unit={getUnit("pa_l2")} value={meter.pa_l2} />
                                        </Col>
                                        <Col sm="12" md="4" className="meter-block">
                                            <div className="meter-title l3">L3</div>    
                                            <UnitContainer unit={getUnit("pa_l3")} value={meter.pa_l3} />
                                        </Col>
                                    </Row>
                                </Col>
                                <Col sm="12" md="4">
                                    <Phasor draw={draw} width="250" height="250" />
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

export default connect(mapStateToProps)(Power);