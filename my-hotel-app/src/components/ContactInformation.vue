<template>
  <v-container class="section-container">
    <v-row>
      <v-col cols="6"><h1 class="section-header"> Personal Information </h1></v-col>

    </v-row>

    <v-row>
      <v-col cols="3">

      </v-col>
      <v-col cols="6">
        <GuestInformation></GuestInformation>
      </v-col>


    </v-row>

  </v-container>


</template>

<script>

  import GuestInformation from "@/components/GuestInformation.vue";



export default {
  components: {
    GuestInformation
  },
  data: () => ({
    date: '2018-03-02',
    contactGuest: null,
    stateAbv:['CA', 'PA', 'NY'],
    state: '',
    city: '',
    zipCode: '',
    adress: '',
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


<style>
.info-card{
  border-radius: 12px;

}
.info-title{
  border-bottom: 4px solid #5CA277;
  color: #5CA277;
  margin-bottom: 1em;
  margin-top: 1em;
}
</style>
