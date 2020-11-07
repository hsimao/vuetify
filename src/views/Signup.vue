<template>
  <v-container>
    <v-row>
      <v-col>
        <h1>Signup</h1>
        <v-form>
          <v-text-field label="Email" type="email" />

          <v-autocomplete
            label="Which browser do you use?"
            v-model="selectedBrowser"
            :items="browser"
          ></v-autocomplete>

          <v-file-input accept="image/*" label="Attach profile picture"></v-file-input>

          <v-menu
            ref="menu"
            v-model="menu"
            :close-on-content-click="false"
            transition="scale-transition"
            offset-y
            min-width="290px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="birthday"
                label="Birthday"
                prepend-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              ref="picker"
              v-model="birthday"
              locale="zh-TW"
              :max="new Date().toISOString().substr(0, 10)"
              min="1950-01-01"
              @change="save"
            ></v-date-picker>
          </v-menu>

          <v-checkbox label="Agree to terms & conditions"></v-checkbox>

          <v-btn type="submit" color="primary">Submit</v-btn>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Signup",
  data: () => ({
    browser: ["Chrome", "Firefox", "Safari", "Edge", "Brave"],
    selectedBrowser: "",
    birthday: new Date().toISOString().substr(0, 10),
    menu: false
  }),
  watch: {
    menu(val) {
      val && setTimeout(() => (this.$refs.picker.activePicker = "YEAR"));
    }
  },
  methods: {
    save(date) {
      this.$refs.menu.save(date);
    }
  }
};
</script>

<style lang="scss" scoped>
</style>