const express = require('express')
const app = express();
const port = 3000;

app.get('/', (req,res) => {
    res.send('Hello World');    
});

app.listen(port, () => {
    console.log(`Server listen on http://localhost:${port}`);
});


app.get('/authors', async (req, res) => {
    try {
      const authors = await Author.findAll({
        include: [
          {
            model: Book,
            as: 'books',
            attributes: ['id', 'isbn', 'name', 'cantPages', 'createdAt'],
          },
        ],
      })
      return res.json({ authors });
    } catch (error) {
      console.log('Error', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  });