const userRoutes = [
 {path: '/user/:userId/manage-account', name: 'manage-account', meta: {title: 'Manage account'}, component: () => import('../pages/Create.vue')},
];

export default userRoutes;
