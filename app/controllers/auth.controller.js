// controllers/auth.controller.js
const db = require('../config/db.config.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { OAuth2Client } = require('google-auth-library');
const Usuario = db.Usuario;

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const secretKey = process.env.JWT_SECRET_KEY || 'supersecretkey';

// Autenticación por correo y contraseña
exports.login = async (req, res) => {
  const { correo, password } = req.body;

  try {
    const usuario = await Usuario.findOne({ where: { CORREO: correo } });

    if (!usuario) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    const validPassword = await bcrypt.compare(password, usuario.CONTRASEÑA);

    if (!validPassword) {
      return res.status(401).json({ message: 'Contraseña incorrecta' });
    }

    const token = jwt.sign(
      { id: usuario.USUARIO_ID, correo: usuario.CORREO, rol: usuario.ROL, avatarUrl: usuario.AVATAR_URL }, 
      secretKey, 
      { expiresIn: '1h' }
    );

    res.status(200).json({ token, message: "Login exitoso" });
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor: " + error.message });
  }
};

// Autenticación con Google
exports.googleLogin = async (req, res) => {
  const { tokenId } = req.body;

  try {
    const ticket = await client.verifyIdToken({
      idToken: tokenId,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const { email, name, picture } = ticket.getPayload();

    let usuario = await Usuario.findOne({ where: { CORREO: email } });
    
    if (!usuario) {
      usuario = await Usuario.create({
        NOMBRE_USUARIO: name,
        CORREO: email,
        CONTRASEÑA: null,
        ROL: 'usuario',
        AVATAR_URL: picture || null
      });
    }

    const token = jwt.sign(
      { id: usuario.USUARIO_ID, correo: usuario.CORREO, rol: usuario.ROL, avatarUrl: usuario.AVATAR_URL }, 
      secretKey, 
      { expiresIn: '1h' }
    );

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: "Error al autenticar con Google: " + error.message });
  }
};

// Obtener el usuario autenticado
exports.obtenerUsuarioAutenticado = async (req, res) => {
  const token = req.headers['x-access-token'];

  if (!token) {
    return res.status(401).json({ message: 'Token no proporcionado' });
  }

  try {
    const decoded = jwt.verify(token, secretKey);
    const usuario = await Usuario.findOne({ where: { CORREO: decoded.correo } });

    if (!usuario) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    const { USUARIO_ID, NOMBRE_USUARIO, CORREO, ROL, AVATAR_URL, TELEFONO } = usuario;
    res.status(200).json({ USUARIO_ID, NOMBRE_USUARIO, CORREO, ROL, AVATAR_URL, TELEFONO });
  } catch (error) {
    res.status(500).json({ message: 'Error en el servidor' });
  }
};

// Actualizar perfil
exports.actualizarPerfil = async (req, res) => {
  const { usuarioId, nombreUsuario, telefono, avatarUrl } = req.body;

  try {
    await Usuario.update(
      {
        NOMBRE_USUARIO: nombreUsuario,
        TELEFONO: telefono || null,
        AVATAR_URL: avatarUrl || null
      },
      { where: { USUARIO_ID: usuarioId } }
    );

    res.status(200).json({ message: "Perfil actualizado correctamente.", avatarUrl });
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar el perfil." });
  }
};
