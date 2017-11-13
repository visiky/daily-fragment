# !/bin/bash
# Function: 复制模版
# 添加权限 chmod u+x copyTemplate.sh
# Usage: 
# 1: 复制到制定文件(参数2)到制定目录下(参数1-相对路径)
#    e.g. 进入到bin ./copyTemplate.sh ../chapter08 triple-spring.ts
# 2. 复制1到多份(参数2 - 可选 - 制定份数)模板到制定目录下(参数1-相对路径)
#    e.g. 进入到bin ./copyTemplate.sh ../chapter08 2

if [ $2 ];
then
expr $2 "+" 10 &> /dev/null  
if [ $? -eq 0 ];then  
i=0
while [ $i -lt $2 ]
do 
  # 注意加法的语法
  i=$((i + 1))
  filename="temp$i.ts"
  cp template.ts $filename
  mv $filename $1
done
else  
    cp template.ts $2
    mv $2 $1
fi
else
cp template.ts temp.ts
mv $2 $1
fi