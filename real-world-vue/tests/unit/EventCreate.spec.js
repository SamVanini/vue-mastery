import { mount, createLocalVue } from '@vue/test-utils'
import EventCreate from '@/views/EventCreate'
import Datepicker from 'vuejs-datepicker'
import NProgress from 'nprogress'
import BaseInput from '@/components/BaseInput.vue'
import BaseSelect from '@/components/BaseSelect.vue'
import BaseButton from '@/components/BaseButton.vue'
import Vuex from 'vuex'
import { cloneDeep } from 'lodash'
import * as user from '@/store/modules/user.js'
import * as event from '@/store/modules/event.js'
import * as notification from '@/store/modules/notification.js'
import globalStore from '@/store/index.js'
import Vuelidate from 'vuelidate'

const localVue = createLocalVue()
localVue.component(Datepicker)
localVue.component(NProgress)
localVue.component(BaseInput)
localVue.component(BaseSelect)
localVue.component(BaseButton)
localVue.use(Vuex)
localVue.use(Vuelidate)

describe('EventCreate', () => {
  let wrapper, store

  beforeEach(() => {
    jest.clearAllMocks()

    store = new Vuex.Store({
      state: globalStore.state,
      modules: {
        event: cloneDeep(event),
        notification: cloneDeep(notification),
        user: cloneDeep(user),
      },
    })

    wrapper = mount(EventCreate, {
      localVue,
      store,
    })
  })

  it('Creates an event successfully', async () => {
    const category = wrapper.find('select[data-testid="eventCategory"]')
    const eventName = wrapper.find('input[data-testid="eventTitle"]')
    const eventDescription = wrapper.find(
      'input[data-testid="eventDescription"]'
    )
    const eventLocation = wrapper.find('input[data-testid="eventLocation"]')
    const eventDate = wrapper.findComponent(Datepicker)
    const eventTime = wrapper.find('select[data-testid="eventTime"]')

    category.element.value = store.state.categories[0]
    await category.trigger('input')

    eventName.element.value = 'Test Event'
    await eventName.trigger('input')

    eventDescription.element.value = 'Test Description'
    await eventDescription.trigger('input')

    eventLocation.element.value = 'Test Location'
    await eventLocation.trigger('input')

    eventDate.element.value = `Thu Apr 06 2023 16:45:00 GMT+0200 (Ora legale dell’Europa centrale)`
    await eventDate.trigger('input')

    eventTime.element.value = '9:00'
    await eventTime.trigger('input')

    await wrapper.find('form[data-testid="submitForm"]').trigger('submit')

    expect(wrapper.emitted('create-event')).toBeTruthy()
  })
})
