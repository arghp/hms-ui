<template>
  <v-container class="section-container">
    <v-row>
      <v-col cols="6"><h1 class="section-header"> Guest </h1></v-col>

    </v-row>

    <v-row>
      <v-col cols="3" >
        <ul style="margin: 10em 4em 4em;">
          <li style="margin-top: 2em; color: #5CA277;"><h3>1. Personal Information</h3></li>
          <li style="margin-top: 2em; color: #5CA277;"><h3>2. Billing Information</h3></li>
          <li style="margin-top: 2em; color: #5CA277;"><h3>3. Review & Confirm</h3></li>
        </ul>
      </v-col>
      <v-col cols="6">
        <PersonalInformation ref="personalInfoRef"></PersonalInformation>
      </v-col>


    </v-row>

  </v-container>


</template>

<script>

  import PersonalInformation from "@/components/PersonalInformation.vue";



export default {
  components: {
    PersonalInformation
  },
  data: () => ({
    date: '2018-03-02',
    contactGuest: null,
    btnDisabled: false,
  }),

  methods: {


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
