import { Controller, Get } from "tkrjs";

@Controller('/api')
export class ApiController{
    @Get()
    async index(){
        return 'router /api'
    }
    @Get()
    async users(){ 
        // 默认自动获取方法名称为路由
        return 'router /api/users'
    }
    @Get('/myvalidate')
    async validate(){
        // 若方法装饰器有参数使用方法装饰器参数作为路由地址
        return 'router /api/myvalidate'
    }
}