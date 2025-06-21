import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  TextField,
  Button,
  Switch,
  FormControlLabel,
  Divider,
  Alert,
  Tab,
  Tabs,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
} from '@mui/material';
import {
  Save as SaveIcon,
  Refresh as RefreshIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
  CloudQueue as CloudIcon,
  Security as SecurityIcon,
  Notifications as NotificationsIcon,
  Storage as StorageIcon,
} from '@mui/icons-material';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`settings-tabpanel-${index}`}
      aria-labelledby={`settings-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const Settings: React.FC = () => {
  const [tabValue, setTabValue] = useState(0);
  const [settings, setSettings] = useState({
    // General Settings
    projectId: 'my-gcp-project',
    region: 'us-central1',
    outputDirectory: '/home/user/workflows',
    
    // API Settings
    geminiApiKey: '',
    enableAI: true,
    
    // Notification Settings
    emailNotifications: true,
    slackWebhook: '',
    
    // Advanced Settings
    autoSave: true,
    debugMode: false,
    maxRetries: 3,
  });

  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleSettingChange = (key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSave = async () => {
    setSaveStatus('saving');
    try {
      // TODO: Implement API call to save settings
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSaveStatus('saved');
      setTimeout(() => setSaveStatus('idle'), 3000);
    } catch (error) {
      setSaveStatus('error');
      setTimeout(() => setSaveStatus('idle'), 3000);
    }
  };

  const handleTestConnection = async () => {
    // TODO: Implement connection test
    console.log('Testing connection...');
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" component="h1" sx={{ mb: 4 }}>
        Settings
      </Typography>

      <Paper sx={{ width: '100%' }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          aria-label="settings tabs"
          sx={{ borderBottom: 1, borderColor: 'divider' }}
        >
          <Tab icon={<CloudIcon />} label="General" />
          <Tab icon={<SecurityIcon />} label="API & Security" />
          <Tab icon={<NotificationsIcon />} label="Notifications" />
          <Tab icon={<StorageIcon />} label="Advanced" />
        </Tabs>

        {/* General Settings */}
        <TabPanel value={tabValue} index={0}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Google Cloud Configuration
                  </Typography>
                  <TextField
                    fullWidth
                    label="Project ID"
                    value={settings.projectId}
                    onChange={(e) => handleSettingChange('projectId', e.target.value)}
                    sx={{ mb: 2 }}
                    helperText="Your Google Cloud Project ID"
                  />
                  <TextField
                    fullWidth
                    label="Default Region"
                    value={settings.region}
                    onChange={(e) => handleSettingChange('region', e.target.value)}
                    sx={{ mb: 2 }}
                    helperText="Default region for deploying resources"
                  />
                  <Button
                    variant="outlined"
                    startIcon={<RefreshIcon />}
                    onClick={handleTestConnection}
                  >
                    Test Connection
                  </Button>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Local Configuration
                  </Typography>
                  <TextField
                    fullWidth
                    label="Output Directory"
                    value={settings.outputDirectory}
                    onChange={(e) => handleSettingChange('outputDirectory', e.target.value)}
                    sx={{ mb: 2 }}
                    helperText="Directory where generated files will be saved"
                  />
                  <FormControlLabel
                    control={
                      <Switch
                        checked={settings.autoSave}
                        onChange={(e) => handleSettingChange('autoSave', e.target.checked)}
                      />
                    }
                    label="Auto-save workflows"
                  />
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </TabPanel>

        {/* API & Security Settings */}
        <TabPanel value={tabValue} index={1}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    AI Configuration
                  </Typography>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={settings.enableAI}
                        onChange={(e) => handleSettingChange('enableAI', e.target.checked)}
                      />
                    }
                    label="Enable AI-powered code generation"
                    sx={{ mb: 2 }}
                  />
                  <TextField
                    fullWidth
                    label="Gemini API Key"
                    type="password"
                    value={settings.geminiApiKey}
                    onChange={(e) => handleSettingChange('geminiApiKey', e.target.value)}
                    sx={{ mb: 2 }}
                    helperText="Your Google Gemini API key for AI features"
                    disabled={!settings.enableAI}
                  />
                  <Alert severity="info">
                    Your API keys are stored locally and never transmitted to our servers.
                  </Alert>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Service Account
                  </Typography>
                  <TextField
                    fullWidth
                    label="Service Account Key Path"
                    sx={{ mb: 2 }}
                    helperText="Path to your Google Cloud service account JSON file"
                  />
                  <Button variant="outlined" component="label">
                    Upload Service Account Key
                    <input type="file" hidden accept=".json" />
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </TabPanel>

        {/* Notifications Settings */}
        <TabPanel value={tabValue} index={2}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Email Notifications
                  </Typography>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={settings.emailNotifications}
                        onChange={(e) => handleSettingChange('emailNotifications', e.target.checked)}
                      />
                    }
                    label="Enable email notifications"
                    sx={{ mb: 2 }}
                  />
                  <TextField
                    fullWidth
                    label="Email Address"
                    type="email"
                    sx={{ mb: 2 }}
                    disabled={!settings.emailNotifications}
                  />
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Slack Integration
                  </Typography>
                  <TextField
                    fullWidth
                    label="Slack Webhook URL"
                    value={settings.slackWebhook}
                    onChange={(e) => handleSettingChange('slackWebhook', e.target.value)}
                    sx={{ mb: 2 }}
                    helperText="Webhook URL for Slack notifications"
                  />
                  <Button variant="outlined">
                    Test Slack Connection
                  </Button>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Notification Events
                  </Typography>
                  <List>
                    <ListItem>
                      <ListItemText
                        primary="Workflow Completion"
                        secondary="Notify when workflows finish executing"
                      />
                      <ListItemSecondaryAction>
                        <Switch defaultChecked />
                      </ListItemSecondaryAction>
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary="Workflow Failures"
                        secondary="Notify when workflows fail"
                      />
                      <ListItemSecondaryAction>
                        <Switch defaultChecked />
                      </ListItemSecondaryAction>
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary="Deployment Status"
                        secondary="Notify about deployment progress"
                      />
                      <ListItemSecondaryAction>
                        <Switch />
                      </ListItemSecondaryAction>
                    </ListItem>
                  </List>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </TabPanel>

        {/* Advanced Settings */}
        <TabPanel value={tabValue} index={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Development Settings
                  </Typography>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={settings.debugMode}
                        onChange={(e) => handleSettingChange('debugMode', e.target.checked)}
                      />
                    }
                    label="Debug Mode"
                    sx={{ mb: 2 }}
                  />
                  <TextField
                    fullWidth
                    label="Max Retries"
                    type="number"
                    value={settings.maxRetries}
                    onChange={(e) => handleSettingChange('maxRetries', parseInt(e.target.value))}
                    sx={{ mb: 2 }}
                    helperText="Maximum number of retry attempts for failed operations"
                  />
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Cache & Storage
                  </Typography>
                  <Button
                    variant="outlined"
                    startIcon={<DeleteIcon />}
                    sx={{ mb: 2, mr: 2 }}
                  >
                    Clear Cache
                  </Button>
                  <Button
                    variant="outlined"
                    startIcon={<DeleteIcon />}
                    color="error"
                  >
                    Reset All Settings
                  </Button>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Export/Import Settings
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 2 }}>
                    <Button variant="outlined">
                      Export Settings
                    </Button>
                    <Button variant="outlined" component="label">
                      Import Settings
                      <input type="file" hidden accept=".json" />
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </TabPanel>
      </Paper>

      {/* Save Button */}
      <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
        {saveStatus === 'saved' && (
          <Alert severity="success">Settings saved successfully!</Alert>
        )}
        {saveStatus === 'error' && (
          <Alert severity="error">Failed to save settings. Please try again.</Alert>
        )}
        <Button
          variant="contained"
          startIcon={<SaveIcon />}
          onClick={handleSave}
          disabled={saveStatus === 'saving'}
        >
          {saveStatus === 'saving' ? 'Saving...' : 'Save Settings'}
        </Button>
      </Box>
    </Box>
  );
};

export default Settings;
