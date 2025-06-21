import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  Button,
  Chip,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Paper,
} from '@mui/material';
import {
  Add as AddIcon,
  PlayArrow as PlayIcon,
  Schedule as ScheduleIcon,
  CheckCircle as CheckIcon,
  Error as ErrorIcon,
  AccountTree as WorkflowIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  const stats = [
    { label: 'Total Workflows', value: 12, color: 'primary' },
    { label: 'Running', value: 3, color: 'success' },
    { label: 'Scheduled', value: 5, color: 'warning' },
    { label: 'Failed', value: 1, color: 'error' },
  ];

  const recentWorkflows = [
    {
      id: '1',
      name: 'Data Processing Pipeline',
      status: 'running',
      lastRun: '2 minutes ago',
      duration: '45s',
    },
    {
      id: '2',
      name: 'Email Notification Service',
      status: 'completed',
      lastRun: '1 hour ago',
      duration: '12s',
    },
    {
      id: '3',
      name: 'File Backup Workflow',
      status: 'scheduled',
      lastRun: '3 hours ago',
      duration: '2m 15s',
    },
    {
      id: '4',
      name: 'API Data Sync',
      status: 'failed',
      lastRun: '5 hours ago',
      duration: '1m 30s',
    },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'running':
        return <PlayIcon color="primary" />;
      case 'completed':
        return <CheckIcon color="success" />;
      case 'scheduled':
        return <ScheduleIcon color="warning" />;
      case 'failed':
        return <ErrorIcon color="error" />;
      default:
        return <WorkflowIcon />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'running':
        return 'primary';
      case 'completed':
        return 'success';
      case 'scheduled':
        return 'warning';
      case 'failed':
        return 'error';
      default:
        return 'default';
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4" component="h1">
          Dashboard
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => navigate('/builder')}
          size="large"
        >
          Create Workflow
        </Button>
      </Box>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {stats.map((stat) => (
          <Grid item xs={12} sm={6} md={3} key={stat.label}>
            <Card>
              <CardContent>
                <Typography color="textSecondary" gutterBottom variant="body2">
                  {stat.label}
                </Typography>
                <Typography variant="h4" component="div">
                  {stat.value}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3}>
        {/* Recent Workflows */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Recent Workflows
            </Typography>
            <List>
              {recentWorkflows.map((workflow) => (
                <ListItem
                  key={workflow.id}
                  sx={{
                    border: '1px solid',
                    borderColor: 'divider',
                    borderRadius: 1,
                    mb: 1,
                    cursor: 'pointer',
                    '&:hover': {
                      backgroundColor: 'action.hover',
                    },
                  }}
                  onClick={() => navigate(`/builder/${workflow.id}`)}
                >
                  <ListItemIcon>
                    {getStatusIcon(workflow.status)}
                  </ListItemIcon>
                  <ListItemText
                    primary={workflow.name}
                    secondary={`Last run: ${workflow.lastRun} • Duration: ${workflow.duration}`}
                  />
                  <Chip
                    label={workflow.status}
                    color={getStatusColor(workflow.status) as any}
                    size="small"
                    variant="outlined"
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>

        {/* Quick Actions */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Quick Actions
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Button
                variant="outlined"
                fullWidth
                startIcon={<AddIcon />}
                onClick={() => navigate('/builder')}
              >
                Create New Workflow
              </Button>
              <Button
                variant="outlined"
                fullWidth
                startIcon={<WorkflowIcon />}
                onClick={() => navigate('/templates')}
              >
                Browse Templates
              </Button>
              <Button
                variant="outlined"
                fullWidth
                onClick={() => navigate('/settings')}
              >
                Configure Settings
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
