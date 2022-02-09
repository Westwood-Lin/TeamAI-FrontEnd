<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-calendar"></i> 模型配置
        </el-breadcrumb-item>

      </el-breadcrumb>
    </div>
    <div class="container">
      <div class="form-box" >
        <el-form ref="formRef" :rules="rules" :model="form" label-width="120px">
          <el-form-item label="模型名称" prop="name">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
<!--          <el-form-item label="选择文件" prop="region">-->
<!--            <el-select v-model="form.region" placeholder="请选择">-->
<!--              <el-option key="bbk" label="无" value="bbk"></el-option>-->
<!--            </el-select>-->
<!--          </el-form-item>-->
          <el-form-item label="配置类型" prop="region">
            <el-select v-model="form.region" placeholder="请选择配置类型">
              <el-option key="0" label="所有" value="0"></el-option>
              <el-option key="1" label="分类" value="1"></el-option>
              <el-option key="2" label="聚类" value="2"></el-option>
              <el-option key="3" label="回归" value="3"></el-option>
              <el-option key="4" label="自动化" value="4"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="特征设置方式" prop="region">
            <el-select v-model="form.region" placeholder="请选择配置类型">
              <el-option key="0" label="手动" value="0"></el-option>
              <el-option key="1" label="自动" value="1"></el-option>
            </el-select>
          </el-form-item>
            <el-form-item label="模型参数" prop="region">
            <el-table :data="tableData" border class="table" ref="multipleTable" header-cell-class-name="table-header">
<!--              <el-table-column prop="id" label="ID" width="55" align="center"></el-table-column>-->
              <el-table-column label="参数名">
                <template #default="scope">{{ scope.row.fieldname }}</template>
              </el-table-column>
              <el-table-column label="参数值">
                <template #default="scope">{{ scope.row.alias }}</template>
              </el-table-column>
              <el-table-column label="参数范围">
                <template #default="scope">{{ scope.row.desc }}</template>
              </el-table-column>
              <el-table-column label="参数说明">
                <template #default="scope">{{ scope.row.num }}</template>
              </el-table-column>
            </el-table>
          </el-form-item>
          <el-form-item label="选择特征字段" required>
            <el-alert type="info" description="您下列选择的第一个字段为分类模型的目标字段"
                      show-icon style="height: 40px;"></el-alert>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">表单提交</el-button>
            <el-button @click="onReset">重置表单</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, ref } from "vue";
import { ElMessage } from "element-plus";
export default {
  name: "configform",
  setup() {
    const options = [
      {
        value: "guangdong",
        label: "广东省",
        children: [
          {
            value: "guangzhou",
            label: "广州市",
            children: [
              {
                value: "tianhe",
                label: "天河区",
              },
              {
                value: "haizhu",
                label: "海珠区",
              },
            ],
          },
          {
            value: "dongguan",
            label: "东莞市",
            children: [
              {
                value: "changan",
                label: "长安镇",
              },
              {
                value: "humen",
                label: "虎门镇",
              },
            ],
          },
        ],
      },
      {
        value: "hunan",
        label: "湖南省",
        children: [
          {
            value: "changsha",
            label: "长沙市",
            children: [
              {
                value: "yuelu",
                label: "岳麓区",
              },
            ],
          },
        ],
      },
    ];
    const rules = {
      name: [
        { required: true, message: "请输入表单名称", trigger: "blur" },
      ],
    };
    const formRef = ref(null);
    const form = reactive({
      name: "",
      region: "",
      date1: "",
      date2: "",
      delivery: true,
      type: ["步步高"],
      resource: "小天才",
      desc: "",
      options: [],
    });
    // 提交
    const onSubmit = () => {
      // 表单校验
      formRef.value.validate((valid) => {
        if (valid) {
          console.log(form);
          ElMessage.success("提交成功！");
        } else {
          return false;
        }
      });
    };
    // 重置
    const onReset = () => {
      formRef.value.resetFields();
    };

    return {
      options,
      rules,
      formRef,
      form,
      onSubmit,
      onReset,
    };
  },
};
</script>