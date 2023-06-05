<template >

  <BookingSelection @viewRooms="showRooms"> </BookingSelection>
  <br>
  <RoomsAvailability
    v-if="roomAvailability"
    @reserveRooms="showContactInfo"

  > </RoomsAvailability>
<!--  :rooms="rooms" -->

  <br>
  <Guest v-if="contactInfo" @payed="hideRooms"> </Guest>

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
        rooms: {},
      }
    },
    methods: {
      showRooms(rooms){
        this.roomAvailability = true;
        this.contactInfo = false;
        this.rooms = rooms;
      },
      showContactInfo(){
        this.contactInfo = true
      },
      hideRooms(){
        this.roomAvailability = false;
      },

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
