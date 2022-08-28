import React, { useEffect } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Text } from 'recharts';


const label = ({ name, value, cx, x, y }) => {
    const textAnchor = x > cx ? "start" : "end";
    return (
        <>
            <Text x={x} y={y} textAnchor={textAnchor} fill="#576874">{name}</Text>
            <Text x={x} y={y} dominantBaseline="hanging" textAnchor={textAnchor} fill="#576874">{value + "本"}</Text>
        </>
    )
}

const BarGraphSection = ( props ) => {
    return (
        <div className="graph-item">
            <h2 className='graph-chart-title'>{props.title}</h2>
            {
                (!props.data) ? <div>データがありません</div> :
                <BarChart width={300} height={300} data={props.data} margin={{ top: 20, right: 30, left: 20, bottom: 5}}>
                    <CartesianGrid strokeDasharray="3 3"/>
                    <XAxis dataKey="name" />
                    <YAxis type="number"　domain={[0, 5]}/>
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="無効打" stackId="a" fill="#8884d8"/>
                    <Bar dataKey="有効打" stackId="a" fill="#82ca9d" />
                </BarChart>
            }
        </div>
      );
}
export default BarGraphSection