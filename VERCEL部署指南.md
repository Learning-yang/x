# 🚀 Vercel一键部署指南（10分钟上线）

> 代码已就绪 ✅
> 构建通过 ✅
> Git仓库已初始化 ✅
> **剩余：你的3个手动操作（5-10分钟）**

---

## 📊 当前进度

```
✅ 项目代码完整
✅ 依赖安装成功
✅ npm run build 通过
✅ Git仓库初始化
✅ 首次提交完成
⬜ 推送GitHub ← 你操作1（3分钟）
⬜ Vercel导入项目 ← 你操作2（3分钟）
⬜ 等待部署完成 ← 自动（2分钟）
```

---

## 🖱 操作1：推送代码到GitHub（3分钟）

### 步骤1.1：创建GitHub账号（如已有则跳过）

打开 https://github.com → **Sign up** → 用邮箱注册 → 验证邮箱

### 步骤1.2：创建新仓库

打开 https://github.com/new ，填写：

- **Repository name**：`ai-xiaohongshu-tool`
- **Description**：`AI小红书爆款笔记工坊`
- **Public / Private**：选 **Public**（Vercel免费版需要公开仓库才能部署）
- ⚠️ **不要**勾选 Add a README file / .gitignore / license
- 点 **Create repository**

会跳转到一个提示页面，包含类似下面的命令（**复制你自己的**，URL里有你的GitHub用户名）：

```bash
git remote add origin https://github.com/你的用户名/ai-xiaohongshu-tool.git
git branch -M main
git push -u origin main
```

### 步骤1.3：推送代码

打开 **Git Bash**（或 PowerShell），执行：

```bash
cd "c:/Users/Admin/Desktop/x/AI小红书代写/tool"

git remote add origin https://github.com/你的用户名/ai-xiaohongshu-tool.git

git branch -M main

git push -u origin main
```

### 步骤1.4：登录认证

推送时会弹出窗口让你登录：

- **Username**：你的GitHub用户名
- **Password**：⚠️ **不是GitHub密码**，是 **Personal Access Token (PAT)**

#### 没PAT？30秒生成一个：

1. 打开 https://github.com/settings/tokens
2. 点 **Generate new token** → 选 **Generate new token (classic)**
3. Note（备注）：填 `vercel-deploy`
4. Expiration：选 `No expiration` 或 `90 days`
5. **勾选 `repo`** 这一项（其他不用勾）
6. 拉到最下面点 **Generate token**
7. **复制token**（形如 `ghp_xxxxxxxxxxxxxxxxxx`，只显示一次！）
8. 回到命令行，密码处粘贴这个token

看到类似下面的输出 = 成功：

```
Enumerating objects: 50, done.
Counting objects: 100% (50/50), done.
Writing objects: 100% (50/50), 450.00 KiB | 5.00 MiB/s, done.
Total 50 (delta 0), reused 0 (delta 0)
To https://github.com/你的用户名/ai-xiaohongshu-tool.git
 * [new branch]      main -> main
Branch 'main' set up to track remote branch 'main' from 'origin'.
```

✅ **操作1完成！**

---

## 🖱 操作2：在Vercel部署（3分钟）

### 步骤2.1：登录Vercel

打开 https://vercel.com → 点 **Sign Up** → 选 **Continue with GitHub** → 授权Vercel

### 步骤2.2：导入项目

进入 https://vercel.com/dashboard → 点右上角 **Add New… → Project**

在仓库列表找到 `ai-xiaohongshu-tool` → 点 **Import**

### 步骤2.3：配置项目（默认即可）

- **Project Name**：`ai-xiaohongshu-tool`（或改成你想要的）
- **Framework Preset**：自动识别为 `Next.js` ✅
- **Root Directory**：`.`（不用改）
- **Build Command**：`npm run build`（不用改）
- **Output Directory**：留空（Next.js自动）

**环境变量**：演示模式不需要任何Key，**这一屏先不加**，直接点 **Deploy**

### 步骤2.4：等待部署

- 第1次部署：2-3分钟（较慢）
- 后续部署：30秒-1分钟

看到 **🎉 Congratulations!** = 部署成功！

你的网站URL：
```
https://ai-xiaohongshu-tool-xxx.vercel.app
```
（xxx是随机字符串，也可以自己在 **Settings → Domains** 改）

✅ **操作2完成！**

---

## ✅ 验证部署

打开你的Vercel URL，检查：

```
□ 首页正常加载，粉红色主题
□ 顶部有黄色横幅："🎁 演示模式已启用"
□ /batch 页面：选择"美妆"+"种草" → 点生成 → 1秒返回5条爆款笔记
□ /single 页面：输入"粉底液" → 生成完整笔记
□ /pricing 页面：4档套餐显示
□ /manual-pay 页面：选套餐 + 输入优惠码
```

---

## 🎯 部署后的下一步

### 立刻做（30分钟）

1. **把网站URL记下来**：例如 `https://ai-xiaohongshu-tool.vercel.app`
2. **截图首页** + 录一段"AI生成5条爆款"的录屏（手机录屏即可，30秒）
3. **挂闲鱼商品**（用 [goods/全部话术库.md](../../goods/全部话术库.md)）：
   - 商品标题里加上你的网站链接
   - 详情页放案例截图

### 当晚做（2小时）

打开 [scripts/5行业爆款脚本库.md](../../scripts/5行业爆款脚本库.md)，挑5条：
- 改编成你自己的话术
- 发到你的小红书运营号
- 在简介里挂上你的Vercel链接

### 明日做（每天4小时）

按 [sop/完整运营SOP.md](../../sop/完整运营SOP.md) Week 1 Day 2-7 执行：
- 每天50条私信
- 每天1条朋友圈
- 每天5条小红书笔记

---

## 🆘 出问题怎么办

### 推送时认证失败
- 重新生成PAT（https://github.com/settings/tokens）
- 确保勾选了 `repo` 权限
- 密码栏粘贴PAT，不是GitHub密码

### Vercel找不到仓库
- 刷新Vercel项目导入页
- 检查仓库是 **Public**（私有仓库要Vercel Pro）

### 部署后是空白页
- Vercel → Deployments → 点失败的部署 → 看Build日志
- 99%是TypeScript报错

### 演示模式没启用
- 检查 `DEMO_MODE` 环境变量（如果设了 `false` 但没配DeepSeek Key就会报错）
- 演示模式下 `DEMO_MODE` 不需要设，默认就是演示模式

### 还有问题？
- 把错误截图 + Vercel日志贴给我
- 我帮你定位

---

## 💬 最后

**部署只是开始，不是结束。**

网站上线 ≠ 自动赚钱。

接下来的4周才是关键：
- Week 1：挂商品 + 发内容（每天3小时）
- Week 2：找客户 + 接第一单
- Week 3：交付 + 客户转介绍
- Week 4：涨价 + 规模化

**现在开始执行操作1（推GitHub）吧。10分钟后你的网站就上线了。** 🚀