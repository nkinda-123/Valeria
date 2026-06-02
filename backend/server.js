process.setMaxListeners(20);
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;


app.use(cors());
app.use(express.json());
app.use(express.static('public'));

let profileData = {
  name: 'Valeria Bonaventure Chema',
  title: 'Data Scientist',
  email: 'Valeria.chema123@gmail.com',
  phone: '0615125288',
  bio: 'A data scientist crafting machine learning models, analytics pipelines, and visual insights for smarter decisions.',
  skills: ['Data Analysis', 'Statistical Modeling', 'Machine Learning', 'Python Programming', 'Data Visualization', 'SQL', 'Data Cleaning', 'Feature Engineering'],
  projects: [
    { id: 1, tag: 'Data Analysis', title: 'Sales Forecasting Model', description: 'Built a time series forecasting model to predict monthly sales trends and improve inventory planning.' },
    { id: 2, tag: 'Machine Learning', title: 'Customer Churn Classifier', description: 'Developed a classification pipeline to identify customers at risk of churn using logistic regression and feature engineering.' },
    { id: 3, tag: 'Visualization', title: 'Interactive Dashboard', description: 'Created a dashboard to visualize business metrics and data insights using Python and dashboard tools.' }
  ]
};

app.get('/', (req, res) => res.json({ message: 'Valeria Chema Portfolio API is running!' }));

app.get('/api/profile', (req, res) => res.json(profileData));

app.get('/api/skills', (req, res) => res.json({ success: true, skills: profileData.skills }));

app.get('/api/projects', (req, res) => res.json({ success: true, projects: profileData.projects }));

app.put('/api/profile', (req, res) => {
  const { name, title, email, phone, bio } = req.body;
  if (name) profileData.name = name;
  if (title) profileData.title = title;
  if (email) profileData.email = email;
  if (phone) profileData.phone = phone;
  if (bio) profileData.bio = bio;
  res.json({ success: true, data: profileData });
});

app.post('/api/skills', (req, res) => {
  const { skill } = req.body;
  if (!skill) return res.status(400).json({ error: 'Skill is required' });
  profileData.skills.push(skill);
  res.json({ success: true, skills: profileData.skills });
});

app.delete('/api/skills/:skill', (req, res) => {
  const skill = decodeURIComponent(req.params.skill);
  profileData.skills = profileData.skills.filter(s => s !== skill);
  res.json({ success: true, skills: profileData.skills });
});

app.post('/api/projects', (req, res) => {
  const { tag, title, description } = req.body;
  if (!tag || !title || !description) return res.status(400).json({ error: 'All fields required' });
  const newProject = { id: Date.now(), tag, title, description };
  profileData.projects.push(newProject);
  res.json({ success: true, projects: profileData.projects });
});

app.delete('/api/projects/:id', (req, res) => {
  profileData.projects = profileData.projects.filter(p => p.id != req.params.id);
  res.json({ success: true, projects: profileData.projects });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));