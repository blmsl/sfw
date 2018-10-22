export const MENUITEMS = [
  {
    state: '/',
    name: 'dashboard',
    type: 'link',
    icon: 'dashboard',
    minRole: 'editor'
  },
  {
    state: 'newsletter',
    name: 'newsletter',
    type: 'link',
    icon: 'email',
    minRole: 'admin'
  },
  {
    state: 'calendar',
    name: 'event',
    type: 'link',
    icon: 'event',
    minRole: 'editor'
  },
  {
    state: 'uploader',
    name: 'uploader',
    type: 'link',
    icon: 'file_upload',
    minRole: 'editor'
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
    ],
    minRole: 'editor'
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
        state: 'table',
        name: 'table',
        icon: 'event_note'
      },
      {
        state: 'create',
        name: 'create',
        icon: 'create'
      }
    ],
    minRole: 'editor'
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
    ],
    minRole: 'admin'
  },
  {
    state: 'clubs',
    name: 'club',
    type: 'link',
    icon: 'business',
    minRole: 'admin'
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
    ],
    minRole: 'admin'
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
        icon: 'list'
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
    ],
    minRole: 'admin'
  },
  {
    state: 'settings',
    name: 'setting',
    type: 'link',
    icon: 'settings',
    minRole: 'admin'
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
        icon: 'list'
      },
      {
        state: 'create',
        name: 'create',
        icon: 'euro_symbol'
      }
    ],
    minRole: 'admin'
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
        icon: 'list'
      },
      {
        state: 'fame',
        name: 'fame',
        icon: 'alarm_on'
      },
      {
        state: 'media',
        name: 'media',
        icon: 'cloud_upload'
      },
      {
        state: 'statistics',
        name: 'statistics',
        icon: 'trending_up'
      }
    ],
    minRole: 'editor'
  },
  {
    state: 'users',
    name: 'user',
    icon: 'people',
    type: 'link',
    minRole: 'admin'
  }
];
