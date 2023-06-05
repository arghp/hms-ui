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
              label="First name"
              required
            ></v-text-field>
          </v-col>

          <v-col>
            <v-text-field
              v-model="lastName"
              :rules="[requiredRule, minNameLengthRule, maxNameLengthRule]"
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
              v-model="cardNo"
              :counter="19"
              label="Card Number xxxx xxxx xxxx xxxx"
              required
              :rules="[requiredRule, cardRules]"

            ></v-text-field>
          </v-col>
          <v-col cols="3">
            <v-text-field
              v-model="cvv"
              type="number"
              label="CVV"
              required
              :counter="3"
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
              v-model="expirationMonth"
              :items="months"
              label="Expiration month"
              required
              :rules="[requiredRule]"
            >
            </v-select>


          </v-col>
          <v-col cols="3">
            <v-text-field
              v-model="expirationYear"
              type="number"
              :counter="4"
              label="Expiration year"
              required
              :rules="[requiredRule, expirationYearRule]"
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
              type="number"
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
            :disabled="!isBillingFormValid"
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
  props: {
    card: Object,
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
    cvv: '',
    cvvRules:(v) => (/^\d{3}$/.test(v)) || 'CVV must be valid.',
    cardNo: '',
    cardRules: (v) => (/^\d{4} \d{4} \d{4} \d{4}$/.test(v)) || 'Card number must be valid.',
    formValid: false,
    expirationMonth: null,
    expirationYear: null,
    expirationYearRule: (v) => (v > 2023 && v <= 2050) || 'Year must be valid.',
    months: [
      'January','February', 'March', 'April', 'May', 'June', 'July',
      'August', 'September', 'October',  'November',  'December'
    ],
  }),
  watch: {
    // Watch for changes in the form fields and validate the form
    firstName: 'validateBillingForm',
    lastName: 'validateBillingForm',
    cardNo: 'validateBillingForm',
    cvv: 'validateBillingForm',
    expirationMonth: 'validateBillingForm',
    expirationYear: 'validateBillingForm',
    address: 'validateBillingForm',
    city: 'validateBillingForm',
    state: 'validateBillingForm',
    zipCode: 'validateBillingForm',
  },
  mounted() {
    this.firstName = this.card.firstName
    this.lastName = this.card.lastName
    this.cardNo = this.card.cardNo
    this.expirationMonth = this.card.expirationMonth
    this.expirationYear = this.card.expirationYear
    this.address = this.card.address
    this.city = this.card.city
    this.state = this.card.state
    this.zipCode = this.card.zipCode
  },
  computed: {
    isBillingFormValid(){
      return this.formValid;
    }
  },
  methods: {
    async validateBillingForm() {
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
      cardInfo['cardNo'] = this.cardNo;
      cardInfo['cvv'] = this.cvv;
      cardInfo['expirationMonth'] = this.expirationMonth;
      cardInfo['expirationYear'] = this.expirationYear;
      cardInfo['address'] = this.address;
      cardInfo['city'] = this.city;
      cardInfo['state'] = this.state;
      cardInfo['zipCode'] = this.zipCode;


      const allValuesNonEmpty = Object.values(cardInfo).every(value => value !== '');

      const billingInfo = allValuesNonEmpty ? cardInfo : {}

      this.$emit('getBillingInfo', billingInfo)
      console.log("Billing Info submitted")

    }
  },

}

</script>

