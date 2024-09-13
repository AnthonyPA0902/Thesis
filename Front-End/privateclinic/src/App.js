import React from 'react';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import MainLayout from './layouts/MainLayout';
import AuthenticationLayout from './layouts/AuthenticationLayout';
import AdminAuthLayout from './layouts/AdminAuthLayout';

import { AuthRoutes, NormalRoutes, AdminAuthRoutes } from './routes/Routing';


function App() {
  return (
    <Router>
      <div className='App'>
        <Routes>

          {NormalRoutes.map((route, index) => {
            const Page = route.component;
            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <MainLayout>
                    <Page />
                  </MainLayout>
                }>
              </Route>
            )
          })}


          {AuthRoutes.map((route, index) => {
            const Page = route.component;
            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <AuthenticationLayout>
                    <Page />
                  </AuthenticationLayout>
                }>
              </Route>
            )
          })}

          
        {AdminAuthRoutes.map((route, index)=>{
          const Page = route.component;
          return (
            <Route
              key={index}
              path={route.path}
              element={
                <AdminAuthLayout>
                  <Page />
                </AdminAuthLayout>
              }>
            </Route>
          )
        })}


        </Routes>
      </div>
    </Router>
  );
};

export default App;
