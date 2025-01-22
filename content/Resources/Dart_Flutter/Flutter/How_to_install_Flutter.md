---
title: How to install Flutter
date: 2025-01-15 09:14
tags:
  - Flutter
---

Created at : 2025-01-15 09:14  
Auther: Soo.Y  

----
### 📝메모 

### How to install Flutter

In Windows, you can use `choco`.

You don't need to install SDK. Just use `choco`.

Enter the this site : [chocolatey install docs](https://chocolatey.org/install#individual)
You can read all of steps. 

**Install Chocolatey for Individual Use**  
  
1. Open the power shell in administative.
2. `Get-ExecutionPolicy`
3. If `Restricted` then `Set-ExecutionPolicy AllSigned`
4. run below :  

```bash
Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))
```

Finally, you can install `flutter`

```bash
choco install flutter
```

If you want upgrade Dark or Fluter, you can command this.

```bash
choco upgrade flutter
```

```bash
choco upgrade dart-sdk
```

Ref. you can find packages. [https://community.chocolatey.org/packages](https://community.chocolatey.org/packages)

There's one more thing to check using `flutter doctor`

`flutter doctor` can check if it is an environment where the fultter can be developed.

If the following error occurs, additional setting is required.
```bash
Android toolchain - develop for Android devices     
✗ Unable to locate Android SDK.       
Install Android Studio from: https://developer.android.com/studio/index.html       
On first launch it will assist you in installing the Android SDK components.       
(or visit https://flutter.dev/docs/get-started/install/macos#android-setup for detailed instructions).       
If the Android SDK has been installed to a custom location, please use `flutter config --android-sdk` to update to that location.
```

**Android toolchain - develop for Android devices**  

You need to install those below in Android Studio :
Android SDK Command-line Tools (latest)
Android SDK Tools (Obsolete)

![](../.gitbook/assets/android_01.png)

then,

```bash
flutter doctor --android-licenses
```

Enter and all of "Yes".

Finish.

### issue 1

관리자 권한으로 실행하지 않고 powershell에서 flutter 실행하는데 `Error: Unable to find git in your PATH`이라는 에러가 계속 발생하면 git을 제대로 설치하라는 뜻으로 설명하던데 나 같은 경우는 git도 제대로 설치되어 있기 때문에 전혀 다른 문제였다.
결국 관리자 권한으로 실행한 powershell에서 아래 명령어를 입력해주면 그 다음부터 일반적인 powershell에서도 `flutter`를 실행할 수 있다.

```bash
git config --global --add safe.directory '*'
```

### issue 2

Flutter version이 낮다고 하는 경고가 있다. 그래서 Android Studio를 실행하면 Flutter와 관련된 패키지를 설치하지 못하는 상황이 발생한다. 이를 해결하려면 Flutter를 최신 버전으로 업그레이드 하면 된다. 명령어는 아래와 같다.

```bash
flutter upgrade
```

### issue 3

안드로이드로 개발한 어플리케이션을 실행하면 계속 빌드가 안되는 에러가 나왔다. 이럴 때 나의 경우는 gradle 버전과 jdk 버전이 서로 호환이 안되어서 발생한 에러이다.
아래 명령어를 사용해서 `Incompatible` 이 있는지 확인하자 
```base
flutter analyze --suggestions
```

`Incompatiable` 이 있다면 gradle 버전에 맞추어서 java jdk 버전을 설정해주면 된다.

윈도우 유저라서 `choco` 를 사용해서 openjdk를 설치하고 경로도 설정하면 될듯해서 시도해보았다.

issue 4을 참고하기! 결국 해결함

  

### issue 4
  

> **[Notice]**  

안드로이드 스튜디오를 설치하면 JDK와 gradle은 자동으로 내장된 버전으로 설치된다. 굳이 미리 JDK와 gradle을 미리 설치할 필요가 없다. 혹시 사전에 설치한 버전 때문에 문제가 된다면 아래 해결 방법이 도움이 될 수가 있다.  

**[이슈 내용]** JDK 버전과 gradle 버전 이슈이고 flutter에서 경로 설정에 문제가 있어서 해결한 내용이다.

현재 안드로이드 스튜디오 버전 2024.1.12을 기준으로는 gradle이 8.3으로 설치된다. 나는 여기서 flutter jdk 경로를 사전에 입력해 버려서 jdk 버전을 찾아 볼 수 없었다.

JDK는 OpenJDK도 있으나, 아마존에서 제공하는 JDK로 설치했다. (난 OpenJDK도 시도했으나, 안되어서 바꿔본 케이스이다.)

gradle 8.3에는 JDK 17이 적합하다고 flutter 공식 사이트에서 본 것을 기반으로 설치하였다.(그전에는 JDK 22이였는데 이게 문제였던거 같다.)
  

```bash
choco install corretto17jdk
```


만약 JDK 경로가 자동으로 설정이 안되어서 못 찾는다면 `flutter config --list`을 사용해서 경로를 확인하고 설정이 안되어 있다면 `flutter config --jdk-dir`을 사용해서 설정하면 된다.

```bash
# 경로 찾기
flutter config --list
```

  

```bash
# 경로 설정
flutter cofing --jdk-dir="JDK 경로"
```


나는 `JDK 17(아마존) + gradle 8.3 + Android studio 2024.1.12` 조합으로 설치에 성공했다.


잘 되었는지 확인하는 방법은 Android studio에서 에뮬레이터(web 제외)를 실행해봐서 정상적으로 실행이 되는지 확인해보면 된다.


----
### 📜출처(참고 문헌)  

Ref. link [Start building Flutter Android apps on Windows](https://docs.flutter.dev/get-started/install/windows/mobile)

[stackoverflow issue](https://stackoverflow.com/questions/76123807/my-projects-gradle-version-is-incompatible-with-the-java-version-that-flutter-i)

----
### 🔗연결 문서


