<template>
  <div class="app-container">
    <eHeader :query="clubs" :selection="multipleSelection"></eHeader>
    <el-table
      v-loading="loading"
      ref="table"
      :data="clubs"
      size="small"
      border
      style="width: 100%;"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="俱乐部简介">
              <span>{{ props.row.club_desc }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column type="selection" width="55" align="center"></el-table-column>
      <el-table-column sortable prop="club_id" label="ID" width="60" align="center"></el-table-column>
      <el-table-column label="头像" width="50px">
        <template slot-scope="scope">
          <!-- <img :src="scope.row.image" class="el-avatar"> -->
          <img src="../../../../public/img/default.png" class="el-avatar" />
        </template>
      </el-table-column>
      <el-table-column prop="club_name" label="名称" width="100" />
      <el-table-column prop="club_desc" label="俱乐部介绍" width="300" show-overflow-tooltip />
      <el-table-column prop="hits" label="点击量" width="70" />
      <el-table-column prop="fans" label="关注人数" width="70" />
      <el-table-column prop="club_phone" label="电话" width="120" />
      <el-table-column prop="club_email" label="电子邮件" width="120" />
      <el-table-column prop="create_date" label="创建时间" width="150" />
      <el-table-column prop="update_date" label="更新时间" width="150" />
      <el-table-column align="center" label="状态" width="90px">
        <template slot-scope="scope">
          <el-tag :type="scope.row.is_apply | statusFilter">{{scope.row.is_apply? '已通过':'申请中'}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="club_administrator" width="100px" align="center" label="俱乐部管理员" />>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button-group  style="display: inline-block">
            <el-button :disabled="scope.row.is_apply" type="primary" @click="doAgree(scope.row.club_id)">同意</el-button>
            <el-button  type="danger" @click="doDisagree(scope.row.club_id)">拒绝</el-button>
          </el-button-group>
        </template>
      </el-table-column>
    </el-table>
     <el-pagination
      background
      :total="total"
      :page-size="size"
      :current-page="page"
      style="margin-top: 8px;"
      layout="total, prev, pager, next, jumper"
    />
  </div>
</template>
<script>
import eHeader from "./modules/header";
import edit from "./modules/edit";
import { getClubs,agree,disAgree } from "@/api/club"
import { flush } from "@/utils/common"
export default {
  name: "clubs",
  data() {
    return {
      clubs: {},
      headSrc: "",
      data: {},
      club_descs: "",
      isSelectAll:false,
      superthis:this,
      multipleSelection :[],
      total:12,
      size:10,
      page:1,
      loading: false,
    };
  },
  filters: {
    statusFilter(status) {
      if(status == "noPass"){
        return "danger";
      }
      return status ? "primary" : "success";
    }
  },
  methods: {
    handleSelectionChange(val){
      this.multipleSelection =val;
    },
    getList: function() {
      getClubs().then(response => {
        const { data } = response;
        console.log(data);
        this.total = data.count;
        this.clubs = data.results;
      });
    },
    doDisagree(id) {
      console.log("TODO 拒绝");
      disAgree(id).then((result) => {
        flush(this);
      }).catch((err) => {
        console.log(err);
      });
    },
    doAgree(id) {
      console.log("TODO 同意");
      agree(id).then((result) => {
        flush(this);
      }).catch((err) => {
        console.log(err);
      });

    },
    selectAll() {

    }
  },
  mounted() {
    this.getList();
  },
  components: {
    eHeader,
    edit
  }
};
</script>
<style>
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
</style>
<style lang="scss" scoped>
.app-container {
}
</style>
