# MovieHub | React.js, JavaScript, RESTful APIs, Responsive Web Design, HTML5, CSS3

A Netflix-style movie application that allows users to browse movies, watch trailers, and explore different genres.

## 🚀 Tech Stack

### Frontend
- **React.js** - Modern UI framework
- **JavaScript (ES6+)** - Core programming language
- **HTML5** - Structure and semantics
- **CSS3** - Styling and animations
  - Flexbox & Grid layouts
  - Media Queries
  - Custom animations
  - Responsive design

### APIs & Data
- **TMDB RESTful API** - Movie database integration
- **Axios** - HTTP client
- **React Router** - Navigation system

### UI/UX
- **React Icons** - Icon components
- **React Joyride** - User onboarding
- **Skeleton Loading** - Loading states
- **Context API** - State management

## 🎬 Key Features

### 1. Home Page Experience
- **Netflix-style Banner**
  - Featured content display
  - Dynamic background with gradient overlay
  - Play trailer button
  - Movie information display

- **Genre-based Movie Rows**
  - Netflix Originals (larger posters)
  - Action movies
  - Comedy collection
  - Horror selection
  - Romance films
  - Documentaries

- **Interactive Elements**
  - Hover effects on movie cards
  - Smooth horizontal scrolling
  - Loading skeletons
  - Trailer playback on click

### 2. Search & Discovery
- **Global Search**
  - Real-time search results
  - Multi-criteria filtering
  - Sort by:
    - Popularity
    - Rating
    - Release Date
    - Title

- **Genre-specific Search**
  - Search within genre pages
  - Genre-specific filters
  - Rating-based filtering
  - Custom sorting options

### 3. Movie Details & Trailers
- **Trailer Integration**
  - YouTube video playback
  - Modal popup interface
  - Official trailer preference
  - Fallback to alternative videos
  - Loading states

- **Movie Information**
  - Title and overview
  - Release date
  - Rating
  - Genre tags
  - Similar movies

### 4. User Interface
- **Responsive Design**
  - Mobile-first approach
  - Adaptive layouts
  - Touch-friendly scrolling
  - Optimized images

- **Visual Feedback**
  - Loading skeletons
  - Smooth transitions
  - Hover animations
  - Custom scrollbars

### 5. Navigation & UX
- **Smart Navigation**
  - Fixed header with dynamic background
  - Back button in genre pages
  - Home button for quick access
  - Smooth page transitions

- **User Guidance**
  - Guided tour for new users
  - Clear search indicators
  - Loading states
  - Error handling

## 📱 Responsive Design
- Mobile-first approach
- Breakpoints:
  - Mobile: < 480px
  - Tablet: 480px - 768px
  - Desktop: > 768px

## 🔧 Quick Start

1. Clone & Install
```bash
git clone [repository-url]
npm install
```

2. Environment Setup
```env
REACT_APP_TMDB_API_KEY=your_api_key_here
```

3. Run Development Server
```bash
npm start
```

## 📦 Dependencies
```json
{
  "dependencies": {
    "axios": "^1.6.2",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-icons": "^4.12.0",
    "react-joyride": "^2.7.2",
    "react-router-dom": "^6.20.0"
  }
}
```

## 🤝 Contributing
1. Fork the repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Create Pull Request

## 📄 License
MIT License
