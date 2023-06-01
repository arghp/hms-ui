<template>
  <v-container class="section-container">
    <v-row>
      <v-col cols="6"><h1 class="section-header"> Guest </h1></v-col>

    </v-row>

    <v-row>
      <v-col cols="3" >
        <v-list v-if="showMsg===''"
          rounded
          style="background-color: transparent; margin: 14em 4em 4em;"
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

        <v-col>
          <v-card
            v-if="showReviewCard"
            elevation="0"
            rounded
            class="info-card"
          >
            <v-card-title class="info-title"> Review </v-card-title>
            <v-card
              elevation="0"
              rounded
              style="margin: 2em;"
            >
              <v-card-text style="font-size: 18px;">
                <span style="color: #5CA277"> Room: </span> {{this.room}}
              </v-card-text>
              <v-card-text style="font-size: 18px">
                <span style="color: #5CA277"> Number of guests: </span> {{this.nGuests}}
              </v-card-text>
              <v-card-text style="font-size: 18px">
                <span style="color: #5CA277"> Check-in Date: </span> {{this.checkInDate}}
              </v-card-text>
              <v-card-text style="font-size: 18px">
                <span style="color: #5CA277"> Check-out Date: </span> {{this.checkOutDate}}
              </v-card-text>
              <v-card-text style="font-size: 18px">
                <span style="color: #5CA277"> Price per night: </span> {{this.pricePerNight}}
              </v-card-text>
              <v-card-text v-if="guestRequests" style="font-size: 18px">
                <span style="color: #5CA277"> Additional requests: </span> {{this.additionalOptions}}
              </v-card-text>
            </v-card>
            <v-card-title style="margin: 2em; font-size: 22px; color:#5CA277; font-weight: bold;">
              Total Price:  {{this.pricePerNight}} * 5
            </v-card-title>
            <v-card-item style="display: flex; justify-content: center;">
              <v-checkbox
                v-model="accept"
                label="I accept"
                color="#5CA277"
                hide-details
              >
              </v-checkbox>

            </v-card-item>
            <v-card-item style="display: flex; justify-content: center;">
              <v-btn class="section-btn" :disabled="!accept" @click="payment">
                PAY
              </v-btn>
            </v-card-item>
          </v-card>

          <span v-if="showMsg!==''" style="color:#5CA277;">{{this.showMsg}}</span>


        </v-col>

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
    showPersonalCard: true,
    showBillingCard: false,
    showReviewCard: false,
    personalInfo: false,
    billingInfo: false,
    reviewInfo: false,
    guest: {},
    card: {},
    guestRequests: false,
    totalPrice: '',
    room: 'Standard Room',
    nGuests: '',
    checkInDate: '',
    checkOutDate: '',
    pricePerNight: '',
    additionalOptions: '',
    accept: false,
    payed: false,
    showMsg: '',
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
      this.showBillingCard = false;
      this.showReviewCard = false;
      this.showPersonalCard = true;
    },
    showBilling(){
      this.showPersonalCard = false;
      this.showReviewCard = false;
      this.showBillingCard = true;
    },
    showReview(){
      this.showPersonalCard = false;
      this.showBillingCard = false;
      this.showReviewCard = true;
    },
    payment(){
      this.payed = true;
      //todo: add API call to process payment information

      this.showPersonalCard = false;
      this.showBillingCard = false;
      this.showReviewCard = false;

      this.showMsg = 'You successfully booked your stay with us. You will get an email confirmation shortly.'
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
