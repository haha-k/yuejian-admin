<template>
  <div class="header-container">
    <el-input
      v-model="query.club_name"
      placeholder="输入名称搜索"
      class="filter-item"
      @keyup.enter.native="toQuery"
      style="width:200px;"
      size="small"
      clearable
    ></el-input>
    <el-select
      v-model="query.is_apply"
      placeholder="申请状态"
      clearable
      style="width:100px;margin-left:5px;margin-right:5px"
      class="filter-item"
      size="small"
    >
      <el-option
        v-for="item in statusOptions"
        :key="item.key"
        :label="item.displayName"
        :value="item.key"
      ></el-option>
    </el-select>
    <el-button
      type="primary"
      @click="toQuery"
      icon="el-icon-search"
      size="mini"
      class="filter-item"
    >搜索</el-button>
    <div style="display:inline-block;margin:20px 2px;">
      <el-button-group>
        <el-button type="primary" @click="Agree" size="mini" class="filter-item">同意</el-button>
        <el-button type="danger" @click="disAgree" size="mini" class="filter-item">拒绝</el-button>
      </el-button-group>
      <eForm ref="form" :isAdd="true"></eForm>
    </div>
    <el-button
      type="primary"
      :loading="downloadLoading"
      @click="handleDownload"
      size="mini"
      class="filter-item"
      style="display: inline-block;margin:0px 20px;float:right"
    >导出</el-button>
  </div>
</template>
<script>
import eForm from "./form";
import { agree,disAgree } from "@/api/club"
import { flush } from "@/utils/common"
export default {
  name: "eheader",
  data() {
    return {
      downloadLoading: false,
      statusOptions: [
        // { key: "pass", displayName: "已通过" },
        // { key: "applying", displayName: "申请中" },
        { key: "true", displayName: "已通过" },
        { key: "false", displayName: "申请中" },
        { key: "noPass", displayName: "已拒绝" }
      ],
    };
  },
  methods: {
    toQuery() {
      console.log("TO-DO 处理搜索club");
    },
    handleDownload() {
      console.log("TO-DO 处理下载导出club");
    },
    Agree(){
      console.log(this.selection);
      for(let s of this.selection){
        if(!s.is_apply){
          console.log(s.club_id);
          agree(s.club_id).then((result) => {

          }).catch((err) => {

          });
        }
      }
      flush(this);
    },
    disAgree(){
      for(let s of this.selection){
        if(s.is_apply){
          console.log(s.club_id);
          disAgree(s.club_id).then((result) => {

          }).catch((err) => {

          });
        }
      }
      flush(this);
    },
  },
  computed: {

  },
  mounted() {},
  components: {
    eForm: eForm
  },
  props: {
    query: {
      type: Object,
      required: true
    },
    selection: {
      type: Array,
      required: true
    }
  }
};
</script>
<style lang="scss" scoped>
</style>
