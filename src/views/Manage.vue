<template>
	<div class="container">
		<my-header @getcollapsed="showcollapsed"></my-header>
		<div class="manage_page">
			<el-row>
				<el-col :span="4" class="nav">
					<el-menu :default-active="defaultActive" router>
						<el-menu-item index="manage"><i class="el-icon-menu"></i>首页</el-menu-item>
						<el-submenu index="2">
							<template slot="title"><i class="el-icon-document"></i>数据管理</template>
							<el-menu-item index="userList">用户列表</el-menu-item>
						</el-submenu>
						<el-submenu index="3">
							<template slot="title"><i class="el-icon-plus"></i>添加数据</template>
							<el-menu-item index="addShop">添加商铺</el-menu-item>
							<el-menu-item index="addGoods">添加商品</el-menu-item>
						</el-submenu>
						<el-submenu index="4">
							<template slot="title"><i class="el-icon-star-on"></i>图表</template>
							<el-menu-item index="charts">图表</el-menu-item>
						</el-submenu>
						<el-submenu index="5">
							<template slot="title"><i class="el-icon-edit"></i>编辑</template>
							<el-menu-item index="edit">文本编辑</el-menu-item>
						</el-submenu>
						<el-submenu index="6">
							<template slot="title"><i class="el-icon-warning"></i>说明</template>
							<el-menu-item index="explain">说明</el-menu-item>
						</el-submenu>
					</el-menu>
				</el-col>
				<el-col :span="20" class="main-content">
					<keep-alive>
						<router-view></router-view>
					</keep-alive>
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
            console.log(data);
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
            }
        }
    }
}
</style>
