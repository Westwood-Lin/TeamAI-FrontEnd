<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-cascades"></i> 首页
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <div class="handle-box">
        <el-button type="primary" icon="el-icon-thumb" @click="handleEdit">选择字段</el-button>
        <el-button type="primary" plain icon="el-icon-s-order" @click="handleSave">保存</el-button>
      </div>

      <el-table :data="tableData" border class="table" ref="multipleTable" header-cell-class-name="table-header">
        <el-table-column prop="id" label="ID" width="55" align="center"></el-table-column>
        <el-table-column label="字段名">
          <template #default="scope">{{ scope.row.fieldname }}</template>
        </el-table-column>
        <el-table-column label="别名">
          <template #default="scope">{{ scope.row.alias }}</template>
        </el-table-column>
        <el-table-column label="描述">
          <template #default="scope">{{ scope.row.desc }}</template>
        </el-table-column>
        <el-table-column label="取值类型">
          <template #default="scope">{{ scope.row.num }}</template>
        </el-table-column>
        <el-table-column label="分布类型">
          <template #default="scope">{{ scope.row.distribution }}</template>
        </el-table-column>
        <el-table-column label="空值率">
          <template #default="scope">{{ scope.row.null }}</template>
        </el-table-column>

        <el-table-column label="值域" >
          <template #default="scope">{{ scope.row.num }}</template>
        </el-table-column>
        <el-table-column  label="创建时间"></el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination background layout="total, prev, pager, next" :current-page="query.pageIndex"
                       :page-size="query.pageSize" :total="pageTotal" @current-change="handlePageChange"></el-pagination>
      </div>
    </div>

    <!-- 编辑弹出框 -->
    <el-dialog title="选择字段" v-model="editVisible" width="30%">
      <el-form label-width="120px">
        <el-form-item label="统计分析" required>
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="所选方法简介" required>
          <el-input v-model="form.address"></el-input>
        </el-form-item>
        <el-form-item label="可选择字段" required>

        </el-form-item>

      </el-form>
      <template #footer>
                <span class="dialog-footer">
                    <el-button @click="editVisible = false">取 消</el-button>
                    <el-button type="primary" @click="saveEdit">确 定</el-button>
                </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { ref, reactive } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import { fetchData } from "../api/index";
export default {
  name: "config",
  //训练特征
  setup() {
    const query = reactive({
      address: "",
      name: "",
      pageIndex: 1,
      pageSize: 10,
    });

    //new TODO
    //TODO
    const fieldNameList=[]; //字段名
    const aliasList=[];   //别名
    const descList=[];      //描述
    const aList=[];   //取值类型
    const bList=[];   //分布类型
    const cList=[];   //空值率
    const dList=[];


    const tableData = ref([]);
    const pageTotal = ref(0);
    // 获取表格数据
    const getData = () => {
      fetchData(query).then((res) => {
        tableData.value = res.list;
        pageTotal.value = res.pageTotal || 50;
      });
    };
    getData();

    // 查询操作
    const handleSearch = () => {
      query.pageIndex = 1;
      getData();
    };
    // 分页导航
    const handlePageChange = (val) => {
      query.pageIndex = val;
      getData();
    };

    // 删除操作
    const handleDelete = (index) => {
      // 二次确认删除
      ElMessageBox.confirm("确定要删除吗？", "提示", {
        type: "warning",
      })
          .then(() => {
            ElMessage.success("删除成功");
            tableData.value.splice(index, 1);
          })
          .catch(() => {});
    };

    // 表格编辑时弹窗和保存
    const editVisible = ref(false);
    let form = reactive({
      name: "",
      address: "",
      // classification:"",
      // feature:"",
    });
    let idx = -1;
    const handleEdit = () => {
      editVisible.value = true;
    };
    const saveEdit = () => {
      editVisible.value = false;
      ElMessage.success(`修改第 ${idx + 1} 行成功`);
      Object.keys(form).forEach((item) => {
        tableData.value[idx][item] = form[item];
      });
    };

    return {
      query,
      tableData,
      pageTotal,
      editVisible,
      form,
      handleSearch,
      handlePageChange,
      handleDelete,
      handleEdit,
      saveEdit,
    };
  },
};
</script>

<style scoped>
.handle-box {
  margin-bottom: 20px;
}

.handle-select {
  width: 120px;
}

.handle-input {
  width: 300px;
  display: inline-block;
}
.table {
  width: 100%;
  font-size: 14px;
}
.red {
  color: #ff0000;
}
.mr10 {
  margin-right: 10px;
}
.table-td-thumb {
  display: block;
  margin: auto;
  width: 40px;
  height: 40px;
}
</style>