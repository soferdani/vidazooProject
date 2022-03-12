import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button,Table,Spinner} from 'react-bootstrap';
import { useState } from 'react';
import axios from 'axios';
const regex = /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;

function App() {
  const [domain, setDomain] = useState('');
  const [result, setResult] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [dataFlag, setdataFlag] = useState(false);


  const handleChange = (event) => { 
    setDomain(event.target.value);
  }

  const handleSubmit = async () => {
    if (regex.test(domain)) { 
          setIsLoading(true);
          try {
            const parseData = await axios.post('http://localhost:5000/parseData', { domain })
            setResult(parseData.data);
            setdataFlag(true);
            setIsLoading(false);
          } catch (error) { 
            setdataFlag(false);
            console.error(`this is error: ${error}`);
          }
          setDomain('');
    } else {
      alert("you must provide a valid url");
      setDomain('');
    }
  }

  
  return (
    <div className="App">
      <div className='headLine'>ads PARSER APP</div>
      <div className='input-test'>please provide a content site</div>

      <input className='input' onChange={handleChange} placeholder='www.msn.com for example' />
      <Button onClick={handleSubmit}>GENERATE INFORMATION</Button>
      <div className='result'>
        {isLoading ? <Spinner animation="border" /> : null}
        { dataFlag ? 
          <Table striped bordered hover>
          <thead>
            <tr>
              <th>DOMAIN</th>
              <th>COUNT</th>
            </tr>
            </thead>
            <tbody>
              {Object.keys(result).map((key, index) => { 
                return (
                  <tr key={index}>
                    <td>{key}</td>
                    <td>{result[key]}</td>
                  </tr>
                )
              })}
            </tbody>
          </Table> : null }
      </div>
    </div>
  );
}

export default App;
