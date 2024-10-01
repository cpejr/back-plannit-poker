import RoomModel from '../Models/RoomModel.js';

const generateUniqueCode = async (length = 6) => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let code;
  let isUnique = false;

  while (!isUnique) {
    code = Array.from({ length }, () => characters.charAt(Math.floor(Math.random() * characters.length))).join('');

    // Verificar se o código já existe
    const existingRoom = await RoomModel.findOne({ code });
    if (!existingRoom) {
      isUnique = true;
    }
  }

  return code;
};

export default generateUniqueCode;
