<template>
    <section>
        <!--工具条-->
        <el-col :span="24" class="toolbar">
            <el-form :inline="true">
                <el-form-item>
                    <el-input v-model="name" placeholder="请输入姓名"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="getUser">查询</el-button>
                </el-form-item>
            </el-form>
        </el-col>

        <!--列表-->
        <template>
            <el-table :data="users" highlight-current-row border stripe v-loading="loading" class="table-header" :header-cell-style="{background:'#EBEEF5'}">
                <el-table-column type="index" width="60">
                </el-table-column>
                <el-table-column prop="name" label="姓名" width="120" sortable>
                </el-table-column>
                <el-table-column prop="sex" label="性别" width="100" :formatter="formatSex" sortable>
                </el-table-column>
                <el-table-column prop="age" label="年龄" width="100" sortable>
                </el-table-column>
                <el-table-column prop="birth" label="生日" width="120" sortable>
                </el-table-column>
                <el-table-column prop="addr" label="地址" min-width="180" sortable>
                </el-table-column>
            </el-table>
        </template>

    </section>
</template>
<script>
import { getUserList } from "@/api/api";
export default {
    data() {
        return {
            name:'',
            loading: false,
            users: []
        };
    },
    methods: {
        //性别显示转换
        formatSex(row) {
            return row.sex === 1 ? "男" : "女" ;
        },
        //获取用户列表
        getUser: function() {
            let para = {
                name: this.name
            };
            this.loading = true;
            getUserList(para).then(res => {
                // console.log(res);
                this.users = res.data.users;
                this.loading = false;
            });
        }
    },
    mounted() {
        this.getUser();
    }
};
</script>

<style scoped lang="scss">
.toolbar {
    background: #f2f2f2;
    padding: 15px 15px 0 15px;
    margin: 10px 0px;
}
.table-header {
    width: 100%;
    margin-left: 10px;
}
</style>