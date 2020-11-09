<template>
  <v-container>
    <v-toolbar color="cyan" dark flat>
      <template v-slot:extension>
        <TabsComponent :items="items" @onChange="handleChange" />
      </template>
    </v-toolbar>

    <v-tabs-items v-model="tab">
      <v-tab-item v-for="(tableData, key) in formatTableData" :key="key">
        <v-data-table :headers="headers" :items="tableData" :items-per-page="5" class="elevation-1"></v-data-table>
      </v-tab-item>
    </v-tabs-items>
  </v-container>
</template>

<script>
import TabsComponent from "@/components/TabsComponent";

export default {
  name: "Tabs",
  components: {
    TabsComponent
  },
  data() {
    return {
      tab: null,
      items: ["All", "UnRead"],
      headers: [
        { text: "Title", value: "title" },
        { text: "Description", value: "description" }
      ],
      tableDatas: [
        {
          title: "Title 1",
          read: true,
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus dolorum qui atque impedit nobis exercitationem tempore nisi vel ipsa, eum, nam, tenetur placeat consectetur accusantium vero id laboriosam numquam adipisci?"
        },
        {
          title: "Title 2",
          read: false,
          description:
            "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Labore architecto dolorem aliquam voluptatem eius quos hic fugit? Cum sequi impedit facere enim nobis exercitationem error quidem harum perferendis deserunt. Quaerat?"
        },
        {
          title: "Title 3",
          read: true,
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum dolor reiciendis aperiam aspernatur fugiat! Placeat blanditiis aut quae aspernatur deleniti quam. Autem illo officiis maiores accusamus quibusdam officia, voluptatum dolor!"
        },
        {
          title: "Title 4",
          read: false,
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum dolor reiciendis aperiam aspernatur fugiat! Placeat blanditiis aut quae aspernatur deleniti quam. Autem illo officiis maiores accusamus quibusdam officia, voluptatum dolor!"
        }
      ]
    };
  },
  computed: {
    formatTableData() {
      const allData = JSON.parse(JSON.stringify(this.tableDatas));
      const unReadData = allData.filter(item => !item.read);

      return [allData, unReadData];
    }
  },
  methods: {
    handleChange(val) {
      this.tab = val;
    }
  }
};
</script>

<style lang="scss" scoped>
@mixin flexCenter {
  display: flex;
  align-items: center;
  justify-content: center;
}

@mixin rwd($point) {
  @if $point == sm {
    @media (max-width: 568px) {
      @content;
    }
  }
  @if $point == pad {
    @media (max-width: 768px) {
      @content;
    }
  }
  @if $point == md {
    @media (max-width: 1024px) {
      @content;
    }
  }
}

.box {
  display: flex;
  border: solid 1px blue;
  font-size: 19px;

  @include flexCenter;
  @include rwd(pad) {
    width: 100%;
  }

  &:hover {
    background: #000;
  }

  &:before {
    content: "";

    @include rwd(pad) {
      background-color: #fff;
    }
  }
}
</style>
