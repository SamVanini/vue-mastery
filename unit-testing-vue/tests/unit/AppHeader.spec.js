import AppHeader from '@/components/AppHeader.vue'
import { mount } from '@vue/test-utils'

//Creates a block of tests, aka a "test-suite"
describe('AppHeader', () => {
  // test: Creates a Jest test
  // expect: Creates an assertion
  // toBe: checks that the outcome matches the expected
  // Wrapper permits to access properties usable to test the component
  // setData permits to change the data of the component
  // async and await are used when waiting on DOM updates
  test('If user is not logged in, do not show logout button', () => {
    const wrapper = mount(AppHeader)
    expect(wrapper.find('button').isVisible()).toBe(false)
  })

  /* The button has to be visible because the user is
     logged in
  */
  test('If user is logged in, show logout button', async () => {
    const wrapper = mount(AppHeader)
    wrapper.setData({ loggedIn: true })

    await wrapper.vm.$nextTick()
    expect(wrapper.find('button').isVisible()).toBe(true)
  })
})
