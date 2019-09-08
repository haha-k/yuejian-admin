<template>
  <div class="app-container">
  <div class="header-container">
    <el-input
      v-model="filter"
      placeholder="输入关键字(视频名)搜索"
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
      :data="videos"
      size="small"
      border
      style="width: 100%;"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" align="center"></el-table-column>
      <el-table-column sortable prop="video_id" label="ID" width="60" align="center"></el-table-column>
      <el-table-column label="视频封面" width="50px">
        <template slot-scope="scope">
          <!-- <img :src="scope.row.image" class="el-avatar"> -->
          <img src="../../../public/img/default.png" class="el-avatar" />
        </template>
      </el-table-column>
      <el-table-column prop="video_title" label="名称" width="100" />
      <el-table-column prop="url" label="视频链接" show-overflow-tooltip  />
      <el-table-column prop="create_date" label="创建时间" width="150" />
      <el-table-column prop="update_date" label="更新时间" width="150" />
      <el-table-column prop="club" width="100px" align="center" label="所属俱乐部id" />>
      <el-table-column label="操作" width="170px" align="center">
        <template slot-scope="scope">
            <el-button :disabled="scope.row.url == undefined" type="primary" @click="handleLook(scope.row.video_id)">查看</el-button>
        </template>
      </el-table-column>
    </el-table>
     <el-pagination
      background
      :total="total"
      :page-size=10
      :current-page="page"
      style="margin-top: 8px;"
      layout="total, prev, pager, next, jumper"
    />
  </div>
</template>
<script>
import { getVideos } from "@/api/video";
export default {
  name: 'videos',
  data(){
    return{
      videos: {},
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
      getVideos(page).then(response => {
        const { data } = response;
        this.total = data.count;
        this.videos = data.results;
        this.loading = false;
      });
    },
    handleLook(id){
        console.log(this.videos);
        let url = this.videos.find((element)=>(element.video_id == id)).url
        window.location.href = url;
    },
    handleSelectionChange(val){
      this.multipleSelection = val;
    },
    handleDownload(){console.log("TODO 处理下载导出")},
    handleFilter(){console.log("TODO 搜索")},
  },
  mounted(){
    this.getList(1);
  },
  components: {
  }
}
</script>
<style lang="scss" scoped>
.videos {
}
</style>