<template>
  <v-container class="section-container">
    <v-row>
      <v-col cols="6"><h1 class="section-header"> Guest </h1></v-col>

    </v-row>

    <v-row>
      <v-col cols="3" >
        <v-list
          rounded
          style="background-color: transparent; margin: 14em 4em 4em;"
        >
          <v-list-item-group
            mandatory
            color="#5CA277"
            v-model="guestMenu"
          >
            <v-list-item >
              <v-btn
                class="guest-list-btn"
                @click="showPersonal"
              >
               1. Personal Information

              </v-btn>
            </v-list-item>
            <v-list-item >
                <v-btn
                  class="guest-list-btn"
                  :disabled="!personalInfo"
                  @click="showBilling"
                >
                  2. Billing Information
              </v-btn>
            </v-list-item>
            <v-list-item >
              <v-btn
                  class="guest-list-btn"
                  :disabled="!personalInfo || !billingInfo"
                  @click="showReview"
                >
                  3. Review & Submit

              </v-btn>
            </v-list-item>

          </v-list-item-group>

        </v-list>
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
    },
    showPersonal(){
      this.showBillingCard=false;
      this.showReviewCard=false;
      this.showPersonalCard=true;
    },
    showBilling(){
      this.showPersonalCard=false;
      this.showReviewCard=false;
      this.showBillingCard=true;
    },
    showReview(){
      this.showPersonalCard=false;
      this.showBillingCard=false;
      this.showReviewCard=true;
    },

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

.guest-list-btn{
  width: 100%;
  color: #5CA277;
  font-weight: bold;

}
</style>
