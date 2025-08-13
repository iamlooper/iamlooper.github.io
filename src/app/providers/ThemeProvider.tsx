'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { ThemeProvider as MuiThemeProvider, createTheme, CssBaseline } from '@mui/material';

type ThemeMode = 'light' | 'dark' | 'auto';

interface ThemeContextType {
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
  actualMode: 'light' | 'dark';
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [mode, setMode] = useState<ThemeMode>('auto');
  const [actualMode, setActualMode] = useState<'light' | 'dark'>('light');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Load saved theme from localStorage
    const savedMode = localStorage.getItem('theme-mode') as ThemeMode;
    if (savedMode && ['light', 'dark', 'auto'].includes(savedMode)) {
      setMode(savedMode);
    }
  }, []);

  useEffect(() => {
    if (!mounted) return;
    
    // Save theme to localStorage
    localStorage.setItem('theme-mode', mode);

    // Determine actual theme
    if (mode === 'auto') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      setActualMode(mediaQuery.matches ? 'dark' : 'light');
      
      const handleChange = (e: MediaQueryListEvent) => {
        setActualMode(e.matches ? 'dark' : 'light');
      };
      
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    } else {
      setActualMode(mode);
    }
  }, [mode, mounted]);

  // Material Design 3 Dynamic Color System
  const md3ColorScheme = actualMode === 'light'
    ? {
        // Primary colors
        primary: '#005ac1',
        onPrimary: '#ffffff',
        primaryContainer: '#d4e3ff',
        onPrimaryContainer: '#001c3a',
        
        // Secondary colors
        secondary: '#555f71',
        onSecondary: '#ffffff',
        secondaryContainer: '#d9e3f8',
        onSecondaryContainer: '#121b2c',
        
        // Tertiary colors
        tertiary: '#6e5676',
        onTertiary: '#ffffff',
        tertiaryContainer: '#f8d8fe',
        onTertiaryContainer: '#271430',
        
        // Error colors
        error: '#ba1a1a',
        onError: '#ffffff',
        errorContainer: '#ffdad6',
        onErrorContainer: '#410002',
        
        // Warning colors
        warningContainer: '#ffe08d',
        onWarningContainer: '#3f2e00',
        
        // Surface colors
        surface: '#fafcff',
        surfaceDim: '#d9dbe0',
        surfaceBright: '#fafcff',
        surfaceContainerLowest: '#ffffff',
        surfaceContainerLow: '#f3f5fa',
        surfaceContainer: '#edeef4',
        surfaceContainerHigh: '#e7e8ee',
        surfaceContainerHighest: '#e2e2e8',
        surfaceVariant: '#e0e2ec',
        onSurface: '#1a1c20',
        onSurfaceVariant: '#44474e',
        
        // Outline colors
        outline: '#747780',
        outlineVariant: '#c4c6d0',
        
        // Other colors
        inverseSurface: '#2f3033',
        inverseOnSurface: '#f1f0f4',
        inversePrimary: '#a6c8ff',
        scrim: '#000000',
        shadow: '#000000',
        surfaceTint: '#005ac1',
      }
    : {
        // Primary colors
        primary: '#a6c8ff',
        onPrimary: '#00315e',
        primaryContainer: '#004786',
        onPrimaryContainer: '#d4e3ff',
        
        // Secondary colors
        secondary: '#bdc7dc',
        onSecondary: '#273141',
        secondaryContainer: '#3e4759',
        onSecondaryContainer: '#d9e3f8',
        
        // Tertiary colors
        tertiary: '#dbbce1',
        onTertiary: '#3d2846',
        tertiaryContainer: '#553f5d',
        onTertiaryContainer: '#f8d8fe',
        
        // Error colors
        error: '#ffb4ab',
        onError: '#690005',
        errorContainer: '#93000a',
        onErrorContainer: '#ffdad6',
        
        // Warning colors
        warningContainer: '#624000',
        onWarningContainer: '#ffe08d',
        
        // Surface colors
        surface: '#111318',
        surfaceDim: '#111318',
        surfaceBright: '#37393e',
        surfaceContainerLowest: '#0c0e13',
        surfaceContainerLow: '#1a1c20',
        surfaceContainer: '#1e2025',
        surfaceContainerHigh: '#282a2f',
        surfaceContainerHighest: '#33353a',
        surfaceVariant: '#44474e',
        onSurface: '#e2e2e8',
        onSurfaceVariant: '#c4c6d0',
        
        // Outline colors
        outline: '#8e9099',
        outlineVariant: '#44474e',
        
        // Other colors
        inverseSurface: '#e2e2e8',
        inverseOnSurface: '#2f3033',
        inversePrimary: '#005ac1',
        scrim: '#000000',
        shadow: '#000000',
        surfaceTint: '#a6c8ff',
      };

  const theme = createTheme({
    palette: {
      mode: actualMode,
      primary: {
        main: md3ColorScheme.primary,
        light: md3ColorScheme.primaryContainer,
        dark: actualMode === 'light' ? '#004786' : '#d4e3ff',
        contrastText: md3ColorScheme.onPrimary,
      },
      secondary: {
        main: md3ColorScheme.secondary,
        light: md3ColorScheme.secondaryContainer,
        dark: actualMode === 'light' ? '#3e4759' : '#d9e3f8',
        contrastText: md3ColorScheme.onSecondary,
      },
      error: {
        main: md3ColorScheme.error,
        light: md3ColorScheme.errorContainer,
        dark: actualMode === 'light' ? '#93000a' : '#ffdad6',
        contrastText: md3ColorScheme.onError,
      },
      warning: {
        main: actualMode === 'light' ? '#7d5700' : '#f5bd00',
        light: actualMode === 'light' ? '#ffe08d' : '#624000',
        dark: actualMode === 'light' ? '#624000' : '#ffe08d',
        contrastText: actualMode === 'light' ? '#ffffff' : '#3f2e00',
      },
      info: {
        main: actualMode === 'light' ? '#005faf' : '#54a5ff',
        light: actualMode === 'light' ? '#d3e4ff' : '#004787',
        dark: actualMode === 'light' ? '#004787' : '#d3e4ff',
        contrastText: actualMode === 'light' ? '#ffffff' : '#002e5c',
      },
      success: {
        main: actualMode === 'light' ? '#006e26' : '#4eda6a',
        light: actualMode === 'light' ? '#97f990' : '#00531d',
        dark: actualMode === 'light' ? '#00531d' : '#97f990',
        contrastText: actualMode === 'light' ? '#ffffff' : '#003910',
      },
      background: {
        default: md3ColorScheme.surface,
        paper: md3ColorScheme.surfaceContainer,
      },
      text: {
        primary: md3ColorScheme.onSurface,
        secondary: md3ColorScheme.onSurfaceVariant,
      },
      divider: md3ColorScheme.outlineVariant,
      action: {
        hover: actualMode === 'light' 
          ? 'rgba(0, 90, 193, 0.08)' 
          : 'rgba(166, 200, 255, 0.08)',
        selected: actualMode === 'light' 
          ? 'rgba(0, 90, 193, 0.12)' 
          : 'rgba(166, 200, 255, 0.12)',
        disabled: actualMode === 'light'
          ? 'rgba(26, 28, 32, 0.38)'
          : 'rgba(226, 226, 232, 0.38)',
        disabledBackground: actualMode === 'light'
          ? 'rgba(26, 28, 32, 0.12)'
          : 'rgba(226, 226, 232, 0.12)',
      },
    },
    typography: {
      fontFamily: '"Roboto", "Google Sans", "Helvetica", "Arial", sans-serif',
      // Material Design 3 Type Scale
      h1: { 
        fontSize: '3.562rem', // Display Large
        fontWeight: 400, 
        lineHeight: 1.12,
        letterSpacing: '-0.25px'
      },
      h2: { 
        fontSize: '2.812rem', // Display Medium
        fontWeight: 400, 
        lineHeight: 1.16,
        letterSpacing: 0
      },
      h3: { 
        fontSize: '2.25rem', // Display Small
        fontWeight: 400, 
        lineHeight: 1.22,
        letterSpacing: 0
      },
      h4: { 
        fontSize: '2rem', // Headline Large
        fontWeight: 400, 
        lineHeight: 1.25,
        letterSpacing: 0
      },
      h5: { 
        fontSize: '1.75rem', // Headline Medium
        fontWeight: 400, 
        lineHeight: 1.29,
        letterSpacing: 0
      },
      h6: { 
        fontSize: '1.5rem', // Headline Small
        fontWeight: 400, 
        lineHeight: 1.33,
        letterSpacing: 0
      },
      subtitle1: { 
        fontSize: '1.375rem', // Title Large
        fontWeight: 400,
        lineHeight: 1.27,
        letterSpacing: 0
      },
      subtitle2: { 
        fontSize: '1rem', // Title Medium
        fontWeight: 500,
        lineHeight: 1.5,
        letterSpacing: '0.15px'
      },
      body1: { 
        fontSize: '1rem', // Body Large
        fontWeight: 400,
        lineHeight: 1.5,
        letterSpacing: '0.5px'
      },
      body2: { 
        fontSize: '0.875rem', // Body Medium
        fontWeight: 400,
        lineHeight: 1.43,
        letterSpacing: '0.25px'
      },
      button: { 
        fontSize: '0.875rem', // Label Large
        fontWeight: 500,
        lineHeight: 1.43,
        letterSpacing: '0.1px',
        textTransform: 'none'
      },
      caption: { 
        fontSize: '0.75rem', // Label Small
        fontWeight: 500,
        lineHeight: 1.33,
        letterSpacing: '0.5px'
      },
      overline: { 
        fontSize: '0.688rem', // Label Small
        fontWeight: 500,
        lineHeight: 1.45,
        letterSpacing: '0.5px',
        textTransform: 'uppercase'
      },
    },
    shape: { 
      borderRadius: 12, // MD3 Medium shape
    },
    components: {
      MuiButton: {
        defaultProps: { 
          variant: 'contained',
          disableElevation: false,
        },
        styleOverrides: {
          root: {
            borderRadius: 20, // MD3 Full shape for buttons
            height: 40,
            padding: '0 24px',
            fontWeight: 500,
            boxShadow: 'none',
            transition: 'all 0.2s cubic-bezier(0.2, 0, 0, 1)',
            '&:hover': { 
              boxShadow: actualMode === 'light' 
                ? '0 1px 2px 0 rgba(0,0,0,0.3), 0 1px 3px 1px rgba(0,0,0,0.15)'
                : '0 1px 2px 0 rgba(0,0,0,0.3), 0 2px 6px 2px rgba(0,0,0,0.15)',
            },
          },
          contained: {
            backgroundColor: md3ColorScheme.primary,
            color: md3ColorScheme.onPrimary,
            '&:hover': {
              backgroundColor: actualMode === 'light' 
                ? 'rgba(0, 90, 193, 0.92)'
                : 'rgba(166, 200, 255, 0.92)',
            },
          },
          outlined: {
            borderColor: md3ColorScheme.outline,
            color: md3ColorScheme.primary,
            '&:hover': {
              backgroundColor: actualMode === 'light'
                ? 'rgba(0, 90, 193, 0.08)'
                : 'rgba(166, 200, 255, 0.08)',
              borderColor: md3ColorScheme.primary,
            },
          },
          text: {
            color: md3ColorScheme.primary,
            '&:hover': {
              backgroundColor: actualMode === 'light'
                ? 'rgba(0, 90, 193, 0.08)'
                : 'rgba(166, 200, 255, 0.08)',
            },
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
            backgroundColor: md3ColorScheme.surfaceContainer,
            border: `1px solid ${md3ColorScheme.outlineVariant}`,
            transition: 'all 0.2s cubic-bezier(0.2, 0, 0, 1)',
            '&:hover': {
              boxShadow: actualMode === 'light'
                ? '0 1px 2px 0 rgba(0,0,0,0.3), 0 2px 6px 2px rgba(0,0,0,0.15)'
                : '0 1px 3px 1px rgba(0,0,0,0.15), 0 4px 8px 3px rgba(0,0,0,0.15)',
            },
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
          elevation0: {
            backgroundColor: md3ColorScheme.surface,
          },
          elevation1: {
            backgroundColor: md3ColorScheme.surfaceContainerLow,
            boxShadow: actualMode === 'light'
              ? '0 1px 2px 0 rgba(0,0,0,0.3), 0 1px 3px 1px rgba(0,0,0,0.15)'
              : '0 1px 3px 1px rgba(0,0,0,0.15), 0 1px 2px 0 rgba(0,0,0,0.3)',
          },
          elevation2: {
            backgroundColor: md3ColorScheme.surfaceContainer,
            boxShadow: actualMode === 'light'
              ? '0 1px 2px 0 rgba(0,0,0,0.3), 0 2px 6px 2px rgba(0,0,0,0.15)'
              : '0 1px 3px 1px rgba(0,0,0,0.15), 0 2px 6px 2px rgba(0,0,0,0.15)',
          },
          elevation3: {
            backgroundColor: md3ColorScheme.surfaceContainerHigh,
            boxShadow: actualMode === 'light'
              ? '0 4px 8px 3px rgba(0,0,0,0.15), 0 1px 3px 0 rgba(0,0,0,0.3)'
              : '0 4px 8px 3px rgba(0,0,0,0.15), 0 1px 3px 0 rgba(0,0,0,0.3)',
          },
        },
      },
      MuiAppBar: {
        defaultProps: { 
          elevation: 0,
          color: 'default',
        },
        styleOverrides: {
          root: {
            backgroundColor: md3ColorScheme.surface,
            color: md3ColorScheme.onSurface,
            borderBottom: 'none',
            boxShadow: actualMode === 'light'
              ? '0 1px 2px 0 rgba(0,0,0,0.3), 0 1px 3px 1px rgba(0,0,0,0.15)'
              : '0 1px 3px 1px rgba(0,0,0,0.15), 0 1px 2px 0 rgba(0,0,0,0.3)',
          },
        },
      },
      MuiIconButton: { 
        styleOverrides: { 
          root: { 
            borderRadius: '50%',
            padding: 8,
            transition: 'all 0.2s cubic-bezier(0.2, 0, 0, 1)',
            '&:hover': {
              backgroundColor: actualMode === 'light'
                ? 'rgba(0, 90, 193, 0.08)'
                : 'rgba(166, 200, 255, 0.08)',
            },
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            height: 32,
            fontWeight: 500,
            backgroundColor: md3ColorScheme.surfaceVariant,
            color: md3ColorScheme.onSurfaceVariant,
            '&:hover': {
              backgroundColor: actualMode === 'light'
                ? 'rgba(224, 226, 236, 0.8)'
                : 'rgba(68, 71, 78, 0.8)',
            },
          },
        },
      },
      MuiTextField: {
        defaultProps: {
          variant: 'outlined',
        },
        styleOverrides: {
          root: {
            '& .MuiOutlinedInput-root': {
              borderRadius: 4,
              backgroundColor: md3ColorScheme.surfaceContainerHighest,
              '& fieldset': {
                borderColor: md3ColorScheme.outline,
              },
              '&:hover fieldset': {
                borderColor: md3ColorScheme.onSurface,
              },
              '&.Mui-focused fieldset': {
                borderColor: md3ColorScheme.primary,
                borderWidth: 2,
              },
            },
          },
        },
      },
      MuiFab: {
        styleOverrides: {
          root: {
            borderRadius: 16,
            boxShadow: actualMode === 'light'
              ? '0 4px 8px 3px rgba(0,0,0,0.15), 0 1px 3px 0 rgba(0,0,0,0.3)'
              : '0 4px 8px 3px rgba(0,0,0,0.15), 0 1px 3px 0 rgba(0,0,0,0.3)',
            backgroundColor: md3ColorScheme.primaryContainer,
            color: md3ColorScheme.onPrimaryContainer,
            '&:hover': {
              boxShadow: actualMode === 'light'
                ? '0 6px 10px 4px rgba(0,0,0,0.15), 0 2px 3px 0 rgba(0,0,0,0.3)'
                : '0 6px 10px 4px rgba(0,0,0,0.15), 0 2px 3px 0 rgba(0,0,0,0.3)',
            },
          },
        },
      },
      MuiContainer: {
        styleOverrides: { 
          root: { 
            paddingLeft: 24, 
            paddingRight: 24,
          },
        },
      },
      MuiDivider: {
        styleOverrides: {
          root: {
            borderColor: md3ColorScheme.outlineVariant,
          },
        },
      },
      MuiMenu: {
        styleOverrides: {
          paper: {
            borderRadius: 4,
            marginTop: 8,
            backgroundColor: md3ColorScheme.surfaceContainer,
            boxShadow: actualMode === 'light'
              ? '0 2px 6px 2px rgba(0,0,0,0.15), 0 1px 2px 0 rgba(0,0,0,0.3)'
              : '0 2px 6px 2px rgba(0,0,0,0.15), 0 1px 2px 0 rgba(0,0,0,0.3)',
          },
        },
      },
      MuiMenuItem: {
        styleOverrides: {
          root: {
            minHeight: 48,
            padding: '8px 12px',
            '&:hover': {
              backgroundColor: actualMode === 'light'
                ? 'rgba(0, 90, 193, 0.08)'
                : 'rgba(166, 200, 255, 0.08)',
            },
            '&.Mui-selected': {
              backgroundColor: actualMode === 'light'
                ? 'rgba(0, 90, 193, 0.12)'
                : 'rgba(166, 200, 255, 0.12)',
              '&:hover': {
                backgroundColor: actualMode === 'light'
                  ? 'rgba(0, 90, 193, 0.16)'
                  : 'rgba(166, 200, 255, 0.16)',
              },
            },
          },
        },
      },
      MuiAlert: {
        styleOverrides: {
          root: {
            borderRadius: 12,
            padding: '12px 16px',
          },
          standardError: {
            backgroundColor: md3ColorScheme.errorContainer,
            color: md3ColorScheme.onErrorContainer,
          },
          standardWarning: {
            backgroundColor: actualMode === 'light' ? '#ffe08d' : '#624000',
            color: actualMode === 'light' ? '#3f2e00' : '#ffe08d',
          },
          standardInfo: {
            backgroundColor: actualMode === 'light' ? '#d3e4ff' : '#004787',
            color: actualMode === 'light' ? '#002e5c' : '#d3e4ff',
          },
          standardSuccess: {
            backgroundColor: actualMode === 'light' ? '#97f990' : '#00531d',
            color: actualMode === 'light' ? '#003910' : '#97f990',
          },
        },
      },
    },
  }) as any;

  // Attach MD3 color scheme for sx usage
  (theme as any).md3 = md3ColorScheme;

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '100vh',
        backgroundColor: '#f5f5f5'
      }}>
        <div>Loading...</div>
      </div>
    );
  }

  return (
    <ThemeContext.Provider value={{ mode, setMode, actualMode }}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
}
