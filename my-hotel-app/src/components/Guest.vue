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
        <PersonalInformation
          v-if="showPersonalCard"
          @getPersonalInfo="getPersonalInformation"
        >

        </PersonalInformation>
        <BillingInofrmation
          v-if="showBillingCard"
          @getBillingInfo="getBillingInformation"
        >
        </BillingInofrmation>
      </v-col>


    </v-row>

  </v-container>


</template>

<script>

  import PersonalInformation from "@/components/PersonalInformation.vue";
  import BillingInofrmation from "@/components/BillingInofrmation.vue";



export default {
  components: {
    PersonalInformation,
    BillingInofrmation
  },
  data: () => ({
    date: '2018-03-02',
    contactGuest: null,
    showPersonalCard: true,
    showBillingCard: false,
    showReviewCard: false,
    personalInfo: false,
    billingInfo: false,
    reviewInfo: false,
    guest: {},
  }),

  methods: {
    getPersonalInformation(guest){
      this.guest = guest;
      this.personalInfo = true;
      this.showPersonalCard = false;
      this.showBillingCard = true;
    },

    getBillingInformation(card){
      this.card = card;
      this.billingInfo = true;
      this.showBillingCard = false;
      this.showReviewCard = true;
      console.log('showBillingCard', this.showBillingCard)
    }

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
