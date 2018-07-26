/**
 * 项目配置目录
 * 
 * database 
 * 是数据库的配置 使用knex.js可使用多种sql类型的数据库
 * @link https://knexjs.org/
 * 
 * body
 * 是用于解析body请求的配置使用了koa-body中间件处理目前无法禁用
 * @link https://www.npmjs.com/package/koa-body
 * 
 * session
 * 处理session的模块 使用 koa-session 模块 中间件处理
 * @link https://www.npmjs.com/package/koa-body
 * 
 * static
 * 处理静态文件输出 使用koa-static 模块 中间件处理
 * @link https://www.npmjs.com/package/koa-static
 */

import { TKServer } from "tkrjs";
import * as path from 'path'

export const configs:TKServer.ServerOptionConfigs={
    database:{
        client:'mysql',             // 数据库类型
        connection:{    
            host:'localhost',       // 主机地址
            user:'root',            // 用户
            password:'root',        // 密码
            database:'ranyunlong'   // 数据库名称
        }
    },
    body:{  
        patchNode:true,             // 解析到nodejs 的ctx.req 对象上
        patchKoa:true,              // 解析到koa ctx.request上
        multipart:true,             // 解析文件上传
        jsonLimit:'1mb',            // json请求显示
        formLimit:'56kb',           // from请求限制
        textLimit:'56kb',           // text请求限制
        text:true,                  // 解析文本
        json:true,                  // 解析json
        encoding:'utf-8',           // 编码格式
        urlencoded:true,            // 解析urlencoded主体
        jsonStrict:true,            // 严格模式
        strict:true                 // 不解析GET,HEAD,DELETE请求
    },
    session:{
        key:'Tk:sess',              // cookie 秘钥
        maxAge:86400000,            // 过期时间
        overwrite:true,             // 覆盖
        httpOnly:true,              // httpOnly
        signed:true,                // 强制签名
        rolling:false               // 是否续订会话 不续订则一天后过期
    },
    static:{
        root:path.resolve('application','public'),
        options:{
            maxage:0,               // 设置浏览器缓存
            hidden:true,            // 允许传输隐藏文件
            index:'index.html',     // 默认文件名
            defer:true,             // 让中间件和路由先响应
            gzip:true,              // 当客户端支持gzip时,如果存在扩展名为.gz的请求文件,请尝试自动提供文件的gzip压缩版本.
            extensions:false 
        }
    }
}

export default configs;