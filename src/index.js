import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter } from 'react-router-dom';
import {
  cyan700,
  grey600,
  pinkA100, pinkA200, pinkA400,
  fullWhite,
} from 'material-ui/styles/colors';
import {fade} from 'material-ui/utils/colorManipulator';

const muiTheme = getMuiTheme({
  palette:{
    primary1Color: "#8c5ce4",
    Primary2Color: "#6d4bac",
    Primary3Color: "#6d4bac",
    Accent1Color: "#FCE95F",
    Accent2Color: "#E3CE39",
    Accent3Color: "#FFF083",
    textColor: fullWhite,
   secondaryTextColor: fade(fullWhite, 0.7),
   alternateTextColor: '#303030',
   canvasColor: '#303030',
   canvasSecondColor: '#404040',
   borderColor: fade(fullWhite, 0.3),
   disabledColor: fade(fullWhite, 0.3),
   pickerHeaderColor: fade(fullWhite, 0.12),
  clockCircleColor: fade(fullWhite, 0.12),
  }
});



ReactDOM.render((
    <BrowserRouter>
      <MuiThemeProvider muiTheme={muiTheme}>
        <App />
      </MuiThemeProvider>
    </BrowserRouter>
),document.getElementById('root'));
registerServiceWorker();

export default muiTheme;
