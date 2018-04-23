import { IMatch } from './match.interface';
import { ILocation } from './location.interface';
import { ITeam } from './team/team.interface';
import { ICategory } from './category.interface';
import { ITag } from './tag.interface';
import { ISeason } from './season.interface';
import { ICreation } from './creation.interface';
import { IPublication } from './publication.interface';

export interface IArticle {

  id?: string;
  title: string;
  subTitle?: string;

  postImage?: string;
  postURL?: string;

  text: string;

  articleDate?: string;

  creation: ICreation;
  publication?: IPublication;

  assignedCategories?: ICategory[];

  assignedTags?: ITag[];
  assignedLocation?: ILocation;
  assignedTeams?: ITeam[];


  assignedSeason?: ISeason;
  assignedMatch?: IMatch;

  isFeaturedPost?: boolean;

  social?: {
    provider: {
      type: string; // local, facebook, twitter etc.
      description: string;
      imageURL: string;
      title: string;
    }[];
  }[];

  meta: {
    main: {
      description: string;
      title: string;
    },
    facebook: {
      description: string;
      title: string;
    },
    twitter: {
      description: string;
      title: string;
    }
  };

}
