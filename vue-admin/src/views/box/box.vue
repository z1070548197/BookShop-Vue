<template>
  <div class="boxs" ref="boxs" style="height: calc(100vh - 50px); width: 100%">
    <Card windowInfo="height: 300px; width: 500px; top: 50px; left: 20px" names="图标1">
      <template #content>
        <div style="width: 100%;height:100%" ref="chart" id="chart"></div>
      </template>
    </Card>
        <Card windowInfo="height: 300px; width: 500px; top: 100px; left: 400px" names="表单">
      <template #content>
        <div style="width: 100%;height:100%" ref="chart" id="chart"></div>
      </template>
    </Card>
   
  <a-dropdown>
    <a class="ant-dropdown-link" @click="e => e.preventDefault()">
      Hover me <a-icon type="down" />
    </a>
    <a-menu slot="overlay">
      <a-menu-item>
        <a href="javascript:;">1st menu item</a>
      </a-menu-item>
      <a-menu-item>
        <a href="javascript:;">2nd menu item</a>
      </a-menu-item>
      <a-menu-item>
        <a href="javascript:;">3rd menu item</a>
      </a-menu-item>
    </a-menu>
  </a-dropdown>


  <a-skeleton avatar :paragraph="{ rows: 4 }" :loading="false"/>


  </div>
</template>

<script>
import Card from "../../components/card.vue";
export default {
  data() {
    return {};
  },
  mounted() {
    // theme(this);
    let themeJSON = require("./theme.json"); //导入主题文件
    this.$echarts.registerTheme("essos", themeJSON); //导入json主题
    const chartDom = this.$refs.chart; //获取dom元素
    const chart = this.$echarts.init(chartDom, "essos", { renderer: "svg" }); //1.dom元素 2。主题 3.渲染方式 动画canvas 大屏svg
    chart.setOption({
      title: {
        text: "ECharts测试", //标题
        subtext: "副标题", //副标题
      },
      legend: {
        //图例
        data: [
          {
            name: "分类",
            icon: "circle", //自定义图案
            textStyle: {
              color: "red", //字体颜色
            },
          },
          "折线图",
          "柱状图",
          "点位",
        ],
        right: 100, //位置
      },
      xAxis: [
        {
          //x轴类
          type: "category",
          gridIndex: 0,
           axisLine: { onZero: true },
        },
        {
          type: "category",
          gridIndex: 1,
        },
      ],
      yAxis: [
        //y轴类
        {
          min: 0, //设置y坐标最高 最低值
          max: 120,
          gridIndex: 0,
        },
        {
          splitLine: {
            show: false, //右坐标系线隐藏
          },
          gridIndex: 1,
        },
      ],
      toolbox: {
        //功能组件
        feature: {
          dataZoom: {
            yAxisIndex: 0, //选择第一个y坐标轴 //false 不选取坐标轴
          }, //缩放
          restore: {}, //还原
          saveAsImage: {}, //保存图片
        },
      },
      dataZoom: [
        //数据拉动组件
        {
          show: true,
          start: 2, //起始位置 百分比
          end: 50, //结束位置 百分比
        },
        {
          show: true,
          start: 2, //起始位置 百分比
          end: 50, //结束位置 百分比
          top: 10,
          xAxisIndex: 1,
        },
      ],
      grid: [
        {
          //图像位置
          bottom: "55%",
        },
        {
          top: "55%",
        },
      ],
      dataset: {
        source: [
          //多表共享数据
          ["product", "2012", "2013", "2014", "2015"],
          ["Matcha Latte", 41.1, 30.4, 65.1, 53.3],
          ["Milk Tea", 86.5, 92.1, 85.7, 83.1],
          ["Cheese Cocoa", 24.1, 67.2, 79.5, 86.4],
        ],
      },
      series: [
        { type: "bar", seriesLayoutBy: "row" },
        { type: "bar", seriesLayoutBy: "row" },
        { type: "bar", seriesLayoutBy: "row" },
        { type: "bar", xAxisIndex: 1, yAxisIndex: 1 },
        { type: "bar", xAxisIndex: 1, yAxisIndex: 1 },
        { type: "bar", xAxisIndex: 1, yAxisIndex: 1 },
        { type: "bar", xAxisIndex: 1, yAxisIndex: 1 },
      ],
    });
  },
  components: { Card },
  methods: {},
};
</script>

<style lang="scss" scoped>
.boxs {
  position: relative;
}
</style>