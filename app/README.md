# tkrjs 快速演示项目


### 下载
```
git clone https://github.com/ranyunlong/quick-tkrjs-project.git
```

### 目录结构

```
WEB部署目录（或者子目录）
├─Application                应用目录
│  │
│  ├─Configs                 应用配置目录
│  │  └─index.ts             配置文件
│  │ 
│  ├─Controllers             控制器目录
|  |  ├─IndexController.ts   Index控制器
|  |  └─ApiController.ts     Api控制器
|  |
│  ├─model                   数据验证模型
|  |  └─index.ts             数据验证规则文件
|  |
|  ├─public                  默认的静态文件目录
|  |  ├─javascripts          browser js文件
|  |  ├─css                  css 文件
|  |  ├─images               图片目录
|  |  ├─uploads              文件上传目录
|  |  └─index.html           html文件
|  |  
|  ├─service                 自定义服务类目录
|  |  └─index.ts             自定义服务类
|  | 
│  └─app.ts                  应用入口文件  
│         
├─Public                     静态文件目录
├─index.ts                   应用启动文件
├─.gitignore                 git文件
├─package.json               包管理文件
├─README.md                  自述文件
└─tsconfig.json              Tslang配置文件
```

### 联系

- author ranyunlong<549510622@qq.com>
- github https://github.com/ranyunlong/tkrjs