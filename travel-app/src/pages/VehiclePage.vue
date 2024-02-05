<template>
  <q-page class="q-pa-md bg-grey-2">
    <div clas="row q-pa-sm">
      <q-table :rows="table.rows" :columns="table.columns">
        <template v-slot:top>
          <div class="row items-center">
            <div class="text-h5">Vehicles</div>
            <div><q-btn @click="form.open = true" class="q-mx-md" color="green" rounded unelevated label="Add"
                icon="add" /></div>
          </div>
        </template>
        <template v-slot:body-cell-actionControl="props">
          <q-td>
            <div class="row">
              <q-btn color="warning" dense unelevated icon="edit" @click="editData(props.row.id)" />
              <q-btn color="negative" dense unelevated icon="delete" @click="deleteData(props.row.id)" />
            </div>
          </q-td>

        </template>
      </q-table>
      <q-dialog v-model="form.open">
        <q-card class="q-pa-md">
          <div class="row">
            <div class="text-h6">Create Vehicles</div>
          </div>
          <q-form>
            <pre>
            {{ form.data }}
            </pre>
            <q-input label="Number" v-model="form.data.number" />
            <q-input label="Brand Name" v-model="form.data.brand" />
            <q-input label="Model" v-model="form.data.model" />
            <q-btn v-if="form.mode !== 'edit'" class="q-my-lg" color="primary" type="button" @click="submit"
              label="Submit" />
            <q-btn v-if="form.mode === 'edit'" class="q-my-lg" color="warning" type="button" @click="update"
              label="Update" />
          </q-form>
        </q-card>
      </q-dialog>
    </div>
  </q-page>
</template>
<script>
export default {
  data () {
    return {
      form: {
        open: false,
        data: {},
        mode: null
      },
      table: {
        columns: [
          { label: 'Brand', field: 'brand', align: 'left' },
          { label: 'Model', field: 'model', align: 'left' },
          { label: 'Number', field: 'number', align: 'left' },
          { name: 'actionControl' }
        ],
        rows: []
      }

    }
  },
  watch: {

    'form.open': {
      handler (val, oldVal) {
        if (!val) {
          this.form.data = {}
          this.form.mode = null
        }
      }
    }
  },
  methods: {
    async fetchData () {
      let response = await this.$axios.get('http://localhost:8055/items/vehicles')
      this.table.rows = response.data.data
    },
    async submit () {
      let response = await this.$axios.post('http://localhost:8055/items/vehicles', this.form.data)
      this.form.open = false
      this.fetchData()
    },
    deleteData (id) {
      this.$q.dialog({
        message: 'Are you sure, you want to delete data?',
        cancel: true,

      }).onOk(async () => {
        let response = await this.$axios.delete('http://localhost:8055/items/vehicles/' + id)
        this.fetchData()

      })

    },
    async editData (id) {
      let response = await this.$axios.get('http://localhost:8055/items/vehicles/' + id)
      this.form.data = response.data.data
      this.form.mode = 'edit'
      this.form.open = true
    },
    async update () {
      let data = this.form.data
      let id = data.id
      delete data.id
      let response = await this.$axios.patch('http://localhost:8055/items/vehicles/' + id, data)
      this.fetchData()
      this.form.open = false
    }
  },
  created () {

    this.fetchData()
  }
}
</script>
