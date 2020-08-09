import React, { useState, useEffect } from 'react'
import axios from 'axios'
import formatStorage from '../utility/formatStorage'
import './SatelliteInfo.css'

const VETTING_AUDITS_NEEDED = 100
const AUDIT_WARN_TRESHOLD = 0.95
const UPTIME_WARN_TRESHOLD = 0.95

const SatelliteInfo = ({ satellite }) => {
    const [ satelliteStats, setSatelliteStats ] = useState(null)
    const [ error, setError ] = useState(null)

    useEffect(() => {
        axios
            .get(`http://${satellite.nodeAddress}/api/sno/satellite/${satellite.id}`)
            .then(response => {
                setSatelliteStats(response.data)                
            })
            .catch(error => {
                console.log(error)
                setError(error)
            })

    }, [ satellite ]) // runs once at page load

    if (error) {
        return (
            <div className="satellite-info status-error">
                <h2>{satellite.url}</h2>
                <h2>Error fetching satellite info: {error.message}</h2>
            </div>
        )
    }

    if (satelliteStats){
        let statusClass = ""
        if (satellite.disqualified){ statusClass="status-critical" }
        else if (satellite.suspended){ statusClass="status-error" }
        else if (satelliteStats.audit.successCount / satelliteStats.audit.totalCount <= AUDIT_WARN_TRESHOLD){ statusClass="status-warning" }
        else if (satelliteStats.uptime.successCount / satelliteStats.uptime.totalCount <= UPTIME_WARN_TRESHOLD){ statusClass="status-warning" }
        else if (satelliteStats.audit.successCount < VETTING_AUDITS_NEEDED){ statusClass="status-vetting-in-progress" }
        else { statusClass="status-normal" }
    
        return (
            <div className={`satellite-info ${statusClass}`}>
                <h2>{satellite.url}</h2>
                <table>
                    <tbody>
                        <tr>
                            <th>Storage this month</th>
                            <td>{formatStorage(satelliteStats.storageSummary, 2)} * h</td>
                        </tr>
                        <tr>
                            <th>Audit score</th>
                            <td>{(satelliteStats.audit.successCount / satelliteStats.audit.totalCount * 100).toFixed(1)} %</td>
                        </tr>
                        <tr>
                            <th>Suspension score</th>
                            <td>{(satelliteStats.uptime.successCount / satelliteStats.uptime.totalCount * 100).toFixed(1)} %</td>
                        </tr>
                        {satelliteStats.audit.successCount >= VETTING_AUDITS_NEEDED 
                            ? <tr>
                                <th>Vetting</th>
                                <td>100 % complete</td> 
                            </tr>
                            : <tr>
                                <th>Vetting</th>
                                <td>{(satelliteStats.audit.successCount / VETTING_AUDITS_NEEDED * 100).toFixed()} % complete</td>
                            </tr>}
                    </tbody>
                </table>
            </div>
        )
    } else {
        return (<div>Loading...</div>)
    }
}

export default SatelliteInfo