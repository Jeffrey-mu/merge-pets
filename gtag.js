// 创建并添加Google Analytics脚本
function loadGoogleAnalytics() {
    // 添加主要的gtag.js脚本
    const script1 = document.createElement('script');
    script1.async = true;
    script1.src = 'https://www.googletagmanager.com/gtag/js?id=G-83H4QE97KL';
    document.head.appendChild(script1);

    // 添加配置脚本
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-83H4QE97KL');
}

// 页面加载时初始化Google Analytics
document.addEventListener('DOMContentLoaded', loadGoogleAnalytics); 
