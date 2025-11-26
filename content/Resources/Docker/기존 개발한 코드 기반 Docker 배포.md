---
title: 기존 개발한 코드 기반 Docker 배포
date: 2025-11-09 19:04
tags:
  - environment
  - docker
  - 가짜연구소
---

Created at : 2025-11-09 19:04  
Auther: Soo.Y  

----
### 📝메모 

[이번 내용에서 사용된 github 링크](https://github.com/sooyoung-wind/Fork-agent-chat-ui)

#### 1. Dockerfile 작성

```bash
# Node.js 기반 빌드
FROM node:18-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# 실제 실행 환경
FROM node:18-alpine

WORKDIR /app
COPY --from=builder /app ./

EXPOSE 3000
CMD ["npm", "start"]
```


```bash
# docker 이미지 생성
docker build -t your-dockerhub-username/agent-chat-ui-1:latest .

#docker hub 로그인
docker login

# 이미지 업로드
docker push your-dockerhub-username/agent-chat-ui-1:latest

# 이미지 다운로드
docker pull your-dockerhub-username/agent-chat-ui-1:latest
```

```bash
docker run -d -p 3000:3000 your-dockerhub-username/agent-chat-ui-1:latest
```

- `-d` : 백그라운드 실행
- `-p` : 포트 매핑 (호스트:컨테이너)

----
### 📜출처(참고 문헌)  


----
### 🔗연결 문서


