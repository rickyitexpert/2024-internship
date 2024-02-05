<template>
  <div>

    <q-table :rows="table.rows" :columns="tableConfig.columns">
      <template v-slot:top>
        <div class="row items-center">
          <div class="text-h5">{{ module_name }}</div>
          <div><q-btn @click="form.open = true" class="q-mx-md" color="green" rounded unelevated label="Add" icon="add" />
          </div>
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
          <div class="text-h6">Create {{ module_name }}</div>
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
</template>
<script>
import tableConfigs from 'src/composables/tableConfigurations.js'
export default {
  props: ['module_name'],
  data () {
    return {
      form: {
        open: false,
        data: {},
        mode: null
      },
      tableConfigs,
      table: {

        rows: []
      }

    }
  },
  computed: {
    tableConfig () {
      return this.tableConfigs[this.module_name]
    }
  },
  watch: {
    module_name (val, oldVal) {
      this.fetchData()
    },
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
      let response = await this.$axios.get('http://localhost:8055/items/' + this.module_name)
      this.table.rows = response.data.data
    },
    async submit () {
      let response = await this.$axios.post('http://localhost:8055/items/' + this.module_name, this.form.data)
      this.form.open = false
      this.fetchData()
    },
    deleteData (id) {
      this.$q.dialog({
        message: 'Are you sure, you want to delete data?',
        cancel: true,

      }).onOk(async () => {
        let response = await this.$axios.delete('http://localhost:8055/items' + this.module_name + '/' + id)
        this.fetchData()

      })

    },
    async editData (id) {
      let response = await this.$axios.get('http://localhost:8055/items/' + this.module_name + '/' + id)
      this.form.data = response.data.data
      this.form.mode = 'edit'
      this.form.open = true
    },
    async update () {
      let da
      ta = this.form.data
      let id = data.id
      delete data.id
      let response = await this.$axios.patch('http://localhost:8055/items/' + this.module_name + '/' + id, data)
      this.fetchData()
      this.form.open = false
    }
  },
  created () {

    this.fetchData()
  }
}
</script>
