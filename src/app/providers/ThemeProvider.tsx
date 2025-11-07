'use client';

import { ReactNode } from 'react';
import { ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import type {} from '@mui/material/themeCssVarsAugmentation';

interface ThemeProviderProps {
  children: ReactNode;
}

// Create theme with CSS variables enabled
const theme = createTheme({
  cssVariables: {
    colorSchemeSelector: 'data',
  },
  colorSchemes: {
    light: {
      palette: {
        primary: {
          main: '#005ac1',
          light: '#d4e3ff',
          dark: '#001c3a',
          contrastText: '#ffffff',
        },
        secondary: {
          main: '#555f71',
          light: '#dde3f0',
          dark: '#273141',
          contrastText: '#273141',
        },
        error: {
          main: '#ba1a1a',
          light: '#ffdad6',
          dark: '#93000a',
          contrastText: '#ffffff',
        },
        warning: {
          main: '#7d5700',
          light: '#ffe08d',
          dark: '#624000',
          contrastText: '#ffffff',
        },
        info: {
          main: '#005faf',
          light: '#d3e4ff',
          dark: '#004787',
          contrastText: '#ffffff',
        },
        success: {
          main: '#006e26',
          light: '#a6f397',
          dark: '#00531d',
          contrastText: '#ffffff',
        },
        background: {
          default: '#fafcff',
          paper: '#eef0f4',
        },
        text: {
          primary: '#1a1c20',
          secondary: '#44474e',
        },
        divider: '#c4c6d0',
        action: {
          hover: 'rgba(0, 90, 193, 0.08)',
          selected: 'rgba(0, 90, 193, 0.12)',
          disabled: 'rgba(0, 0, 0, 0.26)',
          disabledBackground: 'rgba(0, 0, 0, 0.12)',
          focus: 'rgba(0, 0, 0, 0.12)',
        },
      },
    },
    dark: {
      palette: {
        primary: {
          main: '#a6c8ff',
          light: '#004786',
          dark: '#d4e3ff',
          contrastText: '#00315e',
        },
        secondary: {
          main: '#bdc7dc',
          light: '#3e4759',
          dark: '#d9e3f8',
          contrastText: '#dde3f0',
        },
        error: {
          main: '#ffb4ab',
          light: '#93000a',
          dark: '#ffdad6',
          contrastText: '#690005',
        },
        warning: {
          main: '#f5bd00',
          light: '#624000',
          dark: '#ffe08d',
          contrastText: '#3f2e00',
        },
        info: {
          main: '#54a5ff',
          light: '#004787',
          dark: '#d3e4ff',
          contrastText: '#002e5c',
        },
        success: {
          main: '#4eda6a',
          light: '#005318',
          dark: '#97f990',
          contrastText: '#003910',
        },
        background: {
          default: '#111318',
          paper: '#1e2025',
        },
        text: {
          primary: '#e2e2e8',
          secondary: '#c4c6d0',
        },
        divider: '#44474e',
        action: {
          hover: 'rgba(166, 200, 255, 0.08)',
          selected: 'rgba(166, 200, 255, 0.16)',
          disabled: 'rgba(255, 255, 255, 0.3)',
          disabledBackground: 'rgba(255, 255, 255, 0.12)',
          focus: 'rgba(255, 255, 255, 0.12)',
        },
      },
    },
  },
  typography: {
    fontFamily: '"Roboto", "Google Sans", "Helvetica", "Arial", sans-serif',
    h1: { 
      fontSize: '3.562rem',
      fontWeight: 400, 
      lineHeight: 1.12,
      letterSpacing: '-0.25px'
    },
    h2: { 
      fontSize: '2.812rem',
      fontWeight: 400, 
      lineHeight: 1.16,
      letterSpacing: 0
    },
    h3: { 
      fontSize: '2.25rem',
      fontWeight: 400, 
      lineHeight: 1.22,
      letterSpacing: 0
    },
    h4: { 
      fontSize: '2rem',
      fontWeight: 400, 
      lineHeight: 1.25,
      letterSpacing: 0
    },
    h5: { 
      fontSize: '1.75rem',
      fontWeight: 400, 
      lineHeight: 1.29,
      letterSpacing: 0
    },
    h6: { 
      fontSize: '1.5rem',
      fontWeight: 400, 
      lineHeight: 1.33,
      letterSpacing: 0
    },
    button: { 
      fontSize: '0.875rem',
      fontWeight: 500,
      lineHeight: 1.43,
      letterSpacing: '0.1px',
      textTransform: 'none'
    },
  },
  shape: { 
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          height: 40,
          padding: '0 24px',
          fontWeight: 500,
          textTransform: 'none',
        },
      },
    },
    MuiCard: {
      defaultProps: {
        elevation: 0,
      },
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
    MuiPaper: {
      defaultProps: { 
        elevation: 0,
      },
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          borderRadius: 12,
        },
      },
    },
    MuiAppBar: {
      defaultProps: { 
        elevation: 0,
        color: 'default',
        enableColorOnDark: true,
      },
    },
    MuiIconButton: { 
      styleOverrides: { 
        root: { 
          borderRadius: '50%',
          padding: 8,
        },
      },
    },
  },
});

export function ThemeProvider({ children }: ThemeProviderProps) {
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
}
