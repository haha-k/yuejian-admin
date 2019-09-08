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
      :data="contests"
      size="small"
      border
      style="width: 100%;"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="比赛名称">
              <span>{{ props.row.contest_title|| "无"  }}</span>
            </el-form-item>
            <el-form-item label="比赛简介">
              <span>{{ props.row.contest_desc || "无" }}</span>
            </el-form-item>
            <el-form-item label="比赛时间">
              <span>{{ props.row.contest_date  || "无" }}</span>
            </el-form-item>
            <el-form-item label="比赛地点">
              <span>{{ props.row.contest_addr || "无" }}</span>
            </el-form-item>
            <el-form-item label="比赛宣传图">
              <span>{{ props.row.contest_pic || "无" }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column type="selection" width="55" align="center"></el-table-column>
      <el-table-column sortable prop="contest_id" label="ID" width="60" align="center"></el-table-column>
      <el-table-column align="center" prop="contest_title" label="比赛名称" width="180px"></el-table-column>
      <!-- <el-table-column align="center" prop="contest_pic" label="比赛宣传图" width="120px"></el-table-column> -->
      <el-table-column align="center" prop="contest_desc" label="比赛描述" show-overflow-tooltip></el-table-column>
      <el-table-column align="center" prop="contest_addr" label="比赛地点" width="100px"></el-table-column>
      <el-table-column prop="contest_date" label="比赛时间" align="center" width="180" />
      <el-table-column prop="create_date" label="创建时间" align="center" width="180" />
      <el-table-column prop="update_date" label="更新时间" align="center" width="180" />
      <el-table-column label="操作" width="170px" align="center">
        <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="doEdit(scope.row)">编辑</el-button>
            <eForm ref="Editform" :isAdd="false"></eForm>
            <el-popover
              :ref="scope.row.contest_id"
              placement="top"
              width="180"
              style="margin-left:3px"
            >
              <p>确定删除本条数据吗？所有关联的数据将会被清除</p>
              <div style="text-align:right;margin:0">
                <el-button type="text" @click="$refs[scope.row.contest_id].doClose()">取消</el-button>
                <el-button type="primary" @click="subDelete(scope.row.contest_id)">确定</el-button>
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
import { getContests,deleteContest } from "@/api/contests";
import eForm from "./modules/form";
import { Message } from "element-ui";
import { flush } from "@/utils/common";
export default {
  name: "contests",
  data() {
    return {
      contests: {},
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
      getContests(page).then(response => {
        const { data } = response;
        this.total = data.count;
        this.contests = data.results;
        this.loading = false;
      });
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
      console.log("TODO 教练查看");
    },
    subDelete(id) {
      deleteContest(id)
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
        deleteContest(selection.contest_id)
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
        contest_date: data.contest_date,
        contest_title: data.contest_title,
        contest_pic: data.contest_pic,
        contest_desc: data.contest_desc,
        contest_addr: data.contest_addr,
      };
      _this.id = data.contest_id;
      _this.dialog = true;
    },

  },
  mounted() {
    this.getList(1);
  },
  components: {
      "eForm":eForm,
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