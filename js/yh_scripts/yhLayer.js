/**
 * Created by wunder on 16/8/16.
 */
var YHLayer = {
    global_load_index : -1,	// 全局控制一个弹出等待层的index
    loading:function(){
        global_load_index = layer.load(2, {shade: 0}, {time: 10 * 1000});
        return global_load_index;
    },
    closeLoading:function(i){
        if(null==i || typeof i == "undefined") {
            return layer.close(global_load_index);
        }
        return layer.close(i);
    },
    closeAllLayer: function(){
        layer.closeAll();
    }
};