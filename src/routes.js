import VueRouter from 'vue-router'

import ConsultantBoard from './pages/ConsultantBoard'
import TicketBoard from './pages/TicketBoard'
import About from './pages/About'
import PersonalCabinet from './pages/PersonalCabinet'

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
      path: '/personalCabinet',
      component: PersonalCabinet
    },
  ],
  mode: 'history'
})
