const columns = [
  { name: 'number', label: 'Inspeção', field: 'number' },
  { name: 'month', label: 'Mes', field: 'month' },
  { name: 'type', label: 'Tipo inspeção', field: (row) => row.type?.name || 'NA', sortable: true },
  { name: 'actions', label: 'Ações', field: 'actions', align: 'center' }
]

export default columns
