<template>
  <v-container>
    <h1>Room Availability</h1>
    <br>
    <v-data-table
      v-model:items-per-page="itemsPerPage"
      :headers="headers"
      :items="rooms"
      class="elevation-1"
      rounded
    >
        <template v-slot:item.numRooms="{ item }">
          <v-text-field
            v-model="item.columns.numRooms"
            type="number"
            density="compact"
            style="width:80px"
            hide-details
            variant="outlined"
          ></v-text-field>
        </template>

      </v-data-table>

  </v-container>
</template>

<script>
export default {
  data: () => {
    return {
      numberRooms: 0,
      checkInDate: '',
      checkOutDate: '',
      accessibility: false,
      itemsPerPage: 15,
      headers: [
        { title: 'Room', key: 'name' , align: 'start', sortable: false },
        { title: 'Beds', key: 'beds', align: 'center', sortable: false },
        { title: 'Max Capacity', key: 'maxCapacity', align: 'center', sortable: false },
        { title: 'Bed Type', key: 'bedType', sortable: false },
        { title: 'Description', key: 'description', sortable: false },
        { title: 'Price/Night', key: 'roomPrice', align: 'center', sortable: false },
        { title: 'Available rooms', key: 'availableRooms', align: 'center', sortable: false },
        { title: 'Number of rooms', key: 'numRooms', align: 'right', sortable: false },
      ],
      rooms: [
        {
          id: 1,
          name: 'Standard Room',
          beds: 1,
          maxCapacity: 2,
          bedType: "Queen",
          description: "A comfortable room with a Queen-sized bed.",
          availableRooms: 5,
          roomPrice: "$250",
          chosen: false,
          numRooms: 0,
        },
        {
          id: 2,
          name: "Deluxe Room",
          beds: 2,
          maxCapacity: 4,
          bedType: "King",
          description: "A spacious room with two King-sized beds.",
          availableRooms: 1,
          roomPrice: "$350",
          numRooms:0,
          chosen: true,
        },
        {
          id: 3,
          name: "Family Suite",
          beds: 3,
          maxCapacity: 6,
          bedType: "1 King + 2 Full",
          description: "A large suite with three Twin beds.",
          availableRooms: 1,
          roomPrice: "$550",
          chosen: false,
          numRooms: 0
        },
      ],
    };
  },
  methods: {
    searchRooms(){
      // Perform search logic based on the provided data
      console.log('Number of Rooms:', this.numberRooms);
      console.log('Check-in Date:', this.checkInDate);
      console.log('Check-out Date:', this.checkOutDate);
      console.log('Accessibility Accommodations:', this.accessibility);
    }

    //add api call and data return
  }
  };
</script>

<style scoped>

</style>
