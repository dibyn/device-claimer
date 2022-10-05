import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import Link from 'next/link';

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
const UserDevices = () => {
  const {
    query: { userId },
  } = useRouter();
  const getDevices = async () => await axios.get(`/api/devices/user/${userId}`);
  const { data: { data: deviceList = [] } = {}, isLoading } = useQuery(
    ['devices'],
    getDevices
  );
  if (isLoading) return <div>loading...</div>;
  return (
    <>
      <Link
        href={`/create/user/[userId]/device`}
        as={`/create/user/${userId}/device`}
      >
        <a href=''>Assign device</a>
      </Link>
      <Table>
        <thead>
          <tr>
            <th>Device Name</th>
            <th>Device Description</th>
            <th>Device Claimed Date</th>
          </tr>
        </thead>
        <tbody>
          {deviceList.map((device) => {
            return (
              <tr key={device.deviceId}>
                <td>{device.deviceName}</td>
                <td>{device.deviceDescription}</td>
                <td>{device.deviceClaimedDate}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
};
export default UserDevices;
