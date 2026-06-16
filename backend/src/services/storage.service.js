const imagekit = require("../config/imagekit");

const uploadFile = async (file) => {
  return await imagekit.files.upload({
    file,
    fileName: `${Date.now()}-${file.originalname}`,
    foleder: "resume",
  });
};

module.exports = { uploadFile };
