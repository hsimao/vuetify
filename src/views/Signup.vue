<template>
  <v-container>
    <v-row>
      <v-col>
        <h1>Signup</h1>
        <v-form ref="signupForm" v-model="formValidity" lazy-validation @submit.prevent="submit">
          <v-text-field label="Name" v-model="name.value" :rules="name.rules" />

          <v-text-field label="Email" type="email" v-model="email.value" :rules="email.rules" />

          <v-text-field label="Phone" v-model="phone.value" :rules="phone.rules" />

          <v-text-field label="Money" type="number" v-model="money.value" :rules="money.rules" />

          <v-text-field label="Fee" type="number" v-model="fee.value" :rules="fee.rules" />

          <v-autocomplete
            label="Which browser do you use?"
            v-model="browser.value"
            :items="browserList"
            :rules="browser.rules"
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
            v-model="agreeToTerms.value"
            :rules="agreeToTerms.rules"
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
import {
  required,
  email,
  minLength,
  maxLength,
  minMaxLength,
  minLimit,
  maxLimit,
  minMaxLimit
} from "@/rules.js";

export default {
  name: "Signup",
  data: () => ({
    formValidity: false,
    menu: false,
    birthday: "",
    browserList: ["Chrome", "Firefox", "Safari", "Edge", "Brave"],
    browser: {
      value: "",
      rules: [required("Browser must be choose.")]
    },
    name: {
      value: "",
      rules: [
        required("Name is required!"),
        minLength(4, "不可小於 4 字元"),
        maxLength(20, "不可大於 20 字元")
      ]
    },
    phone: {
      value: "",
      rules: [required("Phone is required!"), minMaxLength(9, 12)]
    },
    money: {
      value: 0,
      rules: [
        minLimit(50, "金額不可低於 50 元"),
        maxLimit(1000, "金額不可大於 1000 元")
      ]
    },
    fee: {
      value: 0,
      rules: [minMaxLimit(10, 500, "手續費最少 10 元, 最多 500 元")]
    },
    email: {
      value: "",
      rules: [required(), email("信箱格式錯誤")]
    },
    agreeToTerms: {
      value: false,
      rules: [
        required(
          "You must agree to the terms and conditions to sign up for an account."
        )
      ]
    }
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