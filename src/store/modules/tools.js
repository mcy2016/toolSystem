/**
 * Created by MCY-Surface on 2017/3/14.
 */
import Vue from 'vue'
export default {
  state: {
    allTools: [],//所有工具
    barcodeTools:[],//借出的工具
    user:{},//借用工具用户
  },
  mutations: {
    setData(state,{key,data}){//更改state的通用函数
state[key]=data
       //console.log(state.allTools)
    }
  },
  getters:{
    uJn:state=>{
      return state.user.u_jn
    },
    tlStatus:state=>{
      return state.allTools.forEach(element=>{
        return element
      })
    }
  },
  actions: {
    loadData(content, {url, key,param}){//获取数据的通用函数
      if(param){
        Vue.http.post(url,param).then((rs)=>{
          //成功处理业务
          if(rs.body.code==200){
            content.commit("setData",{key,data:rs.body.data})
          console.log(rs.body)
          }
        },(rs)=>{
          //错误处理业务
        })
      }
      Vue.http.get(url).then((rs)=>{
        //成功处理
        content.commit("setData",{key,data:rs.body.data});
          console.log(rs.body)

        //  console.log(key)
      },(rs)=>{
        //错误处理
      })
    }
  }
}
