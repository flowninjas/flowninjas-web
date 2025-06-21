import React, { useState, useCallback, useRef } from 'react';
import {
  Box,
  Paper,
  Toolbar,
  Button,
  IconButton,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Alert,
  CircularProgress,
} from '@mui/material';
import {
  Save as SaveIcon,
  PlayArrow as PlayIcon,
  Code as CodeIcon,
  Settings as SettingsIcon,
  Add as AddIcon,
  Functions as FunctionIcon,
  Http as HttpIcon,
  Schedule as ScheduleIcon,
  AccountTree as TreeIcon,
  CloudQueue as CloudIcon,
  Storage as StorageIcon,
} from '@mui/icons-material';
import ReactFlow, {
  Node,
  Edge,
  Connection,
  useNodesState,
  useEdgesState,
  addEdge,
  Controls,
  Background,
  MiniMap,
  ReactFlowProvider,
} from 'react-flow-renderer';

const nodeTypes = [
  { type: 'start', label: 'Start', icon: <PlayIcon />, color: '#4caf50' },
  { type: 'end', label: 'End', icon: <SaveIcon />, color: '#f44336' },
  { type: 'cloud-function', label: 'Cloud Function', icon: <FunctionIcon />, color: '#ff9800' },
  { type: 'cloud-run', label: 'Cloud Run', icon: <CloudIcon />, color: '#2196f3' },
  { type: 'http', label: 'HTTP Request', icon: <HttpIcon />, color: '#607d8b' },
  { type: 'pubsub', label: 'Pub/Sub', icon: <StorageIcon />, color: '#9c27b0' },
  { type: 'condition', label: 'Condition', icon: <TreeIcon />, color: '#ffeb3b' },
  { type: 'delay', label: 'Delay', icon: <ScheduleIcon />, color: '#795548' },
];

const initialNodes: Node[] = [
  {
    id: '1',
    type: 'input',
    data: { label: 'Start' },
    position: { x: 250, y: 25 },
    className: 'node-start',
  },
];

const initialEdges: Edge[] = [];

const WorkflowBuilder: React.FC = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [nodeConfigOpen, setNodeConfigOpen] = useState(false);
  const [codePreviewOpen, setCodePreviewOpen] = useState(false);
  const [generatedCode, setGeneratedCode] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [workflowName, setWorkflowName] = useState('My Workflow');
  const [workflowDescription, setWorkflowDescription] = useState('');
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const [reactFlowInstance, setReactFlowInstance] = useState<any>(null);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current?.getBoundingClientRect();
      const type = event.dataTransfer.getData('application/reactflow');

      if (typeof type === 'undefined' || !type || !reactFlowBounds) {
        return;
      }

      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });

      const newNode: Node = {
        id: `${Date.now()}`,
        type: 'default',
        position,
        data: { label: `${type} node` },
        className: `node-${type}`,
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance, setNodes]
  );

  const onDragStart = (event: React.DragEvent, nodeType: string) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  const onNodeClick = useCallback((event: React.MouseEvent, node: Node) => {
    setSelectedNode(node);
    setNodeConfigOpen(true);
  }, []);

  const handleSaveWorkflow = async () => {
    const workflowData = {
      name: workflowName,
      description: workflowDescription,
      nodes,
      edges,
    };
    
    console.log('Saving workflow:', workflowData);
    // TODO: Implement API call to save workflow
  };

  const handleGenerateCode = async () => {
    setIsGenerating(true);
    setCodePreviewOpen(true);
    
    try {
      // TODO: Implement API call to generate code
      const mockCode = `# Generated Google Cloud Workflow
main:
  steps:
    - start:
        call: http.get
        args:
          url: "https://api.example.com/data"
        result: api_response
    - process_data:
        call: process_function
        args:
          data: \${api_response.body}
        result: processed_data
    - end:
        return: \${processed_data}`;
      
      setTimeout(() => {
        setGeneratedCode(mockCode);
        setIsGenerating(false);
      }, 2000);
    } catch (error) {
      console.error('Error generating code:', error);
      setIsGenerating(false);
    }
  };

  const handleRunWorkflow = () => {
    console.log('Running workflow...');
    // TODO: Implement workflow execution
  };

  return (
    <Box sx={{ height: '100%', display: 'flex' }}>
      {/* Node Palette */}
      <Drawer
        variant="permanent"
        sx={{
          width: 280,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: 280,
            boxSizing: 'border-box',
            position: 'relative',
            height: '100%',
          },
        }}
      >
        <Box sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>
            Workflow Nodes
          </Typography>
          <List>
            {nodeTypes.map((nodeType) => (
              <ListItem
                key={nodeType.type}
                sx={{
                  border: '1px solid',
                  borderColor: 'divider',
                  borderRadius: 1,
                  mb: 1,
                  cursor: 'grab',
                  '&:hover': {
                    backgroundColor: 'action.hover',
                  },
                }}
                onDragStart={(event) => onDragStart(event, nodeType.type)}
                draggable
              >
                <ListItemIcon sx={{ color: nodeType.color }}>
                  {nodeType.icon}
                </ListItemIcon>
                <ListItemText primary={nodeType.label} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>

      {/* Main Canvas */}
      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Toolbar */}
        <Paper sx={{ borderRadius: 0 }}>
          <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              {workflowName}
            </Typography>
            <Button
              startIcon={<SaveIcon />}
              onClick={handleSaveWorkflow}
              sx={{ mr: 1 }}
            >
              Save
            </Button>
            <Button
              startIcon={<CodeIcon />}
              onClick={handleGenerateCode}
              sx={{ mr: 1 }}
            >
              Generate Code
            </Button>
            <Button
              startIcon={<PlayIcon />}
              onClick={handleRunWorkflow}
              variant="contained"
            >
              Run
            </Button>
          </Toolbar>
        </Paper>

        {/* React Flow Canvas */}
        <Box sx={{ flexGrow: 1 }} ref={reactFlowWrapper}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onInit={setReactFlowInstance}
            onDrop={onDrop}
            onDragOver={onDragOver}
            onNodeClick={onNodeClick}
            className="workflow-canvas"
            fitView
          >
            <Controls />
            <MiniMap />
            <Background gap={12} size={1} />
          </ReactFlow>
        </Box>
      </Box>

      {/* Node Configuration Dialog */}
      <Dialog
        open={nodeConfigOpen}
        onClose={() => setNodeConfigOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          Configure Node: {selectedNode?.data?.label}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <TextField
              fullWidth
              label="Node Name"
              value={selectedNode?.data?.label || ''}
              onChange={(e) => {
                if (selectedNode) {
                  setNodes((nds) =>
                    nds.map((node) =>
                      node.id === selectedNode.id
                        ? { ...node, data: { ...node.data, label: e.target.value } }
                        : node
                    )
                  );
                }
              }}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Description"
              multiline
              rows={3}
              sx={{ mb: 2 }}
            />
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Node Type</InputLabel>
              <Select value={selectedNode?.className?.replace('node-', '') || ''}>
                {nodeTypes.map((type) => (
                  <MenuItem key={type.type} value={type.type}>
                    {type.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setNodeConfigOpen(false)}>Cancel</Button>
          <Button onClick={() => setNodeConfigOpen(false)} variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Code Preview Dialog */}
      <Dialog
        open={codePreviewOpen}
        onClose={() => setCodePreviewOpen(false)}
        maxWidth="lg"
        fullWidth
      >
        <DialogTitle>Generated Workflow Code</DialogTitle>
        <DialogContent>
          {isGenerating ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
              <CircularProgress />
              <Typography sx={{ ml: 2 }}>Generating workflow code...</Typography>
            </Box>
          ) : (
            <Box sx={{ pt: 2 }}>
              <Alert severity="info" sx={{ mb: 2 }}>
                This code has been generated based on your workflow design. You can copy and deploy it to Google Cloud.
              </Alert>
              <Paper sx={{ p: 2, backgroundColor: '#f5f5f5' }}>
                <pre style={{ margin: 0, fontFamily: 'monospace', fontSize: '14px' }}>
                  {generatedCode}
                </pre>
              </Paper>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setCodePreviewOpen(false)}>Close</Button>
          <Button variant="contained" disabled={isGenerating}>
            Download
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

const WorkflowBuilderWrapper: React.FC = () => (
  <ReactFlowProvider>
    <WorkflowBuilder />
  </ReactFlowProvider>
);

export default WorkflowBuilderWrapper;
