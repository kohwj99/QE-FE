import { Box, Tabs, Tab } from '@mui/material';
import { useState } from 'react';
import { QueryBuilderPage } from './QueryBuilderPage';
import { QueryLoaderPage } from './QueryLoaderPage';

export const QueryWorkspace = () => {
  const [currentTab, setCurrentTab] = useState(0);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={currentTab} onChange={handleTabChange}>
          <Tab label="Query Builder" />
          <Tab label="Load Query" />
        </Tabs>
      </Box>
      <Box sx={{ mt: 2 }}>
        {currentTab === 0 && <QueryBuilderPage />}
        {currentTab === 1 && <QueryLoaderPage />}
      </Box>
    </Box>
  );
};