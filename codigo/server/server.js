const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();
const port = 3002;

server.use(middlewares);
server.use(jsonServer.bodyParser);

server.post('/users', (req, res) => {
    const { name, cpf, email, password } = req.body;
    const db = router.db;
    const userExists = db.get('users').find({ email }).value();

    if (userExists) {
        res.status(400).send({ message: 'Usuário já existe.' });
    } else {
        const id = Date.now().toString(); // Generate a simple unique ID
        db.get('users').push({ id, name, cpf, email, password }).write();
        res.status(201).send({ message: 'Usuário cadastrado com sucesso.' });
    }
});

server.post('/academies', (req, res) => {
    const { name, location, address, image, password } = req.body;
    const db = router.db;
    const academyExists = db.get('academies').find({ name }).value();

    if (academyExists) {
        res.status(400).send({ message: 'Academia já existe.' });
    } else {
        const id = Date.now().toString(); // Generate a simple unique ID
        db.get('academies').push({ id, name, location, address, image, password }).write();
        res.status(201).send({ message: 'Academia cadastrada com sucesso.' });
    }
});

server.post('/reviews', (req, res) => {
    const { userId, academyId, rating, comment } = req.body;
    const db = router.db;
    const id = Date.now().toString(); // Generate a simple unique ID
    db.get('reviews').push({ id, userId, academyId, rating, comment }).write();
    res.status(201).send({ message: 'Avaliação cadastrada com sucesso.' });
});

server.post('/favorites', (req, res) => {
    const { userId, academyId } = req.body;
    const db = router.db;
    const favoriteExists = db.get('favorites').find({ userId, academyId }).value();

    if (favoriteExists) {
        res.status(400).send({ message: 'Academia já está nos favoritos.' });
    } else {
        const id = Date.now().toString(); // Generate a simple unique ID
        db.get('favorites').push({ id, userId, academyId }).write();
        res.status(201).send({ message: 'Academia adicionada aos favoritos.' });
    }
});

// Corrigindo a remoção de favoritos
server.delete('/favorites', (req, res) => {
    const { userId, academyId } = req.body;
    const db = router.db;
    const favorite = db.get('favorites').find({ userId, academyId }).value();

    if (favorite) {
        db.get('favorites').remove({ userId, academyId }).write();
        res.status(200).send({ message: 'Academia removida dos favoritos.' });
    } else {
        res.status(400).send({ message: 'Favorito não encontrado.' });
    }
});

server.use(router);
server.listen(port, () => {
    console.log(`JSON Server is running on port ${port}`);
});
