<template>
  <el-dialog
    :title="isAdd ? '新增晒图' : '编辑晒图'"
    :visible.sync="dialog"
    :width="isAdd ?'400px':'800px'"
    :append-to-body="true"
  >
    <el-form
      :model="form"
       ref="form"
        :rules="rules"
         size="small"
          label-width="80px"
          >
      <el-row>
        <el-col :span="12">
          <el-form-item label="晒图内容" prop="blueprint_content">
            <el-input v-model="form.blueprint_content" style="width:280px;"></el-input>
          </el-form-item>
        </el-col>
       </el-row>
       <el-row>
        <el-col :span="12">
          <el-form-item label="晒图图片" prop="blueprint_picture">
            <el-input v-model="form.blueprint_picture" style="width:280px;"></el-input>
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
import { addBlueprint, chanageBlueprint } from "@/api/blueprints";
import { Message } from "element-ui";
import { flush } from "@/utils/common";
export default {
  name: "eForm",
  data() {
    return {
      dialog: false,
      loading: false,
      form: {
        blueprint_content: "",
        blueprint_picture: "",
      },
      rules: {
        blueprint_content: [
          { required: true, message: "请输入晒图描述", trigger: "blur" },
          {
            min: 1,
            max: 500,
            message: "需要1到500个字符",
            trigger: ["blur", "change"]
          }
        ],
        // blueprint_picture: [
        //   { required: true, message: "请添加图片", trigger: "blur" },
        //   {
        //     min: 1,
        //     max: 500,
        //     message: "需要1到500个字符",
        //     trigger: ["blur", "change"]
        //   }
        // ],
      },
      rules2: {}
    };
  },
  methods: {
    resetForm() {
      this.dialog = false;
      this.$refs["form"].resetFields();
      this.form = {
        blueprint_content: "",
        blueprint_picture: "",

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
      addBlueprint(this.form)
        .then(result => {
          this.loading = false;
          flush(this);
        })
        .catch(err => {
          Message.error(err);
        });
    },
    doEdit() {
      chanageBlueprint(this.id, this.form)
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
