import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import App from './App';
import WatchlistPage from './WatchlistPage';
import 'react-toastify/dist/ReactToastify.css';
import Search from './Search';
import reportWebVitals from './reportWebVitals';
import Footer from './components/Footer';
import Home from './Home';
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
import {ToastContainer} from 'react-toastify'

const queryClient = new QueryClient()
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>

<ToastContainer
position="top-center"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
/>
    <CustomNavbar />
    <QueryClientProvider client={queryClient}>
    <BrowserRouter>
    <Routes>
    <Route path="/" element={<Navigate to="/search/home" replace />} />

      <Route path="/search/*" element={<Search />}>
        <Route path="home" element={<Home />}></Route>
        <Route path=":ticker" element={<Stock />}></Route>
      </Route>
      {/* <Route index path="/search/*" element={<Stock />}></Route> */}
      <Route path="/watchlist" element={<WatchlistPage />}></Route>
      <Route path="/portfolio" element={<PortfolioPage />}></Route>
      
    </Routes>
    
    </BrowserRouter>
    </QueryClientProvider>
    <Footer />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
