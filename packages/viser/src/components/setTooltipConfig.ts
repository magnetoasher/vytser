export const process = (chart, config) => {
  const tooltip = config.tooltip;

  if (!tooltip || tooltip === false) {
    return chart.tooltip(false);
  }

  if (tooltip === true) {
    return chart.tooltip(true);
  }

  return chart.tooltip(tooltip);
};
