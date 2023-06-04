<template>
   <div style="height:100vh; background-color:#1C4670 ">
    <v-container>

        <v-card
          id="nav-card"
          class="mx-auto"
          width="320"
          tile
          style="border-radius: 12px; background-color: #E3E8F0;"
        >
          <v-card-title class="text-center" style="margin-top: 1em; color: #278AB0;">WELCOME!</v-card-title>
          <v-list rounded style="background-color:#E3E8F0;">
              <v-list-item link>

                <router-link class="routerLink" :to="{name:'Registration'}">
                  <v-list-item-title style="color:#333; margin-left:3em;">
                    <v-icon class="home-icon-color">mdi-account-edit</v-icon> &nbsp; Register
                  </v-list-item-title>
                </router-link>
              </v-list-item>

              <v-list-item link>

                <router-link class="routerLink" :to="{name:'Login'}">
                  <v-list-item-title style="color:#333; margin-left:3em;">
                    <v-icon class="home-icon-color">mdi-account</v-icon> &nbsp; Login
                  </v-list-item-title>
                </router-link>
              </v-list-item>

              <v-list-item link>

                <router-link class="routerLink" :to="{name:'SearchReserve'}">
                  <v-list-item-title style="color:#333; margin-left:3em;">
                    <v-icon class="home-icon-color">mdi-calendar-search</v-icon> &nbsp; Book your stay!
                  </v-list-item-title>
                </router-link>
              </v-list-item>


              <v-list-item link>

                  <router-link class="routerLink" to="/search-reserve">
                    <v-list-item-title style="color:#333; margin-left:3em;">
                      <v-icon class="home-icon-color">mdi-card-account-details-outline</v-icon> &nbsp; Guest
                    </v-list-item-title>
                  </router-link>
              </v-list-item>

              <v-list-item link>
                  <router-link class="routerLink" :to="{name:'SearchReserve'}">
                    <v-list-item-title style="color:#333; margin-left:3em;">
                      <v-icon class="home-icon-color">mdi-shield-account</v-icon> &nbsp;  Staff
                    </v-list-item-title>
                  </router-link>
              </v-list-item>

          </v-list>
        </v-card>


    </v-container >
  </div>


</template>

<script>


  export default {

    name:'Home',
    data: () => ({

    }),
    methods: {

    },


  };
</script>

<style scoped>


.routerLink{
  text-decoration: none;
}
.home-icon-color{
  color: #278AB0;
}
</style>
