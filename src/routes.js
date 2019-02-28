import VueRouter from 'vue-router'

import ConsultantBoard from './pages/ConsultantBoard'
import TicketBoard from './pages/TicketBoard'
import About from './pages/About'
import Cabinet from './pages/Cabinet'
import VideoRoom from './pages/VideoRoom.vue'

export default new VueRouter({
  routes: [
    {
      path: '',
      component: ConsultantBoard
    },
    {
      path: '/ticketboard',
      component: TicketBoard
    },
    {
      path: '/about',
      component: About
    },
    {
      path: '/cabinet',
      component: Cabinet
    },
    {
      path: '/videoroom',
      component: VideoRoom
    }
  ],
  mode: 'history'
})
