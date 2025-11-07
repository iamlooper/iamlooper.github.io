'use client';

import { Container, Box, Avatar, Typography, IconButton, Stack, Paper, Tooltip, Fade } from '@mui/material';
import { GitHub, Telegram, X, Storefront } from '@mui/icons-material';
import { Footer } from './components/Footer';
import { useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';

export default function Home() {
  const theme = useTheme();
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
              backgroundColor: theme.vars.palette.background.paper,
              border: `1px solid ${theme.vars.palette.divider}`,
              borderRadius: 3,
              position: 'relative',
              overflow: 'visible',
            }}
          >
            {/* Surface Tint Effect */}
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '200px',
                background: `linear-gradient(180deg, ${theme.vars.palette.primary.main}20 0%, transparent 100%)`,
                borderRadius: '24px 24px 0 0',
                pointerEvents: 'none',
              }}
            />
            
            {/* Profile Image */}
            <Avatar
              src="/profile.webp"
              alt="Looper"
              sx={{
                width: 180,
                height: 180,
                mb: 4,
                mx: 'auto',
                backgroundColor: theme.vars.palette.primary.light,
                border: `3px solid ${theme.vars.palette.background.default}`,
                boxShadow: '0 4px 8px 3px rgba(0,0,0,0.15), 0 1px 3px 0 rgba(0,0,0,0.3)',
              }}
            />
            
            {/* Name */}
            <Typography 
              variant="h3" 
              component="h1" 
              gutterBottom
              sx={{ 
                fontSize: { xs: '2rem', sm: '2.25rem' },
                fontWeight: 400,
                color: 'text.primary',
                mb: 1,
              }}
            >
              Looper
            </Typography>
            
            {/* Role */}
            <Typography 
              variant="h5" 
              component="h2" 
              sx={{ 
                color: 'text.secondary',
                mb: 4,
                fontWeight: 400,
              }}
            >
              Software Developer
            </Typography>
            
            {/* Social Icons */}
            <Stack direction="row" spacing={2} sx={{ justifyContent: 'center' }}>
              <Tooltip title="GitHub" arrow placement="top">
                <IconButton 
                  component="a"
                  href="https://github.com/iamlooper"
                  target="_blank"
                  rel="noopener noreferrer"
                  size="large"
                  sx={{ 
                    backgroundColor: theme.vars.palette.secondary.light,
                    color: theme.vars.palette.secondary.contrastText,
                    '&:hover': { 
                      backgroundColor: theme.vars.palette.action.selected,
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
                    backgroundColor: theme.vars.palette.secondary.light,
                    color: theme.vars.palette.secondary.contrastText,
                    '&:hover': { 
                      backgroundColor: theme.vars.palette.action.selected,
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
              
              <Tooltip title="X (Twitter)" arrow placement="top">
                <IconButton 
                  component="a"
                  href="https://x.com/iamlooper"
                  target="_blank"
                  rel="noopener noreferrer"
                  size="large"
                  sx={{ 
                    backgroundColor: theme.vars.palette.secondary.light,
                    color: theme.vars.palette.secondary.contrastText,
                    '&:hover': { 
                      backgroundColor: theme.vars.palette.action.selected,
                      transform: 'translateY(-2px)',
                    },
                    transition: 'all 0.2s cubic-bezier(0.2, 0, 0, 1)',
                    width: 48,
                    height: 48,
                  }}
                  aria-label="X (Twitter)"
                >
                  <X />
                </IconButton>
              </Tooltip>

              <Tooltip title="Pling" arrow placement="top">
                <IconButton 
                  component="a"
                  href="https://pling.com/u/iamlooper"
                  target="_blank"
                  rel="noopener noreferrer"
                  size="large"
                  sx={{ 
                    backgroundColor: theme.vars.palette.secondary.light,
                    color: theme.vars.palette.secondary.contrastText,
                    '&:hover': { 
                      backgroundColor: theme.vars.palette.action.selected,
                      transform: 'translateY(-2px)',
                    },
                    transition: 'all 0.2s cubic-bezier(0.2, 0, 0, 1)',
                    width: 48,
                    height: 48,
                  }}
                  aria-label="Pling"
                >
                  <Storefront />
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
