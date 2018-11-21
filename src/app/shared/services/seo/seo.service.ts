import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class SeoService {

  constructor(private meta: Meta, private titleService: Title) { }

  generateTags(tags) {
    // defaults
    tags = {
      title: 'Titel der Seite',
      description: 'Beschreibung der Seite',
      image: '',
      slug: '',
      ...tags
    };

    this.titleService.setTitle(tags.title);

    this.meta.updateTag({ name: 'twitter:card', content: 'summary' });
    this.meta.updateTag({ name: 'twitter:site', content: '@sfwinterbach' });
    this.meta.updateTag({ name: 'twitter:title', content: tags.title });
    this.meta.updateTag({ name: 'twitter:description', content: tags.description });
    this.meta.updateTag({ name: 'twitter:image', content: tags.image });

    this.meta.updateTag({ name: 'og:type', content: 'summary' });
    this.meta.updateTag({ name: 'og:site_name', content: 'SF Winterbach e.V.' });
    this.meta.updateTag({ name: 'og:title', content: tags.title });
    this.meta.updateTag({ name: 'og:description', content: tags.description });
    this.meta.updateTag({ name: 'og:image', content: tags.image });
    this.meta.updateTag({ name: 'og:url', content: 'www.SEOSERVICE.de' });
  }

}
