import React, {useState, useEffect, useRef} from 'react';
import {Container, Card, ListGroup, Col, Row, Button, Form, InputGroup, FormControl, Dropdown} from 'react-bootstrap';
import {NavLink} from 'react-router-dom';
import axios from 'axios';
import {CSVLink} from 'react-csv';
import {store} from '../store';
import {File} from '../types/file';
import convertDate from '../utils/convertDate';

const Logging = () => {
    const [data, setData] = useState<File[] | null>(null);
    const [time, setTime] = useState("");
    const [log, setLog] = useState(true);
    const [csvData, setCsvData] = useState([]);
    const downloadRef = useRef(null);

    const value: any = store.getState().settings;

    const handleChange = (e:any) => {
        value[e.target.id] = e.target.value;
    }

    const handleSubmit = async (e:any) => {
        if(!log){
            setLog(true)
            count(value.duration*60);
            try{
                await axios.post(`${process.env.BASE_URL}/record-logging`,{
                    name: value.fileName,
                    duration: value.duration,
                    interval: value.interval
                })
            }catch(err){
                console.error(err)
            }
        }
    }

    const count = (total: number) => {
        total = total*1000;
        const timer = setInterval(()=>{
            const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
            const minutes = Math.floor((total / 1000 / 60) % 60);
            const seconds = Math.floor((total / 1000) % 60);
            setTime(`${hours}:${minutes>10?minutes:'0'+minutes}:${seconds>10?seconds:'0'+seconds}`);
            if(total <= 0){
                clearInterval(timer);
                setTime("");
                setLog(false)
            }
            total = total - 1000;
        },1000)
    }

    useEffect(()=>{
        const checkLogStatus = async() => {
            try {
                const status = await axios.get(`http://localhost:8080/check-logging`)
                setLog(status.data.logging)
                if(status.data.logging){
                    const endTime = new Date(status.data.endTime).getTime();
                    const seconds = (endTime - new Date().getTime())/1000;
                    count(seconds)
                }
            }catch(err){
                console.error(err)
            }
        }
        if(data === null){
            const currentData = (): Promise<File[]> =>{
                return axios.get<File[]>(`http://localhost:8080/history-logging`).then((res)=> res.data);
            }
            currentData().then(res=>setData(res)).catch((err)=>console.log(err));
            checkLogStatus();
        }
    },[data]);

    const fetchData = async (id:number, fileName: string) => {
        console.log("pressed");
        try {
            await axios.get(`http://localhost:4002/download/${id}`);
        }catch(err){
            console.error(err)
        }
    }

    return (
        <Container>
            <Card>
                <Card.Header>
                    <h3>Logging</h3>
                </Card.Header>
                <Card.Body>
                    <Dropdown>
                        <Dropdown.Item></Dropdown.Item>
                    </Dropdown>
                    <Row>
                        <Col sm="12" md="6">
                            <Form onSubmit={handleSubmit}>
                                    <Form.Group as={Row} controlId="fileName">
                                        <Form.Label column sm="4">
                                            File Name
                                        </Form.Label>
                                        <InputGroup className="col-sm-8">
                                            <FormControl type="text" defaultValue={value.fileName} aria-label="File Name" onChange={handleChange}/>
                                        </InputGroup>
                                    </Form.Group>
                                    <Form.Group as={Row} controlId="interval">
                                        <Form.Label column sm="4">
                                            Logging Interval
                                        </Form.Label>
                                        <InputGroup className="col-sm-8">
                                            <FormControl type="number" defaultValue={value.interval} aria-label="Logging Interval (in second)" onChange={handleChange}/>
                                            <InputGroup.Append>
                                                <InputGroup.Text>seconds</InputGroup.Text>
                                            </InputGroup.Append>
                                        </InputGroup>
                                    </Form.Group>
                                    <Form.Group as={Row} controlId="duration">
                                        <Form.Label column sm="4">
                                            Logging Duration
                                        </Form.Label>
                                        <InputGroup className="col-sm-8">
                                            <FormControl type="number" defaultValue={value.duration} aria-label="Logging Duration (in second)" onChange={handleChange}/>
                                            <InputGroup.Append>
                                                <InputGroup.Text>minutes</InputGroup.Text>
                                            </InputGroup.Append>
                                        </InputGroup>
                                    </Form.Group>
                                    <Form.Group as={Row} controlId="pricePerKWh">
                                        <Form.Label column sm="4">
                                            Price per kWh
                                        </Form.Label>
                                        <InputGroup className="col-sm-8">
                                            <InputGroup.Prepend>
                                                <InputGroup.Text>Rp</InputGroup.Text>
                                            </InputGroup.Prepend>
                                            <FormControl type="number" defaultValue={value.pricePerKWh} aria-label="Amount (to the nearest dollar)" onChange={handleChange}/>
                                        </InputGroup>
                                    </Form.Group>
                                </Form>
                            </Col>
                            <Col className="flex" sm="12" md="6">
                                <Row className="h-100 justify-content-center align-content-center">
                                    {time === "" ? 
                                        ""
                                    : <div className="flex flex-column justify-content-center align-content-center align-items-center"><h5>Logging In Progress</h5><div className="text-center">{time}</div></div>}
                                </Row>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Button variant="primary" disabled={log} type="submit" onClick={handleSubmit}>
                                    Start Logging
                                </Button>
                            </Col>
                        </Row>
                </Card.Body>
            </Card>
            <Card className="mt-4">
                <Card.Header>
                    <h3>Logging History</h3>
                </Card.Header>
                <Card.Body>
                    <Row>
                        <Col className="align-content-end">
                            <Dropdown></Dropdown>
                        </Col>
                    </Row>
                    {
                        data && data.length > 0 ? 
                            <ListGroup className="history-log">
                            {data.map((value:File,i:number)=>{
                                    return <ListGroup.Item key={i} className="flex justify-content-between">
                                                <Row>
                                                    <Col sm="10" className="flex-grow-1 align-items-center">
                                                        <Row>
                                                            <Col>
                                                                <NavLink to={`/logging-history/${value.lh_id}`}><div><h5>{value.lh_name}</h5></div></NavLink>
                                                                <span>{`Duration: ${value.lh_duration} mins | Interval: ${value.lh_duration} seconds`}</span><br/>
                                                                <span>{`${convertDate(value.lh_start_time)} - ${convertDate(value.lh_end_time)}` }</span>
                                                            </Col>
                                                        </Row>
                                                    </Col>
                                                    <Col className="d-flex justify-content-center align-items-center">
                                                        <a href={`http://localhost:4002/download/${value.lh_id}/${value.lh_name}`} download className="btn btn-primary">Download</a>
                                                    </Col>
                                                </Row>
                                            </ListGroup.Item>
                                })
                            }
                        </ListGroup>
                        :
                       <Row>
                            <Col>
                                No Data
                            </Col>
                        </Row>
                    }
                    <CSVLink ref={downloadRef} style={{visibility: "hidden", height:0}} className="btn btn-primary" data={csvData} asyncOnClick={true} 
                                                                filename={"tes.csv"}>Download</CSVLink>
                </Card.Body>
            </Card>
        </Container>
    )
}

export default Logging;