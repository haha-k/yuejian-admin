<template>
  <el-dialog
    :title="isAdd ? '新增培训' : '编辑培训'"
    :visible.sync="dialog"
    :width="isAdd ?'400px':'800px'"
    :append-to-body="true"
  >
    <el-form :model="form" ref="form" :rules="rules" size="small" label-width="80px">
      <el-row>
        <el-col :span="12">
          <el-form-item label="培训名称" prop="train_title">
            <el-input v-model="form.train_title" style="width:280px;"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="培训简介" prop="train_intro">
            <el-input v-model="form.train_intro" style="width:280px;"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="活动价格" prop="train_price">
            <el-input v-model="form.train_price" style="width:280px;"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="培训地点" prop="train_address">
            <el-input v-model="form.train_address" style="width:280px;"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="培训时间" prop="train_date">
            <el-date-picker
              v-model="form.train_date"
              type="date"
              placeholder="请输入日期"
              style="width:280px"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="cancel" type="text">取 消</el-button>
      <el-button :loading="loading" type="primary" @click="doSubmit">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
import { addContest, chanageContest } from "@/api/trains";
import { Message } from "element-ui";
import { flush } from "@/utils/common";
export default {
  name: "eForm",
  data() {
    return {
      dialog: false,
      loading: false,
      form: {
        train_title: "",
        train_intro: "",
        train_price: 0,
        train_address: "",
        train_date: "",
      },
      rules: {
        train_title: [
          { required: true, message: "请输入培训名称", trigger: "blur" },
          { min: 3, max: 20, message: "需要3到10个字符", trigger: ["blur", "change"] }
        ],
        train_intro: [
          { required: true, message: "请输入培训描述", trigger: "blur" },
          {
            min: 6,
            max: 20,
            message: "需要6到10个字符",
            trigger: ["blur", "change"]
          }
        ],
        train_address: [
          { min: 3, max: 20, message: "需要3到10个字符", trigger: "blur" }
        ],
        train_price: [
          {
            type: "email",
            message: "请输入正确的价格",
            trigger: ["blur", "change"]
          }
        ],
      }
    };
  },
  methods: {
    resetForm() {
      this.dialog = false;
      this.$refs["form"].resetFields();
      this.form = {
        train_title: "",
        train_intro: "",
        train_price: 0,
        train_address: "",
        train_date: "",
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
          type: 'error'
        });
          return false;
        }
      });
    },
    cancel() {
      this.resetForm();
    },
    doAdd() {
      console.log("TODO--->新增活动");
      this.loading = false;
    },
    doEdit() {
      console.log("TODO--->编辑活动");
      this.loading = false;
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
