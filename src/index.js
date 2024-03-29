import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from './App';
import WatchlistPage from './WatchlistPage';
import Search from './Search';
import reportWebVitals from './reportWebVitals';
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import CustomNavbar from './CustomNavbar';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import Stock from './Stock';
import PortfolioPage from './Portfolio';

const queryClient = new QueryClient()
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>

   
    <CustomNavbar />
    <QueryClientProvider client={queryClient}>
    <BrowserRouter>
    <Routes>
      <Route path="/search/*" element={<Search />}>
        <Route path=":ticker" element={<Stock />}></Route>
      </Route>
      {/* <Route index path="/search/*" element={<Stock />}></Route> */}
      <Route path="/watchlist" element={<WatchlistPage />}></Route>
      <Route path="/portfolio" element={<PortfolioPage />}></Route>
      
    </Routes>
    
    </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
