const {ImageKit}= require('@imagekit/nodejs');

const ImageKitclient = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY, 
});

async function uploadImage(file) {
    const result=await ImageKitclient.files.upload({
        file,
        fileName:"blog_image_"+Date.now().toString(),
        folder:"Blogging_App/blog_images"
    })
    console.log(result);
    return result.url;
}

module.exports={uploadImage}