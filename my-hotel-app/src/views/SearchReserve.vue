<template >

  <BookingSelection @viewRooms="showRooms"> </BookingSelection>
  <br>
  <RoomsAvailability v-if="roomAvailability" @reserveRooms="showContactInfo"> </RoomsAvailability>
  <br>
  <Guest v-if="contactInfo" > </Guest>

  <br><br>
  <br><br>
  <br><br>



</template>

<script>
  import BookingSelection from "@/components/BookingSelection.vue";
  import RoomsAvailability from "@/components/RoomsAvailability.vue";
  import Guest from "@/components/Guest.vue";


  export default {
    name: 'SearchReserve',
    components: {
      Guest,
      BookingSelection,
      RoomsAvailability,
    },
    data() {
      return{
        roomAvailability: false,
        contactInfo: false,
      }
    },
    methods: {
      showRooms(){
        this.roomAvailability = true;
      },
      showContactInfo(){
        this.contactInfo = true
      }

    }
  }


</script>

<style>
.section-container{
  border-radius: 12px;
  //background-color: #EAEAE0;
  background-color: #E3E8F0;
  padding: 3em;
}
.section-header{
  color: #5CA277;
}
.section-btn{
  background-color: #5CA277;
}
.icon-color{
  color: #5CA277;
  padding-bottom: 1em;
}

</style>
