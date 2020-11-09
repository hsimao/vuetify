<template>
  <v-tabs v-model="tab" align-with-title @change="handleChange">
    <v-tabs-slider color="yellow"></v-tabs-slider>
    <v-tab v-for="(item, index) in items" :key="index">{{ item }}</v-tab>
  </v-tabs>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      tab: null
    };
  },
  methods: {
    handleChange(val) {
      this.$emit("onChange", val);
    }
  }
};
</script>

<style lang="scss" scoped>
</style>