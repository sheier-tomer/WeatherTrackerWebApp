import './App.css';
import Header from './components/Header/header';
//import SearchBar from './components/SearchBar/searchBar';
import Forecast from './components/Forecast/forecast';
import Footer from './components/Footer/footer';

function App() {
  return (
    <div className="App">
      <Header />
      <Forecast />
      <Footer />
    </div>
  );
}

export default App;
