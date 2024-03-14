---
title: Slack bot 정식 등록(배포)에 관하여
date: 2024-03-14 01:24
tags:
  - environment
  - platform
---

Created at : 2024-03-14 01:24  
Auther: Soo.Y  

# 슬랙 봇 배포

## Single-Workspace apps
단일 워크스페이스에 봇을 등록하는 방법은 아래와 같이 간단합니다.
1. 슬랙 봇 생성([홈페이지 slack api 참고](https://api.slack.com/apps))
2. 원하는 단일 워크스페이스를 선택해서 설치를 한다.
3. Slack API를 호출 할 수 있는 토큰을 생성한다.
4. Single-Workspace app은 다른 워크스페이스에 배포를 할 수 없다.
	- 단, 다른 사용자를 대신해 어떤 액션을 취해야 한다면 [build an OAuth 2.0 flow](https://api.slack.com/authentication/oauth-v2)이 필요하다.

# 공식 배포
기본적으로 슬랙 봇은 봇이 새로 생성할 때 연결된 워크스페이스에만 설치될 수 있다. 
다른 워크스페이스에도 설치를 하고 싶다면 [OAuth 2.0 flow](https://api.slack.com/authentication/oauth-v2)를 구현해야 한다. **OAuth 2.0은 각 워크스페이스에 마다 토큰을 생성해주는 역할을 합니다.**  슬랙 봇이 다른 워크스페이스에서도 설치되어 사용할 수 있는 가장 중요한 key point 중 하나입니다.

슬랙 봇이 자유자재로 권한을 다룰 수 있도록 [guide to using OAuth](https://api.slack.com/authentication)을 숙지하여 토큰 생성 및 권한 요청을 사용할 수 있어야 합니다.

### 추가적인 보안 사항


슬랙 앱은 반드시 아래 보안 사항을 모두 준수해야 합니다.
- [OAuth redirect URLs](https://api.slack.com/docs/oauth#redirect_urls)
- [Request URLs for interaction payloads](https://api.slack.com/interactivity/handling#payloads) from [interactive components](https://api.slack.com/block-kit/interactivity), [actions](https://api.slack.com/actions#enabling_components) and [slash commands](https://api.slack.com/slash-commands#app_command_handling)
- Block Kit interactive component [options load URLs](https://api.slack.com/reference/messaging/block-elements#external-select)
- [Events API request URLs](https://api.slack.com/events-api#events_api_request_urls)

# App Directory를 통한 배포

## 사전 요구 사항
앱을 제출하기 전에 사전에 요구 사항을 요구하고 있습니다. 그 중에 중요한 몇 가지를 설명하고자 합니다.
1. 앱이 사전에 서로 다른 워크스페이스(**최소 10개**)에 설치되어야 하고 고객 또는 초기 파트너에 의해 피드백을 받는 테스트를 수행해야 한다고 합니다. 여기서 워크스페이스는 최소 28일 동안 활성화된 워크스페이스를 말하고 있습니다.
2. 앱이 아직 테스트 중이거나 개발 중이거나 완전히 테스트가 수행되지 않았다면 제출하지 말라고 언급하고 있습니다. 버그가 없고 완벽하게 설치부터 제거까지 꼼꼼하게 검토를 한 다음에 제출하라고 강조하고 있습니다.
> 가장 재미있는 점은 **"You've tested, tested, tested!"** 라고 작성되어 있을 정도로 제발 테스트 좀 하고 제출하라는 뉘앙스가 보였습니다. 

[[Slack_bot#^추가적인 보안 사항 |위에서 언급한 추가적인 보안 사항]]을 당연히 포함하고 있어야 합니다!

## App Directory에 등록 불가능한 케이스

슬랙에서 몇 가지 App Directory에 등록이 불가능한 케이스를 설명해줍니다.

Some apps are unsuitable for the Directory, including apps that:
- **export or backup message data.**(메세지를 저장하면 안되네요)
- are built for the sole purpose of searching Slack messages outside Slack.
- use legacy/restricted scopes or methods, scopes that provide extensive access to workspace data, or workflow automations scopes (e.g. `admin.*`, `identity.*`, `search:read`, user token `*:history`, `workflow.steps:execute`, `triggers:*`).
- allow possibly destructive behavior (e.g. deleting files).
- embed Slack into another site.
- only use [Sign in with Slack](https://api.slack.com/docs/sign-in-with-slack) functionality.
- replicate Slack client functionality, or are third-party Slack clients.
- request large number of scopes for simple, non-work related functionality.
- share sensitive information in Slack.
- circumvent admin features in Slack.
- does not provide any functionality we deem to be valuable in Slack.
- enable remote execution on a server via a downloadable third party script e.g terminal commands from Slack.
- facilitate the sharing of third party service accounts between multiple users.
- **are installed on less than 10 active workspaces.** An active workspace is a workspace that has been used in the past 28 days.(10개 이하의 설치)
- are in private beta, still being built, or have not been fully tested.
- enable financial transactions, including cryptocurrency transactions, or the minting or transfer of NFTs in Slack.
- **use Slack data to train Large Language Models (LLMs).**(슬랙 data로 LLM 학습 불가능)
- perform sentiment analysis/insight generation, unless the insights/analysis provide very clear value to customers, are limited to an aggregate level, and it is clear how they are determined.

# [Redirect URLs](https://api.slack.com/authentication/oauth-v2) 배포 방식

아래 3가지 절차를 통해서 token를 전달 받는다. 자세한 내용은 공식 문서에 작성되어 있습니다.
1. [Asking for scopes](https://api.slack.com/authentication/oauth-v2#asking).(권한 요청 : App --> User)
2. [Waiting for a user to approve your requested scopes](https://api.slack.com/authentication/oauth-v2#waiting).(권한 승인 : User --> App)
3. [Exchanging a temporary authorization code for an access token](https://api.slack.com/authentication/oauth-v2#exchanging).(토큰으로 교환 : App --> Service API)
4. 토큰 저장 및 관리([safely storing credentials](https://api.slack.com/authentication/best-practices)) **보안 필수!!!**

![[Pasted image 20240314153915.png]]

# 배포 방식(요약)
1. 정식으로 App Directory에 등록하는 방법
	- 가장 어렵고 따로 슬랙 기술팀으로부터 검토를 받아야 함으로 슬랙에서 요구하고 있는 모든 사항들을 만족해야 합니다.
2. Redirect URLs를 사용해서 배포
	- Redirect URLs를 통해서 배포하는 경우에는 [OAuth 2.0](https://oauth.net/2/)을 사용해야 한다.
즉, 최소한 불특정 다수에게 배포하고 싶으면 [OAuth 2.0](https://oauth.net/2/)에 대한 적용이 필요합니다.

# [Redirect URLs](https://api.slack.com/authentication/oauth-v2)를 사용해서 배포하는 사례 조사

## Docswave 
Docswave의 내용은 생략합니다. Docswave 홈페이지에서 로그인 후에 계정 설정에서 slack bot에 연동을 시작하면 슬랙의 워크스페이스로 권한 요청이 들어옵니다. 들어온 권한 요청을 수락할 경우 해당 워크스페이스에 slack bot이 설치가 됩니다. 이 후에는 slack bot이 제공하는 기능을 사용할 수 있습니다.

![[Pasted image 20240314013311.png]]

권한 요청 화면 
![[Pasted image 20240314013328.png]]

Redirect URLs를 통해서 배포를 하는 경우에는 Slack 공식 앱으로 등록이 된 것이 아니기 때문에 승인되지 않았다고 경고문이 나옵니다. 그리고 공식 앱으로 등록된 앱이 아니므로 Apps Directory에서 검색도 안되므로 제공되는 Redirect URLs로만 설치가 가능합니다.(슬랙 프로그램을 통해서 설치 불가능)
![[Pasted image 20240314013336.png]]

앱 응답 결과물  
![[Pasted image 20240314013345.png]]


## WandB 

WandB(Weights & Biases)에서도 정식으로 등록하지 않고 오직 WandB 홈페이지를 통해서 슬랙 봇을 설치할 수 있습니다. 

![[Pasted image 20240314150219.png]]

Wandb 설정 창
![[Pasted image 20240314153224.png]]

# 프로젝트 진행 방향
근본적으로 Redirect URLs(OAuth 2.0)을 적용하지 않으면 배포는 사실상 불가능하다고 판단되고 이 기능을 반드시 추가해야 함을 확인했습니다. 이를 적용하기 전까지는 최악의 방법이지만 수동으로 각 워크스페이스별로 토큰을 전달 받고 app 패키지를 독립적으로 실행하도록 서버를 구축해야 하는 단점이 있습니다.
따라서 Redirect URLs까지만 구현하고 고객 또는 테스터 모집을 통해 피드백 및 테스트를 거치고 그 뒤에 App Directory 등록 필요성을 다시 검토하면 좋겠습니다.

# 관련 문서


