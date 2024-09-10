import React from 'react';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import MainLayout from './layouts/MainLayout';

import {NormalRoutes} from './routes/Routing';


function App() {
  return (
    <Router>
    <div className='App'>
      <Routes>

        {NormalRoutes.map((route, index)=>{
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

      </Routes>
    </div>
  </Router>
  );
};

export default App;
