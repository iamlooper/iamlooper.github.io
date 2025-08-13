'use client';

import { Box, Typography, Link as MuiLink, Stack, Divider, Container } from '@mui/material';
import { FolderOpen, Security, Gavel } from '@mui/icons-material';
import Link from 'next/link';
import { useTheme } from '@mui/material/styles';

export function Footer() {
  const theme = useTheme();
  const md3 = (theme as any).md3;

  return (
    <Box 
      component="footer" 
      sx={{ 
        py: 4,
        mt: 'auto',
        backgroundColor: md3.surfaceContainerLow,
        borderTop: `1px solid ${md3.outlineVariant}`,
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
            href="/projects"
            underline="none" 
            sx={{ 
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              color: md3.onSurfaceVariant,
              fontWeight: 500,
              fontSize: '0.875rem',
              letterSpacing: '0.1px',
              padding: '8px 12px',
              borderRadius: 2,
              transition: 'all 0.2s cubic-bezier(0.2, 0, 0, 1)',
              '&:hover': { 
                color: md3.primary,
                backgroundColor: theme.palette.mode === 'light'
                  ? 'rgba(0, 90, 193, 0.08)'
                  : 'rgba(166, 200, 255, 0.08)',
              },
            }}
          >
            <FolderOpen fontSize="small" />
            Projects
          </MuiLink>
          
          <Divider orientation="vertical" flexItem sx={{ display: { xs: 'none', sm: 'block' } }} />
          
          <MuiLink 
            component={Link}
            href="/tos"
            underline="none" 
            sx={{ 
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              color: md3.onSurfaceVariant,
              fontWeight: 500,
              fontSize: '0.875rem',
              letterSpacing: '0.1px',
              padding: '8px 12px',
              borderRadius: 2,
              transition: 'all 0.2s cubic-bezier(0.2, 0, 0, 1)',
              '&:hover': { 
                color: md3.primary,
                backgroundColor: theme.palette.mode === 'light'
                  ? 'rgba(0, 90, 193, 0.08)'
                  : 'rgba(166, 200, 255, 0.08)',
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
              color: md3.onSurfaceVariant,
              fontWeight: 500,
              fontSize: '0.875rem',
              letterSpacing: '0.1px',
              padding: '8px 12px',
              borderRadius: 2,
              transition: 'all 0.2s cubic-bezier(0.2, 0, 0, 1)',
              '&:hover': { 
                color: md3.primary,
                backgroundColor: theme.palette.mode === 'light'
                  ? 'rgba(0, 90, 193, 0.08)'
                  : 'rgba(166, 200, 255, 0.08)',
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
            color: md3.onSurfaceVariant,
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
