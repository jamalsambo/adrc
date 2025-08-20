import authGuard from "./authGuard";
import {
  employeeRoutes,
  customerRoutes,
  watermeterRoutes,
  inspectionRoutes,
  readingRoutes,
  userRoutes,
} from "./pageRoutes";

const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    beforeEnter: authGuard,
    children: [
      { path: "", name: "home", component: () => import("pages/Home.vue") },
      ...employeeRoutes,
      ...customerRoutes,
      ...watermeterRoutes,
      ...inspectionRoutes,
      ...readingRoutes,
      ...userRoutes,
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/Error404.vue"),
  },
  {
    path: "/Maintenance",
    component: () => import("pages/Maintenance.vue"),
  },
  {
    path: "/login",
    name: "login",
    beforeEnter: authGuard,
    component: () => import("pages/auth/pages/Login.vue"),
  },
];

export default routes;
