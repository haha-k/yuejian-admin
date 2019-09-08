<template>
  <el-dialog
    :title="isAdd ? '新增活动' : '编辑活动'"
    :visible.sync="dialog"
    :width="isAdd ?'400px':'800px'"
    :append-to-body="true"
    @closed="handleclose"
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
          <el-form-item label="活动名称" prop="activity_title">
            <el-input v-model="form.activity_title" style="width:280px;"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="活动简介" prop="activity_desc">
            <el-input v-model="form.activity_desc" style="width:280px;"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="活动价格" prop="activity_price">
            <el-input v-model="form.activity_price" style="width:280px;"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="活动地点" prop="activity_address">
            <el-input v-model="form.activity_address" style="width:280px;"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="活动时间">
            <el-date-picker
              v-model="form.activity_date"
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
import { addActivities, changeActivities } from "@/api/activities";
import { Message } from "element-ui";
import { flush } from "@/utils/common";
export default {
  name: "eForm",
  data() {
    return {
      dialog: false,
      loading: false,
      id: undefined,
      form: {
        activity_title: "xxx",
        activity_desc: "xxxxxx",
        activity_address: "fjlkjdsflkjsdl",
        activity_price: "123",
        activity_date: "2019-09-01",
        activity_pic: "1"
      },
      rules: {
        activity_title: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          {
            min: 3,
            max: 20,
            message: "需要3到10个字符",
            trigger: ["blur", "change"]
          }
        ],
        activity_desc: [
          { required: true, message: "请输入活动描述", trigger: "blur" },
          {
            min: 6,
            max: 20,
            message: "需要6到10个字符",
            trigger: ["blur", "change"]
          }
        ],
        activity_address: [
          { required: true, message: "请输入活动价格", trigger: "blur" },
          { min: 3, max: 20, message: "需要3到10个字符", trigger: "blur" }
        ],
        activity_price: [
          { required: true, message: "请输入活动价格", trigger: "blur" }
        ],
        activity_pic: [
          { required: true, message: "请输入活动宣传图", trigger: "blur" }
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
        activity_title: "",
        activity_desc: "",
        activity_price: 0,
        activity_address: "",
        activity_date: "",
        activity_pic: ""
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
      addActivities(this.form)
        .then(result => {
          this.loading = false;
          flush(this);
        })
        .catch(err => {
          Message.error(err);
        });
    },
    doEdit() {
      changeActivities(this.id, this.form)
        .then(result => {
          this.loading = false;
          flush(this);
        })
        .catch(err => {
          Message.error(err);
        });
    }
  },
  mounted() {
    // console.log(this.id);
    // console.log(this.form);
    // console.log(this.data);
  },
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
