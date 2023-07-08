import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [cars, setCars] = useState([]);
  const [selectedMake, setSelectedMake] = useState('');
  const [selectedPrice, setSelectedPrice] = useState('');
  const [selectedFuel, setSelectedFuel] = useState('');
  const [selectedKilometers, setSelectedKilometers] = useState('');

  useEffect(() => {
    fetch('http://garage-parrot/API/cars.php')
      .then(response => response.json())
      .then(data => setCars(data))
      .catch(error => console.error(error));
  }, []);

  const handleMakeChange = (event) => {
    setSelectedMake(event.target.value);
  };

  const handlePriceChange = (event) => {
    setSelectedPrice(event.target.value);
  };

  const handleFuelChange = (event) => {
    setSelectedFuel(event.target.value);
  };

  const handleKilometersChange = (event) => {
    setSelectedKilometers(event.target.value);
  };

  const filteredCars = cars.filter(car => {
    let priceMatches = false;
    let kilometersMatches = false;
  
    if (!selectedPrice || selectedPrice === "Tous") {
      priceMatches = true;
    } else if (selectedPrice === "Moins de 10 000€" && car.prix < 10000) {
      priceMatches = true;
    } else if (selectedPrice === "Entre 10 000€ et 20 000€" && car.prix >= 10000 && car.prix < 20000) {
      priceMatches = true;
    } else if (selectedPrice === "Entre 20 000€ et 40 000€" && car.prix >= 20000 && car.prix < 40000) {
      priceMatches = true;
    } else if (selectedPrice === "Entre 40 000€ et 80 000€" && car.prix >= 40000 && car.prix < 80000) {
      priceMatches = true;
    } else if (selectedPrice === "Plus de 80 000€" && car.prix >= 80000) {
      priceMatches = true;
    }
  
    if (!selectedKilometers || selectedKilometers === "Tous") {
      kilometersMatches = true;
    } else if (selectedKilometers === "Moins de 15 000km" && car.kilometres < 15000) {
      kilometersMatches = true;
    } else if (selectedKilometers === "Entre 15 000 et 30 000km" && car.kilometres >= 15000 && car.kilometres < 30000) {
      kilometersMatches = true;
    } else if (selectedKilometers === "Entre 30 000 et 60 000km" && car.kilometres >= 30000 && car.kilometres < 60000) {
      kilometersMatches = true;
    } else if (selectedKilometers === "Entre 60 000 et 120 000km" && car.kilometres >= 60000 && car.kilometres < 120000) {
      kilometersMatches = true;
    } else if (selectedKilometers === "Plus de 120 000km" && car.kilometres >= 120000) {
      kilometersMatches = true;
    }
  
    return (!selectedMake || car.marque === selectedMake) &&
            (!selectedFuel || car.carburant === selectedFuel) &&
            priceMatches && kilometersMatches;
  });
  

  return (
    <div className="App">
  <div className="choice-filters">
    <div className="root">
      <div className="filters">
        <button id="carmakefilter" className="select">
          <span>Marque</span>
          <select onChange={handleMakeChange}>
            <option value="">Choisissez une marque</option>
            <option>Audi</option>
            <option>BMW</option>
            <option>Chevrolet</option>
            <option>Dacia</option>
            <option>Ford</option>
            <option>Jeep</option>
            <option>Mercedes</option>
            <option>Nissan</option>
            <option>Opel</option>
            <option>Peugeot</option>
            <option>Renault</option>
            <option>Smart</option>
            <option>Tesla</option>
            <option>Toyota</option>
            <option>Volkswagen</option>
          </select>
        </button>
        <button id="pricefilter" className="select">
          <span>Prix</span>
          <select onChange={handlePriceChange}>
            <option value="">Choisissez une gamme de prix</option>
            <option>Moins de 10 000€</option>
            <option>Entre 10 000€ et 20 000€</option>
            <option>Entre 20 000€ et 40 000€</option>
            <option>Entre 40 000€ et 80 000€</option>
            <option>Plus de 80 000€</option>
          </select>
        </button>
        <button id="fuelfilter" className="select">
          <span>Carburant</span>
          <select onChange={handleFuelChange}>
            <option value="">Choisissez un carburant</option>
            <option>Essence</option>
            <option>Diesel</option>
            <option>Electrique</option>
          </select>
        </button>
        <button id="kilometrefilter" className="select">
          <span>Kilomètres</span>
          <select onChange={handleKilometersChange}>
            <option value="">Choisissez un kilométrage</option>
            <option>Moins de 15 000km</option>
            <option>Entre 15 000 et 30 000km</option>
            <option>Entre 30 000 et 60 000km</option>
            <option>Entre 60 000 et 120 000km</option>
            <option>Plus de 120 000km</option>
          </select>
        </button>
      </div>
    </div>
  </div>

      <div className="content-occasions">
        <div className="cards">
          {filteredCars.map((car, index) => (
            <div className="card" key={index}>
              <div className="img-container">
                {car.images.split(',').map((image, imageIndex) => (
                  <img src={`http://garage-parrot/uploads/cars/${image}`} alt="Véhicule d'occasion" key={imageIndex} />
                ))}
              </div>

              <div className="info-container">
                <a href={`ask_infoCars?Immatriculation=${car.Immatriculation}`} className="link">
                  <div className="flextitle">
                    <h2 className="marquetitle">{car.marque}</h2>
                    <div className="price">{car.prix}€</div>
                  </div>

                  <div className="flexsubtitle">
                    <h3 className="modelsubtitle">{car.model}</h3>
                  </div>

                  <div className="flexspe">
                    <ul className="spelist">
                      <li className="spe-item"><span></span>{car.years}</li>
                      <li className="spe-item"><span></span>{car.carburant}</li>
                      <li className="spe-item"><span></span>{car.kilometres} Km</li>
                    </ul>

                    <ul className="moreinfos">
                      <li className="spe-item">{car.infos}</li>
                    </ul>
                  </div>
                </a>
              </div>

              <div className="carbutton-container">
                <a href={`ask_infoCars?Immatriculation=${car.Immatriculation}`} className="carbutton">Demander plus d'infos</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
