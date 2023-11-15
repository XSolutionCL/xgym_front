import { Line } from "@ant-design/plots";
import { useRef } from "react";

export const LineChart = ({
  data = [],
  xField,
  yField,
  xName,
  yName,
  ref = useRef,
}) => {
  return (
    <Line
      title={{
        visible: false,
        alignTo: "left",
        text: "Helloaaaa",
        style: {
          fontSize: 18,
          fill: "black",
        },
      }}
      style={{ width: "100%", height: "90%" }}
      data={data}
      xField={xField}
      yField={yField}
      point={{
        size: 5,
        shape: "diamond",
      }}
      yAxis={{
        visible: true,
        grid: {
          visible: true,
        },
        line: {
          visible: false,
        },
        tickLine: {
          visible: false,
        },
        label: {
          visible: true,
          autoRotate: true,
          autoHide: true,
        },
        title: {
          visible: false,
          // offset: 32,
          text: yName,
        },
      }}
      xAxis={{
        visible: true,
        grid: {
          visible: false,
        },
        line: {
          visible: true,
        },
        tickLine: {
          visible: false,
        },
        label: {
          visible: true,
          autoRotate: true,
          autoHide: true,
        },
        title: {
          visible: false,
          // offset: 32,
          text: xName,  
        },
        /* type: props.isTime ? 'time' : 'linear',
        mask: props.mask || (props.isTime ? DEFAULT_DATE_TIME_FORMAT : undefined) */
      }}
      onReady={(plot) => {
        ref.current = plot;
      }}
    />
  );
};
