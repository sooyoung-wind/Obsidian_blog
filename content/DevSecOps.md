---
title: DevSecOps
date: 2025-09-27 01:28
tags:
  - environment
  - platform
---

Created at : 2025-09-27 01:28  
Auther: Soo.Y  

----
### 📝메모 

|단계|핵심 개념|주요 목표|대표 도구/방법|보안 관점 (Sec)|
|---|---|---|---|---|
|1. **계획 (Plan)**|요구사항 정의, 설계|프로젝트 목표/기능 정의|Jira, Confluence, GitHub Projects|**보안 요구사항** 미리 정의|
|2. **코드 (Code)**|소스코드 작성|깨끗하고 협업 가능한 코드 작성|Git, VSCode, IntelliJ|정적 분석(SAST), 코드 리뷰|
|3. **빌드 (Build)**|코드 → 실행파일 변환|자동 빌드, 의존성 관리|Maven, Gradle, npm, Jenkins|취약한 라이브러리 검사 (SCA)|
|4. **테스트 (Test)**|기능/성능/보안 검증|자동화 테스트로 오류 조기 발견|JUnit, Selenium, PyTest|동적 분석(DAST), 취약점 스캐너|
|5. **릴리즈 (Release)**|배포 준비|안정적인 패키징|Docker, Helm, GitHub Actions|서명(Signing), 무결성 검증|
|6. **배포 (Deploy)**|운영 환경 반영|빠르고 안전한 배포|Kubernetes, ArgoCD, Spinnaker|권한 최소화, 보안 설정 체크|
|7. **운영 (Operate)**|실제 서비스 실행|안정적인 운영과 모니터링|Prometheus, Grafana, ELK|로그 모니터링, 보안 이벤트 감지|
|8. **모니터링 (Monitor)**|서비스 성능/보안 추적|장애/위협 빠른 탐지|Datadog, Splunk, New Relic|침입 탐지(IDS), SIEM, 알림|
|9. **피드백 (Feedback)**|지속 개선|문제를 다시 계획에 반영|사용자 피드백, DevOps Metrics|보안 사고 후 분석(Post-mortem)|

----
### 📜출처(참고 문헌)  


----
### 🔗연결 문서


