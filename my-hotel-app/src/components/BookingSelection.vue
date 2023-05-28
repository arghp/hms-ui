<template>

  <v-container style="border-radius: 12px; background-color: #EAEAE0;" justify="space-around" >


      <v-row style="margin: 1em;">
        <v-col cols='2' class="d-flex align-center">Number of guests: &nbsp;</v-col>
        <v-col >
          <v-text-field
            v-model="nGuests"
            type="number"
            density="compact"
            style="width:80px"
            hide-details
            variant="outlined"
          ></v-text-field>
        </v-col>

      </v-row>

      <v-row justify="space-around" style="margin: 1em;">
        <v-col cols='2' class="d-flex align-center">Dates of stay: &nbsp;</v-col>
        <v-col>
          <v-text-field
            v-model="startDate"
            label="Check-in date"
            type="date"
          ></v-text-field>
        </v-col>

        <!--      <v-spacer></v-spacer>-->
        <v-col>
          <v-text-field
            v-model="endDate"
            label="Check-out date"
            type="date"
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row style="margin-left: 1.8em;" >
        Additional Options:
      </v-row>

      <v-row style="margin-left: 1.8em; margin-bottom: 2em;">
        <v-checkbox
          v-model="easyAccess"
          label="Easy Access"

          hide-details
        ></v-checkbox>
      </v-row>

      <v-row style="margin: 1.8em;" justify="end">
      <v-btn class="btn-search" @click="searchRooms">
        Search available rooms
      </v-btn>
      </v-row>



  </v-container>

</template>

<script>
export default {
  data: () => ({
    date: null,
    startDate: null,
    endDate: null,
    nGuests: null,
    nRooms: null,
    easyAccess: null,
  }),
  methods: {
    searchRooms() {
      this.$emit('viewRooms', true);
      console.log("N guests", this.nGuests)
      console.log("start", this.startDate)
      console.log("end", this.endDate)


    },
   /* searchRooms: async function() {
      let payload = {
        n_guests: this.nGuests,
        start_date: this.startDate,
        end_date: this.endDate,
        easy_access: this.easyAccess,
      }
      await this.RoomSearch(payload)
        .then((data) => {
          console.log(data)
          this.$emit('viewRooms', true);
          }
        )
        .catch((e)=>{
          console.log(e)
          console.log(e.response)
          }
        )
    },*/
  },
}
</script>


<style>
.btn-search{
  background-color: #5CA277;
}

</style>
