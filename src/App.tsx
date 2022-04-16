import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Country from './Pages/Country';
import CountryInformation from './Pages/CountryInformation';
import CapitalWeather from './Pages/CapitalWeather';

function App()
{
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Country />} />
        <Route path="/country" element={<Country />} />
        <Route path="/information/:country" element={<CountryInformation />} />
        <Route path="/capital-weather/:capital" element={<CapitalWeather />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
