import React from 'react';
import { AppContext, AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
// import ComponentLayout from '../components/Layout';
import dynamic from 'next/dynamic';

const ComponentLayout = dynamic(import('../components/Layout'), {
  loading: () => <>loading...</>,
  ssr: false
});

const queryClient = new QueryClient();
const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
`;

interface ThemeInterface {
  colors: {
    primary: string;
  };
}

const theme: ThemeInterface = {
  colors: {
    primary: '#0070f3',
  },
};
const App = (props) => (
  <>
    <GlobalStyle />
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <ComponentLayout {...props} />
      </QueryClientProvider>
    </ThemeProvider>
  </>
);
App.getInitialProps = async (appContext: AppContext) => {
  let pageProps = {};
  if (appContext.Component.getInitialProps)
    pageProps = await appContext.Component.getInitialProps(appContext.ctx);
  pageProps = { pageProps, reqCookie: appContext.ctx.req?.headers.cookie };
  return { pageProps };
};
export default App;
