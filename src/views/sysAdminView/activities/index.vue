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
      :data="activities"
      size="small"
      border
      style="width: 100%;"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" align="center"></el-table-column>
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="活动简介">
              <span>{{ props.row.activity_desc }}</span>
            </el-form-item>
            <el-form-item label="活动宣传图">
              <span>{{ props.row.activity_pic }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column sortable prop="activity_id" label="ID" width="60" align="center"></el-table-column>
      <el-table-column align="center" prop="activity_title" label="活动名称" width="180px"></el-table-column>
      <el-table-column align="center" prop="activity_desc" label="活动简介" show-overflow-tooltip></el-table-column>
      <el-table-column align="center" prop="activity_price" label="活动价格" width="100px"></el-table-column>
      <el-table-column align="center" prop="activity_address" label="活动地点" width="100px"></el-table-column>
      <el-table-column prop="create_date" label="创建时间" align="center" width="180" />
      <el-table-column prop="update_date" label="更新时间" align="center" width="180" />
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <!-- <edit :data="scope.row"></edit> -->
          <el-button type="primary" size="mini" @click="doEdit(scope.row)">编辑</el-button>
          <eForm ref="Editform" :isAdd="false"></eForm>
          <!-- v-if="checkPermission(['admin'])" -->
          <!-- <update :data="scope.row"></update> -->
          <el-popover
            :ref="scope.row.activity_id"
            placement="top"
            width="180"
            style="margin-left:3px"
          >
            <p>确定删除本条数据吗？所有关联的数据将会被清除</p>
            <div style="text-align:right;margin:0">
              <el-button type="text" @click="$refs[scope.row.activity_id].doClose()">取消</el-button>
              <el-button type="primary" @click="subDelete(scope.row.activity_id)">确定</el-button>
            </div>
            <el-button
              slot="reference"
              :disabled="scope.row.activity_id === 1"
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
import { getActivities, deleteActivities } from "@/api/activities";
import eForm from "./modules/form";
import { Message } from "element-ui";
import { flush } from "@/utils/common";
export default {
  name: "activities",
  data() {
    return {
      activities: {},
      total: 0,
      loading: false,
      page: 1,
      filter: undefined,
      multipleSelection: [],
      dialogVisible:false,
    };
  },
  methods: {
    getList: function(page) {
      getActivities(page).then(response => {
        const { data } = response;
        this.total = data.count;
        this.activities = data.results;
        this.loading = false;
      });
    },
    doEdit(data) {
      const _this = this.$refs.Editform;
      _this.form = {
        activity_title: data.activity_title,
        activity_desc: data.activity_desc,
        activity_price: data.activity_price,
        activity_address: data.activity_address,
        activity_date: data.activity_date,
        activity_pic: data.activity_pic
      };
      _this.id = data.activity_id;
      _this.dialog = true;
    },
    handleDownload() {
      console.log("TODO 处理下载导出");
    },
    handleFilter() {
      console.log("TODO 搜索");
    },
    handleChange() {
      this.loading = true;
      this.getList(this.page);
    },
    handleLook(id) {
      console.log("TODO 查看");
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    deleteSelect() {
      for (let selection of this.multipleSelection) {
        console.log(selection);
        deleteActivities(selection.activity_id)
          .then(result => {
            this.dialogVisible = false;
            flush(this);
          })
          .catch(err => {
            Message.error(err);
          });
      }
    },
    subDelete(id) {
      console.log(id);
      deleteActivities(id)
        .then(result => {
          flush(this);
        })
        .catch(err => {
          Message.error(err);
        });
    }
  },
  mounted() {
    this.getList(1);
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
  width: 50%;
}
</style>
<style lang="scss" scoped>
</style>
