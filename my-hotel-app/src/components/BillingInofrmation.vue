<template>
  <v-col>
    <v-card
      elevation="0"
      rounded
      class="info-card"
    >
      <v-card-title class="info-title"
      >
        Credit Card Information

      </v-card-title>
      <v-form
        ref="billinglForm"
        @submit.prevent="confirmBillingInfo"
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
              :counter="10"
              label="First name"
              required
            ></v-text-field>
          </v-col>

          <v-col>
            <v-text-field
              v-model="lastName"
              :rules="[requiredRule, minNameLengthRule, maxNameLengthRule]"
              :counter="10"
              label="Last name"
              required
            ></v-text-field>
          </v-col>

        </v-row>

        <v-row>
          <v-col cols="1" align-self="center">
            <v-icon class="icon-color">mdi-credit-card</v-icon>
          </v-col>
          <v-col>
            <v-text-field
              v-model="card"
              :counter="20"
              label="Card Number"
              required
              :rules="[requiredRule, cardRules]"

            ></v-text-field>
          </v-col>
          <v-col cols="3">
            <v-text-field
              v-model="cvv"
              label="CVV"
              required
              :rules="[requiredRule, cvvRules]"
            ></v-text-field>
          </v-col>
        </v-row>


        <v-row>
          <v-col cols="1" align-self="center">
            <v-icon class="icon-color">mdi-calendar-month</v-icon>
          </v-col>
          <v-col>
            <v-select
              v-model="exparationMonth"
              :items="months"
              label="Expiration month">
              required
              :rules="[requiredRule]"
            </v-select>


          </v-col>
          <v-col cols="3">
            <v-text-field
              v-model="exparationYear"
              type="number"
              :counter="4"
              label="Expiration year"
              required
              :rules="[requiredRule]"
              min="2023"
              max="2050"
            >

            </v-text-field>
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
              label="Billing address"
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
              :counter="5"
              label="City"
              required
              :rules="[requiredRule]"
            ></v-text-field>
          </v-col>

          <v-col cols="3">
            <v-select
              v-model="state"
              :items="stateAbv"
              :counter="7"
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
    firstName: '',
    lastName: '',
    requiredRule: (v) => !!v || 'Field is required.',
    minNameLengthRule: (v) => (v?.length > 1) || 'Name must have at least one characters.',
    maxNameLengthRule: (v) => (v?.length <= 10) || 'Name must be less than 10 characters.',
    cvv: '',
    cvvRules:(v) => (/^\d{3}$/.test(v)) || 'CVV must be valid.',
    card: '',
    cardRules: (v) => (/^\d{4} \d{4} \d{4} \d{4}$/.test(v)) || 'Card number must be valid.',
    formValid: false,
    exparationMonth: null,
    exparationYear: null,
    months: [
      'January','February', 'March', 'April', 'May', 'June', 'July',
      'August', 'September', 'October',  'November',  'December'
    ],
  }),
  watch: {
    // Watch for changes in the form fields and validate the form
    field1: 'validateForm',
    field2: 'validateForm',
    firstName: 'validateForm',
    lastName: 'validateForm',
    address: 'validateForm',
    city: 'validateForm',
    state: 'validateForm',
    card: 'validateForm',
    cvv: 'validateForm',
  },
  computed: {
    isFormValid(){
      return this.formValid;
    }
  },
  methods: {
    async validateForm() {
      if (this.$refs.billinglForm) {
        try {
          await this.$refs.billinglForm.validate();
          const formValidation = JSON.parse(JSON.stringify(this.$refs.billinglForm))
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
    confirmBillingInfo() {


      const cardInfo = {}
      cardInfo['firstName'] = this.firstName;
      cardInfo['lastName'] = this.lastName;
      cardInfo['card'] = this.card;
      cardInfo['cvv'] = this.cvv;
      cardInfo['expirationMonth'] = this.exparationMonth;
      cardInfo['expirationYear'] = this.exparationYear;
      cardInfo['address'] = this.address;
      cardInfo['city'] = this.city;
      cardInfo['state'] = this.state;


      const allValuesNonEmpty = Object.values(cardInfo).every(value => value !== '');

      const billingInfo = allValuesNonEmpty ? cardInfo : {}

      this.$emit('getBillingInfo', billingInfo)
      console.log("Billing Info submitted")

    }
  },

}

</script>

