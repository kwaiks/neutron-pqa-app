import React, {useState, useEffect} from 'react';
import {
    BarChart, Bar, XAxis, YAxis, Tooltip
} from 'recharts';

const CustomizedLabel = (props:any) => {
    const {x, y, width, height, value} = props;
    const dx = (x+(width/2));
    const dy = height >= 30 ? y+20 : y+(height/2);
    return <text x={dx} y={dy} fill={'white'} fontSize={14} textAnchor="middle" dominantBaseline="middle">{value} %</text>
}

const Harmonic = ({data, color, key, yLabel, thd, even}:{data:any, color: string, yLabel: string, key: string, thd: boolean, even: boolean}) => {
    const [chartData, setChartData] = useState<any[] | undefined>(undefined);

    useEffect(()=>{
        setChartData(data);
    },[data])

    return (
        <BarChart width={(11/12*window.innerWidth)} data={chartData}>
            <XAxis dataKey="name" />
            <Tooltip />
            <YAxis label={{ value: yLabel, angle: -90, position: 'insideLeft' }} axisLine={false} tickLine={false} tickSize={0}/>
            <Bar dataKey={key} fill={color} label={<CustomizedLabel />}/>
        </BarChart>
    );
}

export default Harmonic;