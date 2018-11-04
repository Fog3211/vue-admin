// login
const checkAccount = (rule, value, callback) => {
    if (value === "" || value.trim() === "") {
        callback(new Error("请输入账号"));
    } else {
        callback();
    }
};
       
const checkPassword = (rule, value, callback) => {
    if (value === "" || value.trim() === "") {
        callback(new Error("请输入密码"));
    } else {
        if (value.length < 6) {
            callback(new Error("密码不能小于6位"));
        } else if (value.length > 16) {
            callback(new Error("密码不能大于16位"));
        }
        callback();
    }
};

// UserManage
const checkName = (rule, value, callback) => {
    if (value === "" || value.trim() === "") {
        return callback(new Error("请填写姓名"));
    } else {
        if (value.trim().length > 10) {
            callback(new Error("姓名长度不能超过10"));
        } else {
            callback();
        }
    }
};
const checkAddr = (rule, value, callback) => {
    if (value === "" || value.trim() === "") {
        return callback(new Error("请填写地址"));
    } else {
        if (value.trim().length > 50) {
            callback(new Error("地址长度不能超过50"));
        } else {
            callback();
        }
    }
};
// color
const colorValidator = (rule, value, callback) => {
    if (!value) {
        return callback(new Error("主题色不能为空"));
    } else if (!/^#[\dabcdef]{6}$/i.test(value)) {
        return callback(new Error("请输入 hex 格式的主题色"));
    } else {
        callback();
    }
};

export {
    checkAccount,
    checkPassword,
    checkName,
    checkAddr,
    colorValidator
}