import React, { useState, useEffect } from 'react'
import axios from 'axios'
import SatelliteInfo from './SatelliteInfo'


const NodeInfo = ({ address }) => {
    const [ nodeStats, setNodeStats ] = useState(null)

    useEffect(() => {
        console.log("in effect")

        axios
            .get(`http://${address}/api/sno`)
            .then(response => {
                console.log(response.data)
                setNodeStats(response.data)                
            })
            .catch(error => {
                console.log(error)
            })

    }, [ address ]) // runs once at page load


    if (nodeStats) {
        return (
        <div className="node-info">
            <h1>Node info for {address}</h1>
            <p>{nodeStats.diskSpace.used}</p>
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