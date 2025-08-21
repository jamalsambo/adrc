const watermeterRoutes = [
 {path: 'watermeters', name: 'watermeters', component: () => import('../pages/List.vue')},
 {path: 'watermeters/new', name: 'watermeters-new', meta: {title: 'Watermeters new'}, component: () => import('../pages/WatermeterForm.vue')},
 {path: 'watermeters/:id/edit', name: 'watermeters-edit', meta: {title: 'Watermeters edit'}, component: () => import('../pages/WatermeterForm.vue')},
 {path: 'watermeters/:id/associete', name: 'watermeters-associete', meta: {title: 'Watermeters associete'}, component: () => import('../pages/WatermeterAssignClient.vue')},
 {path: 'watermeters/:id/readings', name: 'watermeters-readings', meta: {title: 'Watermeters readings'}, component: () => import('../pages/WatermeterReadings.vue')},
  {path: 'watermeters/:id/info', name: 'watermeters-info', meta: {title: 'Watermeters info'}, component: () => import('../pages/WatermeterAssignClient.vue')},

];

export default watermeterRoutes;
