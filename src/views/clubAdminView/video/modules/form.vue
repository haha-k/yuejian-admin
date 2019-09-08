<template>
  <el-dialog
    :title="isAdd ? '新增视频' : '编辑视频'"
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
          <el-form-item label="视频名称" prop="video_title">
            <el-input v-model="form.video_title" style="width:280px;"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="视频链接" prop="url">
            <el-input v-model="form.url" style="width:280px;"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="视频封面" prop="video_pic">
            <el-input v-model="form.video_pic" style="width:280px;"></el-input>
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
import { addVideo, chanageVideo } from "@/api/video";
import { Message } from "element-ui";
import { flush } from "@/utils/common";
export default {
  name: "eForm",
  data() {
    return {
      dialog: false,
      loading: false,
      form: {
        video_title: "",
        video_pic: "",
        url: "",
        club: "",

      },
      rules: {
        video_title: [
          { required: true, message: "请输入视频名称", trigger: "blur" },
          {
            min: 3,
            max: 20,
            message: "需要3到10个字符",
            trigger: ["blur", "change"]
          }
        ],
        // video_pic: [
        //   { required: true, message: "请添加一张图片", trigger: "blur" },
        //   {
        //     min: 1,
        //     max: 500,
        //     message: "需要1到500个字符",
        //     trigger: ["blur", "change"]
        //   }
        // ],
        // url: [
        //   { required: true, message: "请输入视频链接", trigger: "blur" },
        //   {
        //     min: 1,
        //     max: 500,
        //     message: "需要1到500个字符",
        //     trigger: ["blur", "change"]
        //   }
        // ],
        // club: [
        //   { required: true, message: "请输入视频所属俱乐部ID", trigger: "blur" },
        //   {
        //     min: 3,
        //     max: 20,
        //     message: "需要3到20个字符",
        //     trigger: ["blur", "change"]
        //   }
        // ],
      }
    };
  },
  methods: {
    resetForm() {
      this.dialog = false;
      this.$refs["form"].resetFields();
      this.form = {
        video_title: "",
        video_pic: "",
        url: "",
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
      addVideo(this.form)
        .then(result => {
          this.loading = false;
          flush(this);
        })
        .catch(err => {
          Message.error(err);
        });
    },
    doEdit() {
      chanageVideo(this.id, this.form)
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
