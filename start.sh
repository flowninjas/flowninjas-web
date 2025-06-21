#!/bin/bash

# FlowNinjas Web Frontend Startup Script

echo "🚀 Starting FlowNinjas Web Frontend..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18 or higher."
    exit 1
fi

# Check if Yarn is installed
if ! command -v yarn &> /dev/null; then
    echo "❌ Yarn is not installed. Installing Yarn..."
    npm install -g yarn
fi

# Check if dependencies are installed
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    yarn install
fi

# Check if backend is running
echo "🔍 Checking if backend is running on port 8000..."
if ! curl -s http://localhost:8000/health > /dev/null; then
    echo "⚠️  Backend is not running on port 8000"
    echo "   Please start the FlowNinjas Core backend first:"
    echo "   cd ../flowninjas-core && ./scripts/start.sh"
    echo ""
    echo "   Continuing with frontend startup..."
fi

# Start the development server
echo "🌐 Starting React development server..."
echo "   Frontend will be available at: http://localhost:3000"
echo "   Backend should be running at: http://localhost:8000"
echo ""

yarn start
