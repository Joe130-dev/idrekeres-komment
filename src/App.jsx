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
    const kommentBetoltes = async () =>  {
      try {
        const response = await axios.get(`https://harmadik.sulla.hu/Comment/${id}`);
        setAdat(response.data);
        }
      catch (error) { setHiba(error.message); }
    }
    kommentBetoltes(); 
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