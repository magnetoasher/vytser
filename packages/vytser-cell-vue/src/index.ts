import Vue, { VNode, ComponentOptions } from 'vue';
import typedProps from './typed';
import * as vytser from 'vytser-cell';

const regSeries = [
  'pie',
  'sector',
  'line',
  'smoothline',
  'dashline',
  'area',
  'point',
  'stackarea',
  'smootharea',
  'bar',
  'stackbar',
  'dodgebar',
  'interval',
  'stackinterval',
  'dodgeinterval',
  'schema',
  'box',
  'candle',
  'polygon',
  'path',
];

const rootCharts = ['v-chart', 'v-lite-chart'];

const rootChartProps = ['data', 'scale'];

const seriesProps = [
  'position',
  'quickType',
  'gemo',
  'adjust',
  'color',
  'shape',
  'size',
  'style',
  'animate',
];

const camelCase: any = (() => {
  const DEFAULT_REGEX = /[-_]+(.)?/g;

  function toUpper(match: string, group1: string) {
    return group1 ? group1.toUpperCase() : '';
  }
  return (str: string, delimiters?: string) => {
    return str.replace(
      delimiters ? new RegExp('[' + delimiters + ']+(.)?', 'g') : DEFAULT_REGEX,
      toUpper
    );
  };
})();

declare module 'vue/types/vue' {
  interface Vue {
    chart: any;
    _props?: object;
    _uid?: string;
  }
}

declare module 'vue/types/options' {
  interface ComponentOptions<V extends Vue> {
    _componentTag?: any;
  }
}

const baseChartComponent = {
  data() {
    return {
      isVytser: true,
      jsonForD2: {},
    };
  },
  // Why use null? See https://github.com/vuejs/vue/issues/4792.
  props: typedProps,
  methods: {
    checkIsContainer(componentInstance: Vue) {
      if (
        (componentInstance as any).isVytser &&
        rootCharts.indexOf(
          ((componentInstance as any).$options as any)._componentTag
        ) > -1
      ) {
        return true;
      } else {
        return false;
      }
    },
    /**
     * find nearest parent rechart component
     */
    findNearestRootComponent(componentInstance: Vue): any {
      if (this.checkIsContainer(componentInstance)) {
        if (
          (componentInstance.$options as any)._componentTag === 'v-lite-chart'
        ) {
          throw Error('v-lite-chart should be no child elements.');
        }

        return componentInstance;
      }
      if (componentInstance.$parent) {
        return this.findNearestRootComponent(componentInstance.$parent);
      }
      return null;
    },

    createRootD2Json(): any {
      const d2Json = {
        ...cleanUndefined(normalizeProps(this._props, rootChartProps)),
        chart: {
          el: this.$el,
          ...cleanUndefined(normalizeProps(this._props, null, rootChartProps)),
        },
        ...this.jsonForD2,
      };

      // liteChart handle tag-props
      if (this.$options._componentTag === 'v-lite-chart') {
        const existProps = cleanUndefined(this._props);
        Object.keys(existProps).forEach(propsKey => {
          const lowerCasePropsKey = propsKey.toLowerCase();
          if (regSeries.indexOf(lowerCasePropsKey) > -1) {
            safePush(d2Json, 'series', {
              quickType: propsKey,
              ...normalizeProps(existProps, seriesProps),
            });
          }
        });
        setIfNotExist(d2Json, 'axis', true);
        setIfNotExist(d2Json, 'legend', true);
        setIfNotExist(d2Json, 'tooltip', true);
      }
      return d2Json;
    },
    freshChart(isUpdate: boolean) {
      /**
       * refresh chart
       */
      if (rootCharts.indexOf(this.$options._componentTag) > -1) {
        // hit top
        const d2Json = this.createRootD2Json();

        if (!isUpdate || !this.chart) {
          this.chart = vytser.default(d2Json);
        } else {
          this.chart.repaint(d2Json);
        }
      } else {
        /**
         * refresh others like axis, coord, guide, etc.
         */
        const nearestRootComponent = this.findNearestRootComponent(
          this.$parent
        );

        if (!nearestRootComponent) {
          throw Error(
            `${this.$options._componentTag} must be wrapped into v-chart`
          );
        }

        const rechartName = this.$options._componentTag
          .replace(/-/g, '')
          .slice(1);
        const rechartNameCamelCase = camelCase(
          this.$options._componentTag.slice(2)
        );

        if (isAllUndefined(this._props)) {
          nearestRootComponent.jsonForD2[rechartName] = true;
        } else if (regSeries.indexOf(rechartName) > -1) {
          safePush(nearestRootComponent.jsonForD2, 'series', {
            quickType: rechartNameCamelCase,
            ...cleanUndefined(normalizeProps(this._props)),
          });
        } else {
          oneObjectMoreArray(nearestRootComponent.jsonForD2, rechartName, {
            ...cleanUndefined(normalizeProps(this._props)),
            componentId: this._uid,
          });
        }
      }
    },
  },

  created() {
    // bubble from parent to child
  },

  mounted() {
    // bubble from child to parent
    (this as any).freshChart(false);
  },

  updated() {
    // bubble from child to parent
    (this as any).freshChart(true);
  },

  render(createElement): VNode {
    const isContainer = (this as any).checkIsContainer(this);
    if (isContainer) {
      return createElement('canvas', undefined, (this as any).$slots.default);
    }
    const props = cleanUndefined(normalizeProps((this as any)._props));
    return createElement(
      'canvas',
      { style: { display: 'none' } },
      Object.keys(props).map(key => {
        return '' + key + ':' + JSON.stringify(props[key]);
      })
    );
  },
} as ComponentOptions<any>;

export default {
  // tslint:disable-next-line:no-shadowed-variable
  install: (Vue: any, options: any) => {
    Vue.component('v-chart', baseChartComponent);
    Vue.component('v-tooltip', baseChartComponent);
    Vue.component('v-legend', baseChartComponent);
    Vue.component('v-axis', baseChartComponent);
    Vue.component('v-coord', baseChartComponent);
    Vue.component('v-series', baseChartComponent);
    Vue.component('v-lite-chart', baseChartComponent);
    Vue.component('v-guide', baseChartComponent);

    Vue.component('v-point', baseChartComponent);
    Vue.component('v-pie', baseChartComponent);
    Vue.component('v-bar', baseChartComponent);
    Vue.component('v-stack-bar', baseChartComponent);
    Vue.component('v-dodge-bar', baseChartComponent);
    Vue.component('v-interval', baseChartComponent);
    Vue.component('v-stack-interval', baseChartComponent);
    Vue.component('v-dodge-interval', baseChartComponent);
    Vue.component('v-schema', baseChartComponent);
    Vue.component('v-line', baseChartComponent);
    Vue.component('v-smooth-line', baseChartComponent);
    Vue.component('v-dash-line', baseChartComponent);
    Vue.component('v-sector', baseChartComponent);
    Vue.component('v-area', baseChartComponent);
    Vue.component('v-stack-area', baseChartComponent);
    Vue.component('v-smooth-area', baseChartComponent);
    Vue.component('v-polygon', baseChartComponent);
    Vue.component('v-candle', baseChartComponent);
    Vue.component('v-box', baseChartComponent);
    Vue.component('v-path', baseChartComponent);
  },
};

function safePush(obj: any, key: string, value: any) {
  if (!obj[key]) {
    obj[key] = [];
  }

  cleanUndefined(value);

  obj[key].push(value);
}

function oneObjectMoreArray(obj: any, key: string, value: any) {
  if (!obj[key]) {
    obj[key] = value;
    return;
  }

  if (obj[key] && obj[key].constructor.name === 'Object') {
    obj[key] = [obj[key]];
  }

  let indexOfSameObject = -1;
  if (value && value.viewId) {
    obj[key].forEach((o: any, i: number) => {
      if (o && o.viewId && o.viewId === value.viewId) {
        indexOfSameObject = i;
      }
    });
  } else if (value && value.componentId) {
    obj[key].forEach((o: any, i: number) => {
      if (o && o.componentId && o.componentId === value.componentId) {
        indexOfSameObject = i;
      }
    });
  }

  if (indexOfSameObject === -1) {
    obj[key].push(value);
  } else {
    obj[key][indexOfSameObject] = {
      ...obj[key][indexOfSameObject],
      ...value,
    };
  }
}

function cleanUndefined(value: any) {
  const newValue = { ...value };

  // delete value's undefined key
  for (const key in newValue) {
    if (newValue[key] === undefined) {
      delete newValue[key];
    }
  }

  return newValue;
}

function isAllUndefined(value: any) {
  return Object.keys(value).every(key => value[key] === undefined);
}

/**
 * special props for vue
 */
function normalizeProps(
  props: any,
  include: string[] | null = null,
  expect: string[] | null = null
) {
  const newProps = { ...props };

  if (newProps.vStyle) {
    newProps.style = newProps.vStyle;
    delete newProps.vStyle;
  }

  if (expect !== null) {
    expect.forEach(propsKey => {
      delete newProps[propsKey];
    });
  }

  if (include !== null) {
    Object.keys(newProps).forEach(propsKey => {
      if (include.indexOf(propsKey) === -1) {
        delete newProps[propsKey];
      }
    });
  }

  return newProps;
}

function setIfNotExist(obj: any, key: string, value: any) {
  if (!obj[key]) {
    obj[key] = value;
  }
}

export const registerAnimation = vytser.registerAnimation;
export const registerShape = vytser.registerShape;
export const Global = vytser.Global;
