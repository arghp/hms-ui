<template>
  <v-container>
    <h1>Hotel Room Availability</h1>
    <v-card v-for="room in rooms" :key="room.id" class="room-card">
      <v-card-title>
        <h3>{{ room.name }}</h3>
      </v-card-title>
      <v-card-text>
        <p><strong>Beds:</strong> {{ room.beds }}</p>
        <p><strong>Max Capacity:</strong> {{ room.maxCapacity }}</p>
        <p><strong>Type of Beds:</strong> {{ room.bedType }}</p>
        <p><strong>Description:</strong> {{ room.description }}</p>
      </v-card-text>
      <v-checkbox
        v-model="room.chosen"
        label="Reserve"
        color="primary"

        hide-details
      ></v-checkbox>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data: () => {
  return {
  rooms: [
  {
    id: 1,
    name: "Standard Room",
    beds: 1,
    maxCapacity: 2,
    bedType: "Queen",
    description: "A comfortable room with a Queen-sized bed.",
    chosen: false,
  },
  {
    id: 2,
    name: "Deluxe Room",
    beds: 2,
    maxCapacity: 4,
    bedType: "King",
    description: "A spacious room with two King-sized beds.",
    chosen: false,
  },
  {
    id: 3,
    name: "Family Suite",
    beds: 3,
    maxCapacity: 6,
    bedType: "Twin",
    description: "A large suite with three Twin beds.",
    chosen: false,
  },
    ],
  };
  },
  };
</script>

<style scoped>

</style>
