/**
 * 自定义服务目录
 * 
 * 服务用于注入到控制器的构造函数中，用于代替过渡依赖中间件方案
 * 
 * 编写方式如下：
 * 服务类中会注入ctx和configs配置选项 
 * 
 * @param ctx 是koa 的ctx对象
 * @param configs 项目中的配置选项
 * 
 */


// import { TKServer } from "tkrjs";

// export class YouService{
//     constructor(ctx:TKServer.Context,configs:TKServer.ServerOptionConfigs){

//     }
//     youhandler(){
//         // todo...something
//     }
// }