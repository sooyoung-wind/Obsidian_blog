---
title: Git bash setting
date: 2024-12-22 04:59
tags:
  - git
  - environment
  - langchain
---

Created at : 2024-12-22 04:59  
Auther: Soo.Y  

----
### 📝메모 

```bash
alias cd='cd ../'
alias 1='vi ~/.bashrc'
alias 2='. ~/.bashrc'

GREEN='\e[0;32m\]'
B_GREEN='\e[1;32m\]'
MAGENTA='\e[0;35m\]'
B_MAGENTA='\e[1;35m\]'
YELLOW='\e[0;33m\]'
B_YELLOW='\e[1;33m\]'
RED='\e[0;31m'
BLUE='\e[0;34m'
B_BLUE='\e[1;34m'
CYAN='\e[0;36m\]'
COLOR_END='\[\033[0m\]'

export PS1="${MAGENTA}\D{%Y-%m-%d(%a)} \
${B_YELLOW}\D{%T} \
${GREEN}\u \
${B_BLUE}\W \
${COLOR_END}\
\n\$ "
```

----
### 📜출처(참고 문헌)  


----
### 🔗연결 문서


