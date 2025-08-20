const columns = [
  { name: 'number', label: 'Número', field: 'number', align: 'left' },
  { name: 'customer', label: 'Cliente', field: row => row?.customer.fullName, align: 'left' },
  { name: 'reading', label: 'Leitura', field: 'reading', align: 'right' },
  { name: 'watermeter', label: 'Hidrômetro', field: row => row?.watermeter.number, align: 'left' },
  { name: 'type', label: 'Tipo', field: row => row?.type.name, align: 'center', sortable: true },
  { name: 'actions', label: 'Ações', field: 'actions', align: 'center' }
]

export default columns
