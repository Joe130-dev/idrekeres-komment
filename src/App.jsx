
import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

// Bejegyzések megjelenítése
const ListaKomponens = ({ elem }) => {
  return (
    <div className="container">
      {elem.map(bejegyzes => (
        <div className="row m-3 p-3 border" key={bejegyzes.id}>
          <div>
            <strong>{bejegyzes.title}</strong>
          </div>
          <div>
            Felhasználó azonosító: {bejegyzes.userId}
          </div>
          <div>{bejegyzes.body}</div>
        </div>
      ))}
    </div>
  );
};

export const App = () => {
  const [adat, setAdat] = useState([]);
  const [hiba, setHiba] = useState('');

  useEffect(() => {

    // Axios - async/await használatával
    const bejegyzesBetoltes = async () => {
      try {
        const response = await axios.get('https://harmadik.sulla.hu/Post');
        setAdat(response.data);
      }
      catch (error) {
        setHiba(error.message);
      }
    };

    bejegyzesBetoltes();

  }, []);

  // dependency array - függőségi tömb:
  // ha üres: akkor egyszer fut le a betöltés
  // ha változó van benne: annak változásakor újra lefut
  // ha nincs megadva: minden renderelés után lefut

  return (
    <div className="container">
      <div className="row m-5 p-5 border">
        {hiba && <p className="text-danger">{hiba}</p>}
        <ListaKomponens elem={adat} />
      </div>
    </div>
  );
};
