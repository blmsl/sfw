import { FilterFunction } from '../../services/media/media-uploader.service';

export interface IUploaderOptions {
  allowedMimeType?: Array<string>;
  allowedFileType?: Array<string>;
  filters?: Array<FilterFunction>;
  id?: string;
  itemId: string;
  maxFileSize?: number;
  path?: string;
  queueLimit?: number;
  queueSize?: number;
}
