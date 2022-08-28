import { useEffect } from 'react'
import { PieChart, Pie, Cell, Text, Legend, Tooltip } from 'recharts'

const label = ({ name, value, cx, x, y }) => {
    const textAnchor = x > cx ? "start" : "end";
    return (
        <>
            <Text x={x} y={y} textAnchor={textAnchor} fill="#576874">{name}</Text>
            <Text x={x} y={y} dominantBaseline="hanging" textAnchor={textAnchor} fill="#576874">{value + "本"}</Text>
        </>
    )
}

const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index
  }) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
  
    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
};

const CircleGraphSection = ( props ) => {
    const COLORS = ["#ED453A", "#FEBC18", "#5F2D8B", "#5287AC", "#503D33", "#5D9339"]
    return (
        <div className='pie-chart-item'>
            {
                (!props.data) ? <div><p>データがありません</p></div> :
                <>
                    <h2 className='pie-chart-title'>{props.title}</h2>
                    <PieChart width={320} height={350}>
                        <Pie data={props.data} dataKey="value" nameKey="name" cx="50%" cy="50%" fill="#8884d8" label={renderCustomizedLabel} outerRadius={100}>
                            { //円グラフの色を各領域ごとに分けるように指定
                                props.data.map((entry, index) =>
                                    <Cell fill={COLORS[index % COLORS.length]} key={index}/>
                                )
                            }
                        </Pie>
                        <Legend />
                        <Tooltip layout="vertical"/>
                    </PieChart>
                </>
            }
        </div>
    )
}
export default CircleGraphSection