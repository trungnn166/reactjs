import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import ManageScreen from './page/manage/ManageScreen';

ReactDOM.render(
  <React.StrictMode>
    <ManageScreen/>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
