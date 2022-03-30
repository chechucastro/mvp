import Queries from '../../queries/queries'
import { EventBus } from '@/declarations/eventBus'
import axios from 'axios'
/**
 * Get list
 * @returns {promise}
*/
export const Reports = {
  methods: {
    async getProjectsList () {
      try {
        const response = await axios.get(Queries.projects.getProjects)
        return response.data
      } catch (error) {
        // Checking for errors...
        if (error.response.status !== 200) {
          // Mvp Notification or similar! Why not !
          EventBus.notification(error.response.status)
          return error.response
        }
      }
    },
    async getProjectsGateways () {
      try {
        const response = await axios.get(Queries.gateways.getGateways)
        return response.data
      } catch (error) {
        // Checking for errors...
        if (error.response.status !== 200) {
          // Mvp Notification or similar! Why not !
          EventBus.notification(error.response.status)
          return error.response
        }
      }
    }
  }
}
