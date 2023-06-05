<template>

  <v-container class="section-container" >
    <h1 class="section-header">Room Availability</h1>
    <br>
    <v-data-table
      v-model:items-per-page="itemsPerPage"
      :headers="headers"
      :items="rooms"
      :key="rooms.id"
      :item-value="rooms.numRooms"
      elevation="1"
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
            min="0"
            :max="item.columns.availableRooms"
            @input="roomsRequested(item)"
          ></v-text-field>
        </template>

      </v-data-table>

    <br><br>

    <v-row style="display: flex; justify-content: end;">

      <div class="pl-6 pr-6 pb-6" v-if="showAlert">
        <v-alert
          dense
          type="error"
        >
          {{this.errorMsg}}
        </v-alert>
      </div>

      <v-btn class="section-btn" @click="reserveRooms">
        Reserve rooms
      </v-btn>

    </v-row>

  </v-container>

</template>

<script>
import {mapActions, mapGetters} from 'vuex'

export default {
  data: () => {
    return {
      numberRooms: 0,
      checkInDate: '',
      checkOutDate: '',
      accessibility: false,
      itemsPerPage: 15,
      showAlert: false,
      invalidRooms: false,
      errorMsg: '',
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
      requestedRooms: {},
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
  computed:{
     ...mapGetters(['getTotalGuests']),
  },
  methods: {
    ...mapActions([
        'setRequestedRooms',
    ]),

    reserveRooms(){
      this.invalidRooms = false
      const chosenRooms = JSON.parse(JSON.stringify(this.requestedRooms))
      this.setRequestedRooms(chosenRooms) // we need it later in Guest section once we have user's info
      // then we send all info to API and backend marks specific room numbers as 'occupied' for set of days
      console.log('this.requestedRooms ', this.requestedRooms)

      console.log('chosenRooms', chosenRooms);
      console.log('getTotalGuests', this.getTotalGuests);

      let totalRooms = 0
      let totalCapacity = 0
      for (let k in this.requestedRooms){
        let nRooms = parseInt(this.requestedRooms[k]['numRooms'])
        totalRooms += nRooms
        let roomCapacity = parseInt(this.requestedRooms[k]['maxCapacity'])
        totalCapacity += roomCapacity*nRooms
      }

      console.log('total Rooms', totalRooms)
      console.log('total Capacity', totalCapacity)

      if (totalRooms === 0){
        this.showAlert = true
        this.invalidRooms = true
        this.errorMsg = 'You need to select at least one room.'

        setTimeout(() => {
          this.errorMsg = null
          this.showAlert = false
          }, 2000);
      }

      if (this.getTotalGuests < totalRooms){
        this.showAlert = true
        this.invalidRooms = true
        this.errorMsg = 'You requested more rooms than guests.'

        setTimeout(() => {
          this.errorMsg = null
          this.showAlert = false
          }, 2000);
      }
      if (this.getTotalGuests > totalCapacity){
        this.showAlert = true
        this.invalidRooms = true
        this.errorMsg = 'You have more guests than total capacity for all rooms selected.'

        setTimeout(() => {
          this.errorMsg = null
          this.showAlert = false
          }, 2000);
      }

      if (!this.invalidRooms){
        this.$emit('reserveRooms', true);
      }

    },

    roomsRequested(item){
      console.log('item ', item)
      const room = JSON.parse(JSON.stringify(item))
      this.requestedRooms[room.raw.id]={
        'id': room.raw.id,
        'name': room.raw.name,
        'beds': room.raw.beds,
        'bedType': room.raw.bedType,
        'maxCapacity': room.raw.maxCapacity,
        'roomPrice': room.raw.roomPrice,
        'numRooms': room.columns.numRooms,
      }
    },

  }
  };
</script>

<style scoped>

</style>
