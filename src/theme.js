import { createTheme } from '@mui/material/styles';

// Create a custom theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // Adjust primary color
    },
    secondary: {
      main: '#f50057', // Adjust secondary color
    },
  },
  typography: {
    fontFamily: [
      'Quicksand', // Ensure Quicksand font is available
      'Arial',
      'sans-serif',
    ].join(','),
  },
});

export default theme;
