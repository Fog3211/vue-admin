<template>
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="0px" class="demo-ruleForm login-container" @keyup.native.enter="handleSubmit">
        <h3 class="title">系统登录</h3>
        <el-form-item prop="account">
            <el-input type="text" v-model="ruleForm.account" auto-complete="off" placeholder="账号"></el-input>
        </el-form-item>
        <el-form-item prop="password">
            <el-input type="password" v-model="ruleForm.password" auto-complete="off" placeholder="密码"></el-input>
        </el-form-item>
        <el-form-item style="width:100%;">
            <el-button type="primary" style="width:100%;" @click.native.prevent="handleSubmit" :loading="logining">登录</el-button>
        </el-form-item>
        <span class="tip_account tip">账号：admin</span>
        <span class="tip_password tip">密码：123456</span>
    </el-form>
</template>

<script>
import { requestLogin } from "../api/api";

export default {
    data() {
        let checkAccount = (rule, value, callback) => {
            if (value === "" || value.trim() === "") {
                callback(new Error("请输入账号"));
            } else {
                callback();
            }
        };
        let checkPassword = (rule, value, callback) => {
            if (value === "" || value.trim() === "") {
                callback(new Error("请输入密码"));
            } else {
                if (value.length < 6) {
                    callback(new Error("密码不能小于6位"));
                } else if (value.length > 16) {
                    callback(new Error("密码不能小于16位"));
                }
                callback();
            }
        };
        return {
            logining: false,
            ruleForm: {
                account: "admin",
                password: "123456"
            },
            rules: {
                account: [{ validator: checkAccount, trigger: "blur" }],
                password: [{ validator: checkPassword, trigger: "blur" }]
            }
        };
    },
    methods: {
        handleSubmit() {
            this.$refs.ruleForm.validate(valid => {
                if (valid) {
                    // console.log("success!!");
                    this.logining = true;
                    let loginParams = {
                        username: this.ruleForm.account,
                        password: this.ruleForm.password
                    };
                    requestLogin(loginParams).then(data => {
                        this.logining = false;
                        let { msg, code, user } = data;
                        if (code !== 200) {
                            // console.log("error!!");
                            this.$message({ message: msg, type: "error" });
                        } else {
                            //  console.log("session!!");
                            sessionStorage.setItem(
                                "user",
                                JSON.stringify(user)
                            );
                            this.$router.push({ path: "/table" });
                        }
                    });
                } else {
                    // console.log("error!!");
                    return false;
                }
            });
        }
    }
};
</script>

<style lang="scss" scoped>
.login-container {
    border-radius: 5px;
    background-clip: padding-box;
    margin: 180px auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
    .title {
        margin: 0px auto 40px auto;
        text-align: center;
        color: #505458;
    }
    .tip {
        display: inline-block;
        width: 150px;
        color:dimgrey;
    }
    .tip_account {
        text-align: left;
    }
    .tip_password {
        text-align: right;
    }
}
</style>