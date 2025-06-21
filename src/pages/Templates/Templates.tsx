import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  CardActions,
  Grid,
  Typography,
  Button,
  Chip,
  TextField,
  InputAdornment,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import {
  Search as SearchIcon,
  Visibility as ViewIcon,
  GetApp as UseIcon,
  Functions as FunctionIcon,
  Http as HttpIcon,
  Storage as StorageIcon,
  Schedule as ScheduleIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

interface Template {
  id: string;
  name: string;
  description: string;
  category: string;
  tags: string[];
  complexity: 'Simple' | 'Medium' | 'Advanced';
  estimatedTime: string;
  icon: React.ReactNode;
}

const templates: Template[] = [
  {
    id: '1',
    name: 'HTTP API Processing',
    description: 'Fetch data from REST API, process it, and store results',
    category: 'Data Processing',
    tags: ['HTTP', 'API', 'Processing'],
    complexity: 'Simple',
    estimatedTime: '5 min',
    icon: <HttpIcon />,
  },
  {
    id: '2',
    name: 'Scheduled Data Backup',
    description: 'Automated daily backup of data to Cloud Storage',
    category: 'Automation',
    tags: ['Schedule', 'Backup', 'Storage'],
    complexity: 'Medium',
    estimatedTime: '10 min',
    icon: <ScheduleIcon />,
  },
  {
    id: '3',
    name: 'Event-Driven Processing',
    description: 'Process files uploaded to Cloud Storage using Pub/Sub',
    category: 'Event Processing',
    tags: ['Pub/Sub', 'Storage', 'Events'],
    complexity: 'Medium',
    estimatedTime: '15 min',
    icon: <StorageIcon />,
  },
  {
    id: '4',
    name: 'Microservice Orchestration',
    description: 'Coordinate multiple Cloud Run services with error handling',
    category: 'Orchestration',
    tags: ['Cloud Run', 'Microservices', 'Error Handling'],
    complexity: 'Advanced',
    estimatedTime: '20 min',
    icon: <FunctionIcon />,
  },
  {
    id: '5',
    name: 'Data Pipeline',
    description: 'ETL pipeline with data validation and transformation',
    category: 'Data Processing',
    tags: ['ETL', 'Validation', 'Transform'],
    complexity: 'Advanced',
    estimatedTime: '25 min',
    icon: <StorageIcon />,
  },
  {
    id: '6',
    name: 'Notification System',
    description: 'Multi-channel notification system with fallback options',
    category: 'Communication',
    tags: ['Notifications', 'Email', 'SMS'],
    complexity: 'Medium',
    estimatedTime: '12 min',
    icon: <HttpIcon />,
  },
];

const Templates: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [previewOpen, setPreviewOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const navigate = useNavigate();

  const categories = ['All', ...Array.from(new Set(templates.map(t => t.category)))];

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'All' || template.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case 'Simple':
        return 'success';
      case 'Medium':
        return 'warning';
      case 'Advanced':
        return 'error';
      default:
        return 'default';
    }
  };

  const handlePreview = (template: Template) => {
    setSelectedTemplate(template);
    setPreviewOpen(true);
  };

  const handleUseTemplate = (template: Template) => {
    // Navigate to workflow builder with template
    navigate(`/builder?template=${template.id}`);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" component="h1" sx={{ mb: 4 }}>
        Workflow Templates
      </Typography>

      {/* Search and Filter */}
      <Box sx={{ mb: 4, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
        <TextField
          placeholder="Search templates..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          sx={{ minWidth: 300 }}
        />
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          {categories.map((category) => (
            <Chip
              key={category}
              label={category}
              onClick={() => setSelectedCategory(category)}
              color={selectedCategory === category ? 'primary' : 'default'}
              variant={selectedCategory === category ? 'filled' : 'outlined'}
            />
          ))}
        </Box>
      </Box>

      {/* Templates Grid */}
      <Grid container spacing={3}>
        {filteredTemplates.map((template) => (
          <Grid item xs={12} sm={6} md={4} key={template.id}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardContent sx={{ flexGrow: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Box sx={{ mr: 2, color: 'primary.main' }}>
                    {template.icon}
                  </Box>
                  <Typography variant="h6" component="h2">
                    {template.name}
                  </Typography>
                </Box>
                
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  {template.description}
                </Typography>

                <Box sx={{ mb: 2 }}>
                  <Chip
                    label={template.complexity}
                    color={getComplexityColor(template.complexity) as any}
                    size="small"
                    sx={{ mr: 1 }}
                  />
                  <Chip
                    label={template.estimatedTime}
                    variant="outlined"
                    size="small"
                  />
                </Box>

                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {template.tags.map((tag) => (
                    <Chip
                      key={tag}
                      label={tag}
                      size="small"
                      variant="outlined"
                      color="primary"
                    />
                  ))}
                </Box>
              </CardContent>

              <CardActions>
                <Button
                  size="small"
                  startIcon={<ViewIcon />}
                  onClick={() => handlePreview(template)}
                >
                  Preview
                </Button>
                <Button
                  size="small"
                  startIcon={<UseIcon />}
                  variant="contained"
                  onClick={() => handleUseTemplate(template)}
                >
                  Use Template
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {filteredTemplates.length === 0 && (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h6" color="text.secondary">
            No templates found matching your criteria
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Try adjusting your search terms or category filter
          </Typography>
        </Box>
      )}

      {/* Template Preview Dialog */}
      <Dialog
        open={previewOpen}
        onClose={() => setPreviewOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          {selectedTemplate?.name}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <Typography variant="body1" sx={{ mb: 3 }}>
              {selectedTemplate?.description}
            </Typography>

            <Typography variant="h6" sx={{ mb: 2 }}>
              Template Details
            </Typography>
            
            <Grid container spacing={2} sx={{ mb: 3 }}>
              <Grid item xs={6}>
                <Typography variant="body2" color="text.secondary">
                  Category
                </Typography>
                <Typography variant="body1">
                  {selectedTemplate?.category}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2" color="text.secondary">
                  Complexity
                </Typography>
                <Chip
                  label={selectedTemplate?.complexity}
                  color={getComplexityColor(selectedTemplate?.complexity || '') as any}
                  size="small"
                />
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2" color="text.secondary">
                  Estimated Setup Time
                </Typography>
                <Typography variant="body1">
                  {selectedTemplate?.estimatedTime}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2" color="text.secondary">
                  Tags
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mt: 0.5 }}>
                  {selectedTemplate?.tags.map((tag) => (
                    <Chip
                      key={tag}
                      label={tag}
                      size="small"
                      variant="outlined"
                      color="primary"
                    />
                  ))}
                </Box>
              </Grid>
            </Grid>

            <Typography variant="h6" sx={{ mb: 2 }}>
              What's Included
            </Typography>
            <Typography variant="body2" color="text.secondary">
              This template includes pre-configured workflow nodes, connections, and sample configurations
              to help you get started quickly. You can customize all aspects after importing.
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setPreviewOpen(false)}>
            Close
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              setPreviewOpen(false);
              if (selectedTemplate) {
                handleUseTemplate(selectedTemplate);
              }
            }}
          >
            Use This Template
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Templates;
