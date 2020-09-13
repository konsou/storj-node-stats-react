import React from 'react'
import './App.css'
import NodeInfo from './components/NodeInfo'

const NODES = ["192.168.42.8:14002", "192.168.42.4:14002", "192.168.42.2:14002"] //, "192.168.42.3:14002"]

const App = () => {
  return (
    <div className="App">
      { NODES.map(node => <NodeInfo address={node} key={node} />) }
    </div>
  );
}

export default App;
