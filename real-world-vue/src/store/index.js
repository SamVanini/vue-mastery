import Vue from 'vue'
import Vuex from 'vuex'
//Import all public items into user namespace
import * as user from '@/store/modules/user.js'
import * as event from '@/store/modules/event.js'
import * as notification from '@/store/modules/notification.js'

Vue.use(Vuex)

export default new Vuex.Store({
  //Use the imported module
  modules: { user, event, notification },
  state: {
    categories: [
      'sustainability',
      'nature',
      'animal welfare',
      'housing',
      'education',
      'food',
      'community',
    ],
  },
})

/*Actions, mutations and getters are always registered
under the global namespace (aka the root which is $store)
even when using Modules

No matter where they're declared, they're called without
their module name

this.$store.dispatch('someAction')
this.$store.getters.filteredList

We can have multiple Actions/Mutations using the same name
We can end up with naming collisions
*/
