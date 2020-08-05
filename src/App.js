import React from 'react'
import './App.css'
import NodeInfo from './components/NodeInfo'

const App = () => {
  return (
    <div className="App">
      <NodeInfo address="192.168.42.8:14002" />
    </div>
  );
}

export default App;
