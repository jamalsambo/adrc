const columns = [
  { name: 'number', label: 'Nº de Série', field: 'number', sortable: true },
  { name: 'zone', label: 'Zona de Instalação', field: (row) => row.zone?.name || 'NA', sortable: true },
  { name: 'status', label: 'Estado', field: 'status', sortable: true },
  { name: 'actions', label: 'Ações', field: 'actions', align: 'center' }
]

export default columns
