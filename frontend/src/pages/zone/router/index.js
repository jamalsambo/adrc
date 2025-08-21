const zoneRoutes = [
 {path: 'zones', name: 'zones', component: () => import('../pages/List.vue')},
 {path: 'zones/new', name: 'zones-new', meta: {title: 'Zones new'}, component: () => import('../pages/Create.vue')},
 {path: 'zones/:id/edit', name: 'zones-edit', meta: {title: 'Zones edit'}, component: () => import('../pages/Create.vue')},

];

export default zoneRoutes;
