import React from 'react';
import { RadialBarChart, RadialBar, PolarAngleAxis, ResponsiveContainer } from 'recharts';

interface ScoreGaugeProps {
  score: number;
}

const ScoreGauge: React.FC<ScoreGaugeProps> = ({ score }) => {
  const data = [{ name: 'Score', value: score, fill: score > 70 ? '#10b981' : score > 40 ? '#f59e0b' : '#ef4444' }];

  return (
    <div className="w-full h-48 relative flex items-center justify-center">
      <ResponsiveContainer width="100%" height="100%">
        <RadialBarChart 
          cx="50%" 
          cy="50%" 
          innerRadius="70%" 
          outerRadius="100%" 
          barSize={20} 
          data={data} 
          startAngle={180} 
          endAngle={0}
        >
          <PolarAngleAxis type="number" domain={[0, 100]} angleAxisId={0} tick={false} />
          <RadialBar
            background
            dataKey="value"
            cornerRadius={10}
          />
        </RadialBarChart>
      </ResponsiveContainer>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/3 text-center">
        <span className={`text-5xl font-bold ${score > 70 ? 'text-emerald-500' : score > 40 ? 'text-amber-500' : 'text-red-500'}`}>
          {score}
        </span>
        <div className="text-gray-400 text-xs font-medium uppercase tracking-wider mt-1">Health Score</div>
      </div>
    </div>
  );
};

export default ScoreGauge;
