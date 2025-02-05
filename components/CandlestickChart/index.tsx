"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  createChart,
  ColorType,
  CandlestickData,
  CandlestickSeries,
  Time,
} from "lightweight-charts";
import { TimePeriod } from "@/types";
import { TimeConverter } from "@/utils/timeUtils";
import { CandlestickService } from "@/services/candlestickService";

const CandlestickChart: React.FC = () => {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const [currentPeriod, setCurrentPeriod] = useState<TimePeriod>("1d");
  const [chartData, setChartData] = useState<CandlestickData<Time>[]>([]);

  // 获取图表数据
  useEffect(() => {
    const fetchData = async () => {
      // 可以在这里选择使用模拟数据或 API 数据
      const data = CandlestickService.fetchChartData(currentPeriod);
      // 或者使用 API 数据
      // const data = await CandlestickService.fetchDataFromAPI(currentPeriod);
      setChartData(data);
    };

    fetchData();
  }, [currentPeriod]);

  useEffect(() => {
    if (!chartContainerRef.current || chartData.length === 0) return;

    const chartOptions = {
      layout: {
        textColor: "black",
        background: { type: ColorType.Solid, color: "white" },
      },
      width: chartContainerRef.current.clientWidth,
      height: 500,
      timeScale: {
        timeVisible: true,
        secondsVisible: false,
        tickMarkFormatter: TimeConverter.formatTime,
      },
    };

    const chart = createChart(chartContainerRef.current, chartOptions);

    const candlestickSeries = chart.addSeries(CandlestickSeries, {
      upColor: "#26a69a",
      downColor: "#ef5350",
      borderVisible: false,
      wickUpColor: "#26a69a",
      wickDownColor: "#ef5350",
    });

    candlestickSeries.setData(chartData);
    chart.timeScale().fitContent();

    const handleResize = () => {
      chart.resize(chartContainerRef.current?.clientWidth || 800, 500);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      chart.remove();
    };
  }, [chartData]);

  const TimePeriodButtons = () => {
    const periods: TimePeriod[] = ["1m", "5m", "1h", "1d", "1M", "1y"];

    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "10px",
        }}
      >
        {periods.map((period) => (
          <button
            key={period}
            onClick={() => setCurrentPeriod(period)}
            style={{
              margin: "0 5px",
              padding: "5px 10px",
              backgroundColor: currentPeriod === period ? "#2962FF" : "#f0f0f0",
              color: currentPeriod === period ? "white" : "black",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            {period}
          </button>
        ))}
      </div>
    );
  };

  return (
    <div>
      <TimePeriodButtons />
      <div
        ref={chartContainerRef}
        style={{
          width: "100%",
          height: "500px",
        }}
      />
    </div>
  );
};

export default CandlestickChart;
