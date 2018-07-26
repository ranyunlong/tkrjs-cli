import { Validate, AutoComplete } from "tkrjs";

export const model:Validate.Rules = {
    username:[
        {required:true,message:"账号必须",authType:["login","register"]},
        {length:[3,16],message:"账号长度不正确",authType:["login","register"],autoComplete:AutoComplete.Types.xss}
    ],
    password:[
        {required:true,message:"密码必须",authType:["login","resister"]},
        {length:[6,16],message:"密码长度不正确",autoComplete:[AutoComplete.Types.md5,AutoComplete.Types.xss]}
    ],
    email:[
        {required:true,message:"邮箱必须",authType:["register","use-email-change-password"]},
        {type:Validate.Types.email,message:"邮箱格式不正确",authType:["register","use-email-change-password"],autoComplete:AutoComplete.Types.xss}
    ],
    phone:[
        {required:true,message:"手机必须",authType:["register","use-phone-change-password"]},
        {type:Validate.Types.phone,message:"手机格式不正确",authType:["register","use-phone-change-password"],autoComplete:AutoComplete.Types.xss}
    ]
}