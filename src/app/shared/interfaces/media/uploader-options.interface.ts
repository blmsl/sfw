import { FilterFunction } from '../../services/media/media-uploader.service';

export interface IUploaderOptions {
  allowedMimeType?: Array<string>;
  allowedFileType?: Array<string>;
  filters?: Array<FilterFunction>;
  assignedObjects?: {};
  itemId: string;
  maxFileSize?: number;
  // path?: string;
  queueLimit?: number;
  queueSize?: number;
}
