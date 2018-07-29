function controllerTpl(name){
return `import { Controller, Get } from "tkrjs";

@Controller('/')
export class ${name}Controller{
    @Get()
    async index(){
        
    }
}`
}

function serviceTpl(name){
return `import { TKServer } from "tkrjs";

export class ${name}Service{
    constructor(ctx:TKServer.Context,configs:TKServer.ServerOptionConfigs){

    }
    youhandler(){
        // todo...something
    }
}
`
}

module.exports = {
    controllerTpl,
    serviceTpl
}