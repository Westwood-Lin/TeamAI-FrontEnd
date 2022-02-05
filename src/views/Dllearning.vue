<!--<template>-->
<!--<div className="home-page">-->
<!--<div className="sub-menu">-->
<!--  <button class="el-button el-button&#45;&#45;primary" type="button" data-v-4eda24fc="">&lt;!&ndash;v-if&ndash;&gt;<i class="el-icon-upload"></i><span>上传</span></button>-->


<!--  <button class="el-button el-button&#45;&#45;primary" type="button" data-v-4eda24fc="">&lt;!&ndash;v-if&ndash;&gt;<i class="el-icon-s-home"></i><span>模型</span></button>-->
<!--</div>-->
<!--<div className="carousel-page">-->
<!--  <h3 className="img-list-title">图片文件列表</h3>-->




<!--    <el-table  :show-header="false" style="width: 100%">-->
<!--      <div>1</div>>-->
<!--    </el-table>-->






<!--</div>-->
<!--</div>-->
<!--</template>-->


<template>
  <div class="">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item><i class="el-icon-lx-copy"></i> 深度学习</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <el-tabs v-model="message">
        <el-tab-pane :label="`图片文件列表`" name="first">
          <el-table :data="state.unread" :show-header="false" style="width: 100%">
            <el-table-column>
              <template #default="scope">
                <span class="message-title">{{scope.row.title}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="date" width="180"></el-table-column>
            <el-table-column width="120">
              <template #default="scope">
                <el-button size="small" @click="handleRead(scope.$index)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
<!--          <div class="handle-row">-->
<!--            <el-button type="primary">全部标为已读</el-button>-->
<!--          </div>-->

<!--            <button class="el-button el-button&#45;&#45;primary" type="button" data-v-4eda24fc="">&lt;!&ndash;v-if&ndash;&gt;<i class="el-icon-upload"></i><span>上传</span></button>-->

<!--            <router-link to="/config">-->
<!--&lt;!&ndash;            <button class="el-button el-button&#45;&#45;primary" type="button" data-v-4eda24fc="">&lt;!&ndash;v-if&ndash;&gt;<i class="el-icon-s-home"></i><span>添加模型</span></button>&ndash;&gt;-->
<!--              <el-button type="primary" size="large">配置模型</el-button>-->
<!--            </router-link>-->


        </el-tab-pane>
        <router-link to="/dlform">
          <el-button type="primary" size="large"><i class="el-icon-s-home"></i>配置模型</el-button>
        </router-link>


      </el-tabs>
    </div>
  </div>
</template>

<script>
import { ref, reactive } from "vue";
export default {
  name: "tabs",
  setup() {
    const message = ref("first");
    const state = reactive({
      unread: [
        {
          date: "2018-04-19 20:00:00",
          title: "文件1",
        },
        {
          date: "2018-04-19 21:00:00",
          title: "文件2",
        },
      ],
      read: [
        {
          date: "2018-04-19 20:00:00",
          title: "【系统通知】该系统将于今晚凌晨2点到5点进行升级维护",
        },
      ],
      recycle: [
        {
          date: "2018-04-19 20:00:00",
          title: "【系统通知】该系统将于今晚凌晨2点到5点进行升级维护",
        },
      ],
    });

    const handleRead = (index) => {
      const item = state.unread.splice(index, 1);
      console.log(item);
      state.read = item.concat(state.read);
    };
    const handleDel = (index) => {
      const item = state.read.splice(index, 1);
      state.recycle = item.concat(state.recycle);
    };
    const handleRestore = (index) => {
      const item = state.recycle.splice(index, 1);
      state.read = item.concat(state.read);
    };

    return {
      message,
      state,
      handleRead,
      handleDel,
      handleRestore,
    };
  },
};
</script>

<style>
.message-title {
  cursor: pointer;
}
.handle-row {
  margin-top: 30px;
}
</style>

