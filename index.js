import express from 'express';

const app = express();
const port = 3000;

// Parse JSON payloads
app.use(express.json());

const teaData = [];
let nextId = 1;

// Create a new tea entry
app.post('/teas', (req, res) => {
    const { name, price } = req.body;
    const newTea = { id: nextId++, name, price };
    teaData.push(newTea);
    res.status(201).send(newTea);
});

// Retrieve all teas
app.get('/teas', (req, res) => {
    res.status(200).send(teaData);
});

// Retrieve a tea by ID
app.get('/teas/:id', (req, res) => {
    const tea = teaData.find(t => t.id === parseInt(req.params.id));
    if (!tea) {
        return res.status(404).send("aisa koi item nhi hai mere pass");
    }
    res.status(200).send(tea);
});

// Update a tea entry
app.put('/teas/:id', (req, res) => {
    const tea = teaData.find(t => t.id === parseInt(req.params.id));
    if (!tea) {
        return res.status(404).send("aisa koi item nhi hai mere pass");
    }
    
    const { name, price } = req.body;
    if (name !== undefined) tea.name = name;
    if (price !== undefined) tea.price = price;

    res.status(200).send(tea);
});

// Delete a tea entry
app.delete('/teas/:id', (req, res) => {
    const index = teaData.findIndex(t => t.id === parseInt(req.params.id));
    if (index === -1) {
        return res.status(404).send("aisa koi item nhi hai mere pass");
    }

    teaData.splice(index, 1);
    res.status(200).send("Item deleted successfully");
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
