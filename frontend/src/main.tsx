import axios from "axios"; axios.defaults.baseURL = import.meta.env.VITE_API_URL || "";
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Route, Router } from 'wouter';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Project from './pages/Project';
import './index.css';

const Main = () => (
  <Router>
    <Route path="/" component={Login} />
    <Route path="/dashboard" component={Dashboard} />
    <Route path="/project/:id" component={Project} />
  </Router>
);

ReactDOM.createRoot(document.getElementById('root')!).render(<Main />);
