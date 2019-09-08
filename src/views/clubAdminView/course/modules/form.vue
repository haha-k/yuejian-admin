<template>
  <el-dialog
    :title="isAdd ? '新增课程' : '编辑课程'"
    :visible.sync="dialog"
    :width="isAdd ?'400px':'800px'"
    :append-to-body="true"
  >
    <el-form :model="form" ref="form" :rules="rules" size="small" label-width="80px">
      <el-row>
        <el-col :span="12">
          <el-form-item label="课程名称" prop="course_title">
            <el-input v-model="form.course_title" style="width:280px;"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="课程简介" prop="course_intro">
            <el-input v-model="form.course_intro" style="width:280px;"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <!-- <el-row>
        <el-col :span="12">
          <el-form-item label="课程封面" prop="course_cover">
            <el-input v-model="form.course_cover" style="width:280px;"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
        </el-col>
      </el-row>-->
      <el-row>
        <el-col :span="12">
          <el-form-item label="课程地点" prop="course_site">
            <el-input v-model="form.course_site" style="width:280px;"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="课程时长">
            <el-input v-model="form.course_duration" style="width:280px;"></el-input>
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
import { addContest, chanageContest } from "@/api/courses";
import { Message } from "element-ui";
import { flush } from "@/utils/common";
export default {
  name: "eForm",
  data() {
    return {
      dialog: false,
      loading: false,
      form: {
        cource_title: "",
        course_intro: "",
        course_cover: "",
        course_duration: "",
        course_site: "",
      },
      rules: {
        course_title: [
          { required: true, message: "请输入课程名称", trigger: "blur" },
          { min: 3, max: 20, message: "需要3到10个字符", trigger: ["blur", "change"] }
        ],
        course_intro: [
          { required: true, message: "请输入课程描述", trigger: "blur" },
          {
            min: 6,
            max: 20,
            message: "需要6到10个字符",
            trigger: ["blur", "change"]
          }
        ],
        course_site: [
          { min: 3, max: 20, message: "需要3到10个字符", trigger: "blur" }
        ],
      }
    };
  },
  methods: {
    resetForm() {
      this.dialog = false;
      this.$refs["form"].resetFields();
      this.form = {
        cource_title: "",
        course_intro: "",
        course_cover: "",
        course_duration: "",
        course_site: "",
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