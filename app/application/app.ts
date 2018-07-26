import { TKServer, ServerMode } from "tkrjs";
import { IndexController } from "./controllers/Index";
import { ApiController } from "./controllers/Api";

new TKServer({
    keys:['app'],               // 用于session 签名key
    mode:ServerMode.dev,        // app 启动模式 dev有debug输出 使用ServerMode枚举参数
    port:3000,                  // http 端口 默认3000
    middlewares:[],             // 用于添加koa的第三方中间件 若非中间件使用的频率多 不建议使用中间件 可使用自定义服务类处理
    controllers:[               // 控制器列表 用于处理路由的控制器
        IndexController,
        ApiController
    ]
})