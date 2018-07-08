import { IMatch } from './match.interface';
import { ILocation } from './location/location.interface';
import { ITeam } from './team/team.interface';
import { ICategory } from './category.interface';
import { ITag } from './tag.interface';
import { ICreation } from './creation.interface';
import { IPublication } from './publication.interface';

export interface IArticle {

  id?: string;
  title: string;
  subTitle?: string;
  excerpt?: string;

  postImage?: string;
  postURL?: string;

  text?: string;

  articleDate?: {
    seconds: number,
    nanoseconds: number
  };

  creation: ICreation;
  publication?: IPublication;

  assignedCategories?: ICategory[];

  assignedTags?: ITag[];
  assignedLocation?: ILocation;
  assignedTeams?: ITeam[];

  soccerWatchLink?: string;
  assignedMatch?: IMatch;

  isFeaturedPost?: boolean;

  social?: {
    provider: {
      type: string; // local, facebook, twitter etc.
      description: string;
      title: string;
    }[];
  }[];

  meta?: {
    main?: {
      description: string;
      title: string;
    },
    facebook?: {
      description: string;
      title: string;
    },
    twitter?: {
      description: string;
      title: string;
    }
  };

}
