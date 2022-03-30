import Vue from 'vue'
// Imports added below
import { Reports } from '@/service/modules/reports'

export const Services = new Vue({
  mixins: [
    Reports
  ]
})
