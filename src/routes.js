import VueRouter from 'vue-router'

import ConsultantBoard from './pages/ConsultantBoard'
import TicketBoard from './pages/TicketBoard'

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
  ],
  mode: 'history'
})
