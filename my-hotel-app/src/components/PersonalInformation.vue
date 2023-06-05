<template>
  <v-col>
    <v-card
      elevation="0"
      rounded
      class="info-card"
    >
      <v-card-title class="info-title"
      >
        Personal Information

      </v-card-title>
      <v-form
        ref="personalForm"
        @submit.prevent="confirmPersonalInfo"
        v-model="valid"
        style="padding: 1em;"
      >
        <v-row>
          <v-col cols="1" align-self="center">
            <v-icon class="icon-color">mdi-account</v-icon>
          </v-col>
          <v-col cols="5">
            <v-text-field
              v-model="firstName"
              :rules="[requiredRule, minNameLengthRule, maxNameLengthRule]"
              label="First name"
              required
            ></v-text-field>
          </v-col>

          <v-col>
            <v-text-field
              v-model="lastName"
              :rules="[requiredRule, minNameLengthRule, maxNameLengthRule]"              :counter="10"
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
              label="Street address"
              required
              :rules="[requiredRule]"
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
              :counter="15"
              label="City"
              required
              :rules="[requiredRule]"
            ></v-text-field>
          </v-col>

          <v-col cols="3">
            <v-select
              v-model="state"
              :items="stateAbv"
              label="State"
              required
              :rules="[requiredRule]"
            ></v-select>
          </v-col>
          <v-col cols="3">
            <v-text-field
              v-model="zipCode"
              :counter="7"
              label="Zip Code"
              required
              :rules="[requiredRule]"
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
              :counter="10"
              label="Phone Number"
              required
              :rules="[requiredRule, phoneRules]"
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
              label="E-mail"
              required
              :rules="[requiredRule, emailRules]"
            ></v-text-field>
          </v-col>
        </v-row>

<!--        <v-row>

          <v-col cols="4" style="align-content: center;">
            Is this guest the primary contact?
          </v-col>

          <v-col>
            <v-radio-group
              v-model="contactGuest"
              inline
              required
              :rules="[requiredRule]"
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

        </v-row>-->
        <v-row
          justify="end"
          style="padding: 1em;"
        >
            <v-btn
              :disabled="!isFormValid"
              type="submit"
              class="section-btn"
            >
              confirm
            </v-btn>


        </v-row>
      </v-form>


    </v-card>
  </v-col>
</template>


<script >

import {mapActions} from "vuex";

export default {
  props: {
    guest: Object,
  },
  data: () => ({
    date: '2018-03-02',
    contactGuest: null,
    stateAbv: [
      'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'ID', 'IL',
      'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT',
      'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI',
      'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'
    ],
    state: '',
    city: '',
    zipCode: '',
    address: '',
    valid: false,
    firstName: '',
    lastName: '',
    requiredRule: (v) => !!v || 'Field is required.',
    minNameLengthRule: (v) => (v?.length > 1) || 'Name must have at least one characters.',
    maxNameLengthRule: (v) => (v?.length <= 20) || 'Name must be less than 20 characters.',
    email: '',
    emailRules: (v) => (/.+@.+\..+/.test(v)) || 'E-mail must be valid.',
    phone: '',
    phoneRules: (v) => (/^\d{7,10}$/.test(v)) || 'Phone should have between 7 and 10 numbers.',
    formValid: false,
  }),
  watch: {
    // Watch for changes in the form fields and validate the form
    firstName: 'validateForm',
    lastName: 'validateForm',
    address: 'validateForm',
    city: 'validateForm',
    state: 'validateForm',
    zipCode: 'validateForm',
    phone: 'validateForm',
    email: 'validateForm',
  },
  computed: {
    isFormValid(){
      return this.formValid;
    }
  },
  mounted() {
    this.firstName = this.guest.firstName
    this.lastName = this.guest.lastName
    this.address = this.guest.address
    this.city = this.guest.city
    this.state = this.guest.state
    this.zipCode = this.guest.zipCode
    this.phone = this.guest.phone
    this.email = this.guest.email
  },
  methods: {
    ...mapActions([
      'setEmail'
    ]),
    async validateForm() {
      if (this.$refs.personalForm) {
        try {
          await this.$refs.personalForm.validate();
          const formValidation = JSON.parse(JSON.stringify(this.$refs.personalForm))
          this.formValid = formValidation.isValid;
          }
          catch (error) {
            console.log('error', error)
            this.formValid = false;
        }
      } else {
        this.formValid = false;
      }
    },
    confirmPersonalInfo() {
      const guest = {}
      guest['firstName'] = this.firstName;
      guest['lastName'] = this.lastName;
      guest['address'] = this.address;
      guest['city'] = this.city;
      guest['state'] = this.state;
      guest['zipCode'] = this.zipCode;
      guest['phone'] = this.phone;
      guest['email'] = this.email;

      const allValuesNonEmpty = Object.values(guest).every(value => value !== '');

      const personalInfo = allValuesNonEmpty ? guest : {}

      this.setEmail(this.email)
      this.$emit('getPersonalInfo', personalInfo)
      console.log("Personal Info submitted")
    },

  },

}

</script>

