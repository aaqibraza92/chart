import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Charts } from './Component/Charts';
import "bootstrap/dist/css/bootstrap.min.css";
import Header from './Header';
import { Home } from './Pages/Home';
import Footer from './Footer';

function App() {
  return (
    <div className="App">
      <Header/>
      <main>
      <Home/>
      </main>
      <Footer/>
    </div>
  );
}

export default App;
