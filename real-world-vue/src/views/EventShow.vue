<!--
This page is referenced by VueRouter, so it is best pactise to
store it in the views folder
-->
<template>
  <div>
    <div class="event-header">
      <span class="eyebrow">@{{ event.time }} on {{ event.date | date }}</span>
      <h1 class="title">{{ event.title }}</h1>
      <h5>Organized by {{ event.organizer ? event.organizer.name : '' }}</h5>
      <h5>Category: {{ event.category }}</h5>
    </div>

    <BaseIcon name="map"><h2>Location</h2></BaseIcon>

    <address>{{ event.location }}</address>

    <h2>Event details</h2>
    <p>{{ event.description }}</p>

    <h2>
      Attendees
      <!--
        The ternary condition is necessary because, when the page is loaded,
        the length of attendees'array is NULL.
      -->
      <span class="badge -fill-gradient">{{
        event.attendees ? event.attendees.length : 0
      }}</span>
    </h2>
    <ul class="list-group">
      <li
        v-for="(attendee, index) in event.attendees"
        :key="index"
        class="list-item"
      >
        <strong>{{ attendee.name }}</strong>
      </li>
    </ul>
  </div>
</template>

<script>
/*import NProgress from 'nprogress'
import store from '@/store/index.js'*/

export default {
  props: {
    event: {
      type: Object,
      required: true,
    },
  },
  /*beforeRouteEnter(routeTo, routeFrom, next) {
    NProgress.start()
    store.dispatch('event/fetchEvent', routeTo.params.id).then(() => {
      NProgress.done()
      next()
    })
  },*/
  //event is mapped to the state event
  /*computed: mapState({
    event: (state) => state.event.event,
  }),*/
  //Equals to mapActions(['event/fetchEvent'])
  //methods: mapActions('event', ['fetchEvent']), (namespace, action to map)
}
</script>

<style scoped>
.location {
  margin-bottom: 0;
}
.location > .icon {
  margin-left: 10px;
}
.event-header > .title {
  margin: 0;
}
.list-group {
  margin: 0;
  padding: 0;
  list-style: none;
}
.list-group > .list-item {
  padding: 1em 0;
  border-bottom: solid 1px #e5e5e5;
}
</style>
