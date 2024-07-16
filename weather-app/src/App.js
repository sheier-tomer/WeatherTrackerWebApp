import './App.css';
import axios from 'axios';
import Header from './components/Header/header';
//import SearchBar from './components/SearchBar/searchBar';
import Forecast from './components/Forecast/forecast';

function App() {
  return (
    <div className="App">
      <Header />
      <Forecast />
    </div>
  );
}

export default App;
