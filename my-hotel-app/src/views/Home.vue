<template>

  <BookingSelection/>
  <RoomsAvailability></RoomsAvailability>

  <ContactInformation />
</template>

<script setup>
  import BookingSelection from "@/components/BookingSelection.vue";
  import RoomsAvailability from "@/components/RoomsAvailability.vue";
  import ContactInformation from '@/components/ContactInformation.vue'
  //import DatePicker from '@/components/DatePicker.vue';
</script>
