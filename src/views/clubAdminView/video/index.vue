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
      <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
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
      :data="videos"
      size="small"
      border
      style="width: 100%;"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="视频名称">
              <span>{{ props.row.video_title|| "无" }}</span>
            </el-form-item>
            <el-form-item label="视频链接">
              <span>{{ this.urlHead+props.row.url || "无" }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column type="selection" width="55" align="center"></el-table-column>
      <el-table-column sortable prop="video_id" label="ID" width="60" align="center"></el-table-column>
      <el-table-column label="视频封面" width="50px">
        <template slot-scope="scope">
          <!-- <img :src="scope.row.image" class="el-avatar"> -->
          <img :src="headSrc" class="el-avatar" />
        </template>
      </el-table-column>
      <el-table-column prop="video_title" label="名称" width="100" />
      <el-table-column prop="url" label="视频链接" show-overflow-tooltip />
      <el-table-column prop="create_date" label="创建时间" width="150" :formatter="dateFormat" />
      <el-table-column prop="update_date" label="更新时间" width="150" :formatter="dateFormat"/>
      <!-- <el-table-column prop="club_id" width="100px" align="center" label="所属俱乐部id" />> -->
      <el-table-column label="操作" width="300px" align="center">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="doLook(scope.row.video_id)">查看</el-button>
          <el-button type="primary" size="mini" @click="doEdit(scope.row)">编辑</el-button>
          <eForm ref="Editform" :isAdd="false"></eForm>
          <el-popover :ref="scope.row.video_id" placement="top" width="180" style="margin-left:3px">
            contest
            <p>确定删除本条数据吗？所有关联的数据将会被清除</p>
            <div style="text-align:right;margin:0">
              <el-button type="text" @click="$refs[scope.row.video_id].doClose()">取消</el-button>
              <el-button type="primary" @click="subDelete(scope.row.video_id)">确定</el-button>
            </div>
            <el-button slot="reference" type="danger" size="mini">删除</el-button>
          </el-popover>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      :total="total"
      :page-size="10"
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
import { getVideos, deleteVideo } from "@/api/video";
import { getClubVideos } from "@/api/club";
import eForm from "./modules/form";
import { Message } from "element-ui";
import { flush } from "@/utils/common";
export default {
  name: "videos",
  data() {
    return {
      id: 0,
      videos: {},
      total: 0,
      loading: false,
      page: 1,
      filter: undefined,
      multipleSelection: [],
      dialogVisible: false,
      urlHead: "http://127.0.0.1:8000/media/"
    };
  },
  methods: {
    getList: function(id) {
      getClubVideos(id).then(response => {
        const { data } = response;
        // this.total = data.count;
        this.videos = data;
        console.log(this.videos);
        this.loading = false;
      });
    },
    dateFormat(row, column) {
      var str = "";
      row.create_date.split("T").forEach((item, index) => {
        index ? str += item.split(".")[0] : str += (item + " ");
      });
      return str;
    },
    handleDownload() {
      console.log("TODO 处理下载导出");
    },
    handleFilter() {
      console.log("TODO 搜索");
    },
    handleChange() {
      this.loading = true;
      this.getList(id);
    },
    doLook(id) {
      let url = this.videos.find(element => element.video_id == id).url;
      url = this.urlHead + url;
      window.location.href = url;
    },
    subDelete(id) {
      deleteVideo(id)
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
        deleteVideo(selection.video_id)
          .then(result => {
            this.dialogVisible = false;
            flush(this);
          })
          .catch(err => {
            Message.error(err);
          });
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    doEdit(data) {
      const _this = this.$refs.Editform;
      _this.form = {
        video_title: data.video_title,
        url: data.url,
        club: data.club
      };
      _this.id = data.video_id;
      _this.dialog = true;
    }
  },
  mounted() {
    console.log(this.$store.state.user.clubs[1].club_id);
    this.getList(this.$store.state.user.clubs[1].club_id);
  },
  components: {
    eForm: eForm
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