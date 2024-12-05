const fs = require('fs');
const path = require('path');

const sourceDir = '../xigua/custom';
const targetDir = '../images';

// 确保目标目录存在
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir);
}

// 遍历源目录下的所有主题文件夹
fs.readdirSync(sourceDir).forEach(theme => {
  const themePath = path.join(sourceDir, theme);
  
  // 检查是否是目录
  if (fs.statSync(themePath).isDirectory()) {
    // 查找308x309.png文件
    const sourcePath = path.join(themePath, '308x309.png');
    
    if (fs.existsSync(sourcePath)) {
      // 构建目标文件路径
      const targetPath = path.join(targetDir, `${theme}.png`);
      
      // 复制文件
      fs.copyFileSync(sourcePath, targetPath);
      console.log(`Copied ${sourcePath} to ${targetPath}`);
    } else {
      console.log(`Warning: ${sourcePath} does not exist`);
    }
  }
});



