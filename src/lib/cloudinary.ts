import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/**
 * Uploads a single image (as a base64 data URL) to Cloudinary under the
 * "galliweb" folder, and returns its public URL + public_id.
 * The public_id is stored in the Photo table so we can delete the image
 * later if the shop owner removes a photo.
 */
export async function uploadImage(
  base64DataUrl: string,
  folder = "galliweb"
): Promise<{ url: string; publicId: string }> {
  const result = await cloudinary.uploader.upload(base64DataUrl, {
    folder,
    // Cap dimensions and auto-compress — keeps free-tier storage/bandwidth
    // usage low without visibly hurting quality on a shop's site.
    transformation: [{ width: 1600, height: 1600, crop: "limit", quality: "auto" }],
  });

  return { url: result.secure_url, publicId: result.public_id };
}

/** Deletes an image from Cloudinary — used when a photo is removed from a shop. */
export async function deleteImage(publicId: string): Promise<void> {
  await cloudinary.uploader.destroy(publicId);
}
