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
                    v-model="password"
                    :rules="passwordRules"
                    label="Password"
                    type="password"
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

            <h1 v-else>Logged in successfully!</h1>
          </v-card>
        </v-col>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>


import {mapActions, mapState} from "vuex";

export default {
  data: () => ({
    requiredRule: (v) => !!v || 'Field is required',
    email: '',
    emailRules: [
      value => {
        if (/.+@.+\..+/.test(value)) return true

        return 'E-mail must be valid.'
      },
    ],
    password: '',
    passwordRules: [
      value => {
        if (value) return true

        return 'Password is required'
      },
    ],
    isLoggedIn: false,
  }),
  computed:{
    ...mapState(['isLoggedIn']),
  },
  methods: {
    ...mapActions([
      'loginUser'
    ]),
    login(){
      this.loginUser()
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
