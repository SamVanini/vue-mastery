<!--
This page is referenced by VueRouter, so it is best pactise to
store it in the views folder
-->
<template>
  <div>
    <h1>Create an Event</h1>
    <!-- .prevent is needed to prevent the default behaviour -->
    <form @submit.prevent="createEvent" data-testid="submitForm">
      <BaseSelect
        label="Select a category"
        :options="categories"
        v-model="event.category"
        :class="{ error: $v.event.category.$error }"
        @blur="$v.event.category.$touch()"
        data-testid="eventCategory"
      />
      <!-- Blur changes the state of the select to dirty -->

      <template v-if="$v.event.category.$error">
        <p v-if="!$v.event.category.required" class="errorMessage">
          Category is required
        </p>
      </template>

      <h3>Name & describe your event</h3>
      <BaseInput
        type="text"
        placeholder="Title"
        label="Title"
        v-model="event.title"
        class="field"
        :class="{ error: $v.event.title.$error }"
        @blur="$v.event.title.$touch()"
        data-testid="eventTitle"
      />

      <template v-if="$v.event.title.$error">
        <p v-if="!$v.event.title.required" class="errorMessage">
          Title is required
        </p>
      </template>

      <BaseInput
        type="text"
        placeholder="Description"
        label="Description"
        v-model="event.description"
        class="field"
        :class="{ error: $v.event.description.$error }"
        @blur="$v.event.description.$touch()"
        data-testid="eventDescription"
      />

      <template v-if="$v.event.description.$error">
        <p v-if="!$v.event.description.required" class="errorMessage">
          Description is required
        </p>
      </template>

      <h3>Where is your event?</h3>
      <BaseInput
        type="text"
        placeholder="Location"
        label="Location"
        v-model="event.location"
        class="field"
        :class="{ error: $v.event.location.$error }"
        @blur="$v.event.location.$touch()"
        data-testid="eventLocation"
      />

      <template v-if="$v.event.location.$error">
        <p v-if="!$v.event.location.required" class="errorMessage">
          Location is required
        </p>
      </template>

      <h3>When is your event?</h3>

      <div class="field">
        <label>Date</label>
        <datepicker
          v-model="event.date"
          placeholder="Select a date"
          :input-class="{ error: $v.event.date.$error }"
          @opened="$v.event.date.$touch()"
          data-testid="eventDate"
        />
      </div>

      <template v-if="$v.event.date.$error">
        <p v-if="!$v.event.date.required" class="errorMessage">
          Date is required
        </p>
      </template>

      <BaseSelect
        label="Select a time"
        :options="times"
        v-model="event.time"
        class="field"
        :class="{ error: $v.event.time.$error }"
        @blur="$v.event.time.$touch()"
        data-testid="eventTime"
      />

      <template v-if="$v.event.time.$error">
        <p v-if="!$v.event.time.required" class="errorMessage">
          Time is required
        </p>
      </template>

      <BaseButton
        type="submit"
        data-testid="submitButton"
        buttonClass="-fill-gradient"
        :disabled="$v.$anyError"
        >Submit</BaseButton
      >

      <p v-if="$v.$anyError" class="errorMessage">
        Please fill out the required field(s)
      </p>
    </form>
  </div>
</template>

<script>
import Datepicker from 'vuejs-datepicker'
import NProgress from 'nprogress'
import BaseInput from '@/components/BaseInput.vue'
import BaseSelect from '@/components/BaseSelect.vue'
import BaseButton from '@/components/BaseButton.vue'
import { required } from 'vuelidate/lib/validators'

//Accessing the global state with $store
export default {
  components: {
    Datepicker,
    BaseInput,
    BaseSelect,
    BaseButton,
  },
  data() {
    const times = []
    for (let i = 1; i <= 24; i++) {
      times.push(i + ':00')
    }
    return {
      times,
      categories: this.$store.state.categories,
      event: this.createFreshEventObject(),
    }
  },
  validations: {
    event: {
      category: { required },
      title: { required },
      description: { required },
      location: { required },
      date: { required },
      time: { required },
    },
  },
  /*Named mapState, alternatively
  computed: {
    /*computed property of the component
    localComputed() {
      return 'something'
    },

    calling a getter
    getEvent() {
      return this.$store.getters.getEventById
    },
    ...mapGetters(['getEventById']),
    ...mapState(['user', 'categories']),
  },

  Unnamed mapState

  computed: mapState({
  userName: (state) => state.user.username,
  userID: (state) => state.user.id,
  categories: (state) => state.categories,

  There is a simpler way to map the state, as shown below

  user: 'user',
  categories: 'categories',
  }),*/
  methods: {
    createEvent() {
      this.$emit('create-event')
      this.$v.$touch()
      if (!this.$v.$invalid) {
        NProgress.start()
        this.$store
          .dispatch('event/createEvent', this.event)
          .then(() => {
            this.$router.push({
              name: 'event-show',
              params: { id: this.event.id },
            })
            this.event = this.createFreshEventObject()
          })
          .catch(() => {
            NProgress.done()
          })
        //Only reset when event has been successfully pushed
        //this.event = this.createFreshEventObject()
      }
    },
    createFreshEventObject() {
      const user = this.$store.state.user.user
      const id = Math.floor(Math.random() * 10000000)

      //inserted here because it is used to clear an event
      return {
        id: id,
        user: user,
        category: '',
        organizer: user,
        title: '',
        description: '',
        location: '',
        date: '',
        time: '',
        attendees: [],
      }
    },
  },
}
</script>

<style scoped>
.field {
  margin-bottom: 24px;
}

.errorMessage {
  color: red;
}
</style>
