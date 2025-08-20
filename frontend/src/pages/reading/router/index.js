const readingRoutes = [
  {
    path: "/readings",
    name: "readings",
    meta: { title: "Readings" },
    component: () => import("../pages/Readings.vue"),
  },
  {
    path: "/readings/:id",
    name: "reading",
    meta: { title: "Reading" },
    component: () => import("../pages/Reading.vue"),
  },
  {
    path: "/inspections/:inspectionId/readings/watermeter/:id",
    name: "watermeter-reading",
    meta: { title: "Watermeter reading" },
    component: () => import("../pages/WatermeterReading.vue"),
  },
  {
    path: "/inspections/:inspectionId/readings/watermeter/:id/qrcode",
    name: "reading-qrcoce",
    meta: { title: "Readings QrCode" },
    component: () => import("../pages/ReaderQrCode.vue"),
  },
];

export default readingRoutes;
