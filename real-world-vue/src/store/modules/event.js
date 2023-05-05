import EventService from '@/services/EventService.js'

//All mutations, actions and getters will be namespaced under 'event'
export const namespaced = true

export const state = {
  events: [
    /*{ id: 1, title: '...', organizer: '...' },
  { id: 2, title: '...', organizer: '...' },
  { id: 3, title: '...', organizer: '...' },
  { id: 4, title: '...', organizer: '...' },*/
  ],
  eventsTotal: 0,
  event: {},
  perPage: 3,
}
//Can be used from everywhere in the application
export const getters = {
  /*catLenght: (state) => {
  return state.categories.length
},*/
  getEventById: (state) => (id) => {
    return state.events.find((event) => event.id === id)
  },
  //Filter an array and display only the matching objects
  /*doneTodos: (state) => {
  return state.todos.filter((todo) => todo.done)
},*/
  /*activeTodosCount: (state, getters) => {
  Alternatively, avoiding to pass a getter
  return state.todos.filter((todo) => !todo.done)
  return state.todos.length - getters.doneTodos.length
},*/
}
export const mutations = {
  /*
  Mutations should not be called from other Vuex modules
  Mutations should only be called from Actions inside
  the current module

  How to call actions inside another namespaced module

  dispatch('moduleName/actionToCall', payload || null, {root: true})

  root: true means 'Look for this action at the root of our store'
  */
  ADD_EVENT(state, event) {
    state.events.push(event)
  },
  SET_EVENTS(state, events) {
    state.events = events
  },
  SET_EVENTS_TOTAL(state, eventsTotal) {
    state.eventsTotal = eventsTotal
  },
  SET_EVENT(state, event) {
    state.event = event
  },
}

export const actions = {
  /*If we want to use the user state in this state,
  we have to use rootState (the base state inside index.js)
  */
  createEvent({ commit, rootState, dispatch }, event) {
    console.log('User creating Event is' + rootState.user.user.name)

    return EventService.postEvent(event)
      .then(() => {
        commit('ADD_EVENT', event)
        const notification = {
          type: 'success',
          message: 'Your event has been created',
        }
        dispatch('notification/add', notification, { root: true })
      })
      .catch((error) => {
        const notification = {
          type: 'error',
          message: 'There was a problem creating your event: ' + error.message,
        }
        dispatch('notification/add', notification, { root: true })
        throw error
      })
  },
  /* The payload in both actions and mutations can be a
single variable or an object
*/
  fetchEvents({ commit, state }, { page }) {
    EventService.getEvents(state.perPage, page).then((response) => {
      commit('SET_EVENTS_TOTAL', parseInt(response.headers['x-total-count']))
      commit('SET_EVENTS', response.data)
    })
    // .catch((error) => {
    //   const notification = {
    //     type: 'error',
    //     message: 'There was a problem fetching events: ' + error.message,
    //   }
    //   dispatch('notification/add', notification, { root: true })
    // })
  },
  fetchEvent({ commit, getters, dispatch }, id) {
    let event = getters.getEventById(id)

    if (event) {
      commit('SET_EVENT', event)
      return event //return the event to EventShow
    } else {
      return EventService.getEvent(id)
        .then((response) => {
          commit('SET_EVENT', response.data)
          return response.data
        })
        .catch((error) => {
          const notification = {
            type: 'error',
            message: 'There was a problem fetching event: ' + error.message,
          }
          dispatch('notification/add', notification, { root: true })
        })
    }
  },
}
