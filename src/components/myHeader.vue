<template>
    <el-container>
        <el-header :style="{ 'background-color': primaryColor }">
            <el-row>
                <el-col :span="4" class="logo" :class="collapsed?'logo-collapse-width':'logo-width'">
                    {{collapsed?'':sysName}}
                </el-col>
                <el-col :span="10">
                    <div class="tools" @click="collapse">
                        <i class="fa fa-align-justify middle"></i>
                    </div>
                </el-col>
                <el-col :span="4" class="userinfo">
                    <el-dropdown trigger="hover">
                        <span class="el-dropdown-link userinfo-inner middle">
                            <img :src="this.sysUserAvatar" /> {{sysUserName}}
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item>我的消息</el-dropdown-item>
                            <el-dropdown-item @click.native.prevent="showThemeDialog">切换主题色</el-dropdown-item>
                            <el-dropdown-item divided @click.native.prevent="logout">退出登录</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </el-col>
            </el-row>
        </el-header>
        <el-dialog center :visible.sync="themeDialogVisible" title="切换主题色" width="400px">
            <el-form :model="colors" :rules="rules" ref="form" class="theme-form" label-position="top" label-width="70px">
                <el-form-item label="主题色" prop="primary">
                    <el-color-picker v-model="colors.primary"></el-color-picker>
                </el-form-item>
                <el-form-item class="color-buttons">
                    <el-button type="primary" @click.native.prevent="submitForm">切换</el-button>
                    <el-button @click.native.prevent="resetForm">重置</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </el-container>
</template>

<script>
import generateColors from "@/common/js/color";
import changeTheme from "@/common/js/changeTheme";
import { colorValidator } from "@/common/js/checkRules";
let originalColor = "#409eff";

export default {
    data() {
        return {
            sysName: "Vue-Admin",
            collapsed: false,
            sysUserName: "",
            sysUserAvatar: "",
            colors: {
                primary: originalColor
            },
            primaryColor: originalColor,
            themeDialogVisible: false,
            originalStyle: "",
            originalStylesheetCount: -1,
            rules: {
                primary: [{ validator: colorValidator, trigger: "blur" }]
            },
        };
    },
    methods: {
        //退出登录
        logout() {
            let _this = this;
            this.$confirm("确认退出吗?", "提示", {
                type: "warning"
            }).then(() => {
                this.colors.primary = originalColor;
                this.primaryColor = originalColor;
                this.colors = Object.assign(
                    {},
                    this.colors,
                    generateColors(this.colors.primary)
                );
                this.writeNewStyle();

                sessionStorage.removeItem("user");
                _this.$router.push("/login");
            });
        },
        //折叠导航栏
        collapse() {
            this.collapsed = !this.collapsed;
            this.$emit("getcollapsed", this.collapsed); //不能用驼峰命名法
        },
        showThemeDialog() {
            this.themeDialogVisible = true;
        },
        // 更改主题
        writeNewStyle() {
            //  console.log(this.colors.primary)
            let cssText = this.originalStyle;
            Object.keys(this.colors).forEach(key => {
                cssText = cssText.replace(
                    new RegExp("(:|\\s+)" + key, "g"),
                    "$1" + this.colors[key]
                );
            });

            if (this.originalStylesheetCount === document.styleSheets.length) {
                const style = document.createElement("style");
                style.innerText = cssText;
                document.head.appendChild(style);
            } else {
                document.head.lastChild.innerText = cssText;
            }
        },
        // 提交颜色
        submitForm() {
            this.$refs.form.validate(valid => {
                if (valid) {
                    this.themeDialogVisible = false;
                    this.primaryColor = this.colors.primary;
                    this.colors = Object.assign(
                        {},
                        this.colors,
                        generateColors(this.colors.primary)
                    );
                    this.writeNewStyle();
                } else {
                    return false;
                }
            });
        },
        // 重置颜色选择
        resetForm() {
            this.$refs.form.resetFields();
        },

        getIndexStyle() {
            changeTheme
                .getFile(
                    "https://unpkg.com/element-ui@2.4.9/lib/theme-chalk/index.css"
                )
                .then(({ data }) => {
                    this.originalStyle = changeTheme.getStyleTemplate(data);
                });
        },
    },
    created() {
        this.getIndexStyle();
    },
    mounted() {
        let user = sessionStorage.getItem("user");
        if (user) {
            user = JSON.parse(user);
            this.sysUserName = user.name;
            this.sysUserAvatar = user.avatar;
        }

        this.$nextTick(() => {
            this.originalStylesheetCount = document.styleSheets.length;
            // console.log(themeColor);
        });
    }
};
</script>

<style scoped lang="scss">
// $color-primary: #18c79c;

.el-container {
    .el-header {
        height: 60px;
        line-height: 60px;
        color: #fff;
        // background-color: $color-primary;
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
                font-size: 16px;
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
}
</style>