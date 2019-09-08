<template>
  <el-dialog
    :title="isAdd ? '新增报名信息' : '编辑报名信息'"
    :visible.sync="dialog"
    :width="isAdd ?'400px':'800px'"
    :append-to-body="true"
  >
    <el-form
      :model="form"
      ref="form"
      :rules="isAdd ? rules : rules2"
      size="small"
      label-width="80px"
    >
      <el-row>
        <el-col :span="12">
          <el-form-item label="比赛名称" prop="contest_title">
            <el-input clearable v-model="form.contest_title" style="width:280px;"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-form-item label="比赛时间" prop="contest_date">
          <el-date-picker
            v-model="form.contest_date"
            type="date"
            placeholder="请输入日期"
            style="width:280px"
            format="yyyy 年 MM 月 dd 日"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
        </el-form-item>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="比赛简介" prop="contest_desc">
            <el-input clearable v-model="form.contest_desc" style="width:280px;"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="比赛地点" prop="contest_addr">
            <el-input clearable v-model="form.contest_addr" style="width:280px;"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <!-- <el-row>
        <el-col :span="12">
          <el-form-item label="比赛图片" prop="contest_pic">
            <el-input v-model="form.contest_pic" style="width:280px;"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
        </el-col>
      </el-row>-->
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="cancel" type="text">取 消</el-button>
      <el-button :loading="loading" type="primary" @click="doSubmit">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
import { addContest, chanageContest } from "@/api/contests";
import { Message } from "element-ui";
import { flush } from "@/utils/common";
export default {
  name: "eForm",
  data() {
    return {
      dialog: false,
      loading: false,
      form: {
        contest_date: "",
        contest_tittle: "",
        contest_pic: "1",
        contest_desc: "",
        contest_addr: ""
      },
      rules: {
        contest_title: [
          { required: true, message: "请输入比赛名称", trigger: "blur" },
          {
            min: 3,
            max: 20,
            message: "需要3到10个字符",
            trigger: ["blur", "change"]
          }
        ],
        contest_desc: [
          { required: true, message: "请输入比赛描述", trigger: "blur" },
          {
            min: 1,
            max: 500,
            message: "需要1到500个字符",
            trigger: ["blur", "change"]
          }
        ],
        contest_addr: [
          { required: true, message: "请输入比赛地点", trigger: "blur" },
          { min: 1, max: 50, message: "需要1到50个字符", trigger: "blur" }
        ],
        contest_date: [
          { required: true, message: "请输入比赛日期", trigger: "blur" }
        ]
      },
      rules2: {}
    };
  },
  methods: {
    resetForm() {
      this.dialog = false;
      this.$refs["form"].resetFields();
      this.form = {
        contest_date: "",
        contest_tittle: "",
        contest_pic: "1",
        contest_desc: "",
        contest_addr: ""
      };
    },
    doSubmit() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.loading = true;
          console.log("hefa");
          if (this.isAdd) {
            this.doAdd();
          } else this.doEdit();
        } else {
          this.$message({
            showClose: true,
            message: "很抱歉哦有错误",
            type: "error"
          });
          return false;
        }
      });
    },
    cancel() {
      this.resetForm();
    },
    doAdd() {
      addContest(this.form)
        .then(result => {
          this.loading = false;
          flush(this);
        })
        .catch(err => {
          Message.error(err);
        });
    },
    doEdit() {
      chanageContest(this.id, this.form)
        .then(result => {
          this.loading = false;
          flush(this);
        })
        .catch(err => {
          Message.error(err);
        });
    }
  },
  mounted() {},
  components: {},
  props: {
    isAdd: {
      type: Boolean,
      required: true
    }
  }
};
</script>
<style lang="scss" scoped>
</style>