// Import necessary modules
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import Blog from './models/blogsch.mjs'; // Import the Blog model as an ES module
import User from './models/usersch.mjs'; // Import the User model as an ES module
import cors from 'cors';

const app = express();

// Set dynamic port for deployment (Render provides process.env.PORT)
const port = process.env.PORT || 3000;

// Use environment variable for MongoDB URI
const mongoURI = process.env.MONGO_URI || 'mongodb+srv://yogeshxiix:hr16p1076@cluster0.jv4zk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

// Set the view engine to EJS
app.set('view engine', 'ejs');

// Serve static files from the public directory
app.use(express.static('public'));

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); // Parse JSON data for API routes
app.use(cors()); // Enable CORS for communication with frontend

// MongoDB connection
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log('MongoDB connection error:', err));

// Route to render the EJS page
app.get('/write', (req, res) => {
    const author = req.query.author || ''; // Get the author's name from the query parameters
    console.log('Author from query:', author);
    res.render('writeBlog', { author }); // Pass the author name to the EJS template
});

// New route to fetch all blogs categorized by tags
app.get('/api/blogs', async (req, res) => {
    try {
        const allBlogs = await Blog.find();
        const categorizedArticles = {
            foryou: allBlogs.filter(blog => blog.tags.includes('For You')),
            following: allBlogs.filter(blog => blog.tags.includes('Following')),
            technology: allBlogs.filter(blog => blog.tags.includes('Technology')),
            health: allBlogs.filter(blog => blog.tags.includes('Health')),
            science: allBlogs.filter(blog => blog.tags.includes('Science'))
        };
        res.json(categorizedArticles);
    } catch (error) {
        console.error("Error fetching blogs:", error);
        res.status(500).json({ message: 'Error fetching blogs' });
    }
});

// Route to handle blog form submission
app.post('/submit-blog', async (req, res) => {
    const { title, content, author } = req.body; // Ensure the author is passed in the form
    const newBlog = new Blog({
        title,
        content,
        author,
        date: new Date() // Set the current date
    });

    try {
        await newBlog.save(); // Save the new blog to the database
        // Use environment-based URL for redirecting
        res.redirect(`${process.env.https://brew-ows3.onrender.com || 'http://localhost:5173'}/app`);
    } catch (error) {
        console.error('Error saving blog:', error);
        res.status(500).send('Failed to submit blog post');
    }
});

// Route to delete a blog by ID
app.delete('/api/blogs/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const deletedBlog = await Blog.findByIdAndDelete(id);
        if (!deletedBlog) {
            return res.status(404).json({ message: 'Blog not found' });
        }
        res.status(200).json({ message: 'Blog deleted successfully' });
    } catch (error) {
        console.error("Error deleting blog:", error);
        res.status(500).json({ message: 'Error deleting blog' });
    }
});

// Route to handle user registration
app.post('/register', async (req, res) => {
    const { name, username, email, password } = req.body;
    const newUser = new User({
        name,
        username,
        email,
        password
    });

    try {
        const savedUser = await newUser.save();
        res.status(201).json({
            message: 'User registered successfully',
            user: savedUser,
        });
    } catch (error) {
        console.error('Error saving user:', error);
        res.status(500).json({ message: 'Error registering user', error });
    }
});

// Route to handle user login
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User does not exist' });
        }

        if (user.password !== password) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        res.status(200).json({ user: { email: user.email, name: user.name } });
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
