import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button,} from 'react-bootstrap';
import { useState } from 'react';
import axios from 'axios';

function App() {

  const [domain, setDomain] = useState('');

  const handleChange = (event) => { 
    setDomain(event.target.value);
  }

  const handleSubmit = async () => {

    try {
      const dataFromADS = await axios.get(`https://${domain}/ads.txt`)
      const parseData = await axios.post('http://localhost:5000/parseData', {dataFromADS})
      
    } catch (error) { 

    }
    // const response = await axios.get(`http://localhost:5000/parseData?domain=${domain}`);
    setDomain('');
  }

  return (
    <div className="App">
      <div className='headLine'>ads PARSER APP</div>
      <div className='input-test'>please provide a content site</div>
      <input className='input' onChange={handleChange} placeholder='www.msn.com for example' />
      <Button onClick={handleSubmit}>GENERATE INFORMATION</Button>

    </div>
  );
}

export default App;
