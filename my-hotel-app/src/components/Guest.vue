<template>
  <v-container class="section-container" >
    <v-row>
      <v-col cols="6"><h1 class="section-header"> Guest </h1></v-col>

    </v-row>

    <v-row style="display: flex; ">

        <v-list v-if="showMsg===''"
          rounded
          class="guest-list"
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

        <div style="flex: 2;">
          <PersonalInformation
            v-if="showPersonalCard"
            @getPersonalInfo="getPersonalInformation"
            :guest="guest"
          >

          </PersonalInformation>
          <BillingInofrmation
            v-if="showBillingCard"
            @getBillingInfo="getBillingInformation"
            :card="card"
          >
          </BillingInofrmation>

          <v-col>
            <v-card
              v-if="showReviewCard"
              elevation="0"
              rounded
              class="info-card"
            >
            <BookingSummary
                :rooms="rooms"
                :nGuests="nGuests"
                :checkInDate="checkInDate"
                :checkOutDate="checkOutDate"
                :additionalOptions="additionalOptions"
                :guestRequests="guestRequests"
            >

            </BookingSummary>


              <v-card-item style="display: flex; justify-content: center;">
                <v-checkbox
                  v-model="accept"
                  label="I approve"
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

        </div>


    </v-row>

  </v-container>


</template>

<script>

import PersonalInformation from "@/components/PersonalInformation.vue";
import BillingInofrmation from "@/components/BillingInofrmation.vue";
import BookingSummary     from "@/components/BookingSummary.vue";
import {mapGetters}       from "vuex";



export default {
  components: {
    PersonalInformation,
    BillingInofrmation,
    BookingSummary
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

    nGuests: '',
    checkInDate: '',
    checkOutDate: '',

    pricePerNight: '',

    additionalOptions: '',
    accept: false,
    payed: false,
    showMsg: '',
    rooms:{},
  }),

  computed:{
    ...mapGetters([
      'getCheckInDate',
      'getCheckOutDate',
      'getTotalGuests',
      'getChoosenRooms'
    ]),

  },
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
      console.log('getTotalGuests', this.getTotalGuests)
      console.log('getCheckInDate', this.getCheckInDate)
      console.log('getCheckOutDate', this.getCheckOutDate)
      console.log('getChoosenRooms', JSON.parse(JSON.stringify(this.getChoosenRooms)))
      this.nGuests = this.getTotalGuests
      this.checkInDate = this.getCheckInDate
      this.checkOutDate = this.getCheckOutDate

      this.rooms = JSON.parse(JSON.stringify(this.getChoosenRooms))

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
      console.log('getCheckInDate', this.getCheckInDate)
      console.log('getCheckOutDate', this.getCheckOutDate)
      this.checkInDate=this.getCheckInDate
      this.checkOutDate=this.getCheckOutDate
      console.log('checkin date', this.checkInDate)
      console.log('checkout date', this.checkOutDate)


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
      this.$emit('payed')
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
.guest-list{
  background-color: transparent;
  flex: 1;
  align-self: center;
  margin-top: -2em;
}

.guest-list-btn{
  width: 100%;
  color: #5CA277;
  font-weight: bold;

}
</style>
