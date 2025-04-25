# Incident Reporting System

A full-stack application for logging and managing safety incidents, built with the MERN stack.

## Features
- Create, view, and delete incident reports
- Severity level classification (Low, Medium, High)
- Modern, responsive UI with dark theme
- Real-time notifications
- Active navigation highlighting
- Loading states and error handling

## Tech Stack
- **Frontend**: React.js, Vite, Material-UI, React Router, Axios
- **Backend**: Node.js, Express.js, MongoDB, Mongoose
- **Deployment**: Vercel (Frontend), Render (Backend)

## Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn
- Git

## Local Development Setup

### Backend Setup
1. Navigate to the server directory:
   ```bash
   cd server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the server directory with:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/incident-reporting
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

### Frontend Setup
1. Navigate to the client directory:
   ```bash
   cd client
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the client directory with:
   ```
   VITE_API_URL=http://localhost:5000/api
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

## Deployment

### Backend Deployment (Render)
1. Create a Render account at https://render.com
2. Create a new Web Service
3. Connect your GitHub repository
4. Configure the service:
   - Name: incident-reporting-api
   - Environment: Node
   - Build Command: `npm install`
   - Start Command: `node server.js`
5. Add environment variables:
   - `PORT`: 5000
   - `MONGODB_URI`: Your MongoDB Atlas connection string
6. Deploy

### Frontend Deployment (Vercel)
1. Create a Vercel account at https://vercel.com
2. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```
3. In your client directory:
   ```bash
   vercel
   ```
4. Follow the prompts to complete deployment
5. Add environment variable in Vercel dashboard:
   - `VITE_API_URL`: Your Render backend URL

## API Endpoints

### GET /api/incidents
- Retrieves all incidents
- Response: Array of incident objects

### POST /api/incidents
- Creates a new incident
- Request body:
  ```json
  {
    "title": "string",
    "description": "string",
    "severity": "Low" | "Medium" | "High"
  }
  ```

### GET /api/incidents/:id
- Retrieves a specific incident by ID

### DELETE /api/incidents/:id
- Deletes a specific incident by ID

## Environment Variables

### Backend (.env)
```
PORT=5000
MONGODB_URI=your-mongodb-connection-string
```

### Frontend (.env)
```
VITE_API_URL=your-api-url
```

## Project Structure
```
.
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── App.jsx       # Main application component
│   │   └── main.jsx      # Entry point
│   └── package.json
├── server/                # Backend Express application
│   ├── models/           # Mongoose models
│   ├── routes/           # API routes
│   ├── server.js         # Main server file
│   └── package.json
└── README.md
```

## Contributing
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License
This project is licensed under the MIT License - see the LICENSE file for details.

## Sample Data
The database will be empty by default. You can add sample incidents using the POST endpoint.

Example incident:
```json
{
  "title": "AI Model Misclassification",
  "description": "The content moderation AI incorrectly flagged emergency helpline posts as inappropriate content.",
  "severity": "High"
}
``` 