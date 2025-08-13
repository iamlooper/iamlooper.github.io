'use client';

import { useEffect, useRef, useState } from 'react';
import { Box, Typography, CircularProgress, Alert } from '@mui/material';

interface TurnstileCaptchaProps {
  onSuccess: (token: string) => void;
}

declare global {
  interface Window {
    turnstile?: {
      render: (element: string | HTMLElement, options: any) => string;
      reset: (widgetId: string) => void;
      remove: (widgetId: string) => void;
      getResponse: (widgetId: string) => string | undefined;
      ready: (callback: () => void) => void;
    };
  }
}

export function TurnstileCaptcha({ onSuccess }: TurnstileCaptchaProps) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const widgetIdRef = useRef<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const renderAttemptedRef = useRef(false);

  const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

  // Initialize Turnstile widget
  const renderTurnstile = () => {
    if (!window.turnstile || !containerRef.current || renderAttemptedRef.current || !TURNSTILE_SITE_KEY) {
      return;
    }

    try {
      renderAttemptedRef.current = true;
      
      // Clear container first
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
      
      const widgetId = window.turnstile.render(containerRef.current, {
        sitekey: TURNSTILE_SITE_KEY,
        callback: (token: string) => {
          console.log('Turnstile verification successful');
          setLoading(false);
          setError(null);
          onSuccess(token);
        },
        'error-callback': () => {
          console.error('Turnstile verification error');
          setError('Verification failed. Please refresh and try again.');
          setLoading(false);
        },
        'expired-callback': () => {
          console.warn('Turnstile token expired');
          setError('Verification expired. Please refresh and try again.');
          setLoading(false);
        },
        'timeout-callback': () => {
          console.warn('Turnstile timeout');
          setError('Verification timed out. Please refresh and try again.');
          setLoading(false);
        },
        theme: 'auto',
        size: 'normal',
        appearance: 'always',
        'refresh-expired': 'auto',
        retry: 'auto',
        'retry-interval': 8000,
      });
      
      widgetIdRef.current = widgetId;
      setLoading(false);
      console.log('Turnstile widget rendered with ID:', widgetId);
    } catch (err) {
      console.error('Failed to render Turnstile:', err);
      setError('Failed to load verification widget. Please refresh the page.');
      setLoading(false);
      renderAttemptedRef.current = false; // Allow retry
    }
  };

  // Load Turnstile script
  useEffect(() => {
    if (!TURNSTILE_SITE_KEY) {
      setError('Turnstile site key is not configured.');
      setLoading(false);
      return;
    }

    // Check if Turnstile is already loaded
    if (window.turnstile) {
      setScriptLoaded(true);
      return;
    }

    // Load Turnstile script without async/defer for turnstile.ready() compatibility
    const script = document.createElement('script');
    script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
    
    script.onload = () => {
      console.log('Turnstile script loaded');
      setScriptLoaded(true);
    };
    
    script.onerror = () => {
      console.error('Failed to load Turnstile script');
      setError('Failed to load security verification. Please check your internet connection.');
      setLoading(false);
    };
    
    document.head.appendChild(script);

    return () => {
      // Cleanup widget on unmount
      if (widgetIdRef.current && window.turnstile) {
        try {
          window.turnstile.remove(widgetIdRef.current);
        } catch (err) {
          console.warn('Failed to remove Turnstile widget:', err);
        }
      }
    };
  }, [TURNSTILE_SITE_KEY]);

  // Render widget when script is loaded
  useEffect(() => {
    if (scriptLoaded && window.turnstile) {
      // Simple timeout approach since we can't use ready() with async/defer
      setTimeout(() => {
        renderTurnstile();
      }, 100);
    }
  }, [scriptLoaded, onSuccess]);

  if (error) {
    return (
      <Box py={4}>
        <Alert severity="error">
          {error}
        </Alert>
      </Box>
    );
  }

  return (
    <Box display="flex" flexDirection="column" alignItems="center" py={2}>
      {loading && (
        <Box display="flex" flexDirection="column" alignItems="center" mb={2}>
          <CircularProgress size={32} sx={{ mb: 1 }} />
          <Typography variant="caption" color="text.secondary">
            Loading verification widget...
          </Typography>
        </Box>
      )}
      
      {/* Container for Turnstile widget */}
      <Box
        ref={containerRef}
        id="turnstile-container"
        sx={{
          minHeight: '65px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          maxWidth: '300px',
          mx: 'auto',
        }}
      />
    </Box>
  );
}
