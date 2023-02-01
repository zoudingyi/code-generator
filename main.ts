import axios from "axios";
const fs = require("fs");

interface github {
  owner: string;
  repo: string;
  path: string;
  branch?: string;
  savePath: string;
}

class codeGenerator {
  private static baseUrl = "https://api.github.com";
  private owner: string;
  private repo: string;
  private path: string;
  private branch: string = '';
  private savePath: string;

  constructor(data: github) {
    this.owner = data.owner;
    this.repo = data.repo;
    this.path = data.path;
    if (data.branch) this.branch = data.branch;
    this.savePath = data.savePath;
  }

  getCode(): Promise<any> {
    // GET /repos/:owner/:repo/contents/:path
    return axios({
      method: "get",
      url: `${codeGenerator.baseUrl}/repos/${this.owner}/${this.repo}/contents/${this.path}`,
    }).then((res: any) => {
      const { content, encoding } = res.data;
      const buff = Buffer.from(content, encoding);
      const code = buff.toString("ascii");
      return code;
    });
  }

  getCodeOnBranch(): Promise<any> {
    // GET "https://raw.githubusercontent.com/:owner/:repo/:branch/:path"
    return axios({
      method: "get",
      url: `https://raw.githubusercontent.com/${this.owner}/${this.repo}/${this.branch}/${this.path}`,
    }).then((res: any) => res.data);
  }

  create(code: string) {
    fs.writeFile(this.savePath, code, (err: any) => {
      console.log("err :>> ", err);
    });
  }

  async init() {
    const code = this.branch
      ? await this.getCodeOnBranch()
      : await this.getCode();
    this.create(code);
  }
}

new codeGenerator({
  owner: "chuzhixin", // 仓库拥有者
  repo: "vue-admin-better", // 仓库名称
  path: "src/components/VabCharge/index.vue", // 文件路径
  branch: "", // 指定分支 不填默认主分支
  savePath: "E:/WorkSpace/zx-template/src/refactor/components/VabCharge.vue", // 保存文件路径
}).init();
