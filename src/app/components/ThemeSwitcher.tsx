'use client';

import { IconButton, Menu, MenuItem, ListItemIcon, ListItemText, Tooltip, Fade, Box } from '@mui/material';
import { 
  LightMode, 
  DarkMode, 
  Brightness4,
  Check
} from '@mui/icons-material';
import { useState, MouseEvent } from 'react';
import { useTheme as useMuiTheme } from '@mui/material/styles';
import { useTheme } from '../providers/ThemeProvider';

export function ThemeSwitcher() {
  const { mode, setMode, actualMode } = useTheme();
  const theme = useMuiTheme();
  const md3 = (theme as any).md3;
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleModeChange = (newMode: 'light' | 'dark' | 'auto') => {
    setMode(newMode);
    handleClose();
  };

  const getIcon = () => {
    if (mode === 'auto') {
      return <Brightness4 />;
    }
    return actualMode === 'light' ? <LightMode /> : <DarkMode />;
  };

  const getTooltipTitle = () => {
    if (mode === 'auto') {
      return `Auto theme (currently ${actualMode})`;
    }
    return `${mode.charAt(0).toUpperCase() + mode.slice(1)} theme`;
  };

  return (
    <>
      <Tooltip title={getTooltipTitle()} arrow>
        <IconButton
          onClick={handleClick}
          sx={{ 
            color: md3.onSurfaceVariant,
            backgroundColor: md3.surfaceVariant,
            '&:hover': { 
              backgroundColor: theme.palette.mode === 'light'
                ? 'rgba(68, 71, 78, 0.16)'
                : 'rgba(196, 198, 208, 0.16)',
            },
            transition: 'all 0.2s cubic-bezier(0.2, 0, 0, 1)',
          }}
          aria-label="Change theme"
        >
          {getIcon()}
        </IconButton>
      </Tooltip>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        PaperProps={{
          elevation: 3,
          sx: {
            mt: 1,
            minWidth: 180,
            backgroundColor: md3.surfaceContainer,
            border: `1px solid ${md3.outlineVariant}`,
            borderRadius: 2,
          },
        }}
      >
        <MenuItem 
          onClick={() => handleModeChange('light')}
          selected={mode === 'light'}
          sx={{
            minHeight: 56,
            gap: 2,
            '&.Mui-selected': {
              backgroundColor: md3.secondaryContainer,
              '&:hover': {
                backgroundColor: theme.palette.mode === 'light'
                  ? 'rgba(85, 95, 113, 0.16)'
                  : 'rgba(189, 199, 220, 0.16)',
              },
            },
          }}
        >
          <ListItemIcon sx={{ color: mode === 'light' ? md3.primary : md3.onSurfaceVariant }}>
            <LightMode />
          </ListItemIcon>
          <ListItemText 
            primary="Light" 
            primaryTypographyProps={{
              fontWeight: mode === 'light' ? 600 : 400,
              color: mode === 'light' ? md3.onSecondaryContainer : md3.onSurface,
            }}
          />
          {mode === 'light' && (
            <Box sx={{ ml: 'auto', color: md3.primary }}>
              <Check fontSize="small" />
            </Box>
          )}
        </MenuItem>

        <MenuItem 
          onClick={() => handleModeChange('dark')}
          selected={mode === 'dark'}
          sx={{
            minHeight: 56,
            gap: 2,
            '&.Mui-selected': {
              backgroundColor: md3.secondaryContainer,
              '&:hover': {
                backgroundColor: theme.palette.mode === 'light'
                  ? 'rgba(85, 95, 113, 0.16)'
                  : 'rgba(189, 199, 220, 0.16)',
              },
            },
          }}
        >
          <ListItemIcon sx={{ color: mode === 'dark' ? md3.primary : md3.onSurfaceVariant }}>
            <DarkMode />
          </ListItemIcon>
          <ListItemText 
            primary="Dark" 
            primaryTypographyProps={{
              fontWeight: mode === 'dark' ? 600 : 400,
              color: mode === 'dark' ? md3.onSecondaryContainer : md3.onSurface,
            }}
          />
          {mode === 'dark' && (
            <Box sx={{ ml: 'auto', color: md3.primary }}>
              <Check fontSize="small" />
            </Box>
          )}
        </MenuItem>

        <MenuItem 
          onClick={() => handleModeChange('auto')}
          selected={mode === 'auto'}
          sx={{
            minHeight: 56,
            gap: 2,
            '&.Mui-selected': {
              backgroundColor: md3.secondaryContainer,
              '&:hover': {
                backgroundColor: theme.palette.mode === 'light'
                  ? 'rgba(85, 95, 113, 0.16)'
                  : 'rgba(189, 199, 220, 0.16)',
              },
            },
          }}
        >
          <ListItemIcon sx={{ color: mode === 'auto' ? md3.primary : md3.onSurfaceVariant }}>
            <Brightness4 />
          </ListItemIcon>
          <ListItemText 
            primary="Auto" 
            secondary={`Follow system`}
            primaryTypographyProps={{
              fontWeight: mode === 'auto' ? 600 : 400,
              color: mode === 'auto' ? md3.onSecondaryContainer : md3.onSurface,
            }}
            secondaryTypographyProps={{
              fontSize: '0.75rem',
              color: md3.onSurfaceVariant,
            }}
          />
          {mode === 'auto' && (
            <Box sx={{ ml: 'auto', color: md3.primary }}>
              <Check fontSize="small" />
            </Box>
          )}
        </MenuItem>
      </Menu>
    </>
  );
}
