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
      <el-button-group>
        <el-button
          type="primary"
          size="mini"
          @click="$refs.form.dialog = true"
          class="filter-item"
          style="margin-left:10px"
          icon="el-icon-edit"
        >新增</el-button>
        <eForm ref="form" :isAdd="true"></eForm>
        <el-button
          class="filter-item"
          size="mini"
          type="danger"
          icon="el-icon-delete"
          @click="dialogVisible = true"
        >删除</el-button>
      </el-button-group>
      <el-dialog title="提示" :visible.sync="dialogVisible" width="30%" >
        <span>确定要删除选中的吗</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="deleteSelect">确 定</el-button>
        </span>
      </el-dialog>
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
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="课程标题">
              <span>{{ props.row.course_title|| "无"  }}</span>
            </el-form-item>
            <el-form-item label="课程简介">
              <span>{{ props.row.ccourse_intro || "无" }}</span>
            </el-form-item>
            <el-form-item label="封面图片">
              <span>{{ props.row.course_cover  || "无" }}</span>
            </el-form-item>
            <el-form-item label="课程时长">
              <span>{{ props.row.course_duration || "无" }}</span>
            </el-form-item>
            <el-form-item label="课程地点">
              <span>{{ props.row.course_site || "无" }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column type="selection" width="55" align="center"></el-table-column>
      <el-table-column sortable prop="course_id" label="ID" width="60" align="center"></el-table-column>
      <el-table-column prop="create_date" label="创建时间" width="150" :formatter="dateFormat"/>
      <el-table-column prop="update_date" label="更新时间" width="150" :formatter="dateFormat"/>
      <el-table-column align="center" prop="course_title" label="课程标题" width="100px"></el-table-column>
      <el-table-column align="center" prop="course_intro" label="课程简介" show-overflow-tooltip></el-table-column>
      <el-table-column align="center" prop="course_cover" label="封面图片" width="100px"></el-table-column>
      <el-table-column align="center" prop="course_duration" label="课程时长" width="100px"></el-table-column>
      <el-table-column align="center" prop="course_site" label="课程地点" width="100px"></el-table-column>
      <!-- <el-table-column prop="club" width="100px" align="center" label="所属俱乐部id" ></el-table-column> -->
      <el-table-column label="操作" width="170px" align="center">
        <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="doEdit(scope.row)">编辑</el-button>
            <eForm ref="Editform" :isAdd="false"></eForm>
            <el-popover
              :ref="scope.row.course_id"
              placement="top"
              width="180"
              style="margin-left:3px"
            >
              <p>确定删除本条数据吗？所有关联的数据将会被清除</p>
              <div style="text-align:right;margin:0">
                <el-button type="text" @click="$refs[scope.row.course_id].doClose()">取消</el-button>
                <el-button type="primary" @click="subDelete(scope.row.course_id)">确定</el-button>
              </div>
              <el-button
                slot="reference"
                type="danger"
                size="mini"
              >删除</el-button>
            </el-popover>
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
  </div>
</template>
<script>
import { getCourses,deleteCourse } from "@/api/courses";
import { getClubCourses } from "@/api/club";
import eForm from "./modules/form";
import { Message } from "element-ui";
import { flush } from "@/utils/common";
export default {
  name: "courses",
  data() {
    return {
      courses: {},
      headSrc: "",
      data: {},
      total: 0,
      page: 1,
      filter: undefined,
      multipleSelection: [],
      loading: false,
      dialogVisible: false,
    };
  },
  methods: {
    getList: function(id) {
      getClubCourses(id).then(response => {
        const { data } = response;
        // this.total = data.count;
        this.courses = data;
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
    subDelete(id) {
      deleteCourse(id)
        .then(result => {
          flush(this);
        })
        .catch(err => {
          Message.error(err);
        });
    },
    deleteSelect() {
      for (let selection of this.multipleSelection) {
        console.log(selection);
        deleteCourse(selection.course_id)
          .then(result => {
            this.dialogVisible = false;
            flush(this);
          })
          .catch(err => {
            Message.error(err);
          });
      }
    },
    dateFormat(row, column) {
      var str = "";
      row.create_date.split("T").forEach((item, index) => {
        index ? str += item.split(".")[0] : str += (item + " ");
      });
      return str;
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    doEdit(data) {
      const _this = this.$refs.Editform;
      _this.form = {
        course_date: data.course_date,
        course_title: data.course_title,
        course_pic: data.course_pic,
        course_desc: data.course_desc,
        course_addr: data.course_addr,
      };
      _this.id = data.course_id;
      _this.dialog = true;
    },
  },
  mounted() {
    console.log(this.$store.state.user.clubs[1].club_id);
    this.getList(this.$store.state.user.clubs[1].club_id);
  },
  components: {
    'eForm':eForm,
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
  width: 100%;
}
</style>
<style lang="scss" scoped>
</style>