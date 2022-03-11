import { EventList, BetslipList } from '@components';
import { AppBar, Box, Drawer, IconButton, Toolbar } from '@mui/material';
import { Menu as MenuIcon, Close as CloseIcon } from '@mui/icons-material';
import { useState } from 'react';
import { BetslipProvider, EventsProvider } from '@hooks';

function App() {
  const [open, setOpen] = useState(false);

  const toggleOpen = (openValue: boolean) => () => {
    setOpen(openValue);
  };

  return (
    <EventsProvider>
      <BetslipProvider>
        <AppBar>
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={toggleOpen(true)}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Toolbar />
        <Drawer anchor="left" open={open} onClose={toggleOpen(false)}>
          <Box sx={{ width: 250 }} role="presentation">
            <Toolbar>
              <IconButton
                size="large"
                edge="end"
                color="inherit"
                aria-label="menu"
                sx={{ marginLeft: 'auto' }}
                onClick={toggleOpen(false)}
              >
                <CloseIcon />
              </IconButton>
            </Toolbar>
            <BetslipList />
          </Box>
        </Drawer>
        <Box sx={{ flexGrow: 1 }} pt={2}>
          <EventList />
        </Box>
      </BetslipProvider>
    </EventsProvider>
  );
}

export default App;
