// 更新 README.md 文件中的每日语录
import fs from "fs";
import { sample } from "lodash-es";

async function run() {
  try {
    const readme = fs.readFileSync("./README.md", "utf-8");
    // 拆分 README 内容
    const PointBefore = "Daily Quotations</h2>"; // 标记前半部分的结束
    const PointAfter = "![zzz的github凡人修仙传]"; // 标记后半部分的开始
    const indexBefore = readme.indexOf(PointBefore);
    const indexAfter = readme.indexOf(PointAfter);
    const before = readme.slice(0, indexBefore + PointBefore.length);
    const after = readme.slice(indexAfter);

    // 获取当前时间
    const now = new Date();
    const year = now.getFullYear();
    let month = now.getMonth() + 1;
    month = month < 10 ? `0${month}` : month;
    let day = now.getDate();
    day = day < 10 ? `0${day}` : day;
    const date = `${year}-${month}-${day}`;

    // 获取随机一句语录
    const texts = fs.readFileSync("./text.txt", "utf-8").split("\n");
    const text = sample(texts);
    console.log(text);
    
    // 构造新的 README 内容
    const newReadme = `${before}

<zzz>${date}</zzz>

${text}

${after}

`;

    // 写入 README 文件
    fs.writeFileSync("./README.md", newReadme, "utf-8");
    console.log("README.md updated successfully.");
  } catch (err) {
    console.error(err.message);
  }
}

run();
