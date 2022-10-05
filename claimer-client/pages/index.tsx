import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Link from 'next/link';
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

const getUsers = async () => await axios.get('/api/users');
const StarterPage = (props) => {
  const { data: { data: usersList = [] } = {}, isLoading } = useQuery(
    ['users'],
    getUsers,
    { enabled: Boolean(props.isLogin) }
  );
  if(!props.isLogin) return <>please login</>
  if (isLoading) return <div>loading...</div>;
  return (
    <>
      <Table>
        <thead>
          <tr>
            <th>Email</th>
            <th>Designation</th>
            <th>Privilege</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {usersList.map((user) => {
            return (
              <tr key={user.id}>
                <td>{user.email}</td>
                <td>{user.privilege}</td>
                <td>{user.designation}</td>
                <td>
                  <Link
                    href={`/devices/user/[userId]`}
                    as={`/devices/user/${user.id}`}
                  >
                    <a>View claimed devices</a>
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
};

export default StarterPage;
