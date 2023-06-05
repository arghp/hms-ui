<template>

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


</template>

<script>
export default {
  props: [
    'rooms',
    'nGuests',
    'checkInDate',
    'checkOutDate',
    'additionalOptions',
    'guestRequests'
  ],
  data: () => ({
    nNights: null,
    pricePerNight: '',
    totalStayPrice: null,
  }),
  mounted() {
    this.nNights = this.numberOfNights(this.checkInDate, this.checkOutDate)
    this.totalStayPrice = this.calculateTotalPrice()
  },
  methods: {
    numberOfNights(startDate, endDate){
      console.log('calculate number of nights')
      console.log('startDate', startDate)
      console.log('endDate', endDate)
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
</style>
