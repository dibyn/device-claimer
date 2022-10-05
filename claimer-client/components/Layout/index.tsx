import React from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import Header from './Header';

const ComponentLayout = ({ Component, pageProps }) => {
  const suffixUrl = `/api/users/currentuser`;
  const url =
    typeof window === 'undefined'
      ? `http://ingress-nginx-controller.ingress-nginx.svc.cluster.local${suffixUrl}`
      : suffixUrl;
  const getCurrentUser = async () => await axios.get(url);
  const { data: { data: { currentUser } = {} } = {} } = useQuery(
    ['current-user'],
    getCurrentUser,
    {
      enabled: typeof pageProps.reqCookie !== 'undefined',
    }
  );
  return (
    <>
      <Header privilege={currentUser?.privilege} />
      <Component {...pageProps} isLogin={currentUser?.privilege} />
    </>
  );
};

export default ComponentLayout;
