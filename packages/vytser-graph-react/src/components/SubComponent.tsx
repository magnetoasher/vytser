import * as PropTypes from 'prop-types';
import * as React from 'react';
import { IEdge, INode, ITooltip, IZoom } from 'vytser-graph';

class Props {}

// tslint:disable-next-line:max-classes-per-file
class SubComponent<T = {}> extends React.Component<Props & T, any> {
  public static contextTypes = {
    centralizedUpdates: PropTypes.func,
    hasInViews: PropTypes.bool,
    viewId: PropTypes.string,
    viewType: PropTypes.string,
  };

  public displayName = 'SubComponent';

  constructor(props: Props & T) {
    super(props);
  }

  public componentDidUpdate() {
    this.context.centralizedUpdates(this);
  }

  public componentDidMount() {
    this.context.centralizedUpdates(this);
  }

  public render() {
    return null;
  }
}

// tslint:disable-next-line:max-classes-per-file
export class Zoom extends SubComponent<IZoom> { public displayName = 'Zoom'; }
// tslint:disable-next-line:max-classes-per-file
export class Node extends SubComponent<INode> { public displayName = 'Node'; }
// tslint:disable-next-line:max-classes-per-file
export class Edge extends SubComponent<IEdge> { public displayName = 'Edge'; }
// tslint:disable-next-line:max-classes-per-file
export class Tooltip extends SubComponent<ITooltip> { public displayName = 'Tooltip'; }
