import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './SatelliteInfo.css'

const VETTING_AUDITS_NEEDED = 100
const AUDIT_WARN_TRESHOLD = 0.95
const UPTIME_WARN_TRESHOLD = 0.95

const SatelliteInfo = ({ satellite }) => {
    const [ satelliteStats, setSatelliteStats ] = useState(null)

    useEffect(() => {
        axios
            .get(`http://${satellite.nodeAddress}/api/sno/satellite/${satellite.id}`)
            .then(response => {
                setSatelliteStats(response.data)                
            })
            .catch(error => {
                console.log(error)
            })

    }, [ satellite ]) // runs once at page load

    if (satelliteStats){
        let statusClass = ""
        if (satellite.disqualified){ statusClass="status-disqualified" }
        else if (satellite.suspended){ statusClass="status-suspended" }
        else if (satelliteStats.audit.successCount / satelliteStats.audit.totalCount <= AUDIT_WARN_TRESHOLD){ statusClass="status-warning" }
        else if (satelliteStats.uptime.successCount / satelliteStats.uptime.totalCount <= UPTIME_WARN_TRESHOLD){ statusClass="status-warning" }
        else if (satelliteStats.audit.successCount < VETTING_AUDITS_NEEDED){ statusClass="status-vetting-in-progress" }
        else { statusClass="status-normal" }
    
        return (
            <div className={`satellite-info ${statusClass}`}>
                <h2>{satellite.url}</h2>
                <ul>
                    <li>Audit {(satelliteStats.audit.successCount / satelliteStats.audit.totalCount * 100).toFixed(1)} %</li>
                    <li>Uptime {(satelliteStats.uptime.successCount / satelliteStats.uptime.totalCount * 100).toFixed(1)} %</li>
                    {satelliteStats.audit.successCount >= VETTING_AUDITS_NEEDED ? "" : <li>Vetting {(satelliteStats.audit.successCount / VETTING_AUDITS_NEEDED * 100).toFixed()} % complete</li>}
                </ul>
            </div>
        )
    } else {
        return (<div>Loading...</div>)
    }
}

export default SatelliteInfo