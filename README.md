
# Calendar Productivity App

## Project Overview

The Calendar Productivity App is a comprehensive time management and productivity solution designed to help users effectively organize their schedules, track goals, and manage tasks. This application addresses the common challenge of balancing multiple responsibilities and objectives across different areas of life by providing an intuitive, visual interface for planning and tracking activities.

### Purpose
The app serves as a centralized platform where users can:
- Schedule events based on different categories (work, personal, exercise, etc.)
- Set and track goals across various life domains
- Manage tasks associated with specific goals
- Visualize time allocation to identify patterns and improve productivity

### Target Audience
This application is ideal for:
- Professionals balancing multiple projects and responsibilities
- Students managing academic deadlines and personal development goals
- Anyone seeking to improve their time management and productivity
- Teams that need to coordinate schedules and task assignments

## Key Features

### 1. Interactive Calendar Interface
**Implementation**: The calendar utilizes a responsive grid layout built with React components, implementing the react-beautiful-dnd library for drag-and-drop functionality. Events are rendered as interactive cards that display timing and category information.

**Technical Decisions**: The calendar was implemented as a custom component rather than using a pre-built calendar library to allow for greater customization of the UI and interaction patterns. This approach enables fine-grained control over event rendering and manipulation.

**Behind the Scenes**: The calendar grid dynamically generates day columns based on the selected date range, with events positioned according to their start and end times. Event overlapping is handled through custom positioning logic.

### 2. Goal and Task Management System
**Implementation**: Goals are organized in a sidebar with associated tasks nested below each goal. The system leverages Redux for state management, with separate slices for goals, tasks, and events.

**Technical Decisions**: The decision to use a nested structure (goals → tasks → events) creates a natural hierarchy that helps users organize their activities around meaningful objectives rather than just scheduling time blocks.

**Behind the Scenes**: When a user selects a goal, the application filters tasks associated with that goal through Redux selectors. Tasks can be dragged onto the calendar to create events, establishing a direct connection between planning and execution.

### 3. Drag and Drop Functionality
**Implementation**: Using react-beautiful-dnd, tasks can be dragged from the sidebar onto specific calendar days to create events quickly.

**Technical Decisions**: This interaction pattern was chosen to reduce friction in the planning process - users can move from intention (task) to scheduling (event) in a single intuitive action.

**Behind the Scenes**: When a task is dropped onto a calendar day, an event creation modal is pre-populated with the task's details, and the event is automatically associated with both the task and its parent goal.

### 4. User Authentication and Data Persistence
**Implementation**: The app uses Supabase for authentication and database services, implementing row-level security to ensure users can only access their own data.

**Technical Decisions**: Supabase was chosen over other solutions for its seamless integration of authentication and database functionality, simplified API, and built-in row-level security policies.

**Behind the Scenes**: When users authenticate, the app establishes a session that's maintained across page refreshes. All database queries include the user's ID to ensure proper data isolation and security.

### 5. Category-Based Event Organization
**Implementation**: Events are categorized (exercise, eating, work, relax, family, social) with distinct visual styling to enable quick recognition.

**Technical Decisions**: The category system uses a consistent color scheme throughout the application, with utility functions that map categories to appropriate styling classes.

**Behind the Scenes**: Categories are stored as an enum type in the database and enforced through validation in both the frontend forms and backend APIs.

## Tech Stack

### Frontend
- **React**: Core UI library for building component-based interfaces
- **TypeScript**: For type safety and improved developer experience
- **Redux Toolkit**: State management with slices for different domains (events, goals, tasks)
- **React Router**: For navigation and routing between different views
- **TanStack React Query**: For efficient data fetching and cache management
- **React Beautiful DnD**: For drag-and-drop interaction patterns
- **Tailwind CSS**: For utility-first styling and consistent design system
- **shadcn/ui**: For accessible, customizable UI components
- **date-fns**: For comprehensive date manipulation and formatting
- **Sonner**: For toast notifications and user feedback

### Backend
- **Supabase**: Backend-as-a-Service platform providing:
  - PostgreSQL database with Row-Level Security
  - Authentication services
  - RESTful API endpoints
  - Real-time data subscriptions (potential future feature)

### Database
- **PostgreSQL** (via Supabase): Relational database with the following tables:
  - `events`: Stores calendar events with start/end times and category information
  - `goals`: Contains user goals with associated metadata
  - `tasks`: Stores tasks linked to specific goals
  - `profiles`: Extends the default Supabase user information

### Development Tools
- **Vite**: For fast development server and optimized builds
- **ESLint/TypeScript**: For code quality and type checking
- **Git**: Version control system
- **GitHub**: Code hosting and collaboration

## Installation & Setup

### Prerequisites
- Node.js (v16.0.0 or later)
- npm (v8.0.0 or later) or yarn (v1.22.0 or later)
- A Supabase account and project

### Local Development Setup

```bash
# Clone the repository
git clone <repository-url>
cd calendar-productivity-app

# Install dependencies
npm install
# or
yarn

# Set up environment variables
# Create a .env file with the following variables:
# VITE_SUPABASE_URL=your_supabase_project_url
# VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# Start the development server
npm run dev
# or
yarn dev
```

### Environment Variables
Create a `.env.local` file with the following variables:

```
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

### Database Setup
The application requires the following tables in your Supabase project:

1. `events` - Calendar events
2. `goals` - User goals
3. `tasks` - Tasks associated with goals
4. `profiles` - Extended user profile information

Row-Level Security (RLS) policies should be configured to ensure users can only access their own data.

## Folder Structure

```
src/
├── components/          # Reusable UI components
│   ├── calendar/        # Calendar-specific components
│   ├── sidebar/         # Sidebar components (goals, tasks)
│   └── ui/              # Basic UI components (from shadcn/ui)
├── contexts/            # React context providers
│   └── AuthContext.tsx  # Authentication context
├── hooks/               # Custom React hooks
├── integrations/        # External service integrations
│   └── supabase/        # Supabase client setup
├── lib/                 # Utility libraries
├── pages/               # Top-level page components
│   ├── Auth.tsx         # Authentication page
│   ├── Calendar.tsx     # Main calendar page
│   └── NotFound.tsx     # 404 page
├── redux/               # Redux state management
│   ├── hooks.ts         # Type-safe Redux hooks
│   ├── slices/          # Redux Toolkit slices
│   │   ├── eventsSlice.ts
│   │   ├── goalsSlice.ts
│   │   ├── tasksSlice.ts
│   │   └── uiSlice.ts   # UI state management
│   └── store.ts         # Redux store configuration
├── services/            # API service layer
│   └── api.ts           # Supabase API functions
└── utils/               # Utility functions
    ├── colorUtils.ts    # Color mapping utilities
    └── dateUtils.ts     # Date manipulation utilities
```

### Key Files Explanation:

- **`components/calendar/EventModal.tsx`**: Handles creation and editing of calendar events with form validation
- **`components/sidebar/Sidebar.tsx`**: Main sidebar component integrating goals and tasks with drag-drop functionality
- **`contexts/AuthContext.tsx`**: Manages authentication state and provides auth methods to the application
- **`redux/slices`**: Contains domain-specific state management with Redux Toolkit
- **`services/api.ts`**: Centralizes all API calls to Supabase with proper error handling and response formatting

## Data Flow / Application Architecture

The application follows a unidirectional data flow pattern:

1. **User Interface Layer**: React components that render the UI and capture user interactions
2. **State Management Layer**: Redux store with specialized slices for different domains
3. **API Service Layer**: Functions that communicate with the Supabase backend
4. **Database Layer**: Supabase PostgreSQL database with RLS policies

### Authentication Flow:
```
User → Auth Form → AuthContext → Supabase Auth API → AuthContext → Protected Routes
```

### Data Operations Flow:
```
User Action → React Component → Redux Action → API Service → Supabase → 
API Response → Redux State Update → Component Re-render
```

### Drag and Drop Flow:
```
Task Drag → DragDropContext → Drop on Calendar Day → Redux Action → 
Event Modal → Form Submission → API Service → Database Update → Redux State Update
```

## Challenges Faced & Solutions

### Challenge 1: Managing Complex State Across Components
**Problem**: The application requires synchronized state for events, goals, tasks, UI modals, and authentication across multiple components.

**Solution**: Implemented a Redux architecture with specialized slices for different domain concerns. Used selectors to derive computed state and created custom hooks for frequently used state access patterns. This approach centralized state management while keeping the components focused on presentation logic.

### Challenge 2: Implementing Drag and Drop Between Different Components
**Problem**: Enabling tasks to be dragged from the sidebar onto specific calendar days while maintaining data context.

**Solution**: Utilized react-beautiful-dnd with custom drag sources and drop targets. When a task is dropped on a calendar day, a specialized handler extracts the task ID, associates it with the target date, and triggers the event creation modal with pre-populated data. This required careful coordination between the drag context, Redux state, and modal system.

### Challenge 3: Ensuring Data Security and Isolation
**Problem**: Preventing users from accessing or modifying other users' data while maintaining a responsive user experience.

**Solution**: Implemented Row-Level Security policies in Supabase that filter all database operations based on the authenticated user's ID. Enhanced this with frontend validation to ensure user-specific queries. Created a middleware pattern in the API service layer that automatically injects the user ID into all database operations.

## Performance Optimization / Best Practices

### Code Splitting and Lazy Loading
The application uses React's lazy loading capabilities to split code by route, reducing the initial bundle size and improving load times.

### Memoization and Render Optimization
Components use React.memo and useCallback/useMemo hooks to prevent unnecessary re-renders when props or state haven't changed meaningfully.

### Normalized Redux State
Redux state is normalized to avoid duplication and enable efficient updates, particularly for the relationships between events, tasks, and goals.

### TypeScript for Type Safety
Comprehensive TypeScript typing prevents common runtime errors and provides better developer experience with autocompletion and inline documentation.

### Responsive Design
The application is fully responsive using Tailwind CSS, ensuring usability across devices of different screen sizes.

### Accessibility
UI components from shadcn/ui provide built-in accessibility features, and custom components follow ARIA best practices.

## Future Improvements / Roadmap

### Short-term Improvements
- Implement real-time updates with Supabase subscriptions
- Add recurring event functionality
- Enhance mobile experience with touch-optimized interactions

### Medium-term Features
- Calendar sharing and collaboration features
- Advanced filtering and search functionality
- Integration with external calendars (Google Calendar, Outlook)

### Long-term Vision
- AI-assisted scheduling recommendations
- Time tracking and productivity analytics
- Team/organization features with role-based permissions

## Credits / Acknowledgments

This project leverages several open source libraries and tools:

- [React](https://reactjs.org/) - UI library
- [Redux Toolkit](https://redux-toolkit.js.org/) - State management
- [Supabase](https://supabase.io/) - Backend services
- [shadcn/ui](https://ui.shadcn.com/) - UI component library
- [Tailwind CSS](https://tailwindcss.com/) - Styling framework
- [React Beautiful DnD](https://github.com/atlassian/react-beautiful-dnd) - Drag and drop functionality
- [date-fns](https://date-fns.org/) - Date manipulation
- [TanStack React Query](https://tanstack.com/query) - Data fetching and caching

Special thanks to the open-source community for creating and maintaining these incredible tools.
