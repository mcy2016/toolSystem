/**
 * Created by MCY-Surface on 2017/3/14.
 */
import Vue from 'vue'
import Vuex from 'vuex'
import tools from './modules/tools'//工具查询 所有显示
Vue.use(Vuex)
const  vuex_config=new Vuex.Store({
  modules:{
    res:tools,
  }
});
export default {
  vuex_config:vuex_config
}
