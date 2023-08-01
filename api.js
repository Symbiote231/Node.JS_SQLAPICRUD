const dbcontacto = require('./dbcontacto');
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors')

var app = express();
var router = express.Router();

/* TODO: DOCUMENTACIÓN CON SWAGGER */
// https://www.npmjs.com/package/swagger-jsdoc
const swaggerJsdoc = require('swagger-jsdoc');

// https://www.npmjs.com/package/swagger-ui-express
const swaggerUI = require('swagger-ui-express');

const swaggerOptions = {
    swaggerDefinition: {
        info: {
            version: "1.0.0",
            title: 'API REST Contactos',
            description: 'SQL Server CRUD API using only Node.JS',
            contact: {
                name: 'Ricardo Guerra Grajales'
            },
            servers: ["http://localhost:8080"]
        }
    },
    apis: ['api.js']
};

/* TODO: DOCUMENTACION CON SWAGGER Y RUTA */
const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());
app.use('/api', router);

/**
 * @swagger
 * /api/contactos:
 *  get:
 *      description: Use para obtener todos los contactos
 *      responses:
 *          '200':
 *              description: Listados correctamente
 */
router.route('/contactos').get((request, response) => {
    dbcontacto.getContactos().then(result => {
        response.json(result[0])
    });
})

/**
 * @swagger
 * /api/contacto/{id}:
 *  get:
 *      description: Use para obtener un contacto por ID
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *              type: int
 *          required: true
 *          description: ID int para obetener el contacto
 *      responses:
 *          '200':
 *              description: Contacto obtenido correctamente
 */
router.route('/contacto/:id').get((request, response) => {
    dbcontacto.getContactoID(request.params.id).then(result => {
        response.json(result[0])
    });
})

/**
 * @swagger
 * /api/contacto/insertar:
 *  post:
 *      description: Use para insertar un contacto en la BD
 *      produces:
 *        - application/json
 *      parameters:
 *        - name: "body"
 *          in: body
 *          required: true
 *          schema:
 *              type: object
 *              example:
 *                  IDContacto: ""
 *                  Nombre: "Nombre"
 *                  Telefono: "55-55-55-55-55"
 *                  Correo: "test@test.com"
 *      responses:
 *          '200':
 *              description: Contacto insertado correctamente
 *              content:
 *                  application/json:
 *                      type: object
 */
router.route('/contacto/insertar').post((request, response) => {
    let contacto = {...request.body}
    dbcontacto.insertContacto(contacto).then(result => {
        response.json(result[0])
    });
})

/**
 * @swagger
 * /api/contacto/actualizar:
 *  put:
 *      description: Use para actualizar un contacto en la BD
 *      produces:
 *        - application/json
 *      parameters:
 *        - name: "body"
 *          in: body
 *          required: true
 *          schema:
 *              type: object
 *              example:
 *                  IDContacto: "ID a modificar"
 *                  Nombre: "Nombre"
 *                  Telefono: "55-55-55-55-55"
 *                  Correo: "test@test.com"
 *      responses:
 *          '200':
 *              description: Contacto actualizado correctamente
 *              content:
 *                  application/json:
 *                      type: object
 */
router.route('/contacto/actualizar').put((request, response) => {
    let contacto = {...request.body}
    dbcontacto.updateContacto(contacto).then(result => {
        response.json(result[0])
    });
})

/**
 * @swagger
 * /api/contacto/eliminar/{id}:
 *  delete:
 *      description: Use para eliminar un contacto de la BD
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *              type: int
 *          required: true
 *          description: ID int para eliminar contacto
 *      responses:
 *          '200':
 *              description: Contacto eliminado correctamente
 */
router.route('/contacto/eliminar/:id').delete((request, response) => {
    dbcontacto.deleteContacto(request.params.id).then(result => {
        response.json(result[0])
    });
})

var port = process.env.PORT || 8080;
app.listen(port);
console.log('API iniciada en el puerto: ' + port);