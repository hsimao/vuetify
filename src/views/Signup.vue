<template>
  <v-container>
    <v-row>
      <v-col>
        <h1>Signup</h1>
        <v-form ref="signupForm" v-model="formValidity" lazy-validation @submit.prevent="submit">
          <v-text-field label="Email" type="email" v-model="email" :rules="emailRules" />

          <v-autocomplete
            label="Which browser do you use?"
            v-model="selectedBrowser"
            :items="browser"
            :rules="[value => !!value || 'Browser must be choose.']"
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

          <v-checkbox
            label="Agree to terms & conditions"
            v-model="agreeToTerms"
            :rules="agreeToTermsRules"
            required
          ></v-checkbox>

          <v-btn class="mr-4" type="submit" color="primary" :disabled="!formValidity">Submit</v-btn>
          <v-btn class="mr-4" color="success" @click="validateForm">Validate Form</v-btn>
          <v-btn class="mr-4" color="warning" @click="resetValidation">Reset Validation</v-btn>
          <v-btn color="error" @click="resetForm">Reset</v-btn>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// eslint-disable-next-line
const emailRule = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

export default {
  name: "Signup",
  data: () => ({
    browser: ["Chrome", "Firefox", "Safari", "Edge", "Brave"],
    selectedBrowser: "",
    birthday: "",
    menu: false,
    email: "",
    emailRules: [
      value => !!value || "Email is required.",
      value => emailRule.test(value) || "Email invalid."
    ],
    agreeToTerms: false,
    agreeToTermsRules: [
      value =>
        !!value ||
        "You must agree to the terms and conditions to sign up for an account."
    ],
    formValidity: false
  }),
  watch: {
    menu(val) {
      val && setTimeout(() => (this.$refs.picker.activePicker = "YEAR"));
    }
  },
  methods: {
    save(date) {
      this.$refs.menu.save(date);
    },
    validateForm() {
      this.$refs.signupForm.validate();
    },
    resetValidation() {
      this.$refs.signupForm.resetValidation();
    },
    resetForm() {
      this.$refs.signupForm.reset();
    },
    async submit() {
      await this.$refs.signupForm.validate();
      if (!this.formValidity) return;
      console.log("pass");
    }
  }
};
</script>

<style lang="scss" scoped>
</style>