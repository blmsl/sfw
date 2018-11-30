import * as deleteItem from './delete-media-item';
import * as generateThumbnails from './generate-thumbnails';

export const deleteMediaCron = deleteItem.deleteMediaItemCron;
export const generateThumbnailCron = generateThumbnails.generateThumbnails;
