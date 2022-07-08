import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const EventGenre = ({ events }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getData = () => {
      const genres = ["React", "JavaScript", "Node", "jQuery", "AngularJS"];
      const data = genres.map((genre) => {
        const value = events.filter(({ summary }) =>
          summary.split(" ").includes(genre)
        ).length;
       
        return { name: genre, value };
      });
      return data.filter((genre) => genre.value !== 0);
      
    };
    setData(() => getData());
  }, [events]);

  const colors = ["#FFEB2F", "#BB8B41", "#877F49", "#AC9670", "#4B3D2A"];
  const genreLabels = ({ x, y, cx, cy, name, percent, index }) => {
    return (
      <text
        style={{ fontSize: "13px" }}
        x={x}
        y={y}
        fill={colors[index]}
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${name} ${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    
      <ResponsiveContainer height={400}>
        <PieChart width={300} height={300}>
          <Pie
            data={data}
            cx="50%"
          cy="50%"
            labelLine={false}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            label={genreLabels}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
  );
};

export default EventGenre;