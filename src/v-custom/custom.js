import Vue from 'vue';

//input获取焦点
Vue.directive('focus', {
        // 当被绑定的元素插入到 DOM 中时……
        inserted: function (el) {
        // 聚焦元素
        el.focus()
        }
})

