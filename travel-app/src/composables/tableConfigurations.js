let tables = {
  customers: {
    columns: [
      { label: 'Name', field: 'name', align: 'left' },
      { label: 'Contact Number', field: 'contact_number', align: 'left' },

      { name: 'actionControl' }
    ],
  },
  vehicles: {
    columns: [
      { label: 'Brand', field: 'brand', align: 'left' },
      { label: 'Model', field: 'model', align: 'left' },
      { label: 'Number', field: 'number', align: 'left' },
      { name: 'actionControl' }
    ],
  }
}

export default tables
