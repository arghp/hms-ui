<template>
  <v-container>
    <v-row>
      Number of adult guests:
      <v-text-field
        v-model="booking.adults"
        type="number"
        style="width: 80px"
        density="compact"
        hide-details
        variant="outlined"
      ></v-text-field>

      Number of children guests:
      <v-text-field
        v-model="booking.children"
        type="number"
        style="width: 80px"
        density="compact"
        hide-details
        variant="outlined"
      ></v-text-field>

      Number of rooms:
      <v-text-field
        v-model="booking.rooms"
        type="number"
        style="width: 80px"
        density="compact"
        hide-details
        variant="outlined"
      ></v-text-field>


    </v-row>

    <v-spacer></v-spacer>

    <br>
    Dates of stay:
    <br>
    <br>
    <v-row
      justify="space-around"
    >
      <v-text-field
        v-model="booking.start"
        label="Check-in date"
        type="date"
      ></v-text-field>

      <br>

      <v-text-field
        v-model="booking.end"
        label="Check-out date"
        type="date"
      ></v-text-field>

    </v-row>

    Additional Options:
    <v-checkbox
      v-model="booking.easyAccess"
      label="Easy Access"
      color="primary"
      value="accomodations"
      hide-details
    ></v-checkbox>

    <v-spacer></v-spacer>

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
      adults: null,
      children: null,
      rooms: null,
      easyAccess: null,
    },
    locations: ['Australia', 'Barbados', 'Chile', 'Denmark', 'Ecuador', 'France'],
  }),
}
</script>
