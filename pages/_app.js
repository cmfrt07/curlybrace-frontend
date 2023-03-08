import '../styles/globals.css';
import Head from 'next/head';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Provider } from "react-redux";
import user from '../reducers/user';
import project from '../reducers/project';
import location from '../reducers/location';
import projectId from '../reducers/projectIdSender';
import profileIdSender from '../reducers/profileIdSender';
import search from '../reducers/search';
import { persistStore, persistReducer } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import storage from 'redux-persist/lib/storage';
import { combineReducers, configureStore } from '@reduxjs/toolkit';

const reducers = combineReducers({ user, project, location, projectId, profileIdSender, search});
const persistConfig = { key: 'curlyBrace', storage };


const store = configureStore({
  reducer: persistReducer(persistConfig, reducers),
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
});

const persistor = persistStore(store);

function App({ Component, pageProps }) {
  return (
    <>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <GoogleOAuthProvider clientId="574857713102-1nm4gnajv4l8p47nstkc198o62cbd7mv.apps.googleusercontent.com">
          <Head>
            <title>Next.js App</title>
          </Head>
          <Component {...pageProps} />
        </GoogleOAuthProvider>   
      </PersistGate>
    </Provider> 
    </>
    
  );
}

export default App;
