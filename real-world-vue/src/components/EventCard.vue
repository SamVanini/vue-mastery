<template>
  <div class="event-card -shadow">
    <span class="eyebrow">@{{ event.time }} on {{ event.date | date }}</span>
    <h4>{{ event.title }}</h4>
    <BaseIcon name="users"> {{ event.attendees.length }} attending </BaseIcon>
  </div>
</template>

<script>
import BaseIcon from '@/components/BaseIcon.vue'
export default {
  props: {
    event: Object,
  },
  components: {
    BaseIcon,
  },
}
</script>

<!--
Scoped indicates what exactly the style section modifies
-->

<style scoped>
.event-card {
  padding: 20px;
  margin-bottom: 24px;
  transition: all 0.2s linear;
  cursor: pointer;
}
.event-card:hover {
  transform: scale(1.01);
  box-shadow: 0 3px 12px 0 rgba(0, 0, 0, 0.2), 0 1px 15px 0 rgba(0, 0, 0, 0.19);
}
.event-card > .title {
  margin: 0;
}
.event-link {
  color: black;
  text-decoration: none;
  font-weight: 100;
}
</style>
