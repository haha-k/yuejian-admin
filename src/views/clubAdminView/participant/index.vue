<template>
  <div class="app-container">
    <div class="header-container">
      <el-input
        v-model="filter"
        placeholder="输入关键字(报名人)搜索"
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
          class="filter-item"
          size="mini"
          type="danger"
          icon="el-icon-delete"
          @click="dialogVisible = true"
        >删除</el-button>
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
      :data="participants"
      size="small"
      border
      style="width: 100%;"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" align="center"></el-table-column>
      <el-table-column sortable prop="apply_id" label="ID" width="60" align="center"></el-table-column>
      <el-table-column align="center" prop="user" label="报名用户id" width="180px"></el-table-column>
      <el-table-column align="center" prop="username" label="报名用户名" width="180px"></el-table-column>
      <el-table-column
        align="center"
        label="报名类型"
        width="90px"
        :filters="[{ text: '训练', value: 'train' }, { text: '活动', value: 'activity' }]"
        :filter-method="filterTag"
        filter-placement="bottom-end"
      >
        <template slot-scope="scope">
          <el-tag :type="scope.row.train | statusFilter">{{scope.row.train? '训练报名':'活动报名'}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="activity" label="训练id" align="center" width="130" />
      <el-table-column prop="train_title" label="训练名称" align="center" width="180" />
      <el-table-column prop="activity" label="活动id" align="center" width="130" />
      <el-table-column prop="activity_title" label="活动名称" align="center" width="180" />
      <el-table-column prop="create_date" label="报名时间" align="center" width="180" />
      <el-table-column prop="update_date" label="更新时间" align="center" width="180" />
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
            <!-- <el-button type="primary" size="mini" @click="doEdit(scope.row)">编辑</el-button> -->
            <!-- <eForm ref="Editform" :isAdd="false"></eForm> -->
            <el-popover
              :ref="scope.row.apply_id"
              placement="top"
              width="180"
              style="margin-left:3px"
            >
              <p>确定删除本条数据吗？所有关联的数据将会被清除</p>
              <div style="text-align:right;margin:0">
                <el-button type="text" @click="$refs[scope.row.apply_id].doClose()">取消</el-button>
                <el-button type="primary" @click="subDelete(scope.row.apply_id)">确定</el-button>
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
import { getParticipants,deleteParticipant } from "@/api/participants";
import { Message } from "element-ui";
import { flush } from "@/utils/common";
export default {
  name: "participants",
  data() {
    return {
      participants: {},
      headSrc: "",
      data: {},
      total: 0,
      page: 1,
      filter: undefined,
      multipleSelection: [],
      loading: false,
      dialogVisible:false,
    };
  },
  filters: {
    statusFilter(status) {
      return status ? "success" : "danger";
    }
  },
  methods: {
    getList: function(page) {
      getParticipants(page).then(response => {
        const { data } = response;
        this.total = data.count;
        this.participants = data.results;
        this.loading = false;
      });
    },
    filterTag(value, row) {
      if(value == "train")
        return row.train;
      else if(value == "activity"){
        return !row.train;
      }
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
      console.log("TODO 培训查看");
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    subDelete(id) {
      deleteParticipant(id)
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
        deleteParticipant(selection.apply_id)
          .then(result => {
            this.dialogVisible = false;
            flush(this);
          })
          .catch(err => {
            Message.error(err);
          });
      }
    },
  },
  mounted() {
    this.getList(1);
  },
  components: {}
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