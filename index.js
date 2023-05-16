const uuid = require('uuid').v4;
const fastify = require('fastify');

const transactionidMiddleware = (req, res, next) => {
  res.header('request-id', uuid());
  next();
}

const app = fastify({logger: false});

app.get('/', {preHandler: transactionidMiddleware}, (req, res) => {
  res.status(200).send({ok: true, message: 'Servidor contestando, revisá el header de esta respuesta para encontrar el request-id'});
})

app.listen({port: 3000, host: '0.0.0.0'}, (err, address) => {
  if (err) {
    console.log(err)
    process.exit(1)
  }
  console.info(`Servidor levantado, probar ingresar a: ${address}`)
})