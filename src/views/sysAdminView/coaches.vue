<template>
  <div class="app-container">
  <div class="header-container">
    <el-input
      v-model="filter"
      placeholder="输入关键字(教练名)搜索"
      clearable
      class="filter-item"
      @keyup.enter.native="handleFilter"
      style="width:200px;"
      size="small"
    ></el-input>
    <el-button
      type="primary"
      size="mini"
      @click="handleFilter"
      class="filter-item"
      style="margin-left:10px"
      icon="el-icon-search"
    >搜索</el-button>
    <el-button
      type="primary"
      size="mini"
      @click="handleDownload"
      class="filter-item"
      style="margin-left:10px"
      icon="el-icon-download"
    >导出</el-button>
  </div>
    <el-table
      v-loading="loading"
      ref="table"
      :data="coaches"
      size="small"
      border
      style="width: 100%;"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" align="center"></el-table-column>
      <el-table-column sortable prop="coach_id" label="ID" width="60" align="center"></el-table-column>
      <el-table-column prop="coach_name" label="姓名" align="center" />
      <el-table-column align="center" prop="coach_email" label="邮箱" width="180px"></el-table-column>
      <el-table-column align="center" prop="coach_phone" label="手机号码" width="120px"></el-table-column>
      <el-table-column align="center" prop="coach_age" label="年龄" width="100px"></el-table-column>
      <el-table-column align="center" prop="coach_seniority" label="教龄" width="100px"></el-table-column>
      <el-table-column prop="create_date" label="创建时间" align="center"  width="180" />
      <el-table-column prop="update_date" label="更新时间" align="center"  width="180" />
      <el-table-column align="center" label="等级" width="120px">
        <template slot-scope="scope">
          <el-tag :type="scope.row.coach_ismaster | statusFilter">{{scope.row.coach_ismaster? '大师':'普通教练'}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="club" width="100px" align="center" label="所属俱乐部id" />>
      <!-- <el-table-column label="操作" width="170px" align="center">
        <template slot-scope="scope">
            <el-button type="primary" @click="handleLook(scope.row.coach_id)">查看</el-button>
        </template>
      </el-table-column> -->
    </el-table>
     <el-pagination
      background
      :total="total"
      :page-size=10
      :current-page.sync="page"
      @next-click="page++"
      @prev-click="page--"
      @current-change="handleChange"
      style="margin-top: 8px;"
      layout="total, prev, pager, next, jumper"
    />
      <!-- @next-click="handlerNext" -->
  </div>
</template>
<script>
import { getCoaches } from "@/api/coaches"
export default {
  name: 'coaches',
  data(){
    return{
      coaches:{},
      total:0,
      loading:false,
      page:1,
      filter:undefined,
      multipleSelection:[],
    }
  },
  filters: {
    statusFilter(status) {
      return status ? "warning" : "success";
    },
  },
  methods:{
    getList: function(page) {
      getCoaches(page).then(response => {
        const { data } = response;
        this.total = data.count;
        this.coaches = data.results;
        this.loading=false;
      });
    },
    handleDownload(){console.log("TODO 处理下载导出")},
    handleFilter(){console.log("TODO 搜索")},
    handleChange(){
      this.loading=true;
      this.getList(this.page);
    },
    handleLook(id){
        console.log("TODO 教练查看");
    },
    handleSelectionChange(val){
      this.multipleSelection = val;
    }

  },
  mounted(){
    this.getList(1);
  },
  components: {

  }
}
</script>
<style lang="scss" scoped>
</style>