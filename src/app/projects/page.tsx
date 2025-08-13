'use client';

import { useState, useEffect, useRef } from 'react';
import { 
  Container, 
  Box, 
  Typography, 
  Card, 
  CardContent, 
  CardActionArea,
  Breadcrumbs,
  Link as MuiLink,
  CircularProgress,
  Alert,
  Paper,
  IconButton,
  Chip,
  Fade,
  Grow
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { 
  Folder,
  InsertDriveFile,
  Home,
  ArrowBack,
  NavigateNext
} from '@mui/icons-material';

interface DriveItem {
  id: string;
  name: string;
  type: 'file' | 'folder';
  mimeType: string;
  size: number | null;
  modifiedTime: string;
  parents: string[];
}

interface DriveResponse {
  items: DriveItem[];
  nextPageToken?: string;
}

export default function ProjectsPage() {
  const theme = useTheme();
  const md3 = (theme as any).md3;
  const [items, setItems] = useState<DriveItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentFolder, setCurrentFolder] = useState<string | null>(null);
  const [breadcrumbs, setBreadcrumbs] = useState<{ id: string; name: string }[]>([]);
  
  // Simple temporary cache - only for current navigation session
  const folderCache = useRef<Map<string | null, DriveItem[]>>(new Map());
  
  const API_BASE_URL = process.env.NEXT_PUBLIC_PROJECTS_INDEX_API_URL;

  const fetchItems = async (folderId: string | null) => {
    // First check if we have cached data
    const cached = folderCache.current.get(folderId);
    if (cached) {
      setItems(cached);
      setLoading(false);
      return;
    }
    
    // If no cache, fetch fresh data
    setLoading(true);
    setError(null);
    
    try {
      const url = folderId 
        ? `${API_BASE_URL}/v1/items?folder=${folderId}`
        : `${API_BASE_URL}/v1/items`;
        
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch items: ${response.statusText}`);
      }
      
      const data: DriveResponse = await response.json();
      setItems(data.items);
      
      // Cache the data for this folder
      folderCache.current.set(folderId, data.items);
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch items');
      setItems([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems(currentFolder);
  }, [currentFolder]);

  const handleItemClick = (item: DriveItem) => {
    if (item.type === 'folder') {
      // Check if we're going to a folder that's already in breadcrumbs (going back)
      const existingIndex = breadcrumbs.findIndex(crumb => crumb.id === item.id);
      
      if (existingIndex !== -1) {
        // We're navigating to a folder already in our path, so truncate breadcrumbs
        setBreadcrumbs(breadcrumbs.slice(0, existingIndex + 1));
      } else {
        // Add new folder to breadcrumbs
        setBreadcrumbs([...breadcrumbs, { id: item.id, name: item.name }]);
      }
      
      setCurrentFolder(item.id);
    } else {
      // Store file ID in session storage and navigate to download page
      sessionStorage.setItem('downloadFileId', item.id);
      window.location.href = `/projects/download?id=${item.id}`;
    }
  };

  const handleBreadcrumbClick = (index: number) => {
    const targetBreadcrumb = breadcrumbs[index];
    const newBreadcrumbs = breadcrumbs.slice(0, index + 1);
    
    setBreadcrumbs(newBreadcrumbs);
    setCurrentFolder(targetBreadcrumb.id);
  };

  const handleBackClick = () => {
    if (breadcrumbs.length > 0) {
      // If we have breadcrumbs, go back to parent
      if (breadcrumbs.length === 1) {
        // If we're at the first level, go back to root
        setBreadcrumbs([]);
        setCurrentFolder(null);
      } else {
        // Otherwise go to previous folder
        handleBreadcrumbClick(breadcrumbs.length - 2);
      }
    }
  };

  const formatFileSize = (bytes: number | null): string => {
    if (!bytes) return '';
    const units = ['B', 'KB', 'MB', 'GB'];
    let size = bytes;
    let unitIndex = 0;
    
    while (size >= 1024 && unitIndex < units.length - 1) {
      size /= 1024;
      unitIndex++;
    }
    
    return `${size.toFixed(1)} ${units[unitIndex]}`;
  };

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 2, sm: 4 } }}>
      <Fade in timeout={600}>
        <Box sx={{ mb: 4 }}>
          <Typography 
            variant="h3" 
            component="h1" 
            gutterBottom
            sx={{ 
              fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
              fontWeight: 400,
              color: md3.onSurface,
              mb: 2,
            }}
          >
            Projects
          </Typography>
          
          <Typography 
            variant="body1" 
            sx={{ 
              color: md3.onSurfaceVariant,
              mb: 3,
            }}
          >
            Browse and download my projects and files.
          </Typography>
        </Box>
      </Fade>

      {/* MD3 Navigation Rail */}
      <Paper 
        elevation={0}
        sx={{ 
          mb: 3, 
          p: 2,
          backgroundColor: theme.palette.background.paper,
          border: `1px solid ${md3.outlineVariant}`,
          borderRadius: 2,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {breadcrumbs.length > 0 && (
            <IconButton
              onClick={handleBackClick}
              sx={{
                backgroundColor: md3.surfaceVariant,
                '&:hover': { 
                  backgroundColor: theme.palette.mode === 'light'
                    ? 'rgba(68, 71, 78, 0.16)'
                    : 'rgba(196, 198, 208, 0.16)',
                },
              }}
              aria-label="Go back"
            >
              <ArrowBack />
            </IconButton>
          )}
          
          <Breadcrumbs 
            separator={<NavigateNext fontSize="small" />}
            sx={{ flex: 1 }}
          >
            <Box
              sx={{ 
                display: 'flex', 
                alignItems: 'center',
                color: breadcrumbs.length === 0 ? md3.onSurface : md3.onSurfaceVariant,
                fontWeight: breadcrumbs.length === 0 ? 500 : 400,
                cursor: breadcrumbs.length > 0 ? 'pointer' : 'default',
                '&:hover': breadcrumbs.length > 0 ? { color: md3.primary } : {},
                transition: 'color 0.2s cubic-bezier(0.2, 0, 0, 1)',
              }}
              onClick={() => {
                if (breadcrumbs.length > 0) {
                  setBreadcrumbs([]);
                  setCurrentFolder(null);
                }
              }}
            >
              <Home sx={{ mr: 0.5 }} fontSize="small" />
              Root
            </Box>
            
            {breadcrumbs.map((crumb, index) => (
              <MuiLink
                key={crumb.id}
                underline={index === breadcrumbs.length - 1 ? "none" : "hover"}
                onClick={() => index < breadcrumbs.length - 1 && handleBreadcrumbClick(index)}
                sx={{ 
                  cursor: index < breadcrumbs.length - 1 ? 'pointer' : 'default',
                  fontWeight: index === breadcrumbs.length - 1 ? 500 : 400,
                  color: index === breadcrumbs.length - 1 ? md3.onSurface : md3.onSurfaceVariant,
                  '&:hover': { color: md3.primary },
                  transition: 'color 0.2s cubic-bezier(0.2, 0, 0, 1)',
                }}
              >
                {crumb.name}
              </MuiLink>
            ))}
          </Breadcrumbs>
        </Box>
      </Paper>

      {/* Content */}
      {loading && (
        <Box display="flex" justifyContent="center" py={8}>
          <CircularProgress />
        </Box>
      )}

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {!loading && !error && (
        <Fade in timeout={800}>
          <Box>
            <Chip 
              label={`${items.length} ${items.length === 1 ? 'item' : 'items'}`}
              size="small"
              sx={{ 
                mb: 3,
                backgroundColor: md3.secondaryContainer,
                color: md3.onSecondaryContainer,
              }}
            />
            
            <Box 
              sx={{
                display: 'grid',
                gridTemplateColumns: {
                  xs: 'repeat(2, 1fr)',
                  sm: 'repeat(3, 1fr)', 
                  md: 'repeat(4, 1fr)',
                  lg: 'repeat(5, 1fr)'
                },
                gap: { xs: 1.5, sm: 2 }
              }}
            >
              {items.map((item, index) => (
                <Grow 
                  key={item.id} 
                  in 
                  timeout={400 + index * 50}
                  style={{ transformOrigin: '0 0 0' }}
                >
                  <Card 
                    elevation={0}
                    sx={{ 
                      height: '100%',
                      backgroundColor: md3.surfaceContainer,
                      border: `1px solid ${md3.outlineVariant}`,
                      transition: 'all 0.2s cubic-bezier(0.2, 0, 0, 1)',
                      '&:hover': { 
                        transform: 'translateY(-4px)',
                        boxShadow: theme.palette.mode === 'light'
                          ? '0 4px 8px 0 rgba(0,0,0,0.12), 0 2px 4px 0 rgba(0,0,0,0.08)'
                          : '0 4px 8px 0 rgba(0,0,0,0.2), 0 2px 4px 0 rgba(0,0,0,0.12)',
                        borderColor: md3.primary,
                      },
                    }}
                  >
                    <CardActionArea 
                      onClick={() => handleItemClick(item)}
                      sx={{ 
                        height: '100%',
                        '&:focus-visible': {
                          '& .MuiCardContent-root': {
                            backgroundColor: theme.palette.mode === 'light'
                              ? 'rgba(0, 90, 193, 0.04)'
                              : 'rgba(166, 200, 255, 0.04)',
                          },
                        },
                      }}
                    >
                      <CardContent 
                        sx={{ 
                          textAlign: 'center',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          gap: 1,
                          py: { xs: 2, sm: 3 },
                          px: { xs: 1, sm: 2 },
                        }}
                      >
                        <Box 
                          sx={{ 
                            mb: 1,
                            p: { xs: 1.5, sm: 2 },
                            borderRadius: '50%',
                            backgroundColor: item.type === 'folder' 
                              ? md3.primaryContainer 
                              : md3.secondaryContainer,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          {item.type === 'folder' ? (
                            <Folder 
                              sx={{ 
                                fontSize: { xs: 28, sm: 32 }, 
                                color: md3.onPrimaryContainer,
                              }} 
                            />
                          ) : (
                            <InsertDriveFile 
                              sx={{ 
                                fontSize: { xs: 28, sm: 32 }, 
                                color: md3.onSecondaryContainer,
                              }} 
                            />
                          )}
                        </Box>
                        
                        <Typography 
                          variant="subtitle2" 
                          component="h3"
                          sx={{ 
                            fontWeight: 500,
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            width: '100%',
                            px: 1,
                            color: md3.onSurface,
                          }}
                          title={item.name}
                        >
                          {item.name}
                        </Typography>
                        
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                          <Typography 
                            variant="caption" 
                            sx={{ 
                              color: md3.onSurfaceVariant,
                              fontWeight: 500,
                            }}
                          >
                            {item.type === 'folder' 
                              ? 'Folder' 
                              : formatFileSize(item.size)
                            }
                          </Typography>
                          
                          <Typography 
                            variant="caption" 
                            sx={{ 
                              color: md3.onSurfaceVariant,
                              opacity: 0.7,
                            }}
                          >
                            {formatDate(item.modifiedTime)}
                          </Typography>
                        </Box>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Grow>
              ))}
            </Box>
            
            {items.length === 0 && (
              <Paper
                elevation={0}
                sx={{
                  p: 6,
                  textAlign: 'center',
                  backgroundColor: md3.surfaceContainer,
                  border: `1px solid ${md3.outlineVariant}`,
                  borderRadius: 3,
                }}
              >
                <Box
                  sx={{
                    display: 'inline-flex',
                    p: 3,
                    borderRadius: '50%',
                    backgroundColor: md3.surfaceVariant,
                    mb: 3,
                  }}
                >
                  <Folder 
                    sx={{ 
                      fontSize: 48, 
                      color: md3.onSurfaceVariant,
                      opacity: 0.6,
                    }} 
                  />
                </Box>
                <Typography 
                  variant="h6" 
                  sx={{ 
                    color: md3.onSurface,
                    fontWeight: 400,
                    mb: 1,
                  }}
                >
                  No items in this folder
                </Typography>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    color: md3.onSurfaceVariant,
                  }}
                >
                  This folder doesn't contain any files or subfolders yet.
                </Typography>
              </Paper>
            )}
          </Box>
        </Fade>
      )}
    </Container>
  );
}
