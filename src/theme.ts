import { createTheme } from '@mui/material/styles'

export const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1a3a6b',
      light: '#2d5ea8',
      dark: '#0f2244',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#3b7dd8',
      light: '#6fa3e8',
      dark: '#1a5cb5',
      contrastText: '#ffffff',
    },
    background: {
      default: '#eef1f7',
      paper: '#ffffff',
    },
    error: {
      main: '#d32f2f',
    },
    warning: {
      main: '#f59e0b',
    },
    success: {
      main: '#10b981',
    },
    text: {
      primary: '#1a2744',
      secondary: '#5a6a8a',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 700,
      letterSpacing: '-0.02em',
    },
    h5: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 600,
    },
    subtitle1: {
      fontWeight: 500,
    },
    body2: {
      color: '#5a6a8a',
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0 1px 6px rgba(26, 58, 107, 0.07)',
          borderRadius: 12,
          border: '1px solid rgba(26, 58, 107, 0.08)',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
          borderRadius: 8,
          fontSize: '0.9rem',
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          backgroundColor: '#f8faff',
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: '#3b7dd8',
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#1a3a6b',
            borderWidth: 2,
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 600,
          fontSize: '0.75rem',
        },
      },
    },
  },
})
