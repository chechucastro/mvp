/**
 * Centralized event bus methods
 */
import Vue from 'vue'
export const EventBus = new Vue({
  methods: {
    // Notification error
    notification (payload) {
      this.$emit('notification', payload)
    }
  }
})
