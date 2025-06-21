# FlowNinjas Web - Frontend Application

A modern React-based frontend for the FlowNinjas workflow builder application, featuring a visual drag-and-drop interface for creating Google Cloud workflows.

## Features

- **Visual Workflow Builder**: Drag-and-drop interface using React Flow
- **Material Design UI**: Google Cloud Console-inspired design
- **Real-time Code Generation**: AI-powered workflow code generation
- **Template Library**: Pre-built workflow templates
- **Responsive Design**: Works on desktop and mobile devices
- **TypeScript Support**: Full type safety and IntelliSense

## Tech Stack

- **React 18** with TypeScript
- **Material-UI (MUI)** for components and theming
- **React Flow** for the visual workflow builder
- **React Router** for navigation
- **Yarn** for package management

## Project Structure

```
src/
├── components/
│   └── Layout/
│       └── Layout.tsx          # Main application layout
├── pages/
│   ├── Dashboard/
│   │   └── Dashboard.tsx       # Dashboard with workflow overview
│   ├── WorkflowBuilder/
│   │   └── WorkflowBuilder.tsx # Visual workflow builder
│   ├── Templates/
│   │   └── Templates.tsx       # Template library
│   └── Settings/
│       └── Settings.tsx        # Application settings
├── App.tsx                     # Main app component with routing
├── index.tsx                   # Application entry point
└── index.css                   # Global styles and workflow styling
```

## Getting Started

### Prerequisites

- Node.js 18 or higher
- Yarn package manager
- FlowNinjas Core backend running on port 8000

### Installation

1. **Install dependencies:**
   ```bash
   yarn install
   ```

2. **Start the development server:**
   ```bash
   yarn start
   ```

3. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Available Scripts

- `yarn start` - Start development server
- `yarn build` - Build for production
- `yarn test` - Run tests
- `yarn eject` - Eject from Create React App (not recommended)

## Components Overview

### Layout Component
- Responsive sidebar navigation
- Material-UI AppBar with branding
- Mobile-friendly drawer navigation

### Dashboard
- Workflow statistics and overview
- Recent workflows list
- Quick action buttons
- Status indicators for workflow states

### Workflow Builder
- Visual drag-and-drop canvas
- Node palette with Google Cloud services
- Real-time workflow validation
- Code generation and preview
- Node configuration dialogs

### Templates
- Searchable template library
- Category filtering
- Template preview and details
- One-click template import

### Settings
- Tabbed settings interface
- Google Cloud configuration
- API key management
- Notification preferences
- Advanced options

## Workflow Node Types

The application supports various Google Cloud workflow node types:

- **Start/End**: Workflow entry and exit points
- **Cloud Function**: Serverless function execution
- **Cloud Run**: Containerized service calls
- **HTTP Request**: External API integration
- **Pub/Sub**: Message queue operations
- **Condition**: Conditional logic branching
- **Delay**: Timed delays in execution
- **Parallel**: Concurrent execution paths

## Styling and Theming

The application uses Material-UI with a custom theme that matches Google Cloud Console:

- **Primary Color**: Google Blue (#1976d2)
- **Typography**: Roboto font family
- **Components**: Customized Material-UI components
- **Responsive**: Mobile-first design approach

### Custom CSS Classes

- `.workflow-canvas` - React Flow canvas styling
- `.node-*` - Individual node type styling
- `.sidebar` - Navigation sidebar styling
- `.toolbar` - Workflow builder toolbar

## API Integration

The frontend communicates with the FlowNinjas Core backend:

- **Base URL**: `http://localhost:8000`
- **Endpoints**:
  - `GET /api/v1/workflows/templates` - Fetch templates
  - `POST /api/v1/workflows/generate` - Generate workflow code
  - `POST /api/v1/workflows/validate` - Validate workflows
  - `POST /api/v1/workflows/save` - Save workflows

## Development Guidelines

### Code Style
- Use TypeScript for all components
- Follow React functional component patterns
- Use Material-UI components consistently
- Implement proper error handling

### State Management
- Use React hooks for local state
- Consider Context API for global state
- Implement proper loading states

### Testing
- Write unit tests for components
- Test user interactions
- Mock API calls in tests

## Building for Production

1. **Create production build:**
   ```bash
   yarn build
   ```

2. **Serve static files:**
   The build folder contains optimized static files ready for deployment.

3. **Deploy options:**
   - Static hosting (Netlify, Vercel)
   - Google Cloud Storage
   - Firebase Hosting
   - Traditional web servers

## Environment Variables

Create a `.env` file for environment-specific configuration:

```env
REACT_APP_API_URL=http://localhost:8000
REACT_APP_VERSION=1.0.0
```

## Troubleshooting

### Common Issues

1. **Module not found errors:**
   - Run `yarn install` to ensure all dependencies are installed
   - Check TypeScript configuration

2. **API connection issues:**
   - Verify backend is running on port 8000
   - Check CORS configuration in backend

3. **Build errors:**
   - Fix TypeScript errors
   - Ensure all imports are correct

### Performance Optimization

- Use React.memo for expensive components
- Implement code splitting with React.lazy
- Optimize bundle size with webpack-bundle-analyzer

## Contributing

1. Follow the existing code style
2. Write tests for new features
3. Update documentation
4. Submit pull requests with clear descriptions

## Future Enhancements

- [ ] Real-time collaboration
- [ ] Advanced workflow debugging
- [ ] Custom node types
- [ ] Workflow versioning
- [ ] Integration with more Google Cloud services
- [ ] Dark mode support
- [ ] Keyboard shortcuts
- [ ] Workflow execution monitoring

## License

This project is licensed under the MIT License - see the LICENSE file for details.
