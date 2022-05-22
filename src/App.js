import logo from './logo.svg';
import './App.css';
import web3 from './web3';
import lottery from './lottery';
import {useState,useEffect} from 'react';
function App() {
    const [manager,setManager]=useState();
    const [players,setPlayers]=useState([]);
    const [balance,setBalance]=useState(0);
    useEffect(()=>{
      lottery.methods.manager().call().then((m)=>setManager(m));
      lottery.methods.getPlayers().call().then((p)=>setPlayers(p));
      web3.eth.getBalance(lottery.options.address).then((b)=>setBalance(b));
    },[])

  return (
    <div className="App">
      <p>{manager}</p>
    </div>
  );
}

export default App;
