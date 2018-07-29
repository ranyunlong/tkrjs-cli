#!/usr/bin/env node

const program = require('commander')
const path = require('path')
const VERSION = require('./package').version
const chalk = require('chalk')
const { spawn,fork } = require('child_process')
const fs = require('fs')
const tpl = require('./tpl')
const ora = require('ora')
const download = require('download-git-repo')
const inquirer = require('inquirer')


program.version(VERSION,'-v, --version')

program
    .command('init <project>')
    .description('generate a new project from a template')
    .action(function(value){
        const spinner = ora('Loading download template').start();
        download('ranyunlong/quick-tkrjs-project',path.resolve(value),function(err){
            if(err){
                spinner.fail('Template download failed!')
                throw err;
            }
            spinner.succeed('Temlate download succeed!')
            let package = fs.readFileSync(path.resolve(value,'package.json')).toString()
                package = JSON.parse(package)
                package.name = value
            fs.writeFileSync(path.resolve(value,'package.json'),JSON.stringify(package,null,2))
            confirmInstall()
        })

        function confirmInstallType(){
            inquirer.prompt({
                type:"list",
                message:"Choose what way to install?",
                choices:['use yarn install','use npm install'],
                default:0,
                name:'select'
            }).then((res)=>{
                // console.log(res)
                function install(type){
                    if(process.platform == 'win32') type += '.cmd'
                    const npmi = spawn(type,['install'],{
                        cwd:path.resolve(value),
                        stdio:'inherit',
                        env:process.env
                    })

                    npmi.on('close',function(){
                        console.log('\nTo get started:\n')
                        console.log(chalk.yellow(`cd ${value}`))
                        console.log(chalk.yellow(`${type.replace('.cmd','')} start`))     
                        console.log(chalk.yellow(`docs in ${chalk.green(`https://github.com/ranyunlong/tkrjs`)}`))
                    })
                }
                if(res.select == 'use yarn install'){
                    install(`yarn`)
                }else{
                    install(`npm`)
                }
            })
        }

        function confirmInstall(){
            inquirer.prompt({
                type:'confirm',
                name:'install',
                message:"Do you need to install dependencies?",
                default:true
            }).then(res=>{
                if(res.install) {
                    confirmInstallType()
                    return;
                }
                console.log('\nTo get started:\n')
                console.log(chalk.yellow(`cd ${value}`))
                console.log(chalk.yellow(`npm install`))
                console.log(chalk.yellow(`npm start\n`))   
                console.log(`docs in https://github.com/ranyunlong/tkrjs`)  
            })
        }
    })

program
    .option('-c, --controller <ControllerName>','generate a new controller.ts file from a template',function(name){
        if(!/^[A-Z]/.test(name)){
            throw new Error(chalk.red(`The Controller name "${name}" first letter must be capitalized`))
        }
        if(/[·！#￥（——）：；“”‘、，|《。》？、【】[\]]/g.test(name) || /[`~!@#$%^&*()_+<>?:"{},.\/;'[\]]/g.test(name)){
            throw new Error(chalk.red(`The Controller name "${name}" cannot contain special symbols`))
        }
        
        const filePath = path.resolve('application','controllers',name+'.ts')
        const scanner = ora(`Create Controller file ${filePath}`).start()

        //const ErrorDirectoryNotExist = new Error(`${chalk.red(`Directory does not exist`)} \n ${chalk.yellow('   at ' + path.resolve('application','controllers'))}`)
        // const ErrorFileCreated= new Error(`${chalk.red(`The current file has been created`)} \n ${chalk.yellow('   at ' + filePath)}`)
        //console.log(`${chalk.red(`The current file has been created`)} \n ${chalk.yellow('   at ' + filePath)}`)
        const ErrorDirectoryNotExist = new Error(`Directory does not exist \n    at  ${path.resolve('application','controllers')}`)
        const ErrorFileCreated= new Error(`The current file has been created \n    at ${filePath}`)

        if(!fs.existsSync(path.resolve('application','controllers'))) {
            scanner.fail(`Creation failed`)
            throw ErrorDirectoryNotExist
        }
        if(fs.existsSync(filePath)) {
            scanner.fail(`Creation failed`)
            throw ErrorFileCreated
        }
        
        fs.writeFileSync(filePath,tpl.controllerTpl(name))
        scanner.succeed(`${filePath}`)
    })
    .option('-s, --service <ServiceName>','generate a new service.ts file from a template',function(name){
        if(!/^[A-Z]/.test(name)){
            const TKR_ERROR = new Error(`The Service name "${name}" first letter must be capitalized`)
            throw TKR_ERROR
        }
        if(/[·！#￥（——）：；“”‘、，|《。》？、【】[\]]/g.test(name) || /[`~!@#$%^&*()_+<>?:"{},.\/;'[\]]/g.test(name)){
            const TKR_ERROR = new Error(`The Service name "${name}" cannot contain special symbols`)
            throw TKR_ERROR
        }
        
        const filePath = path.resolve('application','services',name+'.ts')
        const scanner = ora(`Create Controller file ${filePath}`).start()

        const ErrorDirectoryNotExist = new Error(`Directory does not exist \n    at ${path.resolve('application','controllers')}`)
        const ErrorFileCreated= new Error(`The current file has been created \n    at ${filePath}`)

        if(!fs.existsSync(path.resolve('application','services'))) {
            scanner.fail(`Creation failed`)
            throw ErrorDirectoryNotExist
        }
        if(fs.existsSync(filePath)) {
            scanner.fail(`Creation failed`)
            throw ErrorFileCreated
        }
        
        fs.writeFileSync(filePath,tpl.serviceTpl(name))
        scanner.succeed(`File created! ${filePath}`)
    })

program
    .command('serve <tsconfig-path> <entry-file-path>')
    .action(function(confitPath,entryFilePath){
        fork(path.join(__dirname,'node_modules','ts-node-dev','bin','ts-node-dev'),['--project',confitPath,entryFilePath],{
            cwd:path.resolve()
        },(error) => {
            if (error) {
              console.log(error)
              process.exit()
            }
        })
    })

program
    .command('start <tsconfig-path> <entry-file-path>')
    .action(function(confitPath,entryFilePath){
        fork(path.join(__dirname,'node_modules','ts-node','dist','bin'),['--project',confitPath,entryFilePath],{
            cwd:path.resolve()
        },(error) => {
            if (error) {
              console.log(error)
              process.exit()
            }
        })
    })


program.parse(process.argv)

if(process.argv.length <= 2){
    program.outputHelp(cb=>{
        return chalk.green(cb)
    })
}