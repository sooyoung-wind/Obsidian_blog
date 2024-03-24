---
title: slack의 slash commands 권한 설정
date: 2024-03-24 21:23
tags:
---

Created at : 2024-03-24 21:23  
Auther: Soo.Y  

# slack의 slash commands 권한 설정

slack에서 사용하는 commend slash의 기능을 구현한 후에 권한 설정에 대해서 설명하고자 한다.
아래 그림과 같이 Slash commands의 메뉴를 들어가면 "Create New Command"를 눌러서 Command를 추가할 수 있다.

![[Pasted image 20240324212610.png]]

Command에 사용하고자 하는 명령어를 "/"를 포함해서 작성하고 Request URL에 사용하고 있는 URL를 입력하면 된다. "/slack/setting" 구현한 API 라우터에 따라서 달라진다. 

![[Pasted image 20240324213203.png]]

Slash Command의 반응을 버튼 식으로 구현할 경우 "Interactivity"를 사용할 수 있도록 입력해줘야 한다. 여기서도 사용하고 있는 URL과 그에 따른 라우터 경로를 추가해서 입력해주면 Command에 의한 버튼까지 권한 설정이 완료된다.

![[Pasted image 20240324214143.png]]

# 관련 문서

[[Slack_bot]]
