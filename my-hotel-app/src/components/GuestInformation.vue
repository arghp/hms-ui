<template>
  <v-col>
    <v-card
      elevation="0"
      rounded
      class="info-card"
    >
      <v-card-title class="info-title"
      >
        Guest

      </v-card-title>
      <v-form
        v-model="valid"
        style="padding: 1em;"
      >
        <v-row>
          <v-col cols="1" align-self="center">
            <v-icon class="icon-color">mdi-account</v-icon>
          </v-col>
          <v-col cols="5">
            <v-text-field
              v-model="firstname"
              :rules="[requiredRule, minNameLengthRule, maxNameLengthRule]"
              :counter="10"
              label="First name"
              required
            ></v-text-field>
          </v-col>

          <v-col>
            <v-text-field
              v-model="lastname"
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
              :counter="7"
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
              :counter="5"
              label="City"
              required
            ></v-text-field>
          </v-col>

          <v-col cols="3">
            <v-select
              v-model="state"
              :items="stateAbv"
              :counter="7"
              label="State"
              required

            ></v-select>
          </v-col>
          <v-col cols="3">
            <v-text-field
              v-model="zipCode"
              :counter="7"
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
              :counter="7"
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

      </v-form>


    </v-card>
  </v-col>
</template>


<script >

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
    requiredRule: (v) => !!v || 'Field is required.',
    minNameLengthRule: (v) => (v?.length > 1) || 'Name must have at least one characters.',
    maxNameLengthRule: (v) => (v?.length <= 10) || 'Name must be less than 10 characters.',
    nameRules: [
      value => {
        if (value) return true

        return 'Name is requred.'
      },
      value => {
        if (value?.length <= 10) return true

        return 'Name must be less than 10 characters.'
      },
    ],
    email: '',
    emailRules: [
      value => {
        if (value) return true

        return 'E-mail is requred.'
      },
      value => {
        if (/.+@.+\..+/.test(value)) return true

        return 'E-mail must be valid.'
      },
    ],
    phone: '',
  }),
}

</script>

