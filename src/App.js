import React from 'react';

import Layout from './views/Layout';
import { AuthProvider } from './contexts/AuthContext'

//Global SCSS files
import './styles/normalize.scss'
import './styles/globals.scss'

/***********************************
 * 
 *  Adopted architecture : https://www.taniarascia.com/react-architecture-directory-structure/
 * 
 ***************************************/

/* Hooks 
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';
*/

function App() {

  return (
      <AuthProvider>
        <div className="App">
          <Layout />
        </div>
      </AuthProvider>
  );
}

export default App;
