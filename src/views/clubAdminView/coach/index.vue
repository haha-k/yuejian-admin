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
      :data="coaches"
      size="small"
      border
      style="width: 100%;"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="教练名称">
              <span>{{ props.row.coach_title|| "无"  }}</span>
            </el-form-item>
            <el-form-item label="教练电话">
              <span>{{ props.row.coach_desc || "无" }}</span>
            </el-form-item>
            <el-form-item label="教练邮箱">
              <span>{{ props.row.coach_date  || "无" }}</span>
            </el-form-item>
            <el-form-item label="教练年龄">
              <span>{{ props.row.coach_addr || "无" }}</span>
            </el-form-item>
            <el-form-item label="教练资历">
              <span>{{ props.row.coach_pic || "无" }}</span>
            </el-form-item>
            <el-form-item label="创建时间">
              <span>{{ props.row.coach_title|| "无"  }}</span>
            </el-form-item>
            <el-form-item label="更新时间">
              <span>{{ props.row.coach_desc || "无" }}</span>
            </el-form-item>
            <el-form-item label="是否大师">
              <span>{{ props.row.coach_addr || "无" }}</span>
            </el-form-item>
            <el-form-item label="所属俱乐部">
              <span>{{ props.row.coach_pic || "无" }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column type="selection" width="55" align="center"></el-table-column>
      <el-table-column sortable prop="coach_id" label="ID" width="60" align="center"></el-table-column>
      <el-table-column prop="coach_name" label="姓名" align="center" />
      <el-table-column align="center" prop="coach_email" label="邮箱" width="180px"></el-table-column>
      <el-table-column align="center" prop="coach_phone" label="手机号码" width="120px"></el-table-column>
      <el-table-column align="center" prop="coach_age" label="年龄" width="100px"></el-table-column>
      <el-table-column align="center" prop="coach_seniority" label="教龄" width="100px"></el-table-column>
      <el-table-column prop="create_date" label="创建时间" align="center" :formatter="dateFormat" width="180" />
      <el-table-column prop="update_date" label="更新时间" align="center" :formatter="dateFormat" width="180" />
      <el-table-column align="center" label="等级" width="120px">
        <template slot-scope="scope">
          <el-tag :type="scope.row.coach_ismaster | statusFilter">{{scope.row.coach_ismaster? '大师':'普通教练'}}</el-tag>
        </template>
      </el-table-column>
      <!-- <el-table-column prop="club" width="100px" align="center" label="所属俱乐部id" />> -->
      <el-table-column label="操作" width="170px" align="center">
        <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="doEdit(scope.row)">编辑</el-button>
            <eForm ref="Editform" :isAdd="false"></eForm>
            <el-popover
              :ref="scope.row.coach_id"
              placement="top"
              width="180"
              style="margin-left:3px"
            >
              <p>确定删除本条数据吗？所有关联的数据将会被清除</p>
              <div style="text-align:right;margin:0">
                <el-button type="text" @click="$refs[scope.row.coach_id].doClose()">取消</el-button>
                <el-button type="primary" @click="subDelete(scope.row.coach_id)">确定</el-button>
              </div>
              <el-button
                slot="reference"
                type="danger"
                size="mini"
              >删除</el-button>
            </el-popover>
        </template>
      </el-table-column>
      <!-- <el-table-column label="操作" width="170px" align="center">
        <template slot-scope="scope">
            <el-button type="primary" @click="handleLook(scope.row.coach_id)">查看</el-button>
        </template>
      </el-table-column> 原版操作-->
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
import { getCoaches,deleteCoach } from "@/api/coaches";
import { getClubCoaches } from "@/api/club";
import eForm from "./modules/form";
import { Message } from "element-ui";
import { flush } from "@/utils/common";
export default {
  name: 'coaches',
  data(){
    return{
      id: 0,
      coaches:{},
      total:0,
      loading:false,
      page:1,
      filter:undefined,
      multipleSelection:[],
      dialogVisible:false,
    }
  },
  filters: {
    statusFilter(status) {
      return status ? "warning" : "success";
    },
  },
  methods:{
    getList: function(id) {
      getClubCoaches(id).then(response => {
        const { data } = response;
        //this.total = data.count;
        this.coaches = data;
        this.loading=false;
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

    subDelete(id) {
      deleteCoach(id)
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
        deletecoach(selection.coach_id)
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
        coach_name: data.coach_name,
        coach_phone: data.coach_phone,
        coach_email: data.coach_email,
        coach_age: data.coach_age,
        coach_seniority: data.coach_seniority,
        coach_ismaster: data.coach_ismaster,
        club: data.club,
      };
      _this.id = data.coach_id;
      _this.dialog = true;
    },

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