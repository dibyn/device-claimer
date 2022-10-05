import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import Router from 'next/router';
import React, { useState } from 'react';

type Props = {};
const createUsers = async (data) => await axios.post('/api/users/signup', data);
const CreateUser = (props: Props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [privilege, setPrivilege] = useState('admin');
  const [designation, setDesignation] = useState('');
  const queryClient = useQueryClient()
  const { mutate, isLoading } = useMutation(createUsers, {
    onSuccess(data, variables, context) {
      console.log('success --->', data, variables, context);
      Router.push('/')
    },
    onError(error, variables, context) {
      console.log('error --->', error, variables, context);
    },
    onSettled(data, error, variables, context) {
      queryClient.invalidateQueries(['users'])
      console.log('settled --->', data, error, variables, context);
    },
  });
  const onFormSubmit = (e: any) => {
    e.preventDefault();
    mutate({
      email,
      password,
      privilege,
      designation,
    });
  };
  if(isLoading) return <>loading...</>
  return (
    <>
      <form action="signup" onSubmit={onFormSubmit}>
        <div>
          <label htmlFor="email">Email address</label>
          <input onChange={(e) => setEmail(e.target.value)} type="email" />
        </div>
        <div>
          <label htmlFor="designation">Designation</label>
          <input onChange={(e) => setDesignation(e.target.value)} type="text" />
        </div>
        <div>
          <label htmlFor="Privilege">Privilege</label>
          <select
            onChange={(e) => setPrivilege(e.target.value)}
            name="designation"
            id="designation"
          >
            <option value="admin">Admin</option>
            <option value="employee">Employee</option>
          </select>
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </>
  );
};
export default CreateUser;
