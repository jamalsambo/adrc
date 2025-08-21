const anomalyRoutes = [
 {path: 'anomalies', name: 'anomalies', component: () => import('../pages/List.vue')},
 {path: 'anomalies/new', name: 'anomalies-new', meta: {title: 'Anomalies new'}, component: () => import('../pages/Create.vue')},
 {path: 'anomalies/:id/edit', name: 'anomalies-edit', meta: {title: 'Anomalies edit'}, component: () => import('../pages/Create.vue')},

];

export default anomalyRoutes;
