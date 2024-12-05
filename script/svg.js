const sharp = require('sharp');
const fs = require('fs');
const path = require('path');
const axios = require('axios');

const sizes = [
  { 
    name: '饼干', 
    width: 52, 
    height: 52, 
    svgUrl: 'https://api.iconify.design/noto:cookie.svg'
  },
  { 
    name: '甜甜圈', 
    width: 80, 
    height: 80, 
    svgUrl: 'https://api.iconify.design/noto:doughnut.svg'
  },
  { 
    name: '汉堡', 
    width: 108, 
    height: 108, 
    svgUrl: 'https://api.iconify.design/noto:hamburger.svg'
  },
  { 
    name: '披萨', 
    width: 119, 
    height: 119, 
    svgUrl: 'https://api.iconify.design/noto:pizza.svg'
  },
  { 
    name: '炸鸡', 
    width: 153, 
    height: 152, 
    svgUrl: 'https://api.iconify.design/noto:poultry-leg.svg'
  },
  { 
    name: '火锅', 
    width: 183, 
    height: 183, 
    svgUrl: 'https://api.iconify.design/noto:steaming-bowl.svg'
  },
  { 
    name: '寿司', 
    width: 193, 
    height: 193, 
    svgUrl: 'https://api.iconify.design/noto:sushi.svg'
  },
  { 
    name: '烤肉', 
    width: 258, 
    height: 258, 
    svgUrl: 'https://api.iconify.design/noto:cut-of-meat.svg'
  },
  { 
    name: '大餐', 
    width: 308, 
    height: 308, 
    svgUrl: 'https://api.iconify.design/noto:shallow-pan-of-food.svg'
  },
  { 
    name: '自助餐', 
    width: 308, 
    height: 309, 
    svgUrl: 'https://api.iconify.design/noto:pot-of-food.svg'
  },
  { 
    name: '吃成胖子', 
    width: 408, 
    height: 408, 
    svgUrl: 'https://api.iconify.design/noto:stuffed-flatbread.svg'
  }
];

async function generateFruitIcon(size, outputPath) {
  try {
    const response = await axios({
      url: size.svgUrl,
      method: 'GET',
      responseType: 'arraybuffer'
    });

    await sharp(response.data)
      .resize(size.width, size.height)
      .png()
      .toFile(outputPath);
    
    console.log(`生成成功: ${outputPath}`);
  } catch (error) {
    console.error(`处理 ${size.name} 时出错:`, error);
  }
}

async function generateAllIcons() {
  try {
    const outputDir = path.join(__dirname, './images/output/fruits');

    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    for (const size of sizes) {
      const outputPath = path.join(outputDir, `${size.width}x${size.height}.png`);
      await generateFruitIcon(size, outputPath);
    }

    console.log('所有图标生成完成');
  } catch (error) {
    console.error('生成过程中出错:', error);
  }
}

generateAllIcons(); 
