import VueRouter from 'vue-router'

import ConsultantBoard from './pages/ConsultantBoard'
import TicketBoard from './pages/TicketBoard'
import About from './pages/About'
import Cabinet from './pages/Cabinet'
import VideoRoom from './pages/VideoRoom.vue'
import AnotherOne from './pages/AnotherOne.vue'
import ArbitrageList from './pages/ArbitrageList.vue'

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
      path: '/arbitrage',
      component: ArbitrageList
    },
    {
      path: '/videoroom',
      component: VideoRoom
    },
    {
      path: '/anotherone',
      component: AnotherOne
    },
  ],
  mode: 'history'
})
