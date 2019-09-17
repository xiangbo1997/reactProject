
//判断是开发环境 ，还是生产环境
const isEnv =process.env.NODE_ENV === 'development'

export {
    isEnv,
}