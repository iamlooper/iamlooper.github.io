'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { 
  Container, 
  Box, 
  Typography, 
  Paper,
  Button,
  CircularProgress,
  Alert,
  Card,
  CardContent,
  Fade,
  Grow,
  LinearProgress,
  Collapse
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import {
  Download,
  Warning,
  CheckCircle,
  ArrowBack,
  InsertDriveFile,
  Schedule,
  Storage,
  Category,
  Error as ErrorIcon,
  Verified
} from '@mui/icons-material';
import { TurnstileCaptcha } from '../../components/TurnstileCaptcha';

interface FileInfo {
  id: string;
  name: string;
  type: string;
  mimeType: string;
  size: number | null;
  modifiedTime: string;
}

enum DownloadStep {
  LOADING = 0,
  CAPTCHA = 1,
  READY = 2,
  DOWNLOADING = 3
}

function DownloadPageContent() {
  const theme = useTheme();
  const md3 = (theme as any).md3;
  const router = useRouter();
  const searchParams = useSearchParams();
  const [fileInfo, setFileInfo] = useState<FileInfo | null>(null);
  const [currentStep, setCurrentStep] = useState<DownloadStep>(DownloadStep.LOADING);
  const [error, setError] = useState<string | null>(null);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  
  const fileId = searchParams.get('id') || sessionStorage.getItem('downloadFileId');

  const API_BASE_URL = process.env.NEXT_PUBLIC_PROJECTS_INDEX_API_URL;

  useEffect(() => {
    if (fileId) {
      fetchFileInfo();
    } else {
      setError('No file ID provided. Please go back to projects and select a file.');
    }
  }, [fileId]);

  const fetchFileInfo = async () => {
    if (!fileId) return;
    
    try {
      const response = await fetch(`${API_BASE_URL}/v1/items/${fileId}`);
      
      if (!response.ok) {
        throw new Error(`File not found: ${response.statusText}`);
      }
      
      const data: FileInfo = await response.json();
      setFileInfo(data);
      
      // Proceed directly to captcha step
      setCurrentStep(DownloadStep.CAPTCHA);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch file information');
    }
  };

  const handleCaptchaSuccess = (token: string) => {
    setTurnstileToken(token);
    setCurrentStep(DownloadStep.READY);
  };

  const handleDownload = async () => {
    if (!turnstileToken || !fileId) {
      setError('Please complete the security check first.');
      return;
    }

    setCurrentStep(DownloadStep.DOWNLOADING);
    setError(null);

    try {
      const response = await fetch(`${API_BASE_URL}/v1/items/${fileId}/download`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          turnstileToken: turnstileToken
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Download failed' }));
        throw new Error(errorData.error || 'Download failed');
      }

      // Handle file download
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = fileInfo?.name || 'download';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      // Redirect back to projects after successful download
      setTimeout(() => {
        router.push('/projects');
      }, 2000);

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Download failed');
      setCurrentStep(DownloadStep.READY);
    }
  };

  const formatFileSize = (bytes: number | null): string => {
    if (!bytes) return 'Unknown size';
    const units = ['B', 'KB', 'MB', 'GB'];
    let size = bytes;
    let unitIndex = 0;
    
    while (size >= 1024 && unitIndex < units.length - 1) {
      size /= 1024;
      unitIndex++;
    }
    
    return `${size.toFixed(1)} ${units[unitIndex]}`;
  };

  const renderContent = () => {
    if (currentStep === DownloadStep.LOADING) {
      return (
        <Fade in timeout={600}>
          <Box display="flex" flexDirection="column" alignItems="center" py={6}>
            <Box
              sx={{
                position: 'relative',
                display: 'inline-flex',
                mb: 3,
              }}
            >
              <CircularProgress 
                size={64} 
                thickness={4}
                sx={{ 
                  color: md3.primary,
                }} 
              />
              <Box
                sx={{
                  top: 0,
                  left: 0,
                  bottom: 0,
                  right: 0,
                  position: 'absolute',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <InsertDriveFile sx={{ color: md3.onSurfaceVariant, fontSize: 28 }} />
              </Box>
            </Box>
            <Typography 
              variant="h6" 
              sx={{ 
                color: md3.onSurface,
                fontWeight: 400,
              }}
            >
              Loading file information
            </Typography>
            <Typography 
              variant="body2" 
              sx={{ 
                color: md3.onSurfaceVariant,
                mt: 1,
              }}
            >
              Please wait a moment...
            </Typography>
          </Box>
        </Fade>
      );
    }


    if (currentStep === DownloadStep.CAPTCHA) {
      return (
        <Fade in timeout={600}>
          <Box py={6} textAlign="center">
            <Box
              sx={{
                display: 'inline-flex',
                p: 2.5,
                borderRadius: '50%',
                backgroundColor: md3.primaryContainer,
                mb: 3,
              }}
            >
              <Verified sx={{ fontSize: 40, color: md3.onPrimaryContainer }} />
            </Box>
            <Typography 
              variant="h5" 
              gutterBottom
              sx={{ 
                fontWeight: 400,
                color: md3.onSurface,
                mb: 2,
              }}
            >
              Security Verification
            </Typography>
            <Typography 
              variant="body1" 
              sx={{ 
                color: md3.onSurfaceVariant,
                mb: 5,
                maxWidth: '500px',
                mx: 'auto',
              }}
            >
              Please complete the security check below to verify you're human and proceed with the download.
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <TurnstileCaptcha onSuccess={handleCaptchaSuccess} />
            </Box>
          </Box>
        </Fade>
      );
    }

    if (currentStep === DownloadStep.READY) {
      return (
        <Grow in timeout={600}>
          <Box py={6} textAlign="center">
            <Box
              sx={{
                display: 'inline-flex',
                p: 3,
                borderRadius: '50%',
                backgroundColor: md3.primaryContainer,
                mb: 3,
              }}
            >
              <CheckCircle sx={{ fontSize: 56, color: md3.onPrimaryContainer }} />
            </Box>
            <Typography 
              variant="h5" 
              gutterBottom
              sx={{ 
                fontWeight: 400,
                color: md3.onSurface,
                mb: 2,
              }}
            >
              Ready to Download!
            </Typography>
            <Typography 
              variant="body1" 
              paragraph
              sx={{ 
                color: md3.onSurfaceVariant,
                mb: 4,
              }}
            >
              Your download is ready. Click the button below to start.
            </Typography>
            <Button
              variant="contained"
              size="large"
              startIcon={<Download />}
              onClick={handleDownload}
              sx={{ 
                backgroundColor: md3.primary,
                color: md3.onPrimary,
                textTransform: 'none',
                borderRadius: 2,
                px: 4,
                py: 1.5,
                fontSize: '1rem',
                fontWeight: 500,
                boxShadow: theme.palette.mode === 'light'
                  ? '0 1px 2px 0 rgba(0,0,0,0.3), 0 1px 3px 1px rgba(0,0,0,0.15)'
                  : '0 1px 3px 0 rgba(0,0,0,0.3), 0 4px 8px 3px rgba(0,0,0,0.15)',
                '&:hover': {
                  backgroundColor: theme.palette.mode === 'light'
                    ? '#004a8c'
                    : '#5690ff',
                  boxShadow: theme.palette.mode === 'light'
                    ? '0 1px 2px 0 rgba(0,0,0,0.3), 0 2px 6px 2px rgba(0,0,0,0.15)'
                    : '0 2px 3px 0 rgba(0,0,0,0.3), 0 6px 10px 4px rgba(0,0,0,0.15)',
                },
                transition: 'all 0.2s cubic-bezier(0.2, 0, 0, 1)',
              }}
            >
              Download Now
            </Button>
          </Box>
        </Grow>
      );
    }

    if (currentStep === DownloadStep.DOWNLOADING) {
      return (
        <Fade in timeout={600}>
          <Box py={6} textAlign="center">
            <Box sx={{ mb: 4 }}>
              <CircularProgress 
                size={64} 
                thickness={4}
                sx={{ 
                  color: md3.primary,
                  mb: 3,
                }} 
              />
              <LinearProgress 
                sx={{ 
                  height: 4,
                  borderRadius: 2,
                  backgroundColor: md3.surfaceVariant,
                  '& .MuiLinearProgress-bar': {
                    backgroundColor: md3.primary,
                  },
                }}
              />
            </Box>
            <Typography 
              variant="h5" 
              gutterBottom
              sx={{ 
                fontWeight: 400,
                color: md3.onSurface,
              }}
            >
              Downloading...
            </Typography>
            <Typography 
              variant="body2" 
              sx={{ 
                color: md3.onSurfaceVariant,
              }}
            >
              Your download should start automatically.
            </Typography>
          </Box>
        </Fade>
      );
    }

    return null;
  };

  if (error && currentStep === DownloadStep.LOADING) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Fade in timeout={600}>
          <Box>
            {/* Back Navigation */}
            <Box sx={{ mb: 3 }}>
              <Button 
                variant="text" 
                onClick={() => router.push('/projects')}
                startIcon={<ArrowBack />}
                sx={{ 
                  color: md3.primary,
                  textTransform: 'none',
                  fontWeight: 500,
                  ml: -1,
                  '&:hover': {
                    backgroundColor: theme.palette.mode === 'light'
                      ? 'rgba(0, 90, 193, 0.08)'
                      : 'rgba(166, 200, 255, 0.08)',
                  },
                }}
              >
                Back to Projects
              </Button>
            </Box>

            {/* Error Message */}
            <Alert 
              severity="error" 
              sx={{ 
                borderRadius: 2,
                backgroundColor: md3.errorContainer,
                color: md3.onErrorContainer,
                '& .MuiAlert-icon': {
                  color: md3.onErrorContainer,
                },
              }}
              icon={<ErrorIcon />}
            >
              {error}
            </Alert>
          </Box>
        </Fade>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Fade in timeout={600}>
        <Box>
          {/* Back Navigation */}
          <Box sx={{ mb: 3 }}>
            <Button 
              variant="text" 
              onClick={() => router.push('/projects')}
              startIcon={<ArrowBack />}
              sx={{ 
                color: md3.primary,
                textTransform: 'none',
                fontWeight: 500,
                ml: -1,
                '&:hover': {
                  backgroundColor: theme.palette.mode === 'light'
                    ? 'rgba(0, 90, 193, 0.08)'
                    : 'rgba(166, 200, 255, 0.08)',
                },
              }}
            >
              Back to Projects
            </Button>
          </Box>

          {/* Page Header */}
          <Box sx={{ mb: 4 }}>
            <Typography 
              variant="h4" 
              component="h1" 
              gutterBottom
              sx={{ 
                fontWeight: 400,
                color: md3.onSurface,
                mb: 2,
              }}
            >
              Download File
            </Typography>
            <Typography 
              variant="body1" 
              sx={{ 
                color: md3.onSurfaceVariant,
              }}
            >
              Complete the steps below to download your file.
            </Typography>
          </Box>

          {/* File Information Card */}
          {fileInfo && (
            <Grow in timeout={800}>
              <Card 
                elevation={0}
                sx={{ 
                  mb: 4,
                  backgroundColor: md3.surfaceContainer,
                  border: `1px solid ${md3.outlineVariant}`,
                  borderRadius: 3,
                  overflow: 'hidden',
                }}
              >
                <Box
                  sx={{
                    background: `linear-gradient(135deg, ${md3.primaryContainer} 0%, ${md3.secondaryContainer} 100%)`,
                    p: 3,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                  }}
                >
                  <Box
                    sx={{
                      p: 2,
                      borderRadius: 2,
                      backgroundColor: theme.palette.background.paper,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <InsertDriveFile sx={{ fontSize: 32, color: md3.primary }} />
                  </Box>
                  <Box sx={{ flex: 1 }}>
                    <Typography 
                      variant="h6" 
                      sx={{ 
                        fontWeight: 500,
                        color: md3.onPrimaryContainer,
                        mb: 0.5,
                      }}
                    >
                      {fileInfo.name}
                    </Typography>
                    <Typography 
                      variant="caption" 
                      sx={{ 
                        color: md3.onSecondaryContainer,
                        opacity: 0.9,
                      }}
                    >
                      Ready for download
                    </Typography>
                  </Box>
                </Box>
                <CardContent>
                  <Box 
                    sx={{ 
                      display: 'flex', 
                      flexWrap: 'wrap', 
                      gap: 3,
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Storage sx={{ fontSize: 20, color: md3.onSurfaceVariant }} />
                      <Box>
                        <Typography 
                          variant="caption" 
                          sx={{ 
                            color: md3.onSurfaceVariant,
                            display: 'block',
                          }}
                        >
                          Size
                        </Typography>
                        <Typography 
                          variant="body2" 
                          sx={{ 
                            fontWeight: 500,
                            color: md3.onSurface,
                          }}
                        >
                          {formatFileSize(fileInfo.size)}
                        </Typography>
                      </Box>
                    </Box>
                    
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Category sx={{ fontSize: 20, color: md3.onSurfaceVariant }} />
                      <Box>
                        <Typography 
                          variant="caption" 
                          sx={{ 
                            color: md3.onSurfaceVariant,
                            display: 'block',
                          }}
                        >
                          Type
                        </Typography>
                        <Typography 
                          variant="body2" 
                          sx={{ 
                            fontWeight: 500,
                            color: md3.onSurface,
                          }}
                        >
                          {fileInfo.mimeType.split('/').pop()?.toUpperCase() || 'File'}
                        </Typography>
                      </Box>
                    </Box>
                    
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Schedule sx={{ fontSize: 20, color: md3.onSurfaceVariant }} />
                      <Box>
                        <Typography 
                          variant="caption" 
                          sx={{ 
                            color: md3.onSurfaceVariant,
                            display: 'block',
                          }}
                        >
                          Modified
                        </Typography>
                        <Typography 
                          variant="body2" 
                          sx={{ 
                            fontWeight: 500,
                            color: md3.onSurface,
                          }}
                        >
                          {new Date(fileInfo.modifiedTime).toLocaleDateString()}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grow>
          )}

          {/* Error Display */}
          <Collapse in={!!error && currentStep !== DownloadStep.LOADING}>
            <Alert 
              severity="error" 
              sx={{ 
                mb: 3,
                borderRadius: 2,
                backgroundColor: md3.errorContainer,
                color: md3.onErrorContainer,
                '& .MuiAlert-icon': {
                  color: md3.onErrorContainer,
                },
              }}
              icon={<Warning />}
            >
              {error}
            </Alert>
          </Collapse>

          {/* Main Content */}
          <Paper 
            elevation={0}
            sx={{ 
              p: 4, 
              minHeight: 320,
              backgroundColor: theme.palette.background.paper,
              border: `1px solid ${md3.outlineVariant}`,
              borderRadius: 3,
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Background Pattern */}
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                opacity: 0.03,
                background: `radial-gradient(circle at 20% 50%, ${md3.primary} 0%, transparent 50%),
                            radial-gradient(circle at 80% 80%, ${md3.secondary} 0%, transparent 50%),
                            radial-gradient(circle at 40% 20%, ${md3.tertiary} 0%, transparent 50%)`,
                pointerEvents: 'none',
              }}
            />
            <Box sx={{ position: 'relative', zIndex: 1 }}>
              {renderContent()}
            </Box>
          </Paper>
        </Box>
      </Fade>
    </Container>
  );
}

export default function DownloadPage() {
  const theme = useTheme();
  const md3 = (theme as any).md3;
  
  return (
    <Suspense fallback={
      <Container maxWidth="md" sx={{ py: 8 }}>
        <Box display="flex" flexDirection="column" alignItems="center">
          <CircularProgress 
            size={60} 
            thickness={4}
            sx={{ 
              mb: 2,
              color: md3.primary,
            }} 
          />
          <Typography 
            sx={{ 
              color: md3.onSurfaceVariant,
            }}
          >
            Loading...
          </Typography>
        </Box>
      </Container>
    }>
      <DownloadPageContent />
    </Suspense>
  );
}
