<template>

  <v-container class="section-container">
    <h1 class="section-header">Search</h1>
    <br>
    <v-form
        ref="searchForm"
        v-model="search"
      >
      <v-row>
        <v-col cols='2' class="d-flex align-center">Number of guests: &nbsp;</v-col>
        <v-col >
          <v-text-field
            v-model="nGuests"
            type="number"
            density="compact"
            style="width:180px"
            variant="outlined"
            required
            :rules="[requiredRule]"
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
             :rules="[requiredRule]"
            :min="minStartDate"
            :max="maxStartDate"
          ></v-text-field>
        </v-col>


        <v-col>
          <v-text-field
            v-model="checkOutDate"
            label="Check-out date"
            type="date"
            required
             :rules="[requiredRule, checkDates]"
            :min="minEndDate"
            :max="maxEndDate"
          ></v-text-field>
        </v-col>
      </v-row>

      </v-form>
      <v-row>
        <v-col>Additional Options:</v-col>
      </v-row>
         <v-checkbox
          v-model="easyAccess"
          label="Easy Access"
          color="#5CA277"
          hide-details
        ></v-checkbox>

      <v-row justify="end" style="margin-top: 1em;">
      <v-btn
        class="section-btn"
        type="submit"
        :disabled="!isSearchFormValid"
        @click="searchRooms"
      >
        Search available rooms
      </v-btn>
      </v-row>



  </v-container>

</template>

<script>
import { mapActions } from 'vuex';


export default {
  data: () => ({
    search: '',
    date: null,
    minStartDateInitial:'',
    maxStartDateInitial:'',
    minEndDateInitial:'',
    maxEndDateInitial:'',
    minStartDate : '',
    maxStartDate: '',
    minEndDate: '',
    maxEndDate: '',
    checkInDate: null,
    checkOutDate: null,
    nGuests: null,
    nRooms: null,
    easyAccess: null,
    requiredRule: (v) => !!v || 'Field is required.',
    searchFormValid: false,
  }),
  watch: {
    nRooms: 'validateSearch',
    checkInDate: 'validateSearch',
    checkOutDate: 'validateSearch',
  },
  computed: {
    isSearchFormValid() {
      return this.searchFormValid;
    },
  },
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
   ...mapActions([
        'setCheckInDate',
        'setCheckOutDate',
        'setTotalGuests',
      ]),
    checkDates(checkOutDt){
      if (this.checkInDate && this.checkInDate > checkOutDt){
        return 'Check-Out Date must be after Check-In Date.'
      }
      return true
    },
    async validateSearch() {
      let myForm = this.$refs.searchForm
      if (myForm) {
        try {
          await myForm.validate();
          const formValidation = JSON.parse(JSON.stringify(myForm))
          this.searchFormValid = formValidation.isValid;
          }
          catch (error) {
            console.log('error', error)
            this.searchFormValid = false;
        }
      } else {
        this.searchFormValid = false;
      }
    },

/*    updateMinMaxDates(){
      if(this.checkInDate !== null){
        const newMinEndDate = new Date(this.checkInDate.getTime() + 1 * 24 * 60 * 60 * 1000);
        this.minEndDate = newMinEndDate
      }
      else{
        this.minEndDate = this.minEndDateInitial
      }


      const todaysDate = new Date();

    this.minStartDate = todaysDate.toISOString().substring(0, 10); // Format as YYYY-MM-DD
    const maxStartDate = new Date(todaysDate.getTime() + 365 * 24 * 60 * 60 * 1000); // 365 days, 24 h 60 min 60 s
    this.maxStartDate = maxStartDate.toISOString().substring(0,10);

    const minEndDate = new Date(todaysDate.getTime() + 1 * 24 * 60 * 60 * 1000);
    this.minEndDate = minEndDate.toISOString().substring(0,10);
    const maxEndDate = new Date(todaysDate.getTime() + (365 + 30) * 24 * 60 * 60 * 1000); // max end date can be 30 days after max start date
    this.maxEndDate = maxEndDate.toISOString().substring(0,10);


    },*/
    searchRooms({commit}, checkInDate) {
      this.$emit('viewRooms', true);
      console.log("N guests", this.nGuests)
      console.log("start", this.checkInDate)
      console.log("end", this.checkOutDate)
      this.setTotalGuests(this.nGuests)
      this.setCheckInDate(this.checkInDate)
      this.setCheckOutDate(this.checkOutDate)
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
