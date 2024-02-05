
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      {
        path: 'modules',
        component: () => import('pages/ModulePage.vue'),
        children: [
          {
            path: ':module_name',
            component: () => import('components/ModuleComponent.vue'),
            props: true
          }
        ],
      },

    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
