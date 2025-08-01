

import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios'
import Papa from 'papaparse';
import './DashBoard.css'

function DashBoard() {

  axios.defaults.baseURL='http://localhost:4444';
  const location = useLocation();

  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const phoneNoRef = useRef();

  const [listOfAgents, setListOfAgents] = useState([]);
  const [taskList, setTaskList] = useState([]);
  const [distributedData, setDistributedData] = useState({});
  const [phone, setPhone] = useState('');

  const handleAddAgent = () => {
    const agent = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      phoneNo: phoneNoRef.current.value,
      password: passwordRef.current.value
    };

    if (!agent.name || !agent.email || !agent.phoneNo || !agent.password) {
      alert("Please fill all fields.");
      return;
    }

    setListOfAgents(prev => [...prev, agent]);

  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const allowedExtensions = ['csv', 'xlsx', 'xls'];
    const fileExtension = file.name.split('.').pop().toLowerCase();
    if (!allowedExtensions.includes(fileExtension)) {
      alert('Only CSV, XLS, and XLSX files are allowed.');
      return;
    }

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: function (results) {
        const validRows = results.data.filter(row =>
          row.FirstName && row.Phone && row.Notes
        );

        if (validRows.length === 0) {
          alert("Invalid or empty CSV format.");
          return;
        }

        setTaskList(validRows.map((row) => ({
          firstName: row.FirstName.trim(),
          phone: row.Phone.trim(),
          notes: row.Notes.trim()
        })));
      },
    });
  };

  const distributeTasksToAgents = () => {
    if (listOfAgents.length < 5) {
      alert("Add at least 5 agents before distributing tasks.");
      return;
    }

    const agents = [...listOfAgents.slice(0, 5)];
    const distribution = {};

    // Initialize
    agents.forEach((agent, index) => {
      distribution[agent.email || `Agent-${index + 1}`] = [];
    });

    // Distribute tasks
    taskList.forEach((task, idx) => {
      const agentIndex = idx % 5;
      const agentKey = agents[agentIndex].email || `Agent-${agentIndex + 1}`;
      distribution[agentKey].push(task);
    });

    setDistributedData(distribution);
    console.log("Distributed Tasks:", distribution);
  };

  const saveDistributedDataToDB = async () => {
  try {
    console.log('the distributed data in the client side is:',distributedData)
    await axios.post('/saveDistributedData', distributedData);
    alert("Distributed data saved to database.");
  } catch (error) {
    console.error("Error saving:", error);
    alert("Failed to save distributed data.");
  }
};

const fetchDistributedDataFromDB = async () => {
  try {
    const res = await axios.get('/fetchDistributedData');
    const newData = {};
    res.data.forEach(item => {
      newData[item.agentEmail] = item.tasks;
    });
    console.log('the fetchDistributedDataFromDB is :',newData)
    setDistributedData(newData);
  } catch (error) {
    console.error("Error fetching:", error);
  }
};


 //  Fetch distributed data from DB on component load
  // useEffect(() => {
  //   const fetchDistributedData = async () => {
  //     try {
  //       const res = await axios.get('/api/distribute/fetch');
  //       console.log('the fetchDistributedData on component loading is :',res.data)
  //       setDistributedData(res.data);
  //     } catch (err) {
  //       console.error('Error fetching distributed data:', err);
  //     }
  //   };

  //   fetchDistributedData();
  // }, []);


  return (
    <div className='App'>
      <h1>Dashboard</h1>
      <h3>{location.state?.message || "Welcome!"}</h3>

      {/* Agent Form */}
      <form>
        <fieldset>
          <legend>Add Agent</legend>
          <div>
            <label>Name</label>
            <input type='text' ref={nameRef} />
          </div>
          <div>
            <label>Email</label>
            <input type='email' ref={emailRef} />
          </div>
          <div>
            <label>Phone Number</label>
            <input
              ref={phoneNoRef}
              type="tel"
              name="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+91 98765 43210"
              pattern="^\+\d{1,3}\s?\d{10}$"
              required
            />
          </div>
          <div>
            <label>Password</label>
            <input type='text' ref={passwordRef} />
          </div>
          <div>
            <button type='button' onClick={handleAddAgent}>Add Agent</button>
          </div>
        </fieldset>
      </form>

      {/* Agent Table */}
      <table border="1" style={{ marginTop: '20px' }}>
        <caption>Agents Data</caption>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone No</th>
            <th>Password</th>
          </tr>
        </thead>
        <tbody>
          {listOfAgents.map((agent, i) => (
            <tr key={i}>
              <td>{agent.name}</td>
              <td>{agent.email}</td>
              <td>{agent.phoneNo}</td>
              <td>{agent.password}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* File Upload */}
      <div style={{ marginTop: '30px' }}>
        <h3>Upload CSV File (FirstName, Phone, Notes)</h3>
        <input type="file" accept=".csv, .xlsx, .xls" onChange={handleFileUpload} />
      </div>

      <button onClick={() => {
          distributeTasksToAgents();
          setTimeout(saveDistributedDataToDB, 300); // slight delay to ensure `distributedData` state updates
        }}>
          Distribute & Save
      </button>

      <button onClick={fetchDistributedDataFromDB}>
        Load Distributed Data from DB
      </button>

      {/* Display Tasks for Each Agent */}
      <h2>📦 Distributed Tasks to Agents</h2>
      <div className="distributed-tasks-container">
        {Object.entries(distributedData).map(([email, tasks]) => (
  <div key={email} className="agent-card">
    <h3>{email}</h3>
    <ul>
      {(Array.isArray(tasks) ? tasks : []).map((task, index) => (
        <li key={index}>
          <strong>{task.firstName}</strong> – {task.phone} <br />
          <em>{task.notes}</em>
        </li>
      ))}
    </ul>
  </div>
))}
      </div>

    </div>
  );
}

export default DashBoard;
