<template>
  <q-page class="bg-grey-2 q-pa-md">
    <div class="row">
      <div class="col-4">
        <q-card class="q-pa-md">
          <div class="row">
            <div class="text-h6">Create Vehicles</div>
          </div>
          <q-form>
            <q-input label="Number" v-model="formData.number" />
            <q-input label="Brand Name" v-model="formData.brand" />
            <q-input label="Model" v-model="formData.model" />
            <q-btn class="q-my-lg" color="primary" type="button" @click="submit" label="Submit" />
          </q-form>
        </q-card>

      </div>
    </div>

  </q-page>
</template>
<script>
export default {
  data () {
    return {
      formData: {}
    }
  },
  methods: {
    async submit () {
      let response = await this.$axios.post('http://localhost:8055/items/vehicles', this.formData)
      console.log(response)
    }
  }
}
</script>
