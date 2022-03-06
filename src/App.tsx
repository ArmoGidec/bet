import { EventList } from '@components';
import { AppBar, Box, IconButton, Toolbar } from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import { useBetslipProvider } from '@hooks/useBetslip/useBetslip';

function App() {
  const { BetslipProvider } = useBetslipProvider();
  return (
    <BetslipProvider>
      <AppBar>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={ { mr: 2 } }
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Toolbar />
      <Box sx={ { flexGrow: 1 } } pt={2}>
        <EventList />
      </Box>
    </BetslipProvider>
  );
}

export default App;
