const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');

const PORT = process.env.PORT || 3001;

app.use(cors()); 

mongoose.connect('mongodb://localhost/api-demo', { useNewUrlParser: true, useUnifiedTopology: true });

const personSchema = new mongoose.Schema({
   name: String,
   domain: String,
   github: String,
   linkedin: String,
   photo: String  
});

const Person = mongoose.model('Person', personSchema);

app.use(express.json());

// API endpoint to get persons based on name
app.get('/api/persons', async (req, res) => {
  try {
     const { name } = req.query;
     const query = name ? { name: { $regex: name, $options: 'i' } } : {};
     const persons = await Person.find(query);
     res.json(persons);
  } catch (error) {
     console.error(error);
     res.status(500).json({ error: 'Internal Server Error' });
  }
});

//add a new person
app.post('/api/persons', async (req, res) => {
   const { name, domain, github, linkedin, photo } = req.body;  

   try {
      const newPerson = new Person({ name, domain, github, linkedin, photo });
      const savedPerson = await newPerson.save();
      res.json(savedPerson);
   } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
   }
});

app.listen(PORT, () => {
   console.log(`Server is running on port ${PORT}`);
});
