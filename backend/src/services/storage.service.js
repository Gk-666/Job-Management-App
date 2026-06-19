const imagekit = require("../config/imagekit");

const uploadFile = async (file) => {
  return await imagekit.files.upload({
    file,
    fileName: `${Date.now()}-${file.originalname}`,
    folder: "resume",
  });
};

module.exports = { uploadFile };
