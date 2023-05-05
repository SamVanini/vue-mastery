import LoginForm from '@/components/LoginForm.vue'
import { mount } from '@vue/test-utils'

describe('LoginForm', () => {
  it('emits an event with a user data payload', () => {
    const wrapper = mount(LoginForm)
    // 1. Find text input
    const input = wrapper.find('input[type="text"]')

    // 2. Set value for text input
    input.setValue('Adam Jahr')

    // 3. Simulate form submission
    wrapper.trigger('submit')

    // 4. Assert event has been emitted
    const formSubmittedCalls = wrapper.emitted('formSubmitted')
    expect(formSubmittedCalls).toHaveLength(1)

    // 5. Assert payload is correct
    const expectedPayload = { name: 'Adam Jahr' }
    expect(wrapper.emitted('formSubmitted')[0][0]).toMatchObject(
      expectedPayload
    )
  })
})

/*
  In case of multiple components of the same type, it is
  good practise to define a data-testid="name-input" and
  use this name when defining the find in the test

  <input data-testid="name-input" ... />

  wrapper.find('[data-testid="name-input"]')
*/
