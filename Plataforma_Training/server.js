const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);

// Middleware para autenticação simples
server.post('/api/auth/login', (req, res) => {
  const { email, senha } = req.body; // Use email e senha para verificar o usuário
  const usuarios = router.db.get('usuarios').value();
  const usuario = usuarios.find(u => u.email === email && u.senha === senha);

  if (usuario) {
    const token = 'example-token'; // Em um sistema real, você geraria um token real
    // Retorna o token e a lista de usuários (todos os usuários no exemplo)
    res.json({ Acesso: { token, usuarios } });
  } else {
    res.status(401).json({ message: 'Credenciais inválidas' });
  }
});

server.use(router);

server.listen(3000, () => {
  console.log('JSON Server is running on http://localhost:3000');
});
