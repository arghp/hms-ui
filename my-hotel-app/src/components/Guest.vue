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
              <v-card-title class="info-title"> Review </v-card-title>
              <v-card
                elevation="0"
                rounded
                style="margin: 2em;"
              >
                <v-card-text style="font-size: 18px">
                  <span style="color: #5CA277"> Number of guests: </span> {{this.nGuests}}
                </v-card-text>

                <v-card-text style="font-size: 18px">
                    <span style="color: #5CA277"> Check-in Date: </span> {{ this.checkInDate }}
                  </v-card-text>
                  <v-card-text style="font-size: 18px">
                    <span style="color: #5CA277"> Check-out Date: </span> {{this.checkOutDate}}
                  </v-card-text>
                  <v-card-text style="font-size: 18px">
                    <span style="color: #5CA277"> Total nights: </span> {{this.nNights}}
                  </v-card-text>

                <v-card-text v-if="guestRequests" style="font-size: 18px">
                    <span style="color: #5CA277"> Additional requests: </span> {{this.additionalOptions}}
                </v-card-text>

                <v-card v-for="(room, roomId) in rooms" :key="roomId">
                  <v-card-text style="font-size: 18px;">
                    <span style="color: #5CA277"> Room Type: </span> {{room.name}}
                  </v-card-text>

                  <v-card-text style="font-size: 18px;">
                    <span style="color: #5CA277"> Number of rooms: </span> {{room.numRooms}}
                  </v-card-text>

                  <v-card-text style="font-size: 18px">
                    <span style="color: #5CA277"> Price per room per night: </span> {{room.roomPrice}}
                  </v-card-text>


                </v-card>

              </v-card>
              <v-card-title style="margin: 2em; font-size: 22px; color:#5CA277; font-weight: bold;">
                Total Price:  ${{this.totalStayPrice}}
              </v-card-title>
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
  import BillingInofrmation     from "@/components/BillingInofrmation.vue";
  import {mapGetters} from "vuex";



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
    nNights: null,
    pricePerNight: '',
    totalStayPrice: null,
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
      this.nNights = this.numberOfNights(this.checkInDate, this.checkOutDate)
      this.rooms = JSON.parse(JSON.stringify(this.getChoosenRooms))
      this.totalStayPrice = this.calculateTotalPrice()
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
    numberOfNights(startDate, endDate){
      const timeDiff = new Date(endDate).getTime() - new Date(startDate).getTime()

      return Math.floor(timeDiff/(24 * 60 * 60 * 1000))
    },
    calculateTotalPrice(){

      let totalPrice = 0
      for (let k in this.rooms){
        console.log('key ID rom', k)
        let nRooms = parseInt(this.rooms[k]['numRooms'])
        console.log('one room', this.rooms[k])
        console.log('one room numRooms', this.rooms[k]['numRooms'])
        console.log('one room roomPrice', this.rooms[k]['roomPrice'])
        let price = parseInt(this.rooms[k]['roomPrice'].replace(/\D/g, ''))

        console.log('nRooms', nRooms)
        console.log('price', price)
        totalPrice += nRooms * price
        console.log('totalPrice', totalPrice)
      }
      console.log(' total Nights ', this.nNights)
      console.log(' final totalPrice', totalPrice)

      return totalPrice * this.nNights
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
