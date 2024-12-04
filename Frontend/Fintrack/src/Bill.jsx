import React, { useContext, useState, useEffect } from 'react';
import './Bill.css';
import { UserContext } from './UserContext';
import { NotificationContext } from './NotificationContext';
import axios from 'axios';

const Bill = () => {
  const { username } = useContext(UserContext);
  const { notification, setNotification } = useContext(NotificationContext);
  const [isFormVisible, setFormVisible] = useState(false);
  const [bills, setBills] = useState([]);
  const [successMsg, setSuccessMsg] = useState('');
  const [error, setError] = useState('');
  const [billDetails, setBillDetails] = useState({
    billName: '',
    billDescription: '',
    billNotify: '',
    billDate: '',
    billAmount: '',
  });

  const toggleOverlay = () => {
    setFormVisible(!isFormVisible);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setBillDetails({ ...billDetails, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.post('http://localhost:9000/home/bill/add', {
      ...billDetails,
      username: username,
    });
    if (response.status === 200) {
      setSuccessMsg('Bill Added Successfully');
      setFormVisible(false);

      
      const billResponse = await axios.get(
        `http://localhost:9000/home/bill?username=${username}`
      );
      if (billResponse.status === 200) {
        setBills(billResponse.data);
        setError('');
        setSuccessMsg('Bill added successfully');
      }
      const notifyTime = new Date(billDetails.billNotify).getTime();
      const currentTime = new Date().getTime();
      const timeDifference = notifyTime - currentTime;

      if (timeDifference > 0) {
        setTimeout(() => {
          setNotification(`Bill: {billDetails.billName} is due!`);
        }, timeDifference);
      } else {
        setNotification('Notification time is in the past. Cannot set notification.');
      }
    } else {
      setError('Failed to add Bill');
    }
  };

  useEffect(() => {
    const fetchBills = async () => {
      const response = await axios.get(
        `http://localhost:9000/home/bill?username=${username}`
      );
      if (response.status === 200) {
        setBills(response.data);
      } else {
        setError('No Bills have been found');
      }
    };
    if (username) fetchBills();
  }, [username]);

  
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification(""); 
      }, 10000);

      return () => clearTimeout(timer); 
    }
  }, [notification, setNotification]);

  return (
    <React.Fragment>
      <div className="bill-container">
        <h1>Upcoming Bills</h1>
        {isFormVisible && (
          <div className="overlay">
            <div className="overlay-content">
              <div>
                <h1>Add Bills</h1>
                <button onClick={toggleOverlay}>X</button>
              </div>
              <form onSubmit={handleSubmit}>
                <label htmlFor="billName">Enter bill name:</label>
                <input
                  type="text"
                  value={billDetails.billName}
                  name="billName"
                  onChange={handleInputChange}
                  placeholder="Bill Name"
                  required
                />
                <label htmlFor="billDescription">Enter bill description:</label>
                <input
                  type="text"
                  name="billDescription"
                  value={billDetails.billDescription}
                  onChange={handleInputChange}
                  placeholder="Bill Description"
                  required
                />
                <label htmlFor="billNotify">
                  Enter date and time for Notification:
                </label>
                <input
                  type="datetime-local"
                  name="billNotify"
                  value={billDetails.billNotify}
                  onChange={handleInputChange}
                  placeholder="Notification Time"
                  required
                />
                <label htmlFor="billDate">Enter bill date:</label>
                <input
                  type="date"
                  name="billDate"
                  value={billDetails.billDate}
                  onChange={handleInputChange}
                  placeholder="Bill Date"
                  required
                />
                <label htmlFor="billAmount">Enter bill amount:</label>
                <input
                  type="number"
                  name="billAmount"
                  value={billDetails.billAmount}
                  onChange={handleInputChange}
                  placeholder="Bill Amount"
                  required
                />
                <button type="submit">Add Bill</button>
              </form>
            </div>
          </div>
        )}
        <table>
          <thead>
            <tr>
              <td>Bill Name</td>
              <td>Bill Description</td>
              <td>Notify Time</td>
              <td>Due Date</td>
              <td>Amount</td>
            </tr>
          </thead>
          <tbody>
            {bills.length > 0 ? (
              bills.map((bill, index) => (
                <tr key={index}>
                  <td>{bill.billName}</td>
                  <td>{bill.billDescription}</td>
                  <td>{bill.billNotify}</td>
                  <td>{bill.billDate}</td>
                  <td>{bill.billAmount}</td>
                </tr>
              ))
            ) : (
              <tr>
                <p className="result">No bills added</p>
              </tr>
            )}
          </tbody>
        </table>
        <button className="add-btn" onClick={toggleOverlay}>
          Add Bill
        </button>
      </div>

            {notification && 
        <div 
          className="notification-popup" 
          style={{
            color: 'red',
            fontSize: '21px',
            fontWeight: '600',
            paddingLeft: '100px'
          }}
        >
          {notification}
        </div>
      }
    </React.Fragment>
  );
};

export default Bill;
