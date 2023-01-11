# code-generator

指定仓库下载部分代码文件保存到你的项目里。没什么卵用，单纯增加无意义的 git 提交记录，显得你工作量很大的样子。

## 本地运行

1. clone

```shell
git clone https://github.com/zoudingyi/code-generator.git

cd code-generator
```

2. install

```shell
npm install
```

3. run

```shell
npm run serve
```

## 配置

```javascript
new codeGenerator({
  owner: "", // 仓库拥有者
  repo: "", // 仓库名称
  path: "", // 文件路径
  branch: "", // 指定分支 不填默认主分支
  savePath: "", // 保存文件路径
}).init();
```
