#!/usr/bin/env node

const program = require('commander')
const path = require('path')
const VERSION = require('./package').version
const chalk = require('chalk')
const { spawn } = require('child_process')
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
                    //const spinner = ora('Loading install package').start()
                    const npmi = spawn(process.platform == 'win32' ? type + '.cmd' : type,['install'],{
                        cwd:path.resolve(value),
                        stdio:'inherit',
                        env:process.env
                    })

                    npmi.on('close',function(){
                        console.log('\nTo get started:\n')
                        console.log(chalk.yellow(`cd ${value}`))
                        console.log(chalk.yellow(`npm i -g node-dev ts-node-dev typescript`))
                        console.log(chalk.yellow(`${type} start\n`))     
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
                console.log(chalk.yellow(`npm i`))
                console.log(chalk.yellow(`npm i -g node-dev ts-node-dev typescript`))
                console.log(chalk.yellow(`${type} start\n`))     
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

        const ErrorDirectoryNotExist = new Error(`${chalk.red(`Directory does not exist`)} \n ${chalk.yellow('   at ' + path.resolve('application','controllers'))}`)
        const ErrorFileCreated= new Error(chalk.red(`The current file has been created`) + chalk.yellow('   at ' + filePath))

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
            throw new Error(chalk.red(`The Service name "${name}" first letter must be capitalized`))
        }
        if(/[·！#￥（——）：；“”‘、，|《。》？、【】[\]]/g.test(name) || /[`~!@#$%^&*()_+<>?:"{},.\/;'[\]]/g.test(name)){
            throw new Error(chalk.red(`The Service name "${name}" cannot contain special symbols`))
        }
        
        const filePath = path.resolve('application','services',name+'.ts')
        const scanner = ora(`Create Controller file ${filePath}`).start()

        const ErrorDirectoryNotExist = new Error(`${chalk.red(`Directory does not exist`)} \n ${chalk.yellow('   at ' + path.resolve('application','controllers'))}`)
        const ErrorFileCreated= new Error(chalk.red(`The current file has been created`) + chalk.yellow('   at ' + filePath))

        if(!fs.existsSync(path.resolve('application','services'))) {
            scanner.fail(`Creation failed`)
            throw ErrorDirectoryNotExist
        }
        if(fs.existsSync(filePath)) {
            scanner.fail(`Creation failed`)
            throw ErrorFileCreated
        }
        
        fs.writeFileSync(filePath,tpl.serviceTpl(name))
        scanner.succeed(`${filePath}`)
    })


program.parse(process.argv)

if(program.args.length == 0){
    program.outputHelp(cb=>{
        return chalk.green(cb)
    })
}