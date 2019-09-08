<template>
  <el-dialog
    :title="isAdd ? '新增教练' : '编辑教练'"
    :visible.sync="dialog"
    :width="isAdd ?'400px':'800px'"
    :append-to-body="true"
  >
    <el-form :model="form" ref="form" :rules="rules" size="small" label-width="80px">
      <el-row>
        <el-col :span="12">
          <el-form-item label="教练名称" prop="coach_name">
            <el-input v-model="form.coach_name" style="width:280px;"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="教练电话" prop="coach_phone">
            <el-input v-model="form.coach_phone" style="width:280px;"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="教练邮箱" prop="coach_email">
            <el-input v-model="form.coach_email" style="width:280px;"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="教练年龄" prop="coach_age">
            <el-input v-model="form.coach_age" style="width:280px;"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="教练资历" prop="coach_seniority">
            <el-input v-model="form.coach_seniority" style="width:280px;"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="是否大师" prop="coach_ismaster">
            <el-input v-model="form.coach_ismaster" style="width:280px;"></el-input>
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
import { addcoach, chanagecoach } from "@/api/coaches";
import { Message } from "element-ui";
import { flush } from "@/utils/common";
export default {
  name: "eForm",
  data() {
    return {
      dialog: false,
      loading: false,
      form: {
        coach_id: "",
        coach_name: "",
        coach_phone: "",
        coach_email: "",
        coach_age: "",
        coach_seniority: "",
        coach_ismaster: "",
        club: "",
      },
      rules: {
        coach_name: [
          // { required: true, message: "请输入教练名称", trigger: "blur" },
          // { min: 3, max: 20, message: "需要3到10个字符", trigger: ["blur", "change"] }
        ],
        coach_phone: [
          // { required: true, message: "请输入教练描述", trigger: "blur" },
          // {
          //   min: 6,
          //   max: 20,
          //   message: "需要6到10个字符",
          //   trigger: ["blur", "change"]
          // }
        ],
        coach_email: [
          // { min: 3, max: 20, message: "需要3到10个字符", trigger: "blur" }
        ],
        coach_age: [
          // {
          //   type: "email",
          //   message: "请输入正确的价格",
          //   trigger: ["blur", "change"]
          // }
        ],
        coach_seniority: [
          // {
          //   type: "email",
          //   message: "请输入正确的价格",
          //   trigger: ["blur", "change"]
          // }
        ],
        coach_ismaster: [
          // {
          //   type: "email",
          //   message: "请输入正确的价格",
          //   trigger: ["blur", "change"]
          // }
        ],
        club: [
          // {
          //   type: "email",
          //   message: "请输入正确的价格",
          //   trigger: ["blur", "change"]
          // }
        ],
      },
      rules2: {}
    };
  },
  methods: {
    resetForm() {
      this.dialog = false;
      this.$refs["form"].resetFields();
      this.form={
        coach_id: "",
        coach_name: "",
        coach_phone: "",
        coach_email: "",
        coach_age: "",
        coach_seniority: "",
        coach_ismaster: "",
        club: "",
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
      addcoach(this.form)
        .then(result => {
          this.loading = false;
          flush(this);
        })
        .catch(err => {
          Message.error(err);
        });
    },
    doEdit() {
      chanagecoach(this.id, this.form)
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
