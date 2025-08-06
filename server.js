const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/code-manager', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("MongoDB connected"));



const Snippet = mongoose.model('Snippet', new mongoose.Schema({
    title: String,
    language: String,
    code: String,
    tags: [String],
    createdAt: { type: Date, default: Date.now }
}));

// Routes
app.get('/snippets', async (req, res) => {
    const snippets = await Snippet.find().sort({ createdAt: -1 });
    res.json(snippets);
});

app.post('/snippets', async (req, res) => {
    const snippet = new Snippet(req.body);
    await snippet.save();
    res.json(snippet);
});

app.put('/snippets/:id', async (req, res) => {
    const updated = await Snippet.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
});

app.delete('/snippets/:id', async (req, res) => {
    await Snippet.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
});

app.listen(5000, () => console.log('Server running at http://localhost:5000'));
