import path, { extname, join } from 'path';
import { existsSync, mkdirSync } from 'fs';
import { diskStorage } from 'multer';
import { v4 as uuid } from 'uuid';
import { HttpException, HttpStatus } from '@nestjs/common';

// Multer configuration
export const multerConfig = {
  dest: join(__dirname, '../../../src/uploads'),
};

// Multer upload options
export const singleMulterOptions = {
  // Enable file size limits
  // limits: {
  //   fileSize: +process.env.MAX_FILE_SIZE,
  // },
  // Check the mimetypes to allow for upload
  fileFilter: (req: any, file: any, cb: any) => {
    const fileType = file.originalname.split('.')[1];
    if (['xlsx', 'xlsm', 'xlsb', 'xltx'].includes(fileType)) {
      // Allow storage of file
      cb(null, true);
    } else {
      // Reject file
      cb(
        new HttpException(
          `Unsupported file type ${extname(
            file.originalname,
          )}. accepted formats are (xlsx, xlsm, xlsb, xltx)`,
          HttpStatus.BAD_REQUEST,
        ),
        false,
      );
    }
  },
  // Storage properties
  storage: diskStorage({
    // Destination storage path details
    destination: (req: any, file: any, cb: any) => {
      const uploadPath = multerConfig.dest;
      // Create folder if doesn't exist
      if (!existsSync(uploadPath)) {
        mkdirSync(uploadPath);
      }
      cb(null, uploadPath);
    },
    // File modification details
    filename: (req: any, file: any, cb: any) => {
      // Calling the callback passing the random name generated with the original extension name
      const fileName = `${uuid()}${extname(file.originalname)}`;
      file.fileName = fileName;
      cb(null, fileName);
    },
  }),
};
