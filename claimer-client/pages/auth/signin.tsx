/* eslint-disable react-hooks/rules-of-hooks */
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import Router from 'next/router';
import React, { memo, FunctionComponent, useState } from 'react';

type Props = {};
const signin = async (data) =>
  axios.post('/api/users/signin', data, {
    withCredentials: true,
  });
const login: FunctionComponent = (props: Props) => {
  const [email, setEmail] = useState<String>('');
  const [password, setPassword] = useState<String>('');
  const { mutate, isLoading } = useMutation(signin, {
    onSuccess(data, variables, context) {
      Router.push('/');
    },
    onError(error, variables, context) {},
    onSettled(data, error, variables, context) {},
  });
  const onSubmitHandler = (e: any) => {
    e.preventDefault();
    mutate({
      email,
      password,
    });
  };
  if (isLoading) return <>loading...</>;
  return (
    <>
      <form action="sign-in" onSubmit={onSubmitHandler}>
        <div>
          <label htmlFor="email">Email Address</label>
          <input onChange={(e) => setEmail(e.target.value)} type="text" />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
          />
        </div>
        <button type="submit">Sign in</button>
      </form>
    </>
  );
};

export default memo(login);
