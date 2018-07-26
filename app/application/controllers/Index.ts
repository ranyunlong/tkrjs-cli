import { Controller, Get, TKServer, Body, Req, Res, Query  } from "tkrjs";

@Controller('/')
export class IndexController{
    @Get()
    async index( // 参数装饰器 可获取需要注入的参数
        @Req req:TKServer.IncomingMessage,
        @Res res:TKServer.ServerResponse,
        @Body body:TKServer.Body,
        @Query query:TKServer.Query
    ){
        console.log(req.url)
        return 100;
    }
    
    // /:id 先添加至路由 匹配时比 /test 后匹配
    @Get('/:id')
    async hah(){
        return 'hh'
    }

    // /test比/:id 先匹配 使用 后入先出规则
    @Get('/test')
    async user(){
        return 'test'
    }
}