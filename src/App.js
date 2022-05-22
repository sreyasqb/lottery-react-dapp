import logo from "./logo.svg";
import "./App.css";
import web3 from "./web3";
import lottery from "./lottery";
import { useState, useEffect } from "react";
function App() {
  const [manager, setManager] = useState();
  const [players, setPlayers] = useState([]);
  const [balance, setBalance] = useState("");
  const [money, setMoney] = useState(0);
  const [message,setMessage]=useState();
  useEffect(() => {
    lottery.methods
      .manager()
      .call()
      .then((m) => setManager(m));
    lottery.methods
      .getPlayers()
      .call()
      .then((p) => setPlayers(p));
    web3.eth.getBalance(lottery.options.address).then((b) => setBalance(b));
    
  }, []);

  const submitHandler= async (event)=>{
    event.preventDefault();
    const accounts=await web3.eth.getAccounts();
    setMessage("Waiting on transaction success...");
    await lottery.methods.addPlayer().send({
      from:accounts[0],
      value:web3.utils.toWei(money,'ether')
    });
    setMessage('You have entered!!');
  };
  const winnerHandler = async ()=>{
    const accounts=await web3.eth.getAccounts();
    await lottery.methods.getWinner().send({
      from:accounts[0],
    })
  }

  return (
    <div className="App">
      
      <p className="bg-red-500">
        The Manager is {manager}
        <br />
        The no of players are {players.length}
        <br />
        The prize pool is {web3.utils.fromWei(balance, "ether")}
      </p>
      <hr />
      <form onSubmit={submitHandler}>
        <h4>Want to try your luck?</h4>
        <div>
          <label>Amount of ether to enter</label>
          <input
            value={money}
            onChange={(event) => {
              setMoney(event.target.value);
            }}
          />
        </div>
        <button>Enter</button>
      </form>
      <hr/>
      <h4>Ready to pick a winner?</h4>
      <button onClick={winnerHandler}>Pick a winner!</button>
      <hr/>
      <h4>{message}</h4>
    </div>
  );
}

export default App;
