<template>
  <div class="app-container">
    <div class="header-container">
      <el-input
        v-model="filter"
        placeholder="输入关键字(课程)搜索"
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
      :data="courses"
      size="small"
      border
      style="width: 100%;"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" align="center"></el-table-column>
      <el-table-column sortable prop="course_id" label="ID" width="60" align="center"></el-table-column>
      <el-table-column prop="create_date" label="创建时间" width="150" />
      <el-table-column prop="update_date" label="更新时间" width="150" />
      <el-table-column align="center" prop="course_title" label="标题" width="100px"></el-table-column>
      <el-table-column align="center" prop="course_intro" label="简介" show-overflow-tooltip></el-table-column>
      <el-table-column align="center" label="封面图片" width="100px">
        <template slot-scope="scope">
          <!-- <img :src="scope.row.image" class="el-avatar"> -->
          <img src="../../../public/img/default.png" class="el-avatar" />
          <!-- <img :src="headSrc" class="el-avatar" /> -->
        </template>
      </el-table-column>
      <el-table-column align="center" prop="course_duration" label="时长" width="100px"></el-table-column>
      <el-table-column align="center" prop="course_site" label="地点" width="100px"></el-table-column>
      <el-table-column prop="club" width="100px" align="center" label="所属俱乐部id" ></el-table-column>
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
import { getCourses } from "@/api/courses";
export default {
  name: "courses",
  data() {
    return {
      courses: {},
      headSrc: "../../../public/img/default.png",
      data: {},
      total: 0,
      page: 1,
      filter: undefined,
      multipleSelection: [],
      loading: false
    };
  },
  methods: {
    getList: function(page) {
      getCourses(page).then(response => {
        const { data } = response;
        this.total = data.count;
        this.courses = data.results;
        this.loading = false;
      });
    },
    handleChange(){
      this.loading=true;
      this.getList(this.page);
    },
    handleDownload() {
      console.log("TODO 处理下载导出");
    },
    handleFilter() {
      console.log("TODO 搜索");
    },
    handleLook(id) {
      console.log(this.courses);
      let url = this.courses.find(element => element.courses_id == id).url;
      window.location.href = url;
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
  },
  mounted() {
    this.getList(1);
  },
  components: {}
};
</script>
<style lang="scss" scoped>
.courses {
}
</style>