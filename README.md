# Bug Tracker Application

A full-stack bug tracking and management system built with React, Express.js, and MongoDB. This application helps teams track, manage, and resolve bugs efficiently with real-time status updates and comprehensive analytics.

## Features

- **Bug Management**
  - Create, read, update, and delete bugs
  - Track bug progress through multiple stages (Not Started → Live)
  - Assign severity levels (Critical, High, Medium, Low, Trivial)
  - Detailed bug descriptions and histories

- **Progress Tracking**
  - Track bugs through development stages
  - Monitor progress with detailed status history
  - Funnel and pie chart analytics for bug progress visualization

- **Analytics Dashboard**
  - Visual charts for bug progress and trends
  - Comprehensive dashboard for project overview
  - Real-time bug statistics and metrics

- **User Interface**
  - Responsive design with Tailwind CSS
  - Smooth animations using Framer Motion
  - Modern UI components with Lucide React icons
  - Toast notifications for user feedback

- **Security & Performance**
  - CORS protection
  - Security headers with Helmet
  - Request logging with Morgan
  - Environment variable configuration

## Tech Stack

### Backend
- **Framework**: Express.js 5.2
- **Database**: MongoDB with Mongoose ODM
- **Security**: Helmet, CORS, Body Parser
- **Utilities**: Morgan (logging), Colors (console formatting)
- **Runtime**: Node.js with ES modules

### Frontend
- **Framework**: React 19
- **Bundler**: Vite 7
- **Styling**: Tailwind CSS with Vite plugin
- **Routing**: React Router DOM
- **HTTP Client**: Axios
- **Charts**: Recharts
- **Animations**: Framer Motion
- **Icons**: React Icons, Lucide React
- **Notifications**: React Toastify
- **Linting**: ESLint

## Project Structure

```
bug-tracker-app/
├── backend/
│   ├── config/
│   │   └── db.js              # MongoDB connection
│   ├── controllers/
│   │   └── bug.controller.js  # Bug logic handlers
│   ├── models/
│   │   └── bug.model.js       # Bug schema definition
│   ├── routes/
│   │   └── bug.routes.js      # API routes
│   ├── utils/
│   │   ├── ProgressLevels.js  # Progress stage definitions
│   │   └── SeverityLevels.js  # Severity level definitions
│   ├── server.js              # Express server setup
│   ├── package.json
│   └── vercel.json            # Vercel deployment config
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── charts/        # Analytics charts
│   │   │   ├── Layout/        # Layout components
│   │   │   └── ui/            # UI components
│   │   ├── pages/             # Page components
│   │   ├── utils/             # Utility functions
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── public/                # Static assets
│   ├── package.json
│   ├── vite.config.js
│   └── eslint.config.js
│
└── README.md
```

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- npm or yarn package manager

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the backend directory:
   ```env
   MONGO_DB_URL_CONNECTION_STRING=your_mongodb_connection_string
   PORT=5050
   NODE_ENV=development
   ```

4. Start the server:
   ```bash
   npm run dev
   ```

   The backend will run on `http://localhost:5050`

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

   The frontend will typically run on `http://localhost:5173`

## Available Scripts

### Backend

- `npm run dev` - Start development server with nodemon (hot reload)
- `npm test` - Run tests (not yet configured)

### Frontend

- `npm run dev` - Start Vite development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint to check code quality
- `npm run preview` - Preview production build

## API Endpoints

### Bug Management
- `GET /api/bug` - Get all bugs
- `GET /api/bug/:id` - Get bug details
- `POST /api/bug` - Create a new bug
- `PUT /api/bug/:id` - Update bug information
- `DELETE /api/bug/:id` - Delete a bug

## Bug Model Schema

```javascript
{
  title: String (required, min 5 characters),
  description: String,
  severity: String (Critical, High, Medium, Low, Trivial),
  progress: String (Not Started, In Development, In Code Review, In QA, Ready for Release, Live),
  statusHistory: [
    {
      stage: String,
      changedAt: Date
    }
  ],
  reporter: String,
  createdAt: Date,
  updatedAt: Date
}
```

## Progress Stages

1. **Not Started** - Bug identified, not yet assigned
2. **In Development** - Developer is working on the fix
3. **In Code Review** - Code submitted for review
4. **In QA** - Testing the fix
5. **Ready for Release** - Approved, ready for production
6. **Live** - Fixed and deployed to production

## Severity Levels

- **Critical** - System down, major functionality broken
- **High** - Major feature affected
- **Medium** - Minor feature affected
- **Low** - Cosmetic issue
- **Trivial** - Very minor issue

## Environment Variables

### Backend (.env)

```env
MONGO_DB_URL_CONNECTION_STRING=mongodb://...
PORT=5050
NODE_ENV=development
```

### Frontend

The frontend connects to the backend API. Ensure the backend is running on the configured port.

## Deployment

### Backend Deployment (Vercel)

The backend includes a `vercel.json` configuration for Vercel deployment. Update environment variables in Vercel dashboard.

### Frontend Deployment

Build the frontend and deploy the `dist` folder:

```bash
npm run build
```

Deploy the contents of the `dist` folder to any static hosting service (Vercel, Netlify, GitHub Pages, etc.).

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance Optimizations

- Vite for fast development and optimized builds
- React 19 with automatic batching
- Tailwind CSS for optimized styling
- Recharts for efficient data visualization
- Framer Motion for smooth animations

## Security Features

- **Helmet** - Secure HTTP headers
- **CORS** - Cross-Origin Resource Sharing protection
- **Environment Variables** - Sensitive data protection
- **Input Validation** - Schema-based validation with Mongoose
- **Request Logging** - Morgan for request tracking

## Troubleshooting

### Backend connection issues
- Verify MongoDB connection string in `.env`
- Ensure MongoDB service is running
- Check firewall settings for port 5050

### Frontend build issues
- Clear `node_modules` and reinstall: `rm -rf node_modules && npm install`
- Clear Vite cache: `rm -rf .vite`
- Check Node version compatibility

### CORS errors
- Ensure backend CORS is properly configured
- Check frontend API base URL configuration
- Verify both services are running

## Contributing

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## Future Enhancements

- User authentication and authorization
- Bug assignment to team members
- Email notifications
- Advanced filtering and search
- Export reports (PDF, CSV)
- Integration with version control systems
- Comment system for collaboration
- File attachments for bugs

## License

ISC

## Contact & Support

For issues or questions, please create an issue in the project repository.

---

**Last Updated**: December 29, 2025
