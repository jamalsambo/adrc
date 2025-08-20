const employeeRoutes = [
 {path: 'employees', name: 'employees', component: () => import('../pages/List.vue')},
 {path: 'employees/new', name: 'employee-new', meta: {title: 'Employee new'}, component: () => import('../pages/EmployeeForm.vue')},
 {path: 'employees/:id/edit', name: 'employee-edit', meta: {title: 'Employee edit'}, component: () => import('../pages/EmployeeForm.vue')},
 {path: 'employees/:id/assign-zones', name: 'employee-assign-zones', meta: {title: 'Employee assign zones'}, component: () => import('../pages/AssignZonesToEmployee.vue')},

];

export default employeeRoutes;
