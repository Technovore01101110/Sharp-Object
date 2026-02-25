import multer from "multer";
import path from 'path';
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
    destination : (req, file, cb) =>{
        cb(null, path.join(__dirname, "/public/images/profile_icons"))
    },
    filename: (req, file, cb) => {
    console.log("req.user:", req.user);  // Debug what's available
    const userId = req.user?.customer_id || 'unknown';
    const uniqueName = `${userId}-${Date.now()}${path.extname(file.originalname)}`
    cb(null, uniqueName)
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image/")){
        cb(null, true);
    } else{
        cb(new Error("Only image files are allowed"), false)
    }
};

export const uploadProfileImage = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024
    }
});