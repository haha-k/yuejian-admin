<template>
<div class="app-container">
<div class="header-container">
    <el-input
      v-model="filter"
      placeholder="输入关键字(晒图标题)搜索"
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
      :data="blueprints"
      size="small"
      border
      style="width: 100%;"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="晒图内容">
              <span>{{ props.row.blueprint_content|| "无"  }}</span>
            </el-form-item>
            <el-form-item label="晒图照片">
              <span>{{ props.row.blueprint_pic || "无" }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column type="selection" width="55" align="center"></el-table-column>
      <el-table-column sortable prop="blueprint_id" label="ID" width="60" align="center"></el-table-column>
      <el-table-column align="center" prop="blueprint_content" label="晒图内容" show-overflow-tooltip></el-table-column>
      <el-table-column align="center" prop="blueprint_picture" label="晒图照片" width="120px"></el-table-column>
      <el-table-column prop="create_date" label="创建时间" align="center"  width="180" />
      <el-table-column prop="update_date" label="更新时间" align="center"  width="180" />
      <el-table-column label="操作" width="170px" align="center">
        <template slot-scope="scope">
            <!-- <el-button type="primary" @click="handleLook(scope.row.coach_id)">查看</el-button> -->
            <el-button type="primary" size="mini" @click="doEdit(scope.row)">编辑</el-button>
            <eForm ref="Editform" :isAdd="false"></eForm>
            <el-popover
              :ref="scope.row.blueprint_id"
              placement="top"
              width="180"
              style="margin-left:3px"
            >
              <p>确定删除本条数据吗？所有关联的数据将会被清除</p>
              <div style="text-align:right;margin:0">
                <el-button type="text" @click="$refs[scope.row.blueprint_id].doClose()">取消</el-button>
                <el-button type="primary" @click="subDelete(scope.row.blueprint_id)">确定</el-button>
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
      <!-- @next-click="handlerNext" -->
  </div>
</template>
<script>
import { getBlueprints,deleteBlueprint } from "@/api/blueprints";
import eForm from "./modules/form";
import { Message } from "element-ui";
import { flush } from "@/utils/common";
export default {
  name: 'blueprints',
  data(){
    return{
      blueprints:{},
      total:0,
      loading:false,
      page:1,
      filter:undefined,
      multipleSelection:[],
      dialogVisible:false,
    }
  },
  methods:{
    getList: function(page) {
      getBlueprints(page).then(response => {
        const { data } = response;
        this.total = data.count;
        this.blueprints = data.results;
        this.loading=false;
      });
    },
    handleDownload(){
      console.log("TODO 处理下载导出");
      },
    handleFilter(){
      console.log("TODO 搜索");
      },
    handleChange(){
      this.loading=true;
      this.getList(this.page);
    },
    handleLook(id){
        console.log("TODO 查看");
    },
    subDelete(id) {
      deleteBlueprint(id)
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
        deleteBlueprint(selection.Blueprint_id)
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
        blueprint_content: data.blueprint_content,
        blueprint_picture: data.blueprint_picture
      };
      _this.id = data.blueprint_id;
      _this.dialog = true;
    }
  },
  mounted(){
    this.getList(1);
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