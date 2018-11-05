<template>
    <section>
        <!--头部工具条-->
        <el-col :span="24" class="toolbar">
            <el-form :inline="true">
                <el-form-item>
                    <el-input v-model="name" placeholder="姓名"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click.native.prevent="getUsers">查询</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click.native.prevent="handleAdd">新增</el-button>
                </el-form-item>
            </el-form>
        </el-col>

        <!--列表-->
        <el-table :data="users" highlight-current-row v-loading="listLoading" border stripe class="table" @selection-change="selsChange" :header-cell-style="{background:'#EBEEF5'}">
            <el-table-column type="selection" width="55">
            </el-table-column>
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
            <el-table-column label="操作" width="150">
                <template slot-scope="scope">
                    <el-button type="info" size="small" @click.native.prevent="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button type="danger" size="small" @click.native.prevent="handleDel(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <!--底部工具条-->
        <el-col :span="24" class="toolbar toolbar-bottom">
            <el-button type="danger" @click.native.prevent="batchRemove" :disabled="this.sels.length===0">批量删除</el-button>
            <el-pagination background layout="prev, pager, next" @current-change="handleCurrentChange" @size-change="handleSizeChange" :page-size="pagesize" :total="total" class="pull-right">
            </el-pagination>
        </el-col>

        <!--编辑界面-->
        <el-dialog title="编辑" :visible.sync="editFormVisible">
            <el-form :model="formData" label-width="80px" :rules="formRules" ref="formData">
                <el-form-item label="姓名" prop="name">
                    <el-input v-model="formData.name"></el-input>
                </el-form-item>
                <el-form-item label="性别">
                    <el-radio-group v-model="formData.sex">
                        <el-radio class="radio" :label="1">男</el-radio>
                        <el-radio class="radio" :label="0">女</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="年龄" prop="age">
                    <el-input-number v-model="formData.age" :min="0" :max="200"></el-input-number>
                </el-form-item>
                <el-form-item label="生日" prop="birth">
                    <el-date-picker type="date" placeholder="选择日期" v-model="formData.birth"></el-date-picker>
                </el-form-item>
                <el-form-item label="地址" prop="addr">
                    <el-input type="textarea" v-model="formData.addr"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click.native.prevent="editFormVisible = false">取消</el-button>
                <el-button type="primary" @click.native.prevent="editSubmit" :loading="editLoading">提交</el-button>
            </div>
        </el-dialog>

        <!--新增界面-->
        <el-dialog title="新增" :visible.sync="addFormVisible">
            <el-form :model="formData" label-width="80px" :rules="formRules" ref="formData">
                <el-form-item label="姓名" prop="name">
                    <el-input v-model="formData.name"></el-input>
                </el-form-item>
                <el-form-item label="性别">
                    <el-radio-group v-model="formData.sex">
                        <el-radio class="radio" :label="1">男</el-radio>
                        <el-radio class="radio" :label="0">女</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="年龄" prop="age">
                    <el-input-number v-model="formData.age" :min="0" :max="150"></el-input-number>
                </el-form-item>
                <el-form-item label="生日" prop="birth">
                    <el-date-picker type="date" placeholder="选择日期" v-model="formData.birth"></el-date-picker>
                </el-form-item>
                <el-form-item label="地址" prop="addr">
                    <el-input type="textarea" v-model="formData.addr" autosize></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click.native.prevent="addFormVisible = false">取消</el-button>
                <el-button type="primary" @click.native.prevent="addSubmit" :loading="addLoading">提交</el-button>
            </div>
        </el-dialog>
    </section>
</template>

<script>
import util from "@/common/js/util";
import { checkName, checkAddr, checkAge } from "@/common/js/checkRules";
import {
    getUserListPage,
    removeUser,
    batchRemoveUser,
    editUser,
    addUser
} from "@/api/api";

export default {
    data() {
        return {
            name: "",
            users: [],
            total: 0,
            currentpage: 1,
            pagesize: 20,
            listLoading: false,
            sels: [], //列表选中列
            editFormVisible: false, //编辑界面是否显示
            editLoading: false,
            formRules: {
                name: [
                    { required: true, message: "请填写姓名", trigger: "blur" },
                    { validator: checkName, trigger: "blur" }
                ],
                age: [
                    { required: true, message: "请填写年龄", trigger: "blur" },
                    { validator: checkAge, trigger: "blur" }
                ],
                birth: [
                    {
                        required: true,
                        message: "请选择出生日期",
                        trigger: "blur"
                    }
                ],
                addr: [
                    { required: true, message: "请填写地址", trigger: "blur" },
                    { validator: checkAddr, trigger: "blur" }
                ]
            },

            addFormVisible: false, //新增界面是否显示
            addLoading: false,

            //弹窗界面数据
            formData: {
                name: "",
                sex: 1,
                age: 0,
                birth: "",
                addr: ""
            }
        };
    },
    methods: {
        //性别显示转换
        formatSex(row) {
            return row.sex == 1 ? "男" : "女";
        },
        handleCurrentChange(val) {
            this.currentpage = val;
            this.getUsers();
        },
        handleSizeChange(val) {
            this.pagesize = val;
        },
        //获取用户列表
        getUsers() {
            let para = {
                page: this.currentpage,
                name: this.name
            };
            this.listLoading = true;
            getUserListPage(para).then(res => {
                this.total = res.data.total;
                this.users = res.data.users;
                this.listLoading = false;
            });
        },
        //删除
        handleDel(index, row) {
            this.$confirm("确认删除该记录吗?", "提示", {
                type: "warning"
            })
                .then(res => {
                    this.listLoading = true;
                    let para = { id: row.id };
                    removeUser(para)
                        .then(res => {
                            this.listLoading = false;
                            this.$message({
                                message: "删除成功",
                                type: "success"
                            });
                            this.getUsers();
                        })
                        .catch(error => {
                            console.log(error);
                        });
                })
                .catch(error => {
                    console.log(error);
                });
        },
        //显示编辑界面
        handleEdit(index, row) {
            this.editFormVisible = true;
            this.formData = Object.assign({}, row);
        },
        //显示新增界面
        handleAdd() {
            this.addFormVisible = true;
            this.formData = {
                name: "",
                sex: 1,
                age: 0,
                birth: "",
                addr: ""
            };
        },
        //编辑
        editSubmit() {
            this.$refs.formData.validate(valid => {
                if (valid) {
                    this.$confirm("确认提交吗？", "提示", {}).then(res => {
                        this.editLoading = true;
                        let para = Object.assign({}, this.formData);
                        para.birth = util.formatDate.format(
                            new Date(para.birth),
                            "yyyy-MM-dd"
                        );
                        editUser(para).then(res => {
                            this.editLoading = false;
                            this.$message({
                                message: "提交成功",
                                type: "success"
                            });
                            this.$refs["formData"].resetFields();
                            this.editFormVisible = false;
                            this.getUsers();
                        });
                    });
                }
            });
        },
        //新增
        addSubmit() {
            this.$refs.formData.validate(valid => {
                if (valid) {
                    this.$confirm("确认提交吗？", "提示", {}).then(res => {
                        this.addLoading = true;
                        let para = Object.assign({}, this.formData);
                        para.birth = util.formatDate.format(
                            new Date(para.birth),
                            "yyyy-MM-dd"
                        );
                        addUser(para).then(res => {
                            this.addLoading = false;
                            this.$message({
                                message: "提交成功",
                                type: "success"
                            });
                            this.$refs["formData"].resetFields();
                            this.addFormVisible = false;
                            this.getUsers();
                        });
                    });
                }
            });
        },
        selsChange(val) {
            this.sels = val;
        },
        //批量删除
        batchRemove() {
            let ids = this.sels.map(item => item.id).toString();
            this.$confirm("确认删除选中记录吗？", "提示", {
                type: "warning"
            })
                .then(res => {
                    this.listLoading = true;
                    let para = { ids: ids };
                    batchRemoveUser(para).then(res => {
                        this.listLoading = false;
                        this.$message({
                            message: "删除成功",
                            type: "success"
                        });
                        this.getUsers();
                    });
                })
                .catch(error => {
                    console.log(error);
                });
        }
    },
    mounted() {
        this.getUsers();
    }
};
</script>

<style scoped lang="scss">
.toolbar {
    background: #f2f2f2;
    padding: 15px 15px 0 15px;
    margin: 10px 0px;
}
.toolbar-bottom {
    padding: 10px;
    margin-bottom: 60px;
}

.pull-right {
    float: right;
}
</style>