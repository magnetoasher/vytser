import { IChart, ICoord, IFilter, IScale } from 'vytser';

interface ISChartProps {
  data?: any;
  viewId?: string;
  coord?: ICoord;
  scale?: IScale;
  filter?: IFilter;
  start?: any;
  end?: any;
}

type IRChart = IChart & ISChartProps;

export default IRChart;
