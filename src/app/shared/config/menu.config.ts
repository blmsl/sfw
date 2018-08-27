export const MENUITEMS = [
  {
    state: '/',
    name: 'dashboard',
    type: 'link',
    icon: 'dashboard'
  },
  {
    state: 'newsletter',
    name: 'newsletter',
    type: 'link',
    icon: 'email'
  },
  {
    state: 'calendar',
    name: 'event',
    type: 'link',
    icon: 'event'
  },
  {
    state: 'uploader',
    name: 'uploader',
    type: 'link',
    icon: 'file_upload'
  },
  {
    state: 'articles',
    name: 'article',
    type: 'sub',
    icon: 'text_format',
    children: [
      {
        state: '',
        name: 'list',
        icon: 'textsms'
      },
      {
        state: 'dashboard',
        name: 'dashboard',
        icon: 'trending_up'
      },
      {
        state: 'create',
        name: 'create',
        icon: 'wrap_text'
      }
    ]
  },
  {
    state: 'matches',
    name: 'matches',
    type: 'sub',
    icon: 'event',
    children: [
      {
        state: '',
        name: 'dashboard',
        icon: 'trending_up'
      },
      {
        state: 'list',
        name: 'list',
        icon: 'event_note'
      },
      {
        state: 'edit/new',
        name: 'create',
        icon: 'create'
      }
    ]
  },
  {
    state: 'categories',
    name: 'category',
    type: 'sub',
    icon: 'list',
    children: [
      {
        state: 'list',
        name: 'list',
        icon: 'textsms'
      },
      {
        state: 'statistics',
        name: 'statistics',
        icon: 'trending_up'
      }
    ]
  },
  {
    state: 'clubs',
    name: 'club',
    type: 'link',
    icon: 'business'
  },
  {
    state: 'locations',
    name: 'location',
    type: 'sub',
    icon: 'location_on',
    children: [
      {
        state: 'list',
        name: 'list',
        icon: 'list'
      },
      {
        state: 'statistics',
        name: 'statistics',
        icon: 'trending_up'
      },
      {
        state: 'map',
        name: 'map',
        icon: 'map'
      }
    ]
  },
  {
    state: 'members',
    name: 'member',
    type: 'sub',
    icon: 'nature_people',
    children: [
      {
        state: 'list',
        name: 'main',
        icon: 'list',
      },
      {
        state: 'statistics',
        name: 'statistics',
        icon: 'trending_up'
      },
      {
        state: 'fame',
        name: 'fame',
        icon: 'alarm_on'
      }
    ]
  },
  {
    state: 'settings',
    name: 'setting',
    type: 'link',
    icon: 'settings'
  },
  {
    state: 'sponsors',
    name: 'sponsor',
    type: 'sub',
    icon: 'euro_symbol',
    children: [
      {
        state: 'list',
        name: 'list',
        icon: 'list',
      },
      {
        state: 'create',
        name: 'create',
        icon: 'euro_symbol'
      }
    ]
  },
  {
    state: 'teams',
    name: 'team',
    type: 'sub',
    icon: 'people_outline',
    children: [
      {
        state: 'list',
        name: 'main',
        icon: 'list',
      },
      {
        state: 'fame',
        name: 'fame',
        icon: 'alarm_on'
      }/* ,
      {
        state: 'media',
        name: 'media',
        icon: 'cloud_upload'
      },
      {
        state: 'statistics',
        name: 'statistics',
        icon: 'trending_up'
      } */
    ]
  },
  {
    state: 'users',
    name: 'user',
    icon: 'people',
    type: 'sub',
    children: [
      {
        state: 'list',
        name: 'main',
        icon: 'list',
      }
    ]
  }
];
