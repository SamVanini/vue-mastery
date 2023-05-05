import { shallowMount, createLocalVue } from '@vue/test-utils'
import EventCard from '@/components/EventCard.vue'
import DateFilter from '@/filters/date'
import BaseIcon from '@/components/BaseIcon.vue'

//Register filter and component used by EventCard
const localVue = createLocalVue()
localVue.filter('date', DateFilter)
localVue.component('BaseIcon', BaseIcon)

describe('EventCard', () => {
  it("renders the event's data successfully", () => {
    const event = {
      id: 1,
      title: 'Coaching Little League',
      time: '12:00PM',
      date: 'Sep 29 2022',
      attendees: [
        {
          id: 'abc123',
          name: 'Adam Jahr',
        },
        {
          id: 'def456',
          name: 'Gregg Pollack',
        },
        {
          id: 'ghi789',
          name: 'Beth Swanson',
        },
        {
          id: 'jkl101',
          name: 'Mary Gordon',
        },
      ],
    }
    const wrapper = shallowMount(EventCard, {
      localVue,
      propsData: {
        event,
      },
    })

    let filteredDate = new Date(event.date).toLocaleString(['en-US'], {
      month: 'short',
      day: '2-digit',
      year: 'numeric',
    })
    const wrapperHtml = wrapper.html(filteredDate)
    expect(wrapperHtml).toContain(filteredDate)
    expect(wrapperHtml).toContain(event.time)
    expect(wrapperHtml).toContain(event.title)
    expect(wrapperHtml).toContain(String(event.attendees.length))
  })
})
