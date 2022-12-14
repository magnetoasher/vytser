import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { GlobalG6, registerBehavior, registerEdge,
  registerLayout, registerNode, utils, VytserGraph } from 'vytser-graph';
import { Edge, Graph, Node, Zoom } from './components/index';

@NgModule({
  imports: [CommonModule],
  declarations: [
    Graph,
    Zoom,
    Node,
    Edge,
  ],
  exports: [
    Graph,
    Zoom,
    Node,
    Edge,
  ],
})

export class VytserGraphModule {
}

export {
  GlobalG6,
  registerBehavior,
  registerEdge,
  registerLayout,
  registerNode,

  utils,
  VytserGraph,
};
