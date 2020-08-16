import React, { useState, useEffect } from 'react'
import axios from 'axios'
import SatelliteInfo from './SatelliteInfo'
import formatStorage from '../utility/formatStorage'
import './NodeInfo.css'


const NodeInfo = ({ address }) => {
    const [ nodeStats, setNodeStats ] = useState(null)
    const [ error, setError ] = useState(null)
    const [ satellitesVisible, setSatellitesVisible ] = useState(true)

    useEffect(() => {
        axios
            .get(`http://${address}/api/sno`)
            .then(response => {
                setNodeStats(response.data)                
            })
            .catch(error => {
                console.log(error)
                setError(error)
            })

    }, [ address ]) // runs once at page load


    if (error) {
        return (
            <div className="node-info">
                <h1>Node: {address}</h1>
                <h2>Error fetching node info: {error.message}</h2>
            </div>
        )
    }
    if (nodeStats) {
        return (
            <div className="node-info">
                <h1>Node: {address}</h1>
                <strong>Disk usage {formatStorage(nodeStats.diskSpace.used, 2)} / {formatStorage(nodeStats.diskSpace.available, 2)} ({(nodeStats.diskSpace.used / nodeStats.diskSpace.available * 100).toFixed()} %)</strong>
                <h2>Satellites <button onClick={ () => { setSatellitesVisible(!satellitesVisible) } }>{ satellitesVisible ? "Hide" : "Show" }</button> </h2>
                { satellitesVisible ? 
                    <div className="satellite-stats">
                        <ul>
                            { nodeStats.satellites.map( satellite => <SatelliteInfo key={satellite.id} satellite={Object.assign({}, satellite, {nodeAddress: address})} /> ) }
                        </ul>
                    </div>
                    :
                    <div className="satellite-stats">
                        
                    </div>
                }
                
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