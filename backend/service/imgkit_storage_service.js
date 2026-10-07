const ImageKit = require("imagekit");

// ImageKit initialize 
const imagekit = new ImageKit({
publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

// Buffer receive to image upload function
const uploadfile = async (buffer) => {
  try {
    const response = await imagekit.upload({
      file: buffer.toString("base64"), 
      fileName: `img_${Date.now()}.jpg`, 
      folder: "/posts" // ImageKit dashboard  folder
    });

    return response; 
  } catch (error) {
    console.error("ImageKit upload error:", error);
    throw error;
  }
};

module.exports = uploadfile;