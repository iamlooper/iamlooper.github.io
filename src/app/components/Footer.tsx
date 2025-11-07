'use client';

import { Box, Typography, Link as MuiLink, Stack, Divider, Container } from '@mui/material';
import { Security, Gavel } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import Link from 'next/link';

export function Footer() {
  const theme = useTheme();

  return (
    <Box 
      component="footer" 
      sx={{ 
        py: 4,
        mt: 'auto',
        backgroundColor: theme.vars.palette.background.paper,
        borderTop: `1px solid ${theme.vars.palette.divider}`,
      }}
    >
      <Container maxWidth="lg">
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={{ xs: 2, sm: 4 }}
          justifyContent="center"
          alignItems="center"
          sx={{ mb: 3 }}
        >
          <MuiLink 
            component={Link}
            href="/tos"
            underline="none" 
            sx={{ 
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              color: theme.vars.palette.text.secondary,
              fontWeight: 500,
              fontSize: '0.875rem',
              letterSpacing: '0.1px',
              padding: '8px 12px',
              borderRadius: 2,
              transition: 'all 0.2s cubic-bezier(0.2, 0, 0, 1)',
              '&:hover': { 
                color: theme.vars.palette.primary.main,
                backgroundColor: theme.vars.palette.action.hover,
              },
            }}
          >
            <Gavel fontSize="small" />
            Terms of Service
          </MuiLink>
          
          <Divider orientation="vertical" flexItem sx={{ display: { xs: 'none', sm: 'block' } }} />
          
          <MuiLink 
            component={Link}
            href="/privacy"
            underline="none" 
            sx={{ 
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              color: theme.vars.palette.text.secondary,
              fontWeight: 500,
              fontSize: '0.875rem',
              letterSpacing: '0.1px',
              padding: '8px 12px',
              borderRadius: 2,
              transition: 'all 0.2s cubic-bezier(0.2, 0, 0, 1)',
              '&:hover': { 
                color: theme.vars.palette.primary.main,
                backgroundColor: theme.vars.palette.action.hover,
              },
            }}
          >
            <Security fontSize="small" />
            Privacy Policy
          </MuiLink>
        </Stack>
        
        <Typography 
          variant="caption" 
          align="center" 
          display="block"
          sx={{ 
            color: theme.vars.palette.text.secondary,
            opacity: 0.7,
            fontSize: '0.75rem',
            letterSpacing: '0.4px',
          }}
        >
          © {new Date().getFullYear()} Looper. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
}
