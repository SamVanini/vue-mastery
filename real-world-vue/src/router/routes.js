import EventCreate from '../views/EventCreate.vue'
import EventList from '../views/EventList.vue'
import EventShow from '../views/EventShow.vue'
import NotFound from '../views/NotFound.vue'
import NetworkIssue from '../views/NetworkIssue.vue'
import store from '@/store/index.js'

export const routes = [
  {
    path: '/', //URL
    name: 'event-list', //Name of the route
    component: EventList, //Component to render
    props: true, //To send params in as props
  },
  // Order is important, static routes before dynamic routes (prevent collision)
  {
    path: '/event/create',
    name: 'event-create',
    component: EventCreate,
  },
  {
    path: '/event/:id',
    name: 'event-show',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    /*component: () =>
        import(/* webpackChunkName: "about" '../views/AboutView.vue'),*/

    /* REDIRECTION creating an alias.
      It isn't a good practise to have 2 pages with the same content*/
    //alias: '/about',
    component: EventShow,
    props: true,
    beforeEnter(routeTo, routeFrom, next) {
      store
        .dispatch('event/fetchEvent', routeTo.params.id)
        .then((event) => {
          routeTo.params.event = event
          next()
        })
        .catch((error) => {
          if (error.response && error.response.status == 404) {
            next({ name: '404', params: { resource: 'event' } })
          } else {
            next({ name: 'NetworkIssue' })
          }
        })
    },
  },
  // REDIRECTION best way
  /*{
      path: '/about',
      redirect: { name: 'about' },
    },
    {
      path: '/user/:username',
      name: 'user',
      component: UserM,
      props: true,
    },

     NOT FOUND IMPLEMENTATION
    {
      path: '/user/:username',
      name: 'user',
      component: NotFoundComponent,
    }*/
  {
    path: '/404',
    name: '404',
    component: NotFound,
    props: true,
  },
  {
    path: '/network-issue',
    name: 'network-issue',
    component: NetworkIssue,
  },
  //Catches all the URLs not listed above
  {
    path: '*',
    redirect: { name: '404', params: { resource: 'page' } },
  },
]
