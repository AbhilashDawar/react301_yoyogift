import React, { useState } from 'react';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import './App.scss';
import RouterComponent from './app/router';
import { ContextStateProvider } from './app/shared/utilities/context/state';

function App() {

  const [darkMode, setDarkMode] = useState(false);

  const changeTheme = () => {
    setDarkMode(!darkMode);
  }

  const theme = createMuiTheme({
    palette: {
      type: darkMode ? 'dark' : 'light',
    },
  });

  return (
    <ThemeProvider theme={theme}>
        <ContextStateProvider>
          <div className="App">
            <RouterComponent darkMode={darkMode} changeTheme={changeTheme} />
          </div>
        </ContextStateProvider>
    </ThemeProvider>
  );
}

export default App;
