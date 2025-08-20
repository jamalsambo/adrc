const inspectionRoutes = [
 {path: 'inspections', name: 'inspections', component: () => import('../pages/List.vue')},
 {path: 'inspections/new', name: 'inspections-new', meta: {title: 'Inspections new'}, component: () => import('../pages/InspectionForm.vue')},
 {path: 'inspections/:id/distribute-watermeter', name: 'inspections-distribute-watermeter', meta: {title: 'Inspections istribute'}, component: () => import('../pages/DistributeWatermeter.vue')},
 {path: 'inspections/:id/distribute-watermeter-list', name: 'inspections-distribute-list', meta: {title: 'Inspections watermeter list'}, component: () => import('../pages/DistributionList.vue')},
];

export default inspectionRoutes;
