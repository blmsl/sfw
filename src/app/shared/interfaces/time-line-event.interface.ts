import { IArticle } from './article.interface';
import { IMediaItem } from './media/media-item.interface';

export interface ITimeLineEvent {

  title: string;
  subTitle?: string;
  text?: string;

  icon?: string;
  color?: string;

  assignedMediaItem?: IMediaItem;
  assignedArticle?: IArticle;

  startDate?: {
    nanoseconds: number;
    seconds: number;
  };
  endDate?: {
    nanoseconds: number;
    seconds: number;
  };

  creationAt?: any;
  creationBy?: string;
}
