#!/bin/bash  
  
# 安装所有依赖  
echo "开始安装全局依赖"
pnpm i

# 项目名称数组  
# projects=("h5-block-trade" "h5-bond-stock" "h5-ipo" "h5-magin-credit" "h5-magin-pubbusi" "h5-nation-debt" "h5-neeq" "h5-ofund" "h5-pubbusi" "h5-stock-hk")
projects=("h5-module-1")

# 遍历项目数组并执行构建
for project in "${projects[@]}"; do  
    echo "正在处理项目: $project"  
    cd "$project" || exit  # 切换到项目目录，如果失败则退出脚本  

    npm run build &      # 执行构建命令 

    cd ..                 # 返回上一级目录  
done  
    
# 等待所有后台进程完成
wait

echo "所有项目已打包完成！"