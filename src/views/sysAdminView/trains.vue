<template>
<div class="app-container">
<div class="header-container">
    <el-input
      v-model="filter"
      placeholder="输入关键字(培训)搜索"
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
    <el-button  type="primary"
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
      :data="trains"
      size="small"
      border
      style="width: 100%;"
      @selection-change="handleSelectionChange"
    >
    <el-table-column type="selection" width="55" align="center"></el-table-column>
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="培训标题">
              <span>{{ props.row.train_title|| "无"  }}</span>
            </el-form-item>
            <el-form-item label="培训时间">
              <span>{{ props.row.train_date || "无" }}</span>
            </el-form-item>
            <el-form-item label="培训地点">
              <span>{{ props.row.train_address  || "无" }}</span>
            </el-form-item>
            <el-form-item label="培训价格">
              <span>{{ props.row.train_price || "无" }}</span>
            </el-form-item>
            <el-form-item label="培训简介">
              <span>{{ props.row.train_intro || "无" }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
    <el-table-column sortable prop="train_id" label="ID" width="60" align="center"></el-table-column>
    <el-table-column align="center" prop="train_date" label="培训时间" width="180px"></el-table-column>
    <el-table-column align="center" prop="train_title" label="培训标题" width="100px"></el-table-column>
    <el-table-column align="center" prop="train_address" label="培训地点" width="100px"></el-table-column>
    <el-table-column align="center" prop="train_price" label="培训价格" width="100px"></el-table-column>
    <el-table-column align="center" prop="train_intro" label="培训简介" show-overflow-tooltip></el-table-column>
    <el-table-column align="center" prop="club" label="俱乐部id" width="100px"></el-table-column>
    <el-table-column align="center" prop="coach" label="教练id" width="100px"></el-table-column>
    <el-table-column prop="create_date" label="创建时间" align="center"  width="180" />
    <el-table-column prop="update_date" label="更新时间" align="center"  width="180" />
    <!-- <el-table-column label="操作" width="100px" align="center">
      <template slot-scope="scope">
          <el-button :disabled="scope.row.url == undefined" type="primary" @click="handleLook(scope.row.video_id)">查看</el-button>
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
</div>
</template>
<script>
import { getTrains } from "@/api/trains";
export default {
  name: 'trains',
  data(){
    return{
      trains: {},
      headSrc: "",
      data: {},
      total:0,
      page:1,
      filter:undefined,
      multipleSelection:[],
      loading: false,
    }
  },
  methods:{
     getList: function(page) {
      getTrains(page).then(response => {
        const { data } = response;
        this.total = data.count;
        this.trains = data.results;
        this.loading = false;
      });
    },
    handleDownload(){console.log("TODO 处理下载导出")},
    handleFilter(){console.log("TODO 搜索")},
    handleChange(){
      this.loading=true;
      this.getList(this.page);
    },
    handleLook(id){
        console.log("TODO 培训查看");
    },
    handleSelectionChange(val){
      this.multipleSelection = val;
    },
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