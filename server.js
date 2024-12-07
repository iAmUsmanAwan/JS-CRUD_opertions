import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Sample data
let items = [
    { id: 1, name: 'Item 1' },
    { id: 2, name: 'Item 2' },
];

// Routes
// Default
app.get('/', (req, res) => {
    res.send('Welcome to the Item API!');
});

// Read all items
app.get('/items', (req, res) => {
    res.json(items);
});

// Create a new item
app.post('/items', (req, res) => {
    const newItem = { id: Date.now(), name: req.body.name };
    items.push(newItem);
    res.status(201).json(newItem);     // Created successful response status code
});

// Update an item
app.put('/items/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const itemIndex = items.findIndex((item) => item.id === id);

    if (itemIndex !== -1) {
        items[itemIndex].name = req.body.name;
        res.json(items[itemIndex]);
    } else {
        res.status(404).json({ error: 'Item not found' });      // a server cannot find a requested resource
    }
});

// Delete an item
app.delete('/items/:id', (req, res) => {
    const id = parseInt(req.params.id);
    items = items.filter((item) => item.id !== id);
    res.status(204).end(); // No content response
});

// Start server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
