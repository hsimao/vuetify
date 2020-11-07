<template>
  <v-container>
    <h1>Dashboard</h1>

    <v-row>
      <v-col v-for="sale in sales" :key="`${sale.title}`" cols="12" md="4">
        <SalesGraph :sale="sale" />
      </v-col>
    </v-row>

    <v-row class="mb-16">
      <v-col v-for="statistic in statistics" :key="`${statistic.title}`" cols="12" sm="6" lg="3">
        <StatisticCard :statistic="statistic" />
      </v-col>
    </v-row>

    <!-- 使用 v-intersect 判斷該區塊是否進入到可視範圍 -->
    <v-row id="below-the-fold" v-intersect="showMoreContent">
      <v-col cols="12" md="8">
        <EmployeesTable :employees="employees" @select-employee="setEmployee" />
      </v-col>
      <v-col clos="12" md="4">
        <EventTimeline :timeline="timeline" />
      </v-col>
    </v-row>

    <!-- 上方區塊進入可視範圍才顯示此組件 -->
    <v-row v-if="loadNewContent" id="more-content">
      <v-col>
        <v-skeleton-loader ref="skeleton" type="table" class="ma-auto" />
      </v-col>
    </v-row>

    <v-snackbar v-model="snackbar" :left="$vuetify.breakpoint.mdAndUp">
      You have selected {{ selectedEmployee.name }}, {{ selectedEmployee.title }}
      <template
        v-slot:action="{ attrs }"
      >
        <v-btn color="pink" text v-bind="attrs" @click="snackbar = false">Close</v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>

<script>
import EmployeesTable from "../components/EmployeesTable";
import EventTimeline from "../components/EventTimeline";
import SalesGraph from "../components/SalesGraph";
import StatisticCard from "../components/StatisticCard";

import employeesData from "../data/employees.json";
import timelineData from "../data/timeline.json";
import salesData from "../data/sales.json";
import statisticsData from "../data/statistics.json";

export default {
  name: "Dashboard",
  components: {
    EmployeesTable,
    EventTimeline,
    SalesGraph,
    StatisticCard
  },
  data() {
    return {
      loadNewContent: false,
      snackbar: false,
      employees: employeesData,
      sales: salesData,
      statistics: statisticsData,
      timeline: timelineData,
      selectedEmployee: {
        name: "",
        title: ""
      }
    };
  },
  methods: {
    setEmployee(event) {
      this.snackbar = true;
      this.selectedEmployee.name = event.name;
      this.selectedEmployee.title = event.title;
    },
    showMoreContent(entries) {
      // 是否進入可視範圍
      this.loadNewContent = entries[0].isIntersecting;
    }
  }
};
</script>
