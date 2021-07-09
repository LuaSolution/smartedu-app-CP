import { adminRoot } from '.'
// import { UserRole } from 'helpers/authHelper'

const data = [
  // Dashboard
  {
    id: 'dashboards',
    icon: 'simple-icon-grid',
    label: 'menu.default',
    to: `${adminRoot}/dashboards/default`
    // roles: [UserRole.Admin, UserRole.Editor],
  },
  // Khảo sát
  {
    id: 'surveys',
    icon: 'simple-icon-calculator',
    label: 'menu.surveys',
    to: `${adminRoot}/surveys`,
    // roles: [UserRole.Admin, UserRole.Editor],
    subs: [
      {
        icon: 'simple-icon-calculator',
        label: 'survey.list',
        to: `${adminRoot}/surveys/default`,
        // roles: [UserRole.Admin],
      },
      {
        icon: 'simple-icon-speech',
        label: 'survey.questions',
        to: `${adminRoot}/surveys/questions`,
        // roles: [UserRole.Admin],
      },
      {
        icon: 'simple-icon-grid',
        label: 'survey.categories',
        to: `${adminRoot}/surveys/question-categories`,
        // roles: [UserRole.Admin],
      }
    ],
  },
  // Người dùng
  {
    id: 'users',
    icon: 'simple-icon-people',
    label: 'menu.users',
    to: `${adminRoot}/users`,
    // roles: [UserRole.Admin, UserRole.Editor],
    subs: [
      {
        icon: 'simple-icon-user',
        label: 'managers.users',
        to: `${adminRoot}/users/list`,
        // roles: [UserRole.Admin],
      },
      {
        icon: 'simple-icon-people',
        label: 'managers.partners',
        to: `${adminRoot}/users/partners`,
        // roles: [UserRole.Editor],
      },
      {
        icon: 'simple-icon-organization',
        label: 'managers.areas',
        to: `${adminRoot}/users/areas`,
        // roles: [UserRole.Editor],
      },
      {
        icon: 'simple-icon-organization',
        label: 'managers.departments',
        to: `${adminRoot}/users/departments`,
        // roles: [UserRole.Editor],
      },
      {
        icon: 'simple-icon-flag',
        label: 'managers.positions',
        to: `${adminRoot}/users/positions`,
        // roles: [UserRole.Editor],
      },
      {
        icon: 'simple-icon-lock',
        label: 'managers.permissions',
        to: `${adminRoot}/users/permissions`,
        // roles: [UserRole.Editor],
      },
      {
        icon: 'simple-icon-lock',
        label: 'managers.onebyone',
        to: `${adminRoot}/users/mentor-calls`,
        // roles: [UserRole.Editor],
      }
    ],
  },
  // Khóa học
  {
    id: 'managers',
    icon: 'simple-icon-layers',
    label: 'menu.managers',
    to: `${adminRoot}/managers`,
    // roles: [UserRole.Admin, UserRole.Editor],
    subs: [
      {
        icon: 'simple-icon-note',
        label: 'managers.courses',
        to: `${adminRoot}/managers/courses`,
        // roles: [UserRole.Editor],
      },
      {
        icon: 'simple-icon-layers',
        label: 'managers.groups',
        to: `${adminRoot}/managers/course-groups`,
        // roles: [UserRole.Editor],
      },
      {
        icon: 'simple-icon-feed',
        label: 'managers.news',
        to: `${adminRoot}/managers/news`,
        // roles: [UserRole.Editor],
      },
      {
        icon: 'simple-icon-question',
        label: 'managers.qanda',
        to: `${adminRoot}/managers/qanda`,
        // roles: [UserRole.Editor],
      },
      {
        icon: 'simple-icon-calendar',
        label: 'managers.offline-schedule',
        to: `${adminRoot}/managers/offline-schedule`,
        // roles: [UserRole.Editor],
      },
      {
        icon: 'simple-icon-graduation',
        label: 'managers.certificate-issuance',
        to: `${adminRoot}/managers/certificate-issuance`,
        // roles: [UserRole.Editor],
      }
    ],
  },
  // Giao dịch
  {
    id: 'transactions',
    icon: 'simple-icon-handbag',
    label: 'menu.transactions',
    to: `${adminRoot}/transactions`,
    subs: [
      {
        icon: 'simple-icon-handbag',
        label: 'transactions.orders',
        to: `${adminRoot}/transactions/orders`,
      }
    ],
  },
  // Kỳ thi
  {
    id: 'exams',
    icon: 'simple-icon-event',
    label: 'menu.exam',
    to: `${adminRoot}/exams`,
    // roles: [UserRole.Admin, UserRole.Editor],
    subs: [
      {
        icon: 'simple-icon-graduation',
        label: 'managers.exam',
        to: `${adminRoot}/exams/default`,
        // roles: [UserRole.Admin],
      },
      {
        icon: 'simple-icon-notebook',
        label: 'managers.tests',
        to: `${adminRoot}/exams/questions`,
        // roles: [UserRole.Admin],
      },
      {
        icon: 'simple-icon-book-open',
        label: 'managers.test-result',
        to: `${adminRoot}/managers/test-result`,
        // roles: [UserRole.Editor],
      }
    ],
  }, // Báo cáo
  {
    id: 'analytics',
    icon: 'simple-icon-chart',
    label: 'menu.analytics',
    to: `${adminRoot}/analytics`,
    // roles: [UserRole.Admin, UserRole.Editor],
    subs: [
      {
        icon: 'simple-icon-chart',
        label: 'menu.bao-cao-tuan',
        to: `${adminRoot}/analytics/bao-cao-tuan`,
        // roles: [UserRole.Admin],
      },
      {
        icon: 'simple-icon-control-pause',
        label: 'menu.bao-cao-chi-tiet',
        to: `${adminRoot}/analytics/bao-cao-chi-tiet`,
        // roles: [UserRole.Admin],
      },
      {
        icon: 'simple-icon-graph',
        label: 'menu.bang-diem-cuoi-khoa',
        to: `${adminRoot}/analytics/bang-diem-cuoi-khoa`,
        // roles: [UserRole.Admin],
      },
      {
        icon: 'simple-icon-pie-chart',
        label: 'menu.chart',
        to: `${adminRoot}/analytics/chart`,
        // roles: [UserRole.Admin],
      }
    ],
  }, // Settings
  {
    id: 'settings',
    icon: 'simple-icon-settings',
    label: 'menu.settings',
    to: `${adminRoot}/settings`,
    // roles: [UserRole.Admin, UserRole.Editor],
    subs: [
      {
        icon: 'simple-icon-rocket',
        label: 'settings.systems',
        to: `${adminRoot}/settings/default`,
        // roles: [UserRole.Admin],
      },
      {
        icon: 'simple-icon-question',
        label: 'settings.form-consultings',
        to: `${adminRoot}/settings/form-consultings`
      }
    ],
  }
]
export default data
