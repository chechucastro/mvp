<template>
  <v-row class="mt-4 ml-1">
    <v-col cols="4">
      <h1 class="txt--bold--xxl">Reports</h1>
      <p class="txt--p font-weight-black ma-0">Easily generate a report of your transactions</p>
    </v-col>
    <v-col class="d-flex justify-end align-center controls">
      <!-- Filters Selectors component -->
      <Filters :projects="projects" :gateways="gateways"/>
    </v-col>
    <!-- Main table with data -->
    <v-col :cols="(reportBlockIsOpened) ? 6 : 12">
      <v-card
        class="pa-4 border--rad"
        elevation="0"
        color="#F1FAFE"
      >
        <p class="txt--bold">{{ currentProject }} | {{ currentGateway }}</p>
        <v-row
          justify="center"
          class="pa-4"
        >
          <v-expansion-panels
            inset
            flat
          >
            <v-expansion-panel v-for="(project, index) in dataTableList" :key="index"
              class="mt-1 mb-1 rounded-lg"
              active-class="rounded-lg"
            >
              <v-expansion-panel-header expand-icon="" >
                <v-row class="ma-1" >
                  <v-col class="d-flex justify-start align-center">
                    <p class="txt--bold mb-0">
                      {{ project.name }}
                    </p>
                  </v-col>
                  <v-col class="d-flex justify-end align-center txt--bold">TOTAL: 10,065 USD</v-col>
                </v-row>
              </v-expansion-panel-header>
              <v-expansion-panel-content class="mb-4">
                <v-row class="txt--regular">
                  <v-col>Date</v-col>
                  <v-col>Gateway</v-col>
                  <v-col>Type</v-col>
                  <v-col class="d-flex justify-end">Amount</v-col>
                </v-row>
                <v-row class="txt--regular" :class="{odd: !(index % index)}">
                  <v-col><span v-if="project.date">{{ project.date }}</span><span v-else>N/A</span></v-col>
                  <v-col><span v-if="project.gatewayIds">{{ project.gatewayIds.toString() }} </span><span v-else>{{ project.gatewayId }}</span></v-col>
                  <v-col> <span v-if="project.type">{{ project.type }}</span><span v-else>{{ project.rule}}</span></v-col>
                  <v-col class="d-flex justify-end align-center"><span v-if="project.amount">{{ project.amount }}</span><span v-else>N/A</span></v-col>
                </v-row>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-row>
      </v-card>

    </v-col>
    <!-- Chart report component -->
    <v-col v-show="reportBlockIsOpened">
        <v-card
        class="pa-4 border--rad"
        elevation="0"
        color="#F1FAFE"
      >
      <DonutReport />
      </v-card>
    </v-col>
  </v-row>
</template>
<script>
import Filters from './sharedComponents/Filters'
import DonutReport from './sharedComponents/DonutReport'
import { Services } from '@/service/Services'
export default {
  name: 'Reports',
  components: {
    Filters,
    DonutReport
  },
  data: () => ({
    selectorParam: null,
    projects: [],
    gateways: [],
    currentProject: 'All projects',
    currentGateway: 'All gateways',
    reportBlockIsOpened: false,
    chartOptions: {
      hoverBorderWidth: 20
    },
    chartData: {
      hoverBackgroundColor: 'red',
      hoverBorderWidth: 10,
      labels: ['Green', 'Red', 'Blue'],
      datasets: [
        {
          label: 'Data One',
          backgroundColor: ['#41B883', '#E46651', '#00D8FF'],
          data: [1, 10, 5]
        }
      ]
    }
  }),
  methods: {
    // Get project list
    getProjectsList () {
      Services.getProjectsList().then((project) => {
        this.projects = project.data
      })
    },
    // Get Gateways
    getProjectsGateways () {
      Services.getProjectsGateways().then((gateway) => {
        this.gateways = gateway.data
      })
    }
  },
  created () {
    Promise.all([this.getProjectsList(), this.getProjectsGateways()])
  },
  mounted () {
    // filter by project
    this.$root.$on('filter-by-project', (payload) => {
      this.selectorParam = payload
      this.currentProject = payload
    })
    // filter by gateways
    this.$root.$on('filter-by-gateway', (payload) => {
      this.selectorParam = payload
      this.currentGateway = payload
    })
    // Report block show / hide
    this.$root.$on('show-report', () => {
      this.reportBlockIsOpened = !this.reportBlockIsOpened
    })
  },
  computed: {
    dataTableList () {
      const merged = [...this.projects, ...this.gateways]
      const filteredBy = (this.selectorParam === 'All gateways') || (this.selectorParam === 'All projects') || (!this.selectorParam) ? merged : merged.filter(project => project.name === this.selectorParam)
      return filteredBy
    }
  }
}
</script>
<style lang="scss">
.v-sheet.v-card.border--rad {
  border-radius: 10px;
}
.v-expansion-panel-header {
  padding: 8px 0 !important;
}
.v-expansion-panels--inset > .v-expansion-panel--active {
  max-width: 100% !important;
}
.odd {
  background: #F1FAFE;
}
</style>
