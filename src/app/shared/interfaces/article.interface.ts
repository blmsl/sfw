import { IMatch } from './match/match.interface';
import { ILocation } from './location/location.interface';
import { ITeam } from './team/team.interface';
import { ICategory } from './category.interface';
import { ITag } from './tag.interface';
import { ICreation } from './creation.interface';
import { IPublication } from './publication.interface';
import * as firebase from 'firebase';

export interface IArticle {

  id?: string;
  title: string;
  subTitle?: string;
  excerpt?: string;

  postImage?: string;
  postURL?: string;

  text?: string;

  articleDate?: string;

  creation: ICreation;
  publication?: IPublication;

  assignedCategories?: ICategory[];

  assignedTags?: ITag[];
  assignedLocation?: ILocation;
  assignedTeams?: ITeam[];

  soccerWatchLink?: string;
  assignedMatch?: IMatch;

  isFeaturedPost?: boolean;

  meta?: {
    main?: {
      description: string;
      title: string;
      scheduled: boolean;
    },
    facebook?: {
      description: string;
      title: string;
      scheduled: boolean;
    },
    twitter?: {
      description: string;
      title: string;
      scheduled: boolean;
    },
    instagram?: {
      description: string;
      title: string;
      scheduled: boolean;
    },
    youtube?: {
      description: string;
      title: string;
      scheduled: boolean;
    }
  };

}
