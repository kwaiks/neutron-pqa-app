import React from 'react';
import {Col, Row} from 'react-bootstrap';

type UnitType = {
    value: number;
    unit: string;
}

const UnitContainer = ({value, unit}:UnitType) => {
    return(<Row>
        <Col sm="8" className="meter-text text-right px-1">{value > 1000? (value/1000).toFixed(2) : value}</Col>
        <Col sm="4" className="meter-text text-left px-1">{value > 1000? "k" + unit : unit}</Col>
    </Row>
    )
}

export default UnitContainer;