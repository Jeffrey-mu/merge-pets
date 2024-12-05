const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const sizes = [
  { name: '葡萄', width: 52, height: 52 },
  { name: '樱桃', width: 80, height: 80 }, 
  { name: '橘子', width: 108, height: 108 },
  { name: '柠檬', width: 119, height: 119 },
  { name: '猕猴桃', width: 153, height: 152 },
  { name: '西红柿', width: 183, height: 183 },
  { name: '桃', width: 193, height: 193 },
  { name: '菠萝', width: 258, height: 258 },
  { name: '椰子', width: 308, height: 308 },
  { name: '西瓜', width: 308, height: 309 },
  { name: '大西瓜', width: 408, height: 408 }
];

async function resizeImage(inputPath, outputPath, width, height) {
  try {
    // 创建圆形遮罩
    const circleMask = Buffer.from(
      `<svg width="${width}" height="${height}">
        <circle 
          cx="${width/2}" 
          cy="${height/2}" 
          r="${width/2}"
          fill="white"
        />
      </svg>`
    );

    // 调整图片大小，移除了borderWidth
    const resizedImage = await sharp(inputPath)
      .resize(width, height, {
        fit: 'cover',
        position: 'center',
        background: { r: 255, g: 255, b: 255, alpha: 0 }
      })
      .toBuffer();

    // 创建最终图片
    await sharp({
      create: {
        width: width,
        height: height,
        channels: 4,
        background: { r: 255, g: 255, b: 255, alpha: 0 }
      }
    })
    .composite([
      {
        input: resizedImage,
        blend: 'over'
      },
      {
        input: circleMask,
        blend: 'dest-in'
      }
    ])
    .png()
    .toFile(outputPath);
    
    console.log(`处理成功: ${outputPath}`);
  } catch (error) {
    console.error('处理图片时出错:', error);
  }
}

async function processImages(dir) {
  try {
    const inputDir = path.join(__dirname, `./images/input/${dir}`);
    const outputDir = path.join(__dirname, `../xigua/custom/${dir}`);

    // 确保输出目录存在
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    // 获取所有图片文件
    const files = fs.readdirSync(inputDir)
      .filter(file => file.match(/\.(jpg|jpeg|png|gif)$/i));

    // 只处理前11张图片，每个尺寸一张
    for (let i = 0; i < Math.min(files.length, sizes.length); i++) {
      const file = files[i];
      const size = sizes[i];
      const inputPath = path.join(inputDir, file);
      const outputPath = path.join(outputDir, `${size.width}x${size.height}.png`);
      await resizeImage(inputPath, outputPath, size.width, size.height);
    }

    console.log('所有图片处理完成');
  } catch (error) {
    console.error('处理过程中出错:', error);
  }
}

processImages('ysx'); 
