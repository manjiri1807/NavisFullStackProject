import { createMuiTheme } from '@material-ui/core';

const fontStack = [
  'Source Sans Pro',
  'Helvetica',
  'Arial',
  'sans-serif'
].join(',');

const theme = createMuiTheme({
  typography: {
    fontFamily: fontStack,
    useNextVariants: true,
  },
  palette: {
    app: {
      gray: '#313640',
      darkGray: '#1E2129',
      yellow: '#F3CA45',
      white: '#FFF',
    },
  },
  shape: {
    borderRadius: 8,
  },
});

export default theme;
