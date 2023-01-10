import axios from "axios";
const fs = require("fs");

interface github {
  owner: string;
  repo: string;
  path: string;
}

class codeGenerator {
  private static baseUrl = "https://api.github.com";
  private owner: string;
  private repo: string;
  private path: string;
  private savePath: string;

  constructor(data: github, savePath: string) {
    this.owner = data.owner;
    this.repo = data.repo;
    this.path = data.path;
    this.savePath = savePath;
  }

  getCode(): Promise<any> {
    // GET /repos/:owner/:repo/contents/:path
    // "https://raw.githubusercontent.com/:owner/:repo/:branch/:path"
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

  create(code: string) {
    fs.writeFile(this.savePath, code, (err: any) => {
      console.log("err :>> ", err);
    });
  }

  async init() {
    const code = await this.getCode();
    this.create(code);
  }
}

new codeGenerator(
  {
    owner: "PanJiaChen", // 仓库拥有者
    repo: "vue-element-admin", // 仓库名称
    path: "src/views/components-demo/dropzone.vue", // 文件路径
  },
  "E:/GitHub Repositories/double-color-ball-emulator/dropzone.vue" // 保存文件路径
).init();
