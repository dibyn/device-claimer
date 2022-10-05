import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import styled from 'styled-components';

const Table = styled.table`
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
  td,
  th {
    border: 1px solid #eee;
    text-align: left;
    padding: 8px;
  }
  tr:nth-child(even) {
    background-color: #eee;
  }
`;
const getDevices = async () => await axios.get('/api/devices');
const Devices = () => {
  const { data: { data: deviceList = [] } = {}, isLoading } = useQuery(
    ['devices'],
    getDevices
  );
  if (isLoading) return <div>loading...</div>;
  return (
    <>
      <Table>
        <thead>
          <tr>
            <th>Device Name</th>
            <th>Device Description</th>
            <th>Device Claimed Date</th>
          </tr>
        </thead>
        <tbody>
          {deviceList.map((user) => (
            <tr key={user.deviceId}>
              <td>{user.deviceName}</td>
              <td>{user.deviceDescription}</td>
              <td>{user.deviceClaimedDate}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default Devices;
