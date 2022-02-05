import request from '../utils/request';
import axios from 'axios';
// BaseCharts页面用于根据userId获取模型简要信息
export const fetchData = query => {
    return request({
        url: './simpleConfig.json',
        method: 'get',
        params: query
    });
};

// BaseCharts页面用于根据configId获取模型详细信息
export const  fetchModuleDetail=(configId)=>{
    return axios.get('./detailConfig.json',{
        params:configId
    })
    
}