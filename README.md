<!DOCTYPE html>
<html lang="en">


</head>
<body>
    <h1>Movie Trailer App</h1>
    <p>A web-based movie trailer application built using React, YouTube API, and TMDb API.</p>

    <h2>🚀 Live Project</h2>
    <p>Check out the live version of this project: 
        <a href="https://sensational-centaur-321178.netlify.app/" target="_blank">
            Movie Trailer App Live Demo
        </a>
    </p>

    <h2>Project Structure</h2>
    <pre>
    ├── public/
    ├── src/
    │   ├── components/
    │   │   ├── NavBar/
    │   │   ├── Banner/
    │   │   └── Trailer/
    │   ├── constants/
    │   └── App.js
    │── package.json
    │── README.html
    │── index.html
    │── Trailer.css
    │── axios.js
    │── .gitignore
    </pre>

    <h2>Features</h2>
    <ul>
        <li>Responsive Design</li>
        <li>Fetches movie data from the TMDb API</li>
        <li>Embeds YouTube trailers using the YouTube iframe API</li>
        <li>Displays related movies and allows trailer playback on click</li>
        <li>Responsive grid for movie posters</li>
    </ul>

    <h2>Installation</h2>
    <p>To run the project locally, follow these steps:</p>
    <pre>
    1. Clone the repository:
       <code>git clone &lt;repository-url&gt;</code>
    2. Navigate to the project directory:
       <code>cd movie-trailer-app</code>
    3. Install dependencies:
       <code>npm install</code>
    4. Start the development server:
       <code>npm start</code>
    </pre>

    <h2>Environment Setup</h2>
    <p>Create a <code>.env</code> file in the root directory and add your API keys:</p>
    <pre>
    REACT_APP_TMDB_API_KEY=your_tmdb_api_key
    REACT_APP_YOUTUBE_API_KEY=your_youtube_api_key
    </pre>

    <h2>Usage</h2>
    <ol>
        <li>Open the application in your browser at <code>http://localhost:3000</code>.</li>
        <li>Click on a movie banner to watch the trailer.</li>
        <li>Explore related movies by clicking on their posters.</li>
    </ol>

    <h2>Technologies Used</h2>
    <ul>
        <li>React.js</li>
        <li>YouTube Iframe API</li>
        <li>TMDb API</li>
        <li>HTML5, CSS3 (including Flexbox & Grid)</li>
        <li>Axios for API requests</li>
    </ul>

    <h2>📞 Contact</h2>
    <p>Email: <a href="mailto:adithyanas2694@gmail.com">adithyanas2694@gmail.com</a></p>
    <p>LinkedIn: <a href="https://www.linkedin.com/in/aadithyanas/" target="_blank">aadithyanas</a></p>

    <h2>License</h2>
    <p>This project is licensed under the MIT License.</p>

    <h2>Contributing</h2>
    <p>Contributions are welcome! Please fork the repository and create a pull request for any features or bug fixes.</p>

    <footer>
        <p>Created by Aadithya - &copy; 2025</p>
    </footer>
</body>
</html>
