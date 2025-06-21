import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Box } from '@mui/material';
import Layout from './components/Layout/Layout';
import WorkflowBuilder from './pages/WorkflowBuilder/WorkflowBuilder';
import Dashboard from './pages/Dashboard/Dashboard';
import Templates from './pages/Templates/Templates';
import Settings from './pages/Settings/Settings';

function App() {
  return (
    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/builder" element={<WorkflowBuilder />} />
          <Route path="/builder/:workflowId" element={<WorkflowBuilder />} />
          <Route path="/templates" element={<Templates />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </Layout>
    </Box>
  );
}

export default App;
