import { useState, useEffect } from 'react'
import axios from 'axios';
import './App.css'

const ListaKomponens = ({elem}) => {
  return(
  <div className="container">
    <div className="row m-5 p-5">
 {elem.name} - {elem.email}<br/> 
      {elem.body}
    </div>
  </div>      
);
};

export const App = () => {
const [adat, setAdat] = useState([]);
const [hiba, setHiba] = useState('');
const [id] = useState(500);
  useEffect(() => {
    // Fetch API - Promise chain (.then) használatával
fetch(`https://harmadik.sulla.hu/Comment/${id}`)
  .then(response => {
    if (!response.ok) {
      throw new Error('Hiba történt az adatlekérés során!');
    }
    return response.json();
  })
  .then(adatok => {
    setAdat(adatok);
  })
  .catch(error => {
    setHiba(error.message);
  });
    }, [id]);
  // dependency array - függőségi tömb: 
  // ha üres: akkor 1x frissül le,  
  // ha itt van egy változó, akkor csak akkor frissül le, ha a változó megváltozott!
  // ha itt nincs semmi, és dependency el van hagyva, akkor minden alkalommal lefrissül

  return (
    <div className="container">
      <div className="row m-5 p-5 border">
          <ListaKomponens elem={adat} />
      </div>
    </div>
  )
};