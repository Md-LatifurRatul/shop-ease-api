import multer from 'multer';

//memory storage to store image temporarily in memory

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

export default upload;