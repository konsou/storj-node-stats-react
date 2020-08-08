import React, { useState, useEffect } from 'react'
import axios from 'axios'
import SatelliteInfo from './SatelliteInfo'
import './NodeInfo.css'


const NodeInfo = ({ address }) => {
    const [ nodeStats, setNodeStats ] = useState(null)

    useEffect(() => {
        axios
            .get(`http://${address}/api/sno`)
            .then(response => {
                setNodeStats(response.data)                
            })
            .catch(error => {
                console.log(error)
            })

    }, [ address ]) // runs once at page load


    if (nodeStats) {
        return (
            <div className="node-info">
                <h1>Node: {address}</h1>
                <strong>Disk usage {(nodeStats.diskSpace.used / 1000000000).toFixed(2)} GB</strong>
                <h2>Satellites</h2>
                <ul>
                    { nodeStats.satellites.map( satellite => <SatelliteInfo key={satellite.id} satellite={Object.assign({}, satellite, {nodeAddress: address})} /> ) }
                </ul>
            </div>
        )
    } else {
        return (
            <div className="node-info">
                <h1>Loading...</h1>
            </div>
        )
    }
}

export default NodeInfo