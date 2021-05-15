import React,{useState,useEffect} from "react";
import {getDevicesWithApplications,runCommand, uploadDist,getApplications} from "../utility/api-endpoints"

function ExecuteCommand() {



 const [devices,setDevices] = useState(null)
 const [applications,setApplications] = useState(null)

 const [selectedDevice,setSelectedDevice] = useState(null)
 const [selectedApplication,setSelectedApplication] = useState(null)
 const [selectedCommand,setSelectedCommand] = useState(null)

 const [selectedDist,setSelectedDist] = useState(null)

 const [selectedUsageType,setSelectedUsageType] = useState("COMMAND")

 const [commandResponse,setCommandResponse] = useState("")


 const handleDeviceChange = (deviceId) => {setSelectedDevice(deviceId)}

 const handleCommandChange = (commandName) => setSelectedCommand(commandName)

 const handleApplicationChange = (applicationId) => setSelectedApplication(applicationId)

 const handleDistChange = (dist) => setSelectedDist(dist)

 const handleUsageTypeChange = (usageType) => setSelectedUsageType(usageType)

 const handleRunApplication = () => {

    let body = {
        DeviceId : parseInt(selectedDevice),
        ApplicationId : parseInt(selectedApplication),
        CommandName : selectedCommand
    }

    setCommandResponse("")
    
    runCommand(JSON.stringify(body)).then(res => setCommandResponse(res.data)).catch(err => console.log(err));
 }

 const handleUploadDist = () => {
     let body = new FormData()

     body.append('dist',selectedDist);
     body.append('ApplicationId',selectedApplication);
     body.append('DeviceType',2);

     setCommandResponse("")

     uploadDist(body).then(res => setCommandResponse(res.data)).catch(err => console.log(err))
 }

 useEffect(()=>{

    getDevicesWithApplications()
    .then(res => {
        setDevices(res.data.Devices)
        setApplications(res.data.Applications)
    })
    .catch(err => {
        console.log(err)
    })

 },[])

  return (
      <div className="command-container">
          
        <div className="command-options">
                <div>
                    <input type="radio" name="usage-type" value="COMMAND" onChange={(e) => handleUsageTypeChange(e.target.value)} defaultChecked={true}/> Run Command
                    <input type="radio" name="usage-type" value="UPLOAD" onChange={(e) => handleUsageTypeChange(e.target.value)}/> Upload Dist
                </div>
                <select onChange={(e) => handleDeviceChange(e.target.value)} disabled={selectedUsageType !== "COMMAND"}>
                    <option key={0} value={0}>Select device</option>

                    { devices && devices.map((el,i)=> <option key={i} value={el.Id}>{el.Name}</option>) }

                </select>

                <select onChange={(e) => handleApplicationChange(e.target.value)} disabled={selectedUsageType !== "COMMAND"}>
                    <option key={0} value={0}>Select device</option>

                    { applications && applications.map((el,i)=> <option key={i} value={el.Id} >{el.Name}</option>) }
                </select>

                <select onChange={(e) => handleCommandChange(e.target.value)} disabled={selectedUsageType !== "COMMAND"}>
                    <option key={0} value={0}>Select device</option>

                    <option key={0} value={"execute"}>Run application with build</option>
                    <option key={1} value={"execute-without-build"}>Run application without build</option>
                </select>


                <button onClick={handleRunApplication} disabled={selectedUsageType !== "COMMAND"} >Run application</button>

                <div className="dist-upload">
                    <input type="file" name="file" onChange={(e) => handleDistChange(e.target.files[0])} disabled={selectedUsageType !== "UPLOAD"}/>

                    <select onChange={(e) => handleApplicationChange(e.target.value)} disabled={selectedUsageType !== "UPLOAD"}>
                        <option key={0} value={0}>Select application</option>

                            { applications && applications.map((el,i)=> <option key={i} value={el.Id} >{el.Name}</option>) }
                        </select>

                    <button onClick={handleUploadDist} disabled={selectedUsageType !== "UPLOAD"}>Upload dist</button>
                </div>
                
            </div>
            <div className="command-result">
                {commandResponse.Message}
            </div>
      </div>
    
    
  );
}

export default ExecuteCommand;
