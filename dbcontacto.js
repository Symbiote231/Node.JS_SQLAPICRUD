var config = require('./dbconfig');
const sql = require('mssql');

/* TODO: OBTENER LISTADO DE TODOS LOS CONTACTOS */
async function getContactos() {
    try {
        let pool = await sql.connect(config);
        let contactos =  await pool.request()
        .execute("sp_ListarContactos");
        return contactos.recordsets;

    } catch (error) {
        console.log(error);
    }
}

/* TODO: OBTENER CONTACTO POR ID */
async function getContactoID(idContacto) {
    try {
        let pool = await sql.connect(config);
        let contactos =  await pool.request()
        .input('IDContacto', sql.Int, idContacto)
        .execute("sp_ObtenerContacto");
        return contactos.recordsets;

    } catch (error) {
        console.log(error);
    }
}

/* TODO: INSERTAR CONTACTO */
async function insertContacto(contacto) {
    try {
        let pool = await sql.connect(config);
        let insertCon =  await pool.request()
        .input('Nombre', sql.VarChar, contacto.Nombre)
        .input('Telefono', sql.VarChar, contacto.Telefono)
        .input('Correo', sql.VarChar, contacto.Correo)
        .execute("sp_InsertarContacto");
        return insertCon.recordsets;

    } catch (error) {
        console.log(error);
    }
}

/* TODO: ACTUALIZAR CONTACTO */
async function updateContacto(contacto) {
    try {
        let pool = await sql.connect(config);
        let updateCon =  await pool.request()
        .input('IDContacto', sql.Int, contacto.IDContacto)
        .input('Nombre', sql.VarChar, contacto.Nombre)
        .input('Telefono', sql.VarChar, contacto.Telefono)
        .input('Correo', sql.VarChar, contacto.Correo)
        .execute("sp_EditarContacto");
        return updateCon.recordsets;

    } catch (error) {
        console.log(error);
    }
}

/* TODO: ELIMINAR CONTACTO */
async function deleteContacto(idContacto) {
    try {
        let pool = await sql.connect(config);
        let deleteCon =  await pool.request()
        .input('IDContacto', sql.Int, idContacto)
        .execute("sp_EliminarContacto");
        return deleteCon.recordsets;

    } catch (error) {
        console.log(error);
    }
}


module.exports = {
    getContactos : getContactos,
    getContactoID : getContactoID,
    insertContacto : insertContacto,
    updateContacto : updateContacto,
    deleteContacto : deleteContacto
}