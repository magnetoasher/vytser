import { Component, Input, ViewContainerRef } from '@angular/core';
import { PluginComponent } from './Plugin';
import { PluginContext } from './PluginService';

function generateRandomNum() {
  return (Math.floor(new Date().getTime() + Math.random() * 10000)).toString();
}

@Component({
  selector: 'v-slider',
  template: `<div id="{{context.container}}"></div>`,
})
class Slider extends PluginComponent {
  @Input() public xAxis: any;
  @Input() public yAxis: any;
  @Input() public data: any;
  @Input() public width?: number | string;
  @Input() public height?: number | string;
  @Input() public padding?: number | number[];
  @Input() public start?: string;
  @Input() public end?: string;
  @Input() public minSpan?: number;
  @Input() public maxSpan?: number;
  @Input() public scales?: any;
  @Input() public backgroundChart?: any;
  @Input() public onChange?: any;
}

export { Slider };
