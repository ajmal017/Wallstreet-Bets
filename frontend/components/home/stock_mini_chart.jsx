import React from 'react';
import { LineChart, Line, YAxis, XAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { css } from '@emotion/core';
import { BeatLoader } from 'react-spinners';

const loading = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;
const RED = "#EB5333";
const GREEN = "#67CF9A";

const StockMiniChart = ({ intradayData, loadingState }) => {

  const chartLineColor = () => {
    if (intradayData !== undefined) {
      let startingPrice = intradayData[0].close;
      let endingPrice = intradayData[intradayData.length - 1].close;

      if (startingPrice > endingPrice) return RED
      return GREEN;
    }
  }

  return (
    <div className="stock-mini-chart">
      <ResponsiveContainer width='100%' height="100%">
        <LineChart data={intradayData} cursor="pointer" margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
          <Line
            type="linear"
            dataKey="close"
            stroke={chartLineColor()}
            strokeWidth={2}
            dot={false}
            connectNulls={true}
            isAnimationActive={true} 
          />
          <Tooltip cursor={{ stroke: 'lightgrey', strokeWidth: 1 }} isAnimationActive={false} />
          <XAxis hide={true} dataKey='label' />
          <YAxis domain={['dataMin', 'dataMax']} hide={true} tickLine={false} type='number'/>
        </LineChart>
      </ResponsiveContainer>
      <BeatLoader
        className={loading}
        sizeUnit={"px"}
        size={10}
        color={GREEN}
        loading={loadingState}
      />
    </div>
  )
}

export default StockMiniChart;