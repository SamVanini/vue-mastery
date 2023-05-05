import Vue from 'vue'
import App from './App.vue'
import router from './router' //Import the router
import store from './store' // Import Vuex store
import upperFirst from 'lodash/upperFirst'
import camelCase from 'lodash/camelCase'
import BaseIcon from '@/components/BaseIcon'
import 'nprogress/nprogress.css'
import Vuelidate from 'vuelidate'
import DateFilter from './filters/date'

Vue.filter('date', DateFilter) //Importing global filter

Vue.use(Vuelidate) //Validates fields of a form
Vue.component('BaseIcon', BaseIcon)

/*GLOBAL COMPONENT REGISTRATION

This is how a global component is registered

import BaseIcon from '@/components/BaseIcon.vue'

Vue.component('BaseIcon', BaseIcon)

If a lot of base components are needed, this method will be
a nuisance, because there is a great number of copy-paste involved

The solution shown below is the fastest method to register a lot of base component,
but they have to be named as Base*.vue 
*/

const requireComponent = require.context(
  // The relative path of the components folder
  './components',
  // Whether or not to look in subfolders
  false,
  // The regular expression used to match base component filenames
  /Base[A-Z]\w+\.(vue|js)$/
)

requireComponent.keys().forEach((fileName) => {
  // Get component config
  const componentConfig = requireComponent(fileName)

  // Get PascalCase name of component
  const componentName = upperFirst(
    camelCase(
      // Gets the file name regardless of folder depth
      fileName
        .split('/')
        .pop()
        .replace(/\.\w+$/, '')
    )
  )

  // Register component globally
  Vue.component(
    componentName,
    // Look for the component options on `.default`, which will
    // exist if the component was exported with `export default`,
    // otherwise fall back to module's root.
    componentConfig.default || componentConfig
  )
})

Vue.config.productionTip = false

/*
GLOBAL MIXIN

This code will be mixed into every single component

Use this with extreme caution!

Vue.mixin({
  mounted() {
    console.log('I am mixed into every component.')
  },
})
*/

new Vue({
  router, //use the router, same as writing router:router
  store,
  render: (h) => h(App),
}).$mount('#app')
