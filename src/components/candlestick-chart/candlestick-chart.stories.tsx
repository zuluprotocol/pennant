import { Meta, Story } from "@storybook/react";
import { useRef } from "react";

import {
  CandlestickChart,
  CandlestickChartHandle,
  CandlestickChartProps,
} from "./candlestick-chart";

export default {
  title: "Components/CandlestickChart",
  DepthChart: CandlestickChart,
} as Meta;

const Template: Story<CandlestickChartProps> = (args) => {
  const ref = useRef<CandlestickChartHandle>(null!);

  return (
    <div
      style={{
        width: "80vw",
        height: "80vh",
      }}
    >
      <CandlestickChart ref={ref} {...args} />
    </div>
  );
};

export const Basic = Template.bind({});
Basic.args = {};