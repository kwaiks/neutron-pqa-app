import React from 'react';
import { 
    Container, 
    Card, 
    Row, 
    Button, 
    Form, 
    InputGroup, 
    FormControl 
} from 'react-bootstrap';
import { connect } from 'react-redux';
import { SAVE_SETTING } from '../store/constants/actionTypes';

const mapStateToProps = (state:any) => ({
    settings: {...state.settings}
});

const mapDispatchToProps = (dispatch:any) => ({
    saveSetting: (payload: any) => 
        dispatch({type: SAVE_SETTING, payload})
});

const Settings = ({settings, saveSetting}:any) => {
    const [value, setValue] = React.useState({
        fileName: "",
        interval: 0,
        duration: 0,
        pricePerKWh: 0
    });

    React.useEffect(() => {
        setValue(settings);
    },[settings])

    const handleChange = (e:any) => {
        setValue({
            ...value,
            [e.target.id]: e.target.value
        });
    }

    const handleSubmit = (e:any) => {
        e.preventDefault();
        saveSetting(value);
    }
    
    return(
        <Container>
            <Card>
                <Card.Header>
                    <h3>Settings</h3>
                </Card.Header>
                <Card.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group as={Row} controlId="fileName">
                            <Form.Label column sm="2">
                                File Name
                            </Form.Label>
                            <InputGroup className="col-sm-4">
                                <FormControl type="text" defaultValue={value.fileName} aria-label="File Name" onChange={handleChange}/>
                                <InputGroup.Append>
                                    <InputGroup.Text>.csv</InputGroup.Text>
                                </InputGroup.Append>
                            </InputGroup>
                        </Form.Group>

                        <Form.Group as={Row} controlId="interval">
                            <Form.Label column sm="2">
                                Logging Interval
                            </Form.Label>
                            <InputGroup className="col-sm-4">
                                <FormControl type="number" defaultValue={value.interval} aria-label="Logging Interval (in second)" />
                                <InputGroup.Append>
                                    <InputGroup.Text>seconds</InputGroup.Text>
                                </InputGroup.Append>
                            </InputGroup>
                        </Form.Group>

                        <Form.Group as={Row} controlId="duration">
                            <Form.Label column sm="2">
                                Logging Duration
                            </Form.Label>
                            <InputGroup className="col-sm-4">
                                <FormControl type="number" defaultValue={value.duration} aria-label="Logging Duration (in second)" />
                                <InputGroup.Append>
                                    <InputGroup.Text>minutes</InputGroup.Text>
                                </InputGroup.Append>
                            </InputGroup>
                        </Form.Group>

                        <Form.Group as={Row} controlId="pricePerKWh">
                            <Form.Label column sm="2">
                                Price per kWh
                            </Form.Label>
                            <InputGroup className="col-sm-4">
                                <InputGroup.Prepend>
                                    <InputGroup.Text>Rp</InputGroup.Text>
                                </InputGroup.Prepend>
                                <FormControl type="number" defaultValue={value.pricePerKWh} aria-label="Amount (to the nearest dollar)" />
                            </InputGroup>
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Save
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
            {/*<Card className="mt-4">
                <Card.Header>
                    <h3>Power Meter Settings</h3>
                </Card.Header>
                <Card.Body>
                    <Form>
                        <Form.Group as={Row} controlId="meterType">
                            <Form.Label column sm="2">
                                Meter Type
                            </Form.Label>
                            <Form.Control
                                as="select"
                                className="col-sm-4"
                                id="inlineFormCustomSelectPref"
                                custom
                            >
                                <option value="3">3p4w</option>
                                <option value="2">3p3w</option>
                                <option value="1">1p2w</option>
                            </Form.Control>
                        </Form.Group>
                    </Form>
                </Card.Body>
            </Card>*/""}
        </Container>
    );
}

export default connect(mapStateToProps,mapDispatchToProps)(Settings);