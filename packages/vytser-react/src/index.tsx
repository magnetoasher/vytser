import * as vytser from 'vytser';
import { Area, Axis, Bar, Box, Brush, Candle, Contour, Coord,
 DashLine, DodgeBar, DodgeInterval, Edge, Funnel, Guide, Heatmap,
 Interval, JitterPoint, Legend, Line, Path, Pie,
 Point, Polygon, Pyramid, Sankey, Schema, Sector, Series, SmoothArea, SmoothLine,
 StackArea, StackBar, StackInterval, StackLine, Tooltip, Venn } from './components/SubComponent';

import { Slider } from './plugins/SubPlugin';

export const registerAnimation = vytser.registerAnimation;
export const registerShape = vytser.registerShape;
export const Global = vytser.Global;

export { default as Chart } from './components/Chart';
export { default as View } from './components/View';
export { default as FacetView } from './components/FacetView';
export { default as Facet } from './components/Facet';
export { default as LiteChart } from './components/LiteChart';

export {
  Coord, Tooltip, Legend, Guide, Axis, Series, Brush, Line,
  Pie, Sector, SmoothLine, DashLine, Area, StackArea, SmoothArea,
  Bar, StackBar, DodgeBar, Interval, StackInterval, DodgeInterval,
  Point, Funnel, Pyramid, Schema, Box, Candle, Polygon, Contour, Heatmap,
  Edge, Sankey, JitterPoint, Path, Venn, StackLine,
};

export { default as Plugin } from './plugins/plugin';
export { Slider };
