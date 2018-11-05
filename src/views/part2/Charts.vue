<template>
    <section class="chart-container">
        <el-row>
            <el-col :span="12">
                <div id="chartRadar" class="charts charts1"></div>
            </el-col>
            <el-col :span="12">
                <div id="chartBar" class="charts charts2"></div>
            </el-col>
            <el-col :span="12">
                <div id="chartLine" class="charts"></div>
            </el-col>
            <el-col :span="12">
                <div id="chartPie" class="charts"></div>
            </el-col>
        </el-row>
    </section>
</template>
<script>
import echarts from "echarts";
import { getUserList } from "@/api/api";

export default {
    data() {
        return {
            chartRadar: null,
            chartBar: null,
            chartLine: null,
            chartPie: null,
            mockData: [],
            chartsData1: {
                male: new Array(6).fill(0),
                female: new Array(6).fill(0)
            }
        };
    },
    methods: {
        getData() {
            let para = {
                name: ""
            };
            getUserList(para)
                .then(res => {
                    this.mockData = res.data.users;
                })
                .then(() => {
                    this.drawCharts();
                });
        },
        handleData1() {
            this.mockData.forEach(item => {
                if (item.sex === 1) {
                    if (item.age > 0 && item.age <= 50)
                        this.chartsData1.male[Math.floor(item.age / 10)]++;
                    else {
                        this.chartsData1.male[5]++;
                    }
                } else {
                    if (item.age > 0 && item.age <= 50)
                        this.chartsData1.female[Math.floor(item.age / 10)]++;
                    else {
                        this.chartsData1.female[5]++;
                    }
                }
            });
            // console.log(this.chartsData1);
        },
        drawRadarChart() {
            this.handleData1();
            this.chartRadar = echarts.init(
                document.getElementById("chartRadar")
            );
            this.chartRadar.setOption({
                title: {
                    text: "Radar Chart",
                    subtext: "数据由mock生成"
                },
                tooltip: {},
                legend: {
                    data: ["男", "女"]
                },
                radar: {
                    shape: "circle",
                    name: {
                        textStyle: {
                            color: "#fff",
                            backgroundColor: "#999",
                            borderRadius: 3,
                            padding: [3, 5]
                        }
                    },
                    indicator: [
                        { name: "0~10岁", max: 15 },
                        { name: "10~20岁", max: 15 },
                        { name: "20~30岁", max: 15 },
                        { name: "30~40岁", max: 15 },
                        { name: "40~50岁", max: 15 },
                        { name: "60岁以上", max: 15 }
                    ]
                },
                series: [
                    {
                        name: "男女比例",
                        type: "radar",
                        data: [
                            {
                                value: this.chartsData1.male,
                                name: "男"
                            },
                            {
                                value: this.chartsData1.female,
                                name: "女"
                            }
                        ]
                    }
                ]
            });
        },
        drawBarChart() {
            this.chartBar = echarts.init(document.getElementById("chartBar"));
            this.chartBar.setOption({
                title: {
                    text: "Bar Chart",
                    subtext: "数据来自网络"
                },
                tooltip: {
                    trigger: "axis",
                    axisPointer: {
                        type: "shadow"
                    }
                },
                color: ["#99FFCC", "#FFFF00"],
                legend: {
                    data: ["2017年", "2018年"]
                },
                grid: {
                    left: "3%",
                    right: "4%",
                    bottom: "3%",
                    containLabel: true
                },
                xAxis: {
                    type: "value",
                    boundaryGap: [0, 0.01]
                },
                yAxis: {
                    type: "category",
                    data: [
                        "巴西",
                        "印尼",
                        "美国",
                        "印度",
                        "中国",
                        "世界人口(万)"
                    ]
                },
                series: [
                    {
                        name: "2017年",
                        type: "bar",
                        data: [18203, 23489, 29034, 104970, 131744, 630230]
                    },
                    {
                        name: "2018年",
                        type: "bar",
                        data: [19325, 23438, 31000, 121594, 134141, 681807]
                    }
                ]
            });
        },
        drawLineChart() {
            this.chartLine = echarts.init(document.getElementById("chartLine"));
            this.chartLine.setOption({
                title: {
                    text: "Line Chart"
                },
                tooltip: {
                    trigger: "axis"
                },
                color: ["#6666CC", "#FF0066", "#808080"],
                legend: {
                    data: ["邮件营销", "联盟广告", "搜索引擎"]
                },
                grid: {
                    left: "3%",
                    right: "4%",
                    bottom: "3%",
                    containLabel: true
                },
                xAxis: {
                    type: "category",
                    boundaryGap: false,
                    data: [
                        "周一",
                        "周二",
                        "周三",
                        "周四",
                        "周五",
                        "周六",
                        "周日"
                    ]
                },
                yAxis: {
                    type: "value"
                },
                series: [
                    {
                        name: "邮件营销",
                        type: "line",
                        stack: "总量",
                        data: [120, 132, 101, 134, 90, 230, 210]
                    },
                    {
                        name: "联盟广告",
                        type: "line",
                        stack: "总量",
                        data: [220, 182, 191, 234, 290, 330, 310]
                    },
                    {
                        name: "搜索引擎",
                        type: "line",
                        stack: "总量",
                        data: [820, 932, 901, 934, 1290, 1330, 1320]
                    }
                ]
            });
        },
        drawPieChart() {
            this.chartPie = echarts.init(document.getElementById("chartPie"));
            this.chartPie.setOption({
                title: {
                    text: "Pie Chart",
                    subtext: "纯属虚构",
                    x: "center"
                },
                tooltip: {
                    trigger: "item",
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                color: ["#33CCFF", "#FF9966", "#660000", "#CC00FF", "#FF6600"],
                legend: {
                    orient: "vertical",
                    left: "left",
                    data: [
                        "直接访问",
                        "邮件营销",
                        "联盟广告",
                        "视频广告",
                        "搜索引擎"
                    ]
                },
                series: [
                    {
                        name: "访问来源",
                        type: "pie",
                        radius: "55%",
                        center: ["50%", "60%"],
                        data: [
                            { value: 335, name: "直接访问" },
                            { value: 310, name: "邮件营销" },
                            { value: 234, name: "联盟广告" },
                            { value: 135, name: "视频广告" },
                            { value: 1548, name: "搜索引擎" }
                        ],
                        itemStyle: {
                            emphasis: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: "rgba(0, 0, 0, 0.5)"
                            }
                        }
                    }
                ]
            });
        },
        drawCharts() {
            this.drawRadarChart();
            this.drawBarChart();
            this.drawLineChart();
            this.drawPieChart();
        }
    },
    mounted() {
        // this.drawCharts();
        this.getData();
    },
    updated() {
        this.getData();
        // this.drawCharts();
    }
};
</script>

<style scoped lang="scss">
.chart-container {
    width: 100%;
    float: left;
    margin-bottom: 30px;
}

.el-col {
    padding: 30px 20px;
    .charts {
        height: 500px;
    }
}
</style>
