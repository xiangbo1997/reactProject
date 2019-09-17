// 对持久存储localstorage的函数封装
// 设置持久存储
function setItem(key, value) {
    window.localStorage.setItem(key, JSON.stringify(value))

}

// 读取
function getItem(key) {
    const result = window.localStorage.getItem(key);
    return JSON.parse(result)
}
//删除
function removeItem(key) {
    window.localStorage.removeItem(key)
}

// 向外暴露
export {
    setItem,
    getItem,
    removeItem

}