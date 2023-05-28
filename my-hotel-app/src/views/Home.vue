<template>
   <div style="height:100vh; background-color:#1C4670 ">
    <v-container style="padding-top:26em;">

        <v-card
          id="nav-card"
          class="mx-auto"
          width="320"
          tile
          style="border-radius: 12px; background-color: #EAEAE0;"
        >
          <v-card-title class="text-center" style="margin-top: 1em; color: #5CA277;">WELCOME!</v-card-title>
          <v-list rounded style="background-color:#EAEAE0;">
              <v-list-item link>

                <router-link class="routerLink" :to="{name:'SearchReserve'}">
                  <v-list-item-title style="color:#333; margin-left:3em;">
                    <v-icon style="color: #5CA277;">mdi-calendar-search</v-icon> &nbsp; Book your stay!
                  </v-list-item-title>
                </router-link>
              </v-list-item>


              <v-list-item link>

                  <router-link class="routerLink" to="/search-reserve">
                    <v-list-item-title style="color:#333; margin-left:3em;">
                      <v-icon style="color: #5CA277;">mdi-card-account-details-outline</v-icon> &nbsp; Guest
                    </v-list-item-title>
                  </router-link>
              </v-list-item>

              <v-list-item link>
                  <router-link class="routerLink" :to="{name:'SearchReserve'}">
                    <v-list-item-title style="color:#333; margin-left:3em;">
                      <v-icon style="color: #5CA277;">mdi-shield-account</v-icon> &nbsp;  Staff
                    </v-list-item-title>
                  </router-link>
              </v-list-item>

          </v-list>
        </v-card>


    </v-container >
  </div>

  <BookingSelection/>
  <RoomsAvailability/>
  <ContactInformation/>
</template>

<script>
  import BookingSelection from "@/components/BookingSelection.vue";
  import RoomsAvailability from "@/components/RoomsAvailability.vue";
  import ContactInformation from '@/components/ContactInformation.vue';

  export default {
    methods: {


    }
  };
</script>

<style scoped>
.fill-height {
  height: 100vh;
}


.routerLink{
  text-decoration: none;
}
</style>
