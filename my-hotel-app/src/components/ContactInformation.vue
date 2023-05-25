<template>
  <v-container>
    <v-card width="70%">
      <v-card-title> Contact Information </v-card-title>
      <v-form v-model="valid">
        <v-text-field
          v-model="firstname"
          :rules="nameRules"
          :counter="10"
          label="First name"
          required
        ></v-text-field>

        <v-text-field
          v-model="lastname"
          :rules="nameRules"
          :counter="10"
          label="Last name"
          required
        ></v-text-field>

        <v-text-field
          v-model="email"
          :rules="emailRules"
          label="E-mail"
          required
        ></v-text-field>

        <v-text-field
          v-model="phone"
          :counter="7"
          label="Phone Number"
          required
        ></v-text-field>

      </v-form>

      <div>
        <v-date-picker
          v-model="date"
          :allowed-dates="allowedDates"
          class="mt-3"
          min="2016-06-15"
          max="2018-03-20"
        ></v-date-picker>
      </div>
    </v-card>
  </v-container>


</template>

<script>
export default {
  data: () => ({
    date: '2018-03-02',
    valid: false,
    firstname: '',
    lastname: '',
    nameRules: [
      value => {
        if (value) return true

        return 'Name is requred.'
      },
      value => {
        if (value?.length <= 10) return true

        return 'Name must be less than 10 characters.'
      },
    ],
    email: '',
    emailRules: [
      value => {
        if (value) return true

        return 'E-mail is requred.'
      },
      value => {
        if (/.+@.+\..+/.test(value)) return true

        return 'E-mail must be valid.'
      },
    ],
    phone:'',
  }),

  methods: {
    allowedDates: val => parseInt(val.split('-')[2], 10) % 2 === 0
  }
}
</script>
