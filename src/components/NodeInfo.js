import React, { useState, useEffect } from 'react'
import axios from 'axios'


const NodeInfo = ({ address }) => {
    const [ nodeStats, setNodeStats ] = useState(null)
    const [ satelliteStats, setSatelliteStats ] = useState([])

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
        // pull satellite stats
        let missingSatelliteStats = nodeStats.satellites.filter(satellite => {
            let found = satelliteStats.find(satelliteInStats => satelliteInStats.id === satellite.id)
            console.log('found? ' + found)
            if (!found) { return true }
            else { return false }
        })

        /*
        console.log(`missing satellite stats:`)
        console.log(missingSatelliteStats)
        console.log(`fetched satellite stats:`)
        console.log(satelliteStats)
        */
        
        if (missingSatelliteStats.length > 0) {
            axios
                .get(`http://${address}/api/sno/satellite/${missingSatelliteStats[0].id}`)
                .then(satelliteResponse => {
                    console.log(satelliteResponse.data)
                    setSatelliteStats(satelliteStats.concat(satelliteResponse.data))
                })
                .catch(satelliteError => console.log(satelliteError))

        }

    }


    if (nodeStats) {
        return (
        <div className="node-info">
            <h1>Node info for {address}</h1>
            <p>{nodeStats.diskSpace.used}</p>
            <h2>Satellites</h2>
            <ul>
                { satelliteStats.map( satellite => <li>{ satellite.id }</li> ) }
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