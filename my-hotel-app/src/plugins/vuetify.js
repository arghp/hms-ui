/**
 * plugins/vuetify.js
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Composables
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as labsComponents from 'vuetify/labs/components'


// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
/*
export default createVuetify({
  theme: {
    themes: {
      light: {
        colors: {
          primary: '#1867C0',
          secondary: '#5CBBF6',
        },
      },
    },
  },
})
*/
export default createVuetify({
  components: {
    ...components,
    ...labsComponents,
  },
})


/*

  * Color Theme Swatches in Hex *
  https://www.canva.com/colors/color-palettes/northern-lights-3/
Neon Green #1DC690 -- using next green #5CA277
Blue Grotto #278AB0 --text light
Blue #1C4670  -- background
Ivory #EAEAE0

https://www.canva.com/colors/color-palettes/retro-building-level/
  Amber #E4A527
*/


