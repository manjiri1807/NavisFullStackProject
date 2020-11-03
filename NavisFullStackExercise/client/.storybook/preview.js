import React from 'react';
import { ThemeProvider, StylesProvider } from '@material-ui/core/styles';
import theme from '@app/styles/mui-theme';

// Generate classnames without counter suffix
const generateClassName = (rule, styleSheet) => {
  const pseudoClasses = [
    'checked',
    'disabled',
    'error',
    'focused',
    'focusVisible',
    'required',
    'expanded',
    'selected',
  ];
  const hasSymbol = typeof Symbol === 'function' && Symbol.for;
  const nested = hasSymbol ? Symbol.for('mui.nested') : '__THEME_NESTED__';
  const name = styleSheet.options.name;

  // Is a global static MUI style?
  if (name && name.indexOf('Mui') === 0 && !styleSheet.options.link) {
    // We can use a shorthand class name, we never use the keys to style the components.
    if (pseudoClasses.indexOf(rule.key) !== -1) {
      return `Mui-${rule.key}`;
    }

    const prefix = `${name}-${rule.key}`;

    if (!styleSheet.options.theme[nested]) {
      return prefix;
    }

    return `${prefix}`;
  }

  if (process.env.NODE_ENV === 'production') {
    return `${productionPrefix}`;
  }

  const suffix = `${rule.key}`;

  if (styleSheet.options.classNamePrefix) {
    return `${styleSheet.options.classNamePrefix}-${suffix}`;
  }

  return `${suffix}`;
};

export const parameters = { layout: 'centered' };
export const decorators = [
  Story => (
    <StylesProvider generateClassName={generateClassName}>
      <ThemeProvider theme={theme}>
        <Story />
      </ThemeProvider>
    </StylesProvider>
  ),
];
