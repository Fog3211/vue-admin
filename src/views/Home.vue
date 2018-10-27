<template>
    <div class="container">
        <my-header @getcollapsed="showcollapsed"></my-header>
        <el-container>
            <el-aside>
                <el-menu :default-active="$route.path" class="el-menu-vertical-demo" unique-opened router v-show="!collapsed">
                    <template v-for="(item,index) in $router.options.routes" v-if="!item.hidden">
                        <el-submenu :index="index+''" v-if="!item.leaf" :key="index">
                            <template slot="title"><i :class="item.iconCls"></i><span>{{item.name}}</span></template>
                            <el-menu-item v-for="child in item.children" :index="child.path" :key="child.path" v-if="!child.hidden">{{child.name}}</el-menu-item>
                        </el-submenu>
                        <el-menu-item v-if="item.leaf&&item.children.length>0" :index="item.children[0].path" :key="index"><i :class="item.iconCls"></i>{{item.children[0].name}}</el-menu-item>
                    </template>
                </el-menu>
            </el-aside>
            <el-main>
            </el-main>
        </el-container>
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
    methods: {
        showMenu(i, status) {
            this.$refs.menuCollapsed.getElementsByClassName(
                "submenu-hook-" + i
            )[0].style.display = status ? "block" : "none";
        },
        showcollapsed(data) {
            this.collapsed = data;
            // console.log(data);
        }
    }
};
</script>

<style scoped lang="scss">
$color-primary: #18c79c;

.el-container {
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
        .el-main {
            flex: 1;
            // background-color: #8080ff;
        }
    }
}
</style>