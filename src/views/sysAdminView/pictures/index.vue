<template>
<div class="pictures-container">
      <el-button
      type="primary"
      size="mini"
      @click="open"
      style="margin-left:10px;margin-top:10px"
      icon="el-icon-edit"
    >新增</el-button>
    <!-- <el-table :data="" border stripe>
      <el-table-column v-for="col in columns"
        :prop="col.id"
        :key="col.id"
        :label="col.label"
        :width="col.width">
      </el-table-column>
    </el-table> -->
    <upload-image ref="upload"></upload-image>


</div>
</template>
<script>
import uploadImage from '@/components/global/UploadImage';

export default {
  name: 'pictures',
  data(){
    return{

    }
  },
  methods:{
    open(){
      const _this = this.$refs.upload;
      _this.dialog = true;
    }
  },
  mounted(){

  },
  components: {
    uploadImage:uploadImage
  }
}
</script>
<style lang="scss" scoped>
.pictures {
}
</style>
