<template>
    <div class="container">
        <my-header @getcollapsed="showcollapsed"></my-header>
        <div class="manage_page">
            <el-row>
                <el-col class="nav" :span="collapsed?1:4">
                    <el-menu class="el-menu-vertical-demo" :collapse="collapsed" router>
                        <el-menu-item index="manage">
                            <i class="el-icon-menu"></i>
                            <span slot="title">首页</span>
                        </el-menu-item>
                        <el-submenu index="2">
                            <template slot="title">
                                <i class="el-icon-document"></i>
                                <span slot="title">数据管理</span>
                            </template>
                            <el-menu-item-group>
                                <el-menu-item index="userList">用户列表</el-menu-item>
                                <el-menu-item index="userManage">用户管理</el-menu-item>
                            </el-menu-item-group>
                        </el-submenu>
                        <el-submenu index="3">
                            <template slot="title">
                                <i class="fa fa-bar-chart"></i>
                                <span slot="title">统计</span>
                            </template>
                            <el-menu-item index="charts">图表</el-menu-item>
                        </el-submenu>
                        <el-submenu index="4">
                            <template slot="title">
                                <i class="fa fa-edit"></i>
                                <span slot="title">编辑</span>
                            </template>
                            <el-menu-item index="edit">文本编辑</el-menu-item>
                        </el-submenu>
                    </el-menu>
                </el-col>
                <el-col :span="collapsed?23:20" class="main-content">
                    <span class="routeName">{{$route.name}}</span>
                    <transition name="fade" mode="out-in">
                        <keep-alive>
                            <router-view></router-view>
                        </keep-alive>
                    </transition>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
import myHeader from "@/components/myHeader";
export default {
    components: {
        myHeader
    },
    data() {
        return {
            collapsed: false
        };
    },
    computed: {
        defaultActive: function() {
            return this.$route.path.replace("/", "");
        }
    },
    methods: {
        showcollapsed(data) {
            this.collapsed = data;
            // console.log(data);
        }
    }
};
</script>


<style lang="scss" scoped>
.container {
    height: 100%;
    width: 100%;
    overflow-y: hidden;
    .manage_page {
        // background-color: #324057;
        height: 100%;
        width: 100%;
        .el-row {
            height: 100%;
            .nav {
                height: 100%;
                .el-menu {
                    min-height: 100%;
                }
            }
            .main-content {
                height: 100%;
                overflow: auto;
                .routeName {
                    display: block;
                    padding: 5px 0 0 5px;
                    color: #919191;
                }
            }
        }
    }
}
.fa{
    font-size: 18px;
    transform: translateX(10%);
    padding-right: 15px;
}
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
    opacity: 0;
}
</style>
