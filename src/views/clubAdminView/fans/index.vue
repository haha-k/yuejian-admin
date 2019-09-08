<template>
  <div class="app-container">
    <div class="header-container">
      <el-input
        v-model="filter"
        placeholder="输入关键字(粉丝名)搜索"
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
      <!-- <el-button-group>
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
      </el-dialog> -->
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
      :data="fans"
      size="small"
      border
      style="width: 100%;"
      @selection-change="handleSelectionChange"
    >
      <!-- <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="比赛宣传图">
              <span>{{ props.row.attention_pic || "无" }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column> -->
      <el-table-column type="selection" width="55" align="center"></el-table-column>
      <el-table-column sortable prop="attention_id" label="ID" width="60" align="center"></el-table-column>
      <el-table-column align="center" prop="user" label="粉丝id" width="180px"></el-table-column>
      <el-table-column align="center" prop="username" label="粉丝名" width="180px"></el-table-column>
      <el-table-column align="center" prop="club" label="关注俱乐部id" width="180px"></el-table-column>
      <el-table-column align="center" prop="club_name" label="关注俱乐部名称" width="180px"></el-table-column>
      <el-table-column prop="create_date" label="创建时间" align="center" width="180" />
      <el-table-column prop="update_date" label="更新时间" align="center" width="180" />
      <!-- <el-table-column label="操作" align="center">
        <template slot-scope="scope">
            <el-popover
              :ref="scope.row.attention_id"
              placement="top"
              width="180"
              style="margin-left:3px"
            >
              <p>确定删除本条数据吗？所有关联的数据将会被清除</p>
              <div style="text-align:right;margin:0">
                <el-button type="text" @click="$refs[scope.row.attention_id].doClose()">取消</el-button>
                <el-button type="primary" @click="subDelete(scope.row.attention_id)">确定</el-button>
              </div>
              <el-button
                slot="reference"
                type="danger"
                size="mini"
              >删除</el-button>
            </el-popover>
        </template>
      </el-table-column> -->
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
import { getFans,deleteFans } from "@/api/club";
import { Message } from "element-ui";
import { flush } from "@/utils/common";
export default {
  name: "fans",
  data() {
    return {
      fans: {},
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
      getFans(page).then(response => {
        const { data } = response;
        this.total = data.count;
        this.fans = data.results;
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
      deleteFans(id)
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
        deleteFans(selection.attention_id)
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
  },
  mounted() {
    this.getList(1);
  },
  components: {
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