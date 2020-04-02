// 基准大小
const baseSize = 14 //1rem=14px 如果屏幕款1400px 那么100rem的宽等于 100%
// 设置 rem 函数
function setRem() {
  // 当前页面宽度相对于 750 宽的缩放比例，可根据自己需要修改。
  const doc = document.body || document.documentElement;
  const scale = doc.clientWidth / 750;   //750为设计稿宽度
  // 设置页面根节点字体大小
  let htmlElement = document.querySelector('html');
  htmlElement.style.fontSize = (baseSize * Math.min(scale, 2)) + 'px' //当我屏幕为750px 1rem=14px 53.57rem的宽等于 100%
  //既然要保证53.57rem为100%,如果屏幕变小了fontSize还是14px,那么53.75rem将超过 100%,
  //这时候因为53.57rem得是固定的,所以我们必须改变fontSize大小,
  //假设 750(当前屏幕宽)/750(设计稿宽) = 1  baseSize(基准大小)=14  // 1rem = 14px  750/14 = 53.57 那么53.57个rem可以填满宽度
  //重点：
  /**
   * 650(当前屏幕宽)/750(设计稿宽) = 0.87 baseSize(基准大小)= ? //1rem = ?  650/? = 53.57  //必须得53.57个rem填满
   * 用户手机宽你无法改变,改全局的rem?不现实！所以我们得让baseSize(基准大小)变小！
   * 屏幕变小,我们得到变化比0.87 
   * 650(当前屏幕宽)/750(设计稿宽) = 0.87  //53.57个rem填满宽度
   * ?/14(基准大小) = 0.87    结果*分母 = 分子  14*0.87 = 12.18(px);
   * 53.57*12.18 = 652.4826(因为四舍五入结果会有偏差)
   * 
   * rem的响应式设计：通过监听屏幕变化，找到屏幕变化比，通过fontSize(基准大小)和变化后的比，
   * 找到变化后的fontSize大小，而保证开发时的rme宽高与屏幕比不发生改变，实现字体自适应，宽高
   * 自适应！
   */
}
// 初始化

setRem();
// 改变窗口大小时重新设置 rem
window.onresize = function () {
  setRem()
}


