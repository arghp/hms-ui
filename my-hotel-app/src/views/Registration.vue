<template>
  <v-container class="section-container">
    <v-row>
      <v-col cols="6"><h1 class="section-header"> Registration </h1></v-col>
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
              v-if="!isRegistered"
            >
              <v-row>
                <v-col cols="1" align-self="center">
                  <v-icon class="icon-color">mdi-account</v-icon>
                </v-col>
                <v-col cols="5">
                  <v-text-field
                    v-model="firstname"
                    :rules="[minNameLengthRule, maxNameLengthRule]"
                    :counter="10"
                    label="First name"
                    required
                  ></v-text-field>
                </v-col>

                <v-col>
                  <v-text-field
                    v-model="lastname"
                    :rules="[minNameLengthRule, maxNameLengthRule]" :counter="10"
                    label="Last name"
                    required

                  ></v-text-field>
                </v-col>

              </v-row>

              <v-row>
                <v-col cols="1" align-self="center">
                  <v-icon class="icon-color">mdi-map-marker</v-icon>
                </v-col>
                <v-col>
                  <v-text-field
                    v-model="address"
                    :rules="[requiredRule]"
                    label="Street address"
                    required
                  ></v-text-field>
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="1" align-self="center">
                  <v-icon class="icon-color">mdi-home-city</v-icon>
                </v-col>
                <v-col>
                  <v-text-field
                    v-model="city"
                    :rules="[requiredRule]"
                    label="City"
                    required
                  ></v-text-field>
                </v-col>

                <v-col cols="3">
                  <v-select
                    v-model="state"
                    :rules="[requiredRule]"
                    :items="stateAbv"
                    label="State"
                    required

                  ></v-select>
                </v-col>
                <v-col cols="3">
                  <v-text-field
                    v-model="zipCode"
                    :rules="[requiredRule]"
                    label="Zip Code"
                    required

                  ></v-text-field>
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="1" align-self="center">
                  <v-icon class="icon-color">mdi-phone-classic</v-icon>
                </v-col>
                <v-col>
                  <v-text-field
                    v-model="phone"
                    :rules="[requiredRule]"
                    label="Phone Number"
                    required
                  ></v-text-field>
                </v-col>
              </v-row>

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

              <!-- password -->
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

              <v-row>
                <v-col cols="1" align-self="center">
                  <v-icon class="icon-color">mdi-onepassword</v-icon>
                </v-col>
                <v-col>
                  <v-text-field
                    v-model="confirmPassword"
                    :rules="[passwordConfirmationRule]"
                    label="Confirm Password"
                    type="password"
                    required
                  ></v-text-field>
                </v-col>
              </v-row>

              <!-- password end -->

              <v-row>

                <v-col cols="4" style="align-content: center;">
                  Is this guest the primary contact?
                </v-col>

                <v-col>
                  <v-radio-group
                    v-model="contactGuest"
                    inline
                    required
                    hide-details
                  >
                    <v-radio
                      label="Yes"
                      value="true"
                      color="#5CA277"
                    ></v-radio>
                    <v-radio
                      label="No"
                      value="false"
                      color="#5CA277"
                    ></v-radio>
                  </v-radio-group>
                </v-col>

              </v-row>

              <v-row justify="end">
                <v-btn class="section-btn" @click="register">
                  Register
                </v-btn>
              </v-row>

            </v-form>

            <h1 v-else>Registered Successfully!</h1>
          </v-card>
        </v-col>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

export default {
  data: () => ({
    date: '2018-03-02',
    contactGuest: null,
    stateAbv: ['CA', 'PA', 'NY'],
    state: '',
    city: '',
    zipCode: '',
    address: '',
    valid: false,
    firstname: '',
    lastname: '',
    requiredRule: (v) => !!v || 'Field is required',
    minNameLengthRule: (v) => (v?.length > 1) || 'Name must have at least one character',
    maxNameLengthRule: (v) => (v?.length <= 10) || 'Name must be less than 10 characters',
    email: '',
    emailRules: [
      value => {
        if (/.+@.+\..+/.test(value)) return true

        return 'E-mail must be valid.'
      },
    ],
    phone: '',
    password: '',
    passwordRules: [
      value => {
        const re = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
        if (re.test(value)) return true

        return 'Password must have minimum 8 characters, a symbol, upper and lower case letters and a number'
      },
    ],
    confirmPassword: '',
    isRegistered: false,
  }),
  methods: {
    register() {
      // TODO: backend call and validation
      this.isRegistered = true;
    },
  },
  computed: {
    passwordConfirmationRule() {
        return () => (this.password === this.confirmPassword) || 'Passwords must match'
    },
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
