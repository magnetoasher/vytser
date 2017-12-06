import { NgModule, enableProdMode } from '@angular/core';
import { Chart } from './Chart';
import { LiteChart } from './LiteChart';
import { Axis, Coord, Facet, Guide, Legend, Tooltip, View, FacetView, Series, Pie, Sector, Line, SmoothLine, DashLine, Area, StackArea, SmoothArea,
 Bar, StackBar, DodgeBar, Point, Funnel, Pyramid, Schema, Box, Candle, Polygon, Contour, Heatmap, Edge, Sankey, ErrorBar } from './subChart/index';
import * as viser from 'viser';

@NgModule({
  declarations: [
    Chart,
    LiteChart,
    Axis,
    Coord,
    Facet,
    Guide,
    Legend,
    Tooltip,
    View,
    FacetView,
    Series,
    Pie,
    Sector,
    Line,
    SmoothLine,
    DashLine,
    Area,
    StackArea,
    SmoothArea,
    Bar,
    StackBar,
    DodgeBar,
    Point,
    Funnel,
    Pyramid,
    Schema,
    Box,
    Candle,
    Polygon,
    Contour,
    Heatmap,
    Edge,
    Sankey,
    ErrorBar,
  ],
  exports: [
    Chart,
    LiteChart,
    Axis,
    Coord,
    Facet,
    Guide,
    Legend,
    Tooltip,
    View,
    FacetView,
    Series,
    Pie,
    Sector,
    Line,
    SmoothLine,
    DashLine,
    Area,
    StackArea,
    SmoothArea,
    Bar,
    StackBar,
    DodgeBar,
    Point,
    Funnel,
    Pyramid,
    Schema,
    Box,
    Candle,
    Polygon,
    Contour,
    Heatmap,
    Edge,
    Sankey,
    ErrorBar,
  ],
})
export class ViserModule {
}
enableProdMode();
export const registerAnimation = viser.registerAnimation;
export const registerShape = viser.registerShape;
export const Global = viser.Global;
