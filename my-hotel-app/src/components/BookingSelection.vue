<template>
  <v-container justify="space-around">
    <v-row>
      <v-col cols='2' class="d-flex align-center">Number of guests: &nbsp;</v-col>
      <v-col >
        <v-text-field
          v-model="booking.guests"
          type="number"
          density="compact"
          style="width:80px"
          hide-details
          variant="outlined"
        ></v-text-field>
      </v-col>

    </v-row>
    <br>
    <br>
    <v-row justify="space-around">
      <v-col cols='2' class="d-flex align-center">Dates of stay: &nbsp;</v-col>
      <v-col>
        <v-text-field
          v-model="booking.start"
          label="Check-in date"
          type="date"
        ></v-text-field>
      </v-col>

<!--      <v-spacer></v-spacer>-->
      <v-col>
        <v-text-field
          v-model="booking.end"
          label="Check-out date"
          type="date"
        ></v-text-field>
        </v-col>
    </v-row>

    <br> Additional Options: <br>
    <v-checkbox
      v-model="booking.easyAccess"
      label="Easy Access"
      color="primary"
      value="accomodations"
      hide-details
    ></v-checkbox>

    <br>

    <v-btn color="primary">
      Search available rooms
    </v-btn>

  </v-container>

</template>

<script>
export default {
  data: () => ({
    date: null,
    booking: {
      start: null,
      end: null,
      guests: null,
      rooms: null,
      easyAccess: null,
    },
  }),
}
</script>
