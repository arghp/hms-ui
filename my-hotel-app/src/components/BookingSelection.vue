<template>

  <v-container class="section-container">

      <v-row>
        <v-col cols='2' class="d-flex align-center">Number of guests: &nbsp;</v-col>
        <v-col >
          <v-text-field
            v-model="nGuests"
            type="number"
            density="compact"
            style="width:180px"
            variant="outlined"
            min="1"
            max="15"
          ></v-text-field>
        </v-col>

      </v-row>

      <v-row justify="space-around">
        <v-col cols='2' class="d-flex align-center">Dates of stay: &nbsp;</v-col>
        <v-col>
          <v-text-field
            v-model="checkInDate"
            label="Check-in date"
            type="date"
            required
            :min="minStartDate"
            :max="maxStartDate"
            @input="updateMinEndDate"
          ></v-text-field>
        </v-col>


        <v-col>
          <v-text-field
            v-model="checkOutDate"
            label="Check-out date"
            type="date"
            required
            :min="minEndDate"
            :max="maxEndDate"
            @input="updateMinEndDate"
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row>
        Additional Options:
      </v-row>

      <v-row style="margin-bottom: 2em;">
        <v-checkbox
          v-model="easyAccess"
          label="Easy Access"
          color="#5CA277"
          hide-details
        ></v-checkbox>
      </v-row>

      <v-row justify="end">
      <v-btn class="section-btn" @click="searchRooms">
        Search available rooms
      </v-btn>
      </v-row>



  </v-container>

</template>

<script>
export default {
  data: () => ({
    date: null,
    minStartDateInitial:'',
    maxStartDateInitial:'',
    minEndDateInitial:'',
    maxEndDateInitial:'',
    minStartDate : '',
    maxStartDate: '',
    minEndDate: '',
    maxEndDate: '',
    checkInDate: '',
    checkOutDate: '',
    nGuests: null,
    nRooms: null,
    easyAccess: null,
  }),
  mounted() {
    const todaysDate = new Date();

    this.minStartDate = todaysDate.toISOString().substring(0, 10); // Format as YYYY-MM-DD
    const maxStartDate = new Date(todaysDate.getTime() + 365 * 24 * 60 * 60 * 1000); // 365 days, 24 h 60 min 60 s
    this.maxStartDate = maxStartDate.toISOString().substring(0,10);

    const minEndDate = new Date(todaysDate.getTime() + 1 * 24 * 60 * 60 * 1000);
    this.minEndDate = minEndDate.toISOString().substring(0,10);
    const maxEndDate = new Date(todaysDate.getTime() + (365 + 30) * 24 * 60 * 60 * 1000); // max end date can be 30 days after max start date
    this.maxEndDate = maxEndDate.toISOString().substring(0,10);


    this.minStartDateInitial = this.minStartDate
    this.maxStartDateInitial = this.maxStartDate
    this.minEndDateInitial = this.minEndDate
    this.maxEndDateInitial = this.maxEndDate

  },

  methods: {
    updateMinEndDate(){ // todo: even when the checkin/out date changes maxStarDate and minEndDate should be updated
      console.log('check In Date:', this.checkInDate)
      console.log('check Out Date:', this.checkOutDate)
      if (this.checkInDate > this.minEndDate && this.checkOutDate === ''){
        // this.minEndDate = this.checkInDate
        this.minEndDate =  new Date(this.checkInDate)
        this.minEndDate = new Date(this.minEndDate.getTime() + 1 * 24 * 60 * 60 * 1000);
        this.minEndDate = this.minEndDate.toISOString().substring(0,10);
      }
      // if user clears the start date, we need to reset minEndDate
      if(this.checkInDate === ''){
        this.minEndDate = this.minEndDateInitial;
      }
/*    },
    updateMaxStartDate(){*/
      if (this.checkOutDate < this.maxStartDate && this.checkInDate === ''){
        this.maxStartDate = new Date(this.checkOutDate)
        this.maxStartDate = new Date(this.maxStartDate.getTime() - 1 * 24 * 60 * 60 * 1000);
        this.maxStartDate = this.maxStartDate.toISOString().substring(0,10);
      }
      // if user clears the end date, we need to reset maxStartDate
      if(this.checkOutDate === ''){
        this.maxStartDate = this.maxStartDateInitial;
      }

    },
    dateAfterStart: (value) => {
      if (!value) return 'End Date is required';
      console.log(value)
      console.log(this.checkInDate)
      if (value <= this.checkInDate) return 'End Date must be after Start Date';
      return true;
    },
    searchRooms() {
      this.$emit('viewRooms', true);
      console.log("N guests", this.nGuests)
      console.log("start", this.checkInDate)
      console.log("end", this.checkOutDate)


    },
   /* searchRooms: async function() {
    if (this.nGuests > 0 && this.nGuests < 11){
      let payload = {
        n_guests: this.nGuests,
        start_date: this.checkInDate,
        end_date: this.checkOutDate,
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
        }
    },*/
  },
}
</script>


<style>


</style>
