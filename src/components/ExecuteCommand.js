import React,{useState,useEffect} from "react";
import {getDevicesWithApplications} from "../utility/api-endpoints"

function ExecuteCommand() {



 const [devices,setDevices] = useState(null)
 const [applications,setApplications] = useState(null)

 const [selectedDevice,setSelectedDevice] = useState(null)
 const [selectedApplication,setSelectedApplication] = useState(null)


 const handleDeviceChange = (deviceId) => {

    deviceId > 0 ?
    setApplications(devices.find(el => el.Id == deviceId).applications) :
    setApplications([])

    setSelectedDevice(deviceId)
 }

 const handleApplicationChange = (applicationId) => {

    setSelectedApplication(applicationId)
 }

 const handleRunApplication = () => {
     console.log(selectedDevice,selectedApplication)
 }

 useEffect(()=>{

    getDevicesWithApplications()
    .then(res => {
        setDevices(res.data.devices)
    })
    .catch(err => {
        console.log(err)
    })


 },[])

  return (
    <div>
        <select onChange={(e) => handleDeviceChange(e.target.value)}>
            <option key={0} value={0}>Select device</option>

            { devices && devices.map((el,i)=> <option key={i} value={el.Id}>{el.Name}</option>) }

        </select>

        <select onChange={(e) => handleApplicationChange(e.target.value)}>
            <option key={0} value={0}>Select device</option>

            { applications && applications.map((el,i)=> <option key={i} value={el.Id} >{el.Name}</option>) }
        </select>

        <button onClick={handleRunApplication}>Run application</button>
    </div>
  );
}

export default ExecuteCommand;
