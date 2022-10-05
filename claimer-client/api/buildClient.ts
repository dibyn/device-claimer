import axios from 'axios';
import { NextPageContext } from 'next';

const apiBuildClient = (ctx: NextPageContext) => {
  if (typeof window === 'undefined') {
    return axios.create({
      baseURL:
        'http://ingress-nginx-controller.ingress.nginx.svc.cluster.local',
      // @ts-ignore
      headers: ctx.req?.headers,
    });
  }
  return axios.create({
    baseURL: '',
  });
};
export default apiBuildClient;
