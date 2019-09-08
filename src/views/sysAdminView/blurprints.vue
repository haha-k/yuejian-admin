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
      <el-table-column sortable prop="blueprint_id" label="ID" width="60" align="center"></el-table-column>
      <el-table-column align="center" prop="blueprint_content" label="晒图内容" show-overflow-tooltip></el-table-column>
      <el-table-column align="center" prop="blueprint_picture" label="晒图照片" width="120px"></el-table-column>
      <el-table-column prop="create_date" label="创建时间" align="center"  width="180" />
      <el-table-column prop="update_date" label="更新时间" align="center"  width="180" />
      <el-table-column label="操作" width="170px" align="center">
        <template slot-scope="scope">
            <el-button type="primary" @click="handleLook(scope.row.coach_id)">查看</el-button>
        </template>
      </el-table-column>
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
export default {
  name: 'blurprints',
  data(){
    return{
      blurprints:{},
      total:0,
      loading:false,
      page:1,
      filter:undefined,
      multipleSelection:[],
    }
  },
  methods:{
    getList: function(page) {
      getBlueprints(page).then(response => {
        const { data } = response;
        this.total = data.count;
        this.blurprints = data.results;
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
.blurprints {
}
</style>