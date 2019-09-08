<template>
  <div>
    <div class="dashboard-editor-container">
      <panel-group @handleSetLineChartData="handleSetLineChartData" />
      <el-row :gutter="20">
        <el-col :span="24">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>俱乐部详情</span>
            </div>
            <div>
              <div
                v-for="(item,name) in this.clubs"
                :key="item"
                class="text item"
              >{{changeName[name]+ ": " + item }}</div>
            </div>
            <div class="bottom clearfix">
              <!-- <el-button type="text" class="button">编辑</el-button>
              <el-button type="text" class="button">删除</el-button>-->
              <el-button type="primary" size="mini" @click="doEdit(this.clubs)">编辑</el-button>
              <eForm ref="Editform" :isAdd="false"></eForm>
              <el-popover v-model="visible" placement="top" width="180" style="margin-left:3px">
                <p>确定删除本条数据吗？所有关联的数据将会被清除</p>
                <div style="text-align:right;margin:0">
                  <el-button type="text" @click="visible = false">取消</el-button>
                  <el-button type="primary" @click="subDelete(this.club_id)">确定</el-button>
                </div>
                <el-button slot="reference" type="danger" size="mini">删除</el-button>
              </el-popover>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import PanelGroup from "./components/PanelGroup";
import UserCard from "./components/UserCard";
import { getClubDetail, deleteClub } from "@/api/club";
import eForm from "./components/form";
import { Message } from "element-ui";
import { flush } from "@/utils/common";

export default {
  name: "DashboardAdmin",
  components: {
    PanelGroup,
    eForm
  },
  data() {
    return {
      visible: false,
      clubs: {
        club_id: 3,
        create_date: "2019-07-11 14:26:51",
        update_date: "2019-08-29 13:28:34",
        club_name: "11",
        club_desc: "11",
        hits: 0,
        fans: 0,
        club_phone: "1234567891",
        club_email: "12345@163.com",
        club_head: 1
      },
      changeName: {
        club_id: "俱乐部id",
        create_date: "创建时间",
        update_date: "更新时间",
        club_name: "俱乐部名称",
        club_desc: "俱乐部描述",
        hits: "点击量",
        fans: "关注人数",
        club_phone: "俱乐部联系电话",
        club_email: "俱乐部电子邮件",
        club_head: "俱乐部头像",
        is_apply: "是否正常运行"
      },
      club_id: 0,
    };
  },

  methods: {
    subDelete(id) {
      // deleteClub(id)
      //   .then(result => {
          Message.error("您已经删除了俱乐部");
          console.log("logout");
          this.$store.dispatch("user/logout");
          this.$router.push(`/login?redirect=${this.$route.fullPath}`);
      //   })
        // .catch(err => {
        //   Message.error(err);
        // });
    },
    doEdit(data) {
      const _this = this.$refs.Editform;
      _this.form = {
        club_id: this.data.club_id,
        club_name: this.data.club_name,
        club_desc: this.data.club_desc,
        hits: this.data.hits,
        fans: this.data.fans,
        club_phone: this.data.club_phone,
        club_email: this.data.club_email,
        club_head: this.data.club_head,
        is_apply: this.data.is_apply.toString(),
      };
      _this.dialog = true;
    },
    getClub(id) {
      getClubDetail(id)
        .then(result => {
          const { data } = result;
          console.log(data);
          this.clubs = data;
        })
        .catch(err => {});
    }
  },
  mounted() {
    console.log(this.$store.state.user.clubs[1])
    this.club_id = this.$store.state.user.clubs[1].club_id;
    this.clubs = this.$store.state.user.clubs;
    this.getClub(this.club_id);
    console.log(this.club_id);
  }
};
</script>

<style lang="scss" scoped>
.bottom {
  margin-top: 20px;
  line-height: 12px;
}
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
.dashboard-editor-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  position: relative;

  .github-corner {
    position: absolute;
    top: 0px;
    border: 0;
    right: 0;
  }

  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
}

.text {
  font-size: 20px;
  color: #99a9bf;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.box-card {
  // width: 480px;
}
@media (max-width: 1024px) {
  .chart-wrapper {
    padding: 8px;
  }
}
</style>
