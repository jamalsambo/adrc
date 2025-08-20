const customerRoutes = [
 {path: 'customers', name: 'customers', component: () => import('../pages/List.vue')},
 {path: 'customers/new', name: 'customers-new', meta: {title: 'customers new'}, component: () => import('../pages/CustomerForm.vue')},
 {path: 'customers/:id/edit', name: 'customers-edit', meta: {title: 'customers edit'}, component: () => import('../pages/CustomerForm.vue')},

];

export default customerRoutes;
