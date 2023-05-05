import { mount, createLocalVue } from '@vue/test-utils'
import EventList from '@/views/EventList'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import DateFilter from '@/filters/date'
import { getters, mutations, actions } from '@/store/modules/event.js'
import { state } from '@/store/modules/user.js'
import { routes } from '@/router/routes.js'
import { events as mockEvents } from '../../db.json'
import {
  state as notificationState,
  mutations as notificationMutations,
  actions as notificationActions,
} from '@/store/modules/notification.js'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(VueRouter)
localVue.filter('date', DateFilter)

describe('EventList', () => {
  let mockState, store, router, wrapper

  beforeEach(() => {
    jest.clearAllMocks()

    router = new VueRouter({ mode: 'history', routes: routes })

    mockState = {
      events: mockEvents,
      eventsTotal: 0,
      event: { id: 1, title: 'A', organizer: 'A' },
      perPage: 3,
    }

    store = new Vuex.Store({
      modules: {
        event: {
          state: mockState,
          mutations: mutations,
          actions: actions,
          getters: getters,
          namespaced: true,
        },
        user: {
          state: state,
          namespaced: true,
        },
        notificaton: {
          state: notificationState,
          mutations: notificationMutations,
          actions: notificationActions,
          namespaced: true,
        },
      },
    })

    wrapper = mount(EventList, {
      localVue,
      store,
      router,
      propsData: {
        page: 1,
      },
    })
  })

  it('Render the list of events successfully', () => {
    expect(wrapper.exists()).toBeTruthy()
  })

  it('Page title is rendered with the correct text', () => {
    //Mocking axios response
    const mock = new MockAdapter(axios)
    mock
      .onGet(
        '/events?_limit=' + mockState.perPage + '&_page=' + wrapper.props().page
      )
      .reply(200, mockEvents)

    const title = wrapper.find('[data-testid="pageTitle"]')
    expect(title.exists()).toBeTruthy()
    expect(title.text()).toContain('Events for Adam')
  })

  it('Events are rendered in a list with necessary information', () => {
    //Mocking axios response
    const mock = new MockAdapter(axios)
    mock
      .onGet(
        '/events?_limit=' + mockState.perPage + '&_page=' + wrapper.props().page
      )
      .reply(200, mockEvents)

    const events = wrapper.findAll('[data-testid="event-card"]')
    expect(events).toHaveLength(mockEvents.length)

    events.wrappers.forEach((event, i) => {
      const eventText = event.text()
      expect(eventText).toContain(mockEvents[i].title)
      expect(eventText).toContain(mockEvents[i].time)
      expect(eventText).toContain(mockEvents[i].attendees.length.toString())
    })
  })
})
