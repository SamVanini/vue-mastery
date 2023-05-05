<!--
This page is referenced by VueRouter, so it is best pactise to
store it in the views folder
-->
<template>
  <div>
    <!-- module.state.name -->
    <h1 data-testid="pageTitle">Events for {{ user.user.name }}</h1>
    <!--
      Iterate the JSON data returned by the API call in the created()
    -->
    <router-link
      class="event-link"
      :to="{ name: 'event-show', params: { id: event.id } }"
      v-for="event in event.events"
      :key="event.id"
    >
      <EventCard data-testid="event-card" :event="event" />
    </router-link>
    <template v-if="page != 1">
      <router-link
        :to="{ name: 'event-list', query: { page: page - 1 } }"
        rel="prev"
      >
        Prev Page</router-link
      >
      <template v-if="hasNextPage"> | </template>
    </template>
    <router-link
      v-if="hasNextPage"
      :to="{ name: 'event-list', query: { page: page + 1 } }"
      rel="next"
    >
      Next Page</router-link
    >
  </div>
</template>

<script>
import EventCard from '@/components/EventCard.vue'
import { mapState } from 'vuex'
import store from '@/store/index.js'

function getPageEvents(routeTo, next) {
  const currentPage = parseInt(routeTo.query.page) || 1
  store
    .dispatch('event/fetchEvents', {
      page: currentPage,
    })
    .then(() => {
      routeTo.params.page = currentPage
      next()
    })
}
export default {
  props: {
    page: {
      type: Number,
      required: true,
    },
  },
  components: {
    EventCard,
  },
  beforeRouteEnter(routeTo, routeFrom, next) {
    getPageEvents(routeTo, next)
  },
  beforeRouteUpdate(routeTo, routeFrom, next) {
    getPageEvents(routeTo, next)
  },
  /*How to send in a URL query parameter
  created() {
    this.perPage = 3 // Setting perPage here and not in data means it won't be reactive.
    // We don't need it to be reactive, and this way our component has access to it.

    this.$store.dispatch('event/fetchEvents', {
      perPage: this.perPage,
      page: this.page,
    })
  },*/
  computed: {
    hasNextPage() {
      return this.event.eventsTotal > this.page * this.event.perPage
    },
    ...mapState(['user', 'event']),
  },
}
</script>
