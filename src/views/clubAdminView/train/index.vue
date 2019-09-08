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
    <el-table-column type="selection" width="55" align="center"></el-table-column>
    <el-table-column sortable prop="train_id" label="ID" width="60" align="center"></el-table-column>
    <el-table-column align="center" prop="train_date" label="培训时间" width="180px"></el-table-column>
    <el-table-column align="center" prop="train_title" label="培训标题" width="100px"></el-table-column>
    <el-table-column align="center" prop="train_address" label="培训地点" width="100px"></el-table-column>
    <el-table-column align="center" prop="train_price" label="培训价格" width="100px"></el-table-column>
    <el-table-column align="center" prop="train_intro" label="培训简介" show-overflow-tooltip></el-table-column>
    <!-- <el-table-column align="center" prop="club" label="俱乐部" width="100px"></el-table-column> -->
    <el-table-column align="center" prop="coach_id" label="教练" width="100px"></el-table-column>
    <el-table-column prop="create_date" label="创建时间" align="center"  width="180" :formatter="dateFormat"/>
    <el-table-column prop="update_date" label="更新时间" align="center"  width="180" :formatter="dateFormat"/>
    <el-table-column label="操作" width="170px" align="center">
      <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="doEdit(scope.row)">编辑</el-button>
            <eForm ref="Editform" :isAdd="false"></eForm>
            <el-popover
              :ref="scope.row.train_id"
              placement="top"
              width="180"
              style="margin-left:3px"
            >
              <p>确定删除本条数据吗？所有关联的数据将会被清除</p>
              <div style="text-align:right;margin:0">
                <el-button type="text" @click="$refs[scope.row.train_id].doClose()">取消</el-button>
                <el-button type="primary" @click="subDelete(scope.row.train_id)">确定</el-button>
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
import { getTrains,deleteTrain } from "@/api/trains";
import { getClubTrains } from "@/api/club";
import eForm from "./modules/form";
import { Message } from "element-ui";
import { flush } from "@/utils/common";
export default {
  name: 'trains',
  data(){
    return{
      id: 0,
      trains: {},
      data: {},
      total:0,
      page:1,
      filter:undefined,
      multipleSelection:[],
      dialogVisible: false,
      loading: "http://127.0.0.1:8000/media/",
    }
  },
  methods:{
     getList: function(id) {
      getClubTrains(id).then(response => {
        const { data } = response;
        //this.total = data.count;
        this.trains = data;
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
    handleDownload(){console.log("TODO 处理下载导出")},
    handleFilter(){console.log("TODO 搜索")},
    handleChange(){
      this.loading=true;
      this.getList(this.page);
    },
    doleLook(id){
      let url = this.videos.find(element => element.train_id == id).url;
      url = this.urlHead + url;
      window.location.href = url;
    },
    subDelete(id) {
      deleteTrain(id)
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
        deleteTrain(selection.train_id)
          .then(result => {
            this.dialogVisible = false;
            flush(this);
          })
          .catch(err => {
            Message.error(err);
          });
      }
    },
    handleSelectionChange(val){
      this.multipleSelection = val;
    },
    doEdit(data) {
      const _this = this.$refs.Editform;
      _this.form = {
        train_title: data.train_title,
        train_date: data.train_date,
        train_address: data.train_address,
        url: data.url,
        club: data.club
      };
      _this.id = data.train_id;
      _this.dialog = true;
    }
  },
  mounted(){
    console.log(this.$store.state.user.clubs[1].club_id);
    this.getList(this.$store.state.user.clubs[1].club_id);
  },
  components: {
     "eForm":eForm,
  }
}
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