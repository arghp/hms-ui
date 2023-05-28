<template>

  <BookingSelection @viewRooms="showRooms"> </BookingSelection>
  <br>

  <RoomsAvailability v-if="roomAvailability" > </RoomsAvailability>



</template>

<script>
  import BookingSelection from "@/components/BookingSelection.vue";
  import RoomsAvailability from "@/components/RoomsAvailability.vue";

  export default {
    name: 'SearchReserve',
    components: {
      BookingSelection,
      RoomsAvailability
    },
    data() {
      return{
        roomAvailability: false,
      }
    },
    methods: {
      showRooms(){
        console.log("Child variable")
        this.roomAvailability = true;

      }

    }
  }


</script>
