import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './SatelliteInfo.css'

const VETTING_AUDITS_NEEDED = 100

const SatelliteInfo = ({ satellite }) => {
    const [ satelliteStats, setSatelliteStats ] = useState(null)

    useEffect(() => {
        console.log("in SatelliteInfo effect")

        axios
            .get(`http://${satellite.nodeAddress}/api/sno/satellite/${satellite.id}`)
            .then(response => {
                console.log(response.data)
                setSatelliteStats(response.data)                
            })
            .catch(error => {
                console.log(error)
            })

    }, [ satellite ]) // runs once at page load

    if (satelliteStats){
    
        return (
            <div className="satellite-info">
                <h2>Info for satellite {satellite.url}</h2>
                <ul>
                    <li>Disqualified: { satellite.disqualified ? "YES!" : "no" }</li>
                    <li>Suspended: {satellite.suspended ? "YES!" : "no" }</li>
                    <li>Successful audits: {satelliteStats.audit.successCount} ({satelliteStats.audit.successCount / satelliteStats.audit.totalCount * 100} %)</li>
                    <li>{satelliteStats.audit.successCount >= VETTING_AUDITS_NEEDED ? "Vetting complete!" : `Vetting in progress, ${satelliteStats.audit.successCount / VETTING_AUDITS_NEEDED * 100} % complete`}</li>
                </ul>
            </div>
        )
    } else {
        return (<div>Loading...</div>)
    }
}

export default SatelliteInfo