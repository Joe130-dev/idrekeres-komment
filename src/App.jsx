
import { useState, useEffect } from 'react';
import './App.css';

// Kommentek megjelenítése
const ListaKomponens = ({ elem }) => {
  return (
    <div className="container">
      {elem.map(komment => (
        <div className="row m-3 p-3 border" key={komment.id}>
          <div>
            <strong>{komment.name}</strong> - {komment.email}
          </div>
          <div>{komment.body}</div>
        </div>
      ))}
    </div>
  );
};

export const App = () => {
  const [adat, setAdat] = useState([]);
  const [hiba, setHiba] = useState('');

  useEffect(() => {

    // Fetch API - async/await használatával
    const kommentBetoltes = async () => {
      try {
        const response = await fetch('https://harmadik.sulla.hu/Comment');

        if (!response.ok) {
          throw new Error('Hiba történt az adatlekérés során!');
        }

        const adatok = await response.json();
        setAdat(adatok);
      }
      catch (error) {
        setHiba(error.message);
      }
    };

    kommentBetoltes();

  }, []);

  // dependency array - függőségi tömb:
  // ha üres: akkor 1x fut le a betöltés
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
