'use client';

import { IconButton, Menu, MenuItem, ListItemIcon, ListItemText, Tooltip, Fade, Box } from '@mui/material';
import { 
  LightMode, 
  DarkMode, 
  Brightness4,
  Check
} from '@mui/icons-material';
import { useState, MouseEvent } from 'react';
import { useColorScheme, useTheme } from '@mui/material/styles';

export function ThemeSwitcher() {
  const { mode = 'system', setMode, systemMode } = useColorScheme();
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleModeChange = (newMode: 'light' | 'dark' | 'system') => {
    setMode(newMode);
    handleClose();
  };

  const getIcon = () => {
    if (mode === 'system') {
      return <Brightness4 />;
    }
    return mode === 'light' ? <LightMode /> : <DarkMode />;
  };

  const getTooltipTitle = () => {
    if (mode === 'system') {
      return `Auto theme (currently ${systemMode || 'light'})`;
    }
    return `${mode.charAt(0).toUpperCase() + mode.slice(1)} theme`;
  };

  return (
    <>
      <Tooltip title={getTooltipTitle()} arrow>
        <IconButton
          onClick={handleClick}
          sx={{ 
            color: theme.vars.palette.text.secondary,
            backgroundColor: theme.vars.palette.action.hover,
            '&:hover': { 
              backgroundColor: theme.vars.palette.action.selected,
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
        slots={{ transition: Fade }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        slotProps={{
          paper: {
            elevation: 3,
            sx: {
              mt: 1,
              minWidth: 180,
              backgroundColor: theme.vars.palette.background.paper,
              border: `1px solid ${theme.vars.palette.divider}`,
              borderRadius: 2,
            },
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
              backgroundColor: theme.vars.palette.secondary.light,
              '&:hover': {
                backgroundColor: theme.vars.palette.secondary.light,
              },
            },
          }}
        >
          <ListItemIcon>
            <LightMode />
          </ListItemIcon>
          <ListItemText primary="Light" />
          {mode === 'light' && (
            <Box sx={{ ml: 'auto', color: theme.vars.palette.primary.main }}>
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
              backgroundColor: theme.vars.palette.secondary.light,
              '&:hover': {
                backgroundColor: theme.vars.palette.secondary.light,
              },
            },
          }}
        >
          <ListItemIcon>
            <DarkMode />
          </ListItemIcon>
          <ListItemText primary="Dark" />
          {mode === 'dark' && (
            <Box sx={{ ml: 'auto', color: theme.vars.palette.primary.main }}>
              <Check fontSize="small" />
            </Box>
          )}
        </MenuItem>

        <MenuItem 
          onClick={() => handleModeChange('system')}
          selected={mode === 'system'}
          sx={{
            minHeight: 56,
            gap: 2,
            '&.Mui-selected': {
              backgroundColor: theme.vars.palette.secondary.light,
              '&:hover': {
                backgroundColor: theme.vars.palette.secondary.light,
              },
            },
          }}
        >
          <ListItemIcon>
            <Brightness4 />
          </ListItemIcon>
          <ListItemText 
            primary="Auto" 
            secondary="Follow system"
          />
          {mode === 'system' && (
            <Box sx={{ ml: 'auto', color: theme.vars.palette.primary.main }}>
              <Check fontSize="small" />
            </Box>
          )}
        </MenuItem>
      </Menu>
    </>
  );
}
