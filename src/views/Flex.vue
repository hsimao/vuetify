<template>
  <v-container>
    <h1 class="mb-4 display-3 font-weight-bold">Flex</h1>
    <div class="d-flex flex-wrap flex-row blue white--text text-left">
      <div v-for="n in 10" :key="n" class="box pa-10 ma-4 red">box{{n}}</div>
    </div>

    <v-row class="green ma-10 justify-space-between">
      <v-col v-for="n in 3" :key="n" class="pa-10 red ma-4 flex-grow-0">box-{{n}}</v-col>
    </v-row>

    <div class="d-flex flex-row flex-wrap justify-space-between align- blue">
      <div class="red ma-4 pa-10 flex-grow-0" v-for="n in 6" :key="n">box{{n}}</div>
      <div class="red ma-4 pa-10 flex-grow-0 order-first">box7</div>
    </div>
  </v-container>
</template>

<script>
export default {
  name: "Flex"
};
</script>

<style lang="scss" scoped>
</style>