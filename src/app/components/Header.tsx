'use client';

import { AppBar, Toolbar, Typography, Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Link from 'next/link';
import { ThemeSwitcher } from './ThemeSwitcher';

export function Header() {
  const theme = useTheme();
 
  return (
    <AppBar 
      position="sticky"
      elevation={0}
      sx={{ 
        zIndex: theme.zIndex.appBar,
        backgroundColor: theme.vars.palette.background.default,
        borderBottom: `1px solid ${theme.vars.palette.divider}`,
        boxShadow: '0 1px 2px 0 rgba(0,0,0,0.05)',
      }}
    >
      <Toolbar sx={{ minHeight: 64, px: { xs: 2, sm: 3 } }}>
        <Typography
          variant="h6"
          component={Link}
          href="/"
          sx={{
            fontWeight: 500,
            fontSize: '1.375rem',
            letterSpacing: 0,
            textDecoration: 'none',
            color: theme.vars.palette.text.primary,
            '&:hover': { 
              color: theme.vars.palette.primary.main,
            },
            transition: 'color 0.2s cubic-bezier(0.2, 0, 0, 1)',
          }}
        >
          Looper
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, ml: 'auto' }}>
          <ThemeSwitcher />
        </Box>
      </Toolbar>
    </AppBar>
  );
}
