'use client';

import { Container, Box, Avatar, Typography, IconButton, Stack, Paper, Tooltip, Fade } from '@mui/material';
import { GitHub, Telegram, X } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import { Footer } from './components/Footer';
import { useEffect, useState } from 'react';

export default function Home() {
  const theme = useTheme();
  const md3 = (theme as any).md3;
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <Container maxWidth="lg" sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Main Content */}
      <Box 
        component="main" 
        sx={{ 
          flex: 1, 
          display: 'flex', 
          flexDirection: 'column', 
          justifyContent: 'center', 
          alignItems: 'center',
          py: { xs: 4, sm: 8 },
        }}
      >
        <Fade in={mounted} timeout={600}>
          <Paper 
            elevation={0}
            sx={{ 
              p: { xs: 4, sm: 6, md: 8 }, 
              maxWidth: 720, 
              width: '100%', 
              textAlign: 'center',
              backgroundColor: md3.surfaceContainer,
              border: `1px solid ${md3.outlineVariant}`,
              borderRadius: 3,
              position: 'relative',
              overflow: 'visible',
            }}
          >
            {/* MD3 Surface Tint Effect */}
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '200px',
                background: `linear-gradient(180deg, ${md3.primaryContainer}20 0%, transparent 100%)`,
                borderRadius: '24px 24px 0 0',
                pointerEvents: 'none',
              }}
            />
            
            {/* Profile Image with MD3 style */}
            <Avatar
              src="/profile.jpg"
              alt="Looper"
              sx={{
                width: 180,
                height: 180,
                mb: 4,
                mx: 'auto',
                backgroundColor: md3.primaryContainer,
                border: `3px solid ${md3.surface}`,
                boxShadow: theme.palette.mode === 'light'
                  ? '0 4px 8px 3px rgba(0,0,0,0.15), 0 1px 3px 0 rgba(0,0,0,0.3)'
                  : '0 4px 8px 3px rgba(0,0,0,0.15), 0 1px 3px 0 rgba(0,0,0,0.3)',
              }}
            />
            
            {/* Name with MD3 Display Typography */}
            <Typography 
              variant="h3" 
              component="h1" 
              gutterBottom
              sx={{ 
                fontSize: { xs: '2rem', sm: '2.25rem' },
                fontWeight: 400,
                color: md3.onSurface,
                mb: 1,
              }}
            >
              Looper
            </Typography>
            
            {/* Role with MD3 Headline Typography */}
            <Typography 
              variant="h5" 
              component="h2" 
              sx={{ 
                color: md3.onSurfaceVariant,
                mb: 4,
                fontWeight: 400,
              }}
            >
              Software Developer
            </Typography>
            
            {/* Social Icons with MD3 Tonal Buttons */}
            <Stack direction="row" spacing={2} sx={{ justifyContent: 'center' }}>
              <Tooltip title="GitHub" arrow placement="top">
                <IconButton 
                  component="a"
                  href="https://github.com/iamlooper"
                  target="_blank"
                  rel="noopener noreferrer"
                  size="large"
                  sx={{ 
                    backgroundColor: md3.secondaryContainer,
                    color: md3.onSecondaryContainer,
                    '&:hover': { 
                      backgroundColor: theme.palette.mode === 'light'
                        ? 'rgba(85, 95, 113, 0.16)'
                        : 'rgba(189, 199, 220, 0.16)',
                      transform: 'translateY(-2px)',
                    },
                    transition: 'all 0.2s cubic-bezier(0.2, 0, 0, 1)',
                    width: 48,
                    height: 48,
                  }}
                  aria-label="GitHub"
                >
                  <GitHub />
                </IconButton>
              </Tooltip>
                            
              <Tooltip title="Telegram" arrow placement="top">
                <IconButton 
                  component="a"
                  href="https://t.me/iamlooper"
                  target="_blank"
                  rel="noopener noreferrer"
                  size="large"
                  sx={{ 
                    backgroundColor: md3.secondaryContainer,
                    color: md3.onSecondaryContainer,
                    '&:hover': { 
                      backgroundColor: theme.palette.mode === 'light'
                        ? 'rgba(85, 95, 113, 0.16)'
                        : 'rgba(189, 199, 220, 0.16)',
                      transform: 'translateY(-2px)',
                    },
                    transition: 'all 0.2s cubic-bezier(0.2, 0, 0, 1)',
                    width: 48,
                    height: 48,
                  }}
                  aria-label="Telegram"
                >
                  <Telegram />
                </IconButton>
              </Tooltip>
              
              <Tooltip title="X" arrow placement="top">
                <IconButton 
                  component="a"
                  href="https://x.com/iamlooper"
                  target="_blank"
                  rel="noopener noreferrer"
                  size="large"
                  sx={{ 
                    backgroundColor: md3.secondaryContainer,
                    color: md3.onSecondaryContainer,
                    '&:hover': { 
                      backgroundColor: theme.palette.mode === 'light'
                        ? 'rgba(85, 95, 113, 0.16)'
                        : 'rgba(189, 199, 220, 0.16)',
                      transform: 'translateY(-2px)',
                    },
                    transition: 'all 0.2s cubic-bezier(0.2, 0, 0, 1)',
                    width: 48,
                    height: 48,
                  }}
                  aria-label="X"
                >
                  <X />
                </IconButton>
              </Tooltip>
            </Stack>
          </Paper>
        </Fade>
      </Box>
      
      {/* Footer */}
      <Footer />
    </Container>
  );
}
