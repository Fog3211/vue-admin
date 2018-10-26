<template>
     <el-container>
        <el-header>
            <el-row>
                <el-col :span="4" class="logo" :class="collapsed?'logo-collapse-width':'logo-width'">
                    {{collapsed?'':sysName}}
                </el-col>
                <el-col :span="10">
                    <div class="tools" @click.prevent="collapse">
                        <i class="fa fa-align-justify"></i>
                    </div>
                </el-col>
                <el-col :span="4" class="userinfo">
                    <el-dropdown trigger="hover">
                        <span class="el-dropdown-link userinfo-inner">
                            <img :src="this.sysUserAvatar" /> {{sysUserName}}
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item>我的消息</el-dropdown-item>
                            <el-dropdown-item divided @click.native.prevent="logout">退出登录</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </el-col>
            </el-row>
        </el-header>
        <el-container>
            <el-aside>
                <el-menu :default-active="$route.path" class="el-menu-vertical-demo" unique-opened router v-show="!collapsed">
                    <template v-for="(item,index) in $router.options.routes" v-if="!item.hidden">
                        <el-submenu :index="index+''" v-if="!item.leaf" :key="index">
                            <template slot="title"><i :class="item.iconCls"></i>{{item.name}}</template>
                            <el-menu-item v-for="child in item.children" :index="child.path" :key="child.path" v-if="!child.hidden">{{child.name}}</el-menu-item>
                        </el-submenu>
                        <el-menu-item v-if="item.leaf&&item.children.length>0" :index="item.children[0].path" :key="index"><i :class="item.iconCls"></i>{{item.children[0].name}}</el-menu-item>
                    </template>
                </el-menu>
            </el-aside>
            <el-main>
            </el-main>
        </el-container>
    </el-container> 
</template>

<script>
export default {
    data() {
        return {
            sysName: "Vue-Admin",
            collapsed: false,
            sysUserName: "",
            sysUserAvatar: ""
        };
    },
    methods: {
        //退出登录
        logout() {
            let _this = this;
            this.$confirm("确认退出吗?", "提示", {
                type: "warning"
            })
                .then(() => {
                    //   console.log('logout');
                    sessionStorage.removeItem("user");
                    _this.$router.push("/login");
                })
                .catch(() => {
                    console.log("error");
                });
        },
        //折叠导航栏
        collapse() {
            this.collapsed = !this.collapsed;
            // console.log(this.collapsed);
        },
        showMenu(i, status) {
            this.$refs.menuCollapsed.getElementsByClassName(
                "submenu-hook-" + i
            )[0].style.display = status ? "block" : "none";
        }
    },
    mounted() {
        let user = sessionStorage.getItem("user");
        if (user) {
            user = JSON.parse(user);
            this.sysUserName = user.name;
            this.sysUserAvatar = user.avatar;
        }
    }
};
</script>

<style scoped lang="scss">
$color-primary: #18c79c;

.el-container {
    .el-header {
        height: 60px;
        line-height: 60px;
        color: #fff;
        background-color: $color-primary;
        .logo {
            height: 60px;
            font-size: 22px;
            padding-left: 20px;
            padding-right: 20px;
        }
        .logo-width {
            width: 230px;
        }
        .logo-collapse-width {
            width: 60px;
        }
        .tools {
            padding: 0px 23px;
            width: 14px;
            height: 60px;
            font-size: 26px;
            line-height: 60px;
            cursor: pointer;
        }
        .userinfo {
            text-align: right;
            padding-right: 35px;
            float: right;
            .userinfo-inner {
                cursor: pointer;
                color: #fff;
                img {
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    margin: 10px 0px 10px 10px;
                    float: right;
                }
            }
        }
    }
    .el-container {
        display: flex;
        position: absolute;
        top: 60px;
        bottom: 0px;
        width: 100%;
        overflow: hidden;
        .el-aside {
            flex: 0 0 230px;
            .el-menu {
                height: 100%;
                // background-color: #408080;
            }
        }
    	.el-main{
            	flex:1;
                // background-color: #8080ff;
        }
    }
}
</style>