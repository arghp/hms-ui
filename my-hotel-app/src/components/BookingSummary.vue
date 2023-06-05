<template>
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
    <v-card-text v-if="additionalOptions" style="font-size: 18px">
      <span style="color: #5CA277"> Additional requests: </span> {{this.additionalOptions}}
    </v-card-text>
  </v-card>
  <v-card-title style="margin: 2em; font-size: 22px; color:#5CA277; font-weight: bold;">
    Total Price:  {{this.pricePerNight}} * 5
  </v-card-title>
</template>

<script>
export default {
  props: ['room', 'nGuests', 'checkInDate', 'checkOutDate', 'pricePerNight', 'additionalOptions'],
  data: () => ({
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