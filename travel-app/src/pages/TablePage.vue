<template>
  <q-page class="q-pa-md bg-grey-2">
    <div clas="row q-pa-sm">
      <q-table :rows="rows" :columns="columns">
        <template v-slot:top>
          <div class="text-h6">Vehicles</div>
        </template>
      </q-table>
    </div>
  </q-page>
</template>
<script>
export default {
  data () {
    return {
      columns: [
        { label: 'Brand', field: 'brand', align: 'left' },
        { label: 'Model', field: 'model', align: 'left' },
        { label: 'Number', field: 'number', align: 'left' },
      ],
      rows: []
    }
  },
  methods: {
    async fetchData () {
      let response = await this.$axios.get('http://localhost:8055/items/vehicles')
      this.rows = response.data.data
    }
  },
  created () {
    this.fetchData()
  }
}
</script>
