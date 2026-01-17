---
title: n8n + treafik install
date: 2026-01-07 21:42
tags:
---

Created at : 2026-01-07 21:42  
Auther: Soo.Y  

----
### 📝메모 

#### n8n install
##### nvm install
- n8n 설치를 위해서는 node.js가 필요함
- 다양한 node 버전을 관리해주는 매니저 툴이 nvm임
- 블로그 참조 : https://garve32.tistory.com/98

```bash
# 설치 가능한 node.js 버전 목록 
nvm ls-remote

# or

nvm list available
```

- 특정 node.js 버전 설치
```bash
nvm install v18.17.1
```

- 특정 node.js 버전으로 전환하기
```bash
nvm use 18.17.1
nvm alias default 18.17.1
```

##### n8n install
- npm을 사용해서 n8n을 설치함
```bash
npm -v
npm install -g n8n
```

#### Docker install
기존에 작성된 docker desktop install 참고하기
https://soo-blogs.gitbook.io/dify-and-open-webui/install/1

##### n8n이 사용하는 docker volume 생성

```bash
docker volume create n8n_data
```

#### 로컬 인증서(Windows 기준)

##### Chocolatey install
```bash
Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1’))
```

##### mkcert install
```bash
choco install mkcert
```

##### Create local CA
```bash
mkcert -install
```

##### 개발용 인증서 생성
- 프로젝트 루트 폴더에서 `certs` 풀더 생성
- 폴더 생성 후 프로젝트 루트 폴더에서 아래 명령어를 실행
```bash
mkcert -cert-file certs/server.crt -key-file certs/server.key "*.localhost" "localhost" "n8n.localhost"
```

##### .env 파일 권한 설정
- 관리자 권한 PowerShell에서 아래 명령어를 실행하여 N8N_ENCRYPTION_KEY 생성
```bash
-join ((65..90) + (97..122) + (48..57) | Get-Random -Count 32 | % {[char]$_})
```


##### 인증서 추가하기
- `certlm.msc` 실행
![[Pasted image 20260107224721.png]]

- 신뢰할 수 있는 루트 인증 기관 클릭
- 인증서 폴더 우클릭
- 모든작업 -> 가져오기
- 위에서 만든 로컬 인증서 `server.crt`를 선택하기
- 완료하기 뜨면 인증서 추가 완료!

#### ngrok install
- 도메인을 설정해줄 ngrok 설치

```powershell
choco install ngrok -y
```


- ngrok 사이트 접속 : https://ngrok.com/
- 로그인 하면 아래 화면에서 `ngrok config add.....` 부분을 
![[Pasted image 20260107225515.png]]

- 아래와 같이 실행
```powershell
ngrok http https://localhost:8443
```

- 나온 Forwarding 주소를 적용한다.
	- `.env`
		- DOMAIN
		- N8N_HOST
		- WEBHOOK_URL
	- `dynamic.yml`
		- accessControlAllowOriginList

#### n8n 실행하기

- 위의 작업이 잘 완료했다면, n8n docker-compose.yaml 파일이 있는 폴더로 이동해서 `docker compose up -d`을 실행해서 n8n을 실행하자

- docker 실행 확인하기
	- `docker compose ps`

- docker log 확인하기
	- `docker compose logs traefik`
	- `docker compose logs n8n`

----
### 📜출처(참고 문헌)  


----
### 🔗연결 문서


