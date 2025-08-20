const columns = [
  { name: "name", label: "Nome", align: "left", field: "fullName", sortable: true },
  {
    name: "dateBirth",
    label: "Date de nascimento",
    align: "left",
    field: "dateBirth",
    sortable: true,
  },
  {
    name: "gender",
    label: "Genero",
    align: "left",
    field: "gender",
    sortable: true,
  },
  { name: "actions", label: "Ações", align: "center", field: "actions" },
];

export default columns
