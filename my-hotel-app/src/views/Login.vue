<template>
  <v-container class="section-container">
    <v-row>
      <v-col cols="6"><h1 class="section-header">Login</h1></v-col>
    </v-row>

    <v-row :style="{justifyContent: 'center'}">
      <v-col cols="6">
        <v-col align-self="center">
          <v-card
            elevation="0"
            rounded
            class="info-card"
            align-self="center"
          >
          <template v-if="!isLoggedIn">

            <v-form
              v-model="valid"
              style="padding: 1em;"
              v-if="!isLoggedIn"
            >

           <v-row>
            <v-col cols="1" align-self="center">
              <v-icon class="icon-color">mdi-email</v-icon>
            </v-col>
            <v-col>
              <v-text-field
                v-model="email"
                :rules="emailRules"
                label="E-mail"
                required
              ></v-text-field>
            </v-col>
          </v-row>


                  <v-row>
                  <v-col cols="1" align-self="center">
                    <v-icon class="icon-color">mdi-onepassword</v-icon>
                  </v-col>
                  <v-col>
                    <v-text-field
                      v-model="confirmationNumber"
                      :rules="confirmationNumberRules"
                      label="Confirmation Number"
                      required
                    ></v-text-field>
                  </v-col>
                </v-row>

                <v-row justify="end">
                  <v-btn class="section-btn" @click="login">
                    Login
                  </v-btn>
                </v-row>


            </v-form>
           </template>

            <template v-if="isLoggedIn">
              <BookingSummary
                :room="this.room"
                :nGuests="this.nGuests"
                :checkInDate="this.checkInDate"
                :checkOutDate="this.checkOutDate"
                :pricePerNight="this.pricePerNight"
                :additionalOptions="this.additionalOptions"
              />
              <template v-if="!(isCheckedIn || isCancelled)">
                <v-row :style="{justifyContent: 'center'}">
                  <v-btn
                    class="section-btn"
                    type="cancel"
                    @click="cancel"
                  >
                    Cancel reservation
                  </v-btn>
                  <v-btn
                    class="section-btn"
                    type="submit"
                    @click="checkIn"
                  >
                    Check-In
                  </v-btn>
                </v-row>
              </template>
              <template v-if="isCancelled">
                <span style="color:#5CA277;">You have cancelled your reservation.</span>
              </template>
              <template v-if="isCheckedIn">
                <span style="color:#5CA277;">You are checked in.</span>
              </template>
            </template>

          </v-card>
        </v-col>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

import BookingSummary from "@/components/BookingSummary.vue";

import {mapActions, mapState} from "vuex";

export default {
  components: {
    BookingSummary
  },

  data: () => ({

    email: '',
    emailRules: [
      value => {
        if (/.+@.+\..+/.test(value)) return true

        return 'E-mail must be valid.'
      },
    ],
    confirmationNumber: '',
    confirmationNumberRules: [

      value => {
        if (value) return true

        return 'Confirmation Number is required'

      },
    ],
    isLoggedIn: false,
        isCheckedIn: false,
    isCancelled: false,

    rooms: {},
    nGuests: 5,
    checkInDate: '2023-06-25',
    checkOutDate: '2023-06-29',
    pricePerNight: 200,
    guestRequests:false,
    additionalOptions: null,


  }),
  methods: {
    ...mapActions([
      'loginUser'
    ]),
    login(){
      this.loginUser(this.email)
      this.isLoggedIn = true;
    },
    checkIn() {
      this.isCheckedIn = true;
    },
    cancel() {
      this.isCancelled = true;
    }

  }
}
</script>


<style>
.info-card{
  border-radius: 12px;

}
.info-title{
  border-bottom: 4px solid #5CA277;
  color: #5CA277;
  margin-bottom: 1em;
  margin-top: 1em;
}
</style>
