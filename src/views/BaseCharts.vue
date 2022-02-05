<template>
    <div>
        <!-- 历史记录，面包屑 -->
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 基础表格
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>

    <div class="container">
    
    <!-- 详情页 -->
    <div>
    <el-dialog fullscreen=true v-model="dialogTableVisible" title="模型详情">
    <el-table :data="moduleData">
      <el-table-column
        prop="configId"
        label="配置id"
        width="150"
      ></el-table-column>
      <el-table-column
        prop="modelTypeId"
        label="模型类型Id"
        width="200"
      ></el-table-column>
      <el-table-column
        label="模型名称"
        prop="modelTypeName"
        width="200"
      ></el-table-column>
      <el-table-column
        prop="模型描述"
        label="modelDes"
        width="200"
      ></el-table-column>
       <el-table-column
        prop="模型详情描述"
        label="modelDetileDes"
        width="200"
      ></el-table-column>
       <el-table-column
        prop="模型特征信息"
        label="featureList"
        width="200"
      ></el-table-column>
      <el-table-column prop="modelInfos" label="modelInfos" width="200"></el-table-column>
     </el-table>
   </el-dialog>
   </div>

    <div class="mytTable">
         <el-table :data="tableData" border style="width: 100%">
         <el-table-column prop="fileId" label="文件ID" width="180" />
         <el-table-column prop="fileName" label="文件名" width="180" />
         <el-table-column prop="configId" label="配置ID" width="180" />
         <el-table-column prop="confName" label="配置名" />
         
         <el-table-column  label="Operations">
             <template #default="scope" >
                 <el-button type="text" size="small" @click="handleDetail(scope.row)">详情</el-button>
             </template>
        </el-table-column>
        
        </el-table>
    </div>
            <div class="pagination">
                <el-pagination background layout="total, prev, pager, next" :current-page="query.pageIndex"
                    :page-size="query.pageSize" :total="pageTotal" @current-change="handlePageChange"></el-pagination>
            </div>
    </div>

    </div>
</template>

<script>
import { ref, reactive } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import { fetchData,fetchModuleDetail } from "../api/index";

export default {
    
    name:"basecharts",
    setup() {
        const query = reactive({
            address: "",
            name: "",
            pageIndex: 1,
            pageSize: 10,
        });
        const tableData = ref([]);
        const moduleData = ref([]);
        const pageTotal = ref(0);
        let userId=ref(1);
        const  dialogTableVisible = ref(false)
        // 获取表格数据
        //  插入获取数据的api，可以引入第三方文件
        const getData = () => {
            console.log("getData被调用了")
            fetchData(userId)
            .then((res) => {
                tableData.value = res.list;
                pageTotal.value = res.pageTotal || 50;
            });
        };

        // 相当于beforeCreated生命周期中调用了getData（）函数
        getData();

       
        // 分页导航
        const handlePageChange = (val) => {
            query.pageIndex = val;
            getData();
        };

        const  handleDetail=({configId})=>{
            
            fetchModuleDetail(configId).
            then((res)=>{
                moduleData.value=res.data.list
                dialogTableVisible.value=true
                
            })
            // console.log(configId)
        }

        

        return {
            query,
            tableData,
            pageTotal,
            userId,
            handlePageChange,
            handleDetail,
            dialogTableVisible,
            moduleData,
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
