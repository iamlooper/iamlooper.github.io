'use client';

import { AppBar, Toolbar, Typography, Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Link from 'next/link';
import { ThemeSwitcher } from './ThemeSwitcher';

export function Header() {
  const theme = useTheme();
  const md3 = (theme as any).md3;

  return (
    <AppBar 
      position="sticky"
      elevation={0}
      sx={{ 
        zIndex: theme.zIndex.appBar,
        backgroundColor: md3.surface,
        borderBottom: `1px solid ${md3.outlineVariant}`,
        boxShadow: theme.palette.mode === 'light'
          ? '0 1px 2px 0 rgba(0,0,0,0.05)'
          : '0 1px 2px 0 rgba(0,0,0,0.1)',
      }}
    >
      <Toolbar sx={{ minHeight: 64, px: { xs: 2, sm: 3 } }}>
        <Typography 
          variant="h6" 
          component={Link}
          href="/"
          sx={{ 
            flexGrow: 1,
            fontWeight: 500,
            fontSize: '1.375rem',
            letterSpacing: 0,
            textDecoration: 'none',
            color: md3.onSurface,
            '&:hover': { 
              color: md3.primary,
            },
            transition: 'color 0.2s cubic-bezier(0.2, 0, 0, 1)',
          }}
        >
          Looper
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <ThemeSwitcher />
        </Box>
      </Toolbar>
    </AppBar>
  );
}
