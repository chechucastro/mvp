<template>
  <v-col class="d-flex d-flex justify-end align-center">
    <div class="select mr-6">
      <select v-model="projectFilterVal">
        <option selected>All projects</option>
        <option v-for="(project, index) in projects" :key="index"> {{ project.name }}</option>
      </select>
    </div>
    <div class="select mr-6">
      <select v-model="gatewayFilterVal">
        <option>All gateways</option>
        <option v-for="(gateway, index) in gateways" :key="index"> {{ gateway.name }}</option>
      </select>
    </div>
    <div class="mr-6">
      <v-menu
        v-model="from"
        :close-on-content-click="false"
        :nudge-right="40"
        transition="scale-transition"
        offset-y
        min-width="auto"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            class="pa-0 ma-0 rounded custom-placeholder-color"
            style="width:135px;"
            v-model="dateFrom"
            append-icon="mdi-calendar"
            readonly
            v-bind="attrs"
            v-on="on"
            hide-details
            placeholder="From date"
          ></v-text-field>
        </template>
        <v-date-picker
          flat
          v-model="dateFrom"
          @input="from = false"
        ></v-date-picker>
      </v-menu>
    </div>
    <div>
      <v-menu
        v-model="to"
        :close-on-content-click="false"
        :nudge-right="40"
        transition="scale-transition"
        offset-y
        min-width="auto"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            class="pa-0 ma-0 rounded custom-placeholder-color"
            style="width:135px;"
            v-model="dateTo"
            append-icon="mdi-calendar"
            readonly
            v-bind="attrs"
            v-on="on"
            hide-details
            placeholder="To date"
          ></v-text-field>
        </template>
        <v-date-picker
          flat
          v-model="dateTo"
          @input="to = false"
        ></v-date-picker>
      </v-menu>
    </div>
    <div class="ml-6">
      <v-btn
        depressed
        color="#005B96"
        height="32"
        width="118"
        class="text-capitalize txt--regular--small white--text"
        @click="$root.$emit('show-report')"
      >
        Generate report
      </v-btn>
    </div>
  </v-col>
</template>
<script>
export default {
  name: 'ToggleComponent',
  props: {
    projects: {
      type: Array
    },
    gateways: {
      type: Array
    }
  },
  data: () => ({
    projectFilterVal: 'All projects',
    gatewayFilterVal: 'All gateways',
    dateFrom: null,
    dateTo: null,
    menu: false,
    from: false,
    to: false,
    show: false
  }),
  watch: {
    projectFilterVal: {
      handler (value) {
        this.$root.$emit('filter-by-project', value)
      }
    },
    gatewayFilterVal: {
      handler (value) {
        this.$root.$emit('filter-by-gateway', value)
      }
    }
  }
}
</script>
