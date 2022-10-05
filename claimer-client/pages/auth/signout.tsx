import React from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import Router from 'next/router';

const signOutUser = async () =>
  await axios.get('/api/users/signout', { withCredentials: true });
const SignOut = () => {
  const query = useQueryClient();
  useQuery(['signout-user'], signOutUser, {
    onSuccess: async () => {
      Router.push('/');
    },
  });
  return <div>Signing you out...</div>;
};

export default SignOut;
