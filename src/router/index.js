import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import Tool from '@/components/Tool'
import Borrow from '@/components/Borrow'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/print',
      name: 'print',
      component: require('./../views/print.vue')
    },
    {
      path: '/printAgain',
      name: 'printAgain',
      component: require('./../views/printAgain.vue')
    },
    {
      path: '/tool',
      name: 'Index',
      component: Index
    },
    {
      path: '/borrow',
      name: 'toolBorrow',
      component: Borrow,
      children: [
        {
          path: 'query',
          name: 'query',
          component: require('./../views/borrow/query.vue')
        },
        {
          path:'barcodeScan',
          name:'barcodeScan',
          component:require('./../views/borrow/barcodeScan.vue')
        },
        {
          path:'returnScan',
          name:'returnScan',
          component:require('./../views/return/returnScan.vue')
        },
        {
          path:'borrowList',
          name:'borrowList',
          component:require('../views/return/borrowList.vue')
        }
      ]
    }
  ]
})
