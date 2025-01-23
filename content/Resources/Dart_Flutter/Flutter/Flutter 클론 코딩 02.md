---
title: Flutter 클론 코딩 02
date: 2025-01-16 18:02
tags:
  - Flutter
---

Created at : 2025-01-16 18:02  
Auther: Soo.Y  

----
### 📝문제

![[Pasted image 20250116180353.png]]

- 앱은 아래와 같은 기능을 갖고있어야 합니다.
    
    > - 유저가 타이머의 시간(15, 20, 25, 30, 35)을 선택할 수 있어야 합니다.
    > - 유저가 타이머를 재설정 (리셋)할 수 있어야 합니다.
    > - 유저가 한 사이클을 완료한 횟수를 카운트해야 합니다.
    > - 유저가 4개의 사이클(1라운드)를 완료한 횟수를 카운트해야 합니다.
    > - 각 라운드가 끝나면 사용자가 5분간 휴식을 취할 수 있어야 합니다.
    
- 이번 과제에서 중요한 것은 뽀모도로 타이머를 직접 구현하는 부분입니다. 때문에 사이클의 횟수는 임의로 설정하셔도 됩니다.

### 코드

```dart
import 'package:flutter/material.dart';
import 'dart:async';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Pomotimer',
      theme: ThemeData(primarySwatch: Colors.red),
      home: const PomodoroTimer(),
    );
  }
}

class PomodoroTimer extends StatefulWidget {
  const PomodoroTimer({Key? key}) : super(key: key);

  @override
  _PomodoroTimerState createState() => _PomodoroTimerState();
}

class _PomodoroTimerState extends State<PomodoroTimer> {
  Timer? _timer;
  int _remainingSeconds = 25 * 60;

  final List<int> _timeOptions = [15, 20, 25, 30, 35];
  int _selectedTime = 25;

  bool _isRunning = false;
  bool _isBreak = false;

  int _cycleCount = 0; 
  int _roundCount = 0; 

  
  final int _breakTime = 5;

  @override
  void dispose() {
    _timer?.cancel();
    super.dispose();
  }

  // 타이머 시작
  void _startTimer() {
    _isRunning = true;
    _timer = Timer.periodic(const Duration(seconds: 1), (timer) {
      setState(() {
        if (_remainingSeconds > 0) {
          _remainingSeconds--;
        } else {
          // 타이머 끝난 경우
          _timerEndHandler();
        }
      });
    });
  }

  // 타이머 일시정지
  void _pauseTimer() {
    _isRunning = false;
    _timer?.cancel();
    setState(() {});
  }

  // 타이머 리셋
  void _resetTimer() {
    _timer?.cancel();
    _isRunning = false;
    _isBreak = false;
    // 초기값은 _selectedTime에 따라 분 설정
    _remainingSeconds = _selectedTime * 60;
    setState(() {});
  }

  // 타이머 종료 시 처리
  void _timerEndHandler() {
    _timer?.cancel();
    _isRunning = false;

    if (_isBreak) {
      // 휴식 타이머가 끝난 경우
      _isBreak = false;
      _resetTimer();
    } else {
      // 작업 타이머가 끝난 경우
      _cycleCount++;
      // 사이클이 4개가 되면 라운드 1 증가
      if (_cycleCount % 4 == 0) {
        _roundCount++;
      }
      // 휴식 시작
      _startBreak();
    }
    setState(() {});
  }

  // 휴식 타이머 시작
  void _startBreak() {
    _isBreak = true;
    _remainingSeconds = _breakTime * 60;
    _startTimer();
  }

  // 분:초 형태로 변환
  String _formatTime(int totalSeconds) {
    final int minutes = totalSeconds ~/ 60;
    final int seconds = totalSeconds % 60;
    final String minutesStr = minutes.toString().padLeft(2, '0');
    final String secondsStr = seconds.toString().padLeft(2, '0');
    return '$minutesStr:$secondsStr';
  }

  // 사용자 선택 시간 변경
  void _changeTimeOption(int newTime) {
    // 타이머 동작 중이면 변경 불가하도록 할 수도 있으나,
    // 예제에서는 간단히 리셋 후 변경 처리
    _pauseTimer();
    _selectedTime = newTime;
    _resetTimer();
  }

  @override
  Widget build(BuildContext context) {
    // 전체 테마 컬러
    const Color mainColor = Color(0xFFFF5A5F);

    return Scaffold(
      backgroundColor: mainColor,
      body: SafeArea(
        child: SingleChildScrollView(
          child: Center(
            child: Padding(
              padding: const EdgeInsets.symmetric(vertical: 16.0, horizontal: 8.0),
              child: Column(
                // 화면이 작을 때 넘치지 않도록 스크롤 가능하게
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  // 앱 타이틀
                  const Padding(
                    padding: EdgeInsets.only(bottom: 20),
                    child: Text(
                      'POMOTIMER',
                      style: TextStyle(
                        color: Colors.white,
                        fontSize: 22,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                  ),

                  // 남은 시간 표시 (분:초)
                  Text(
                    _formatTime(_remainingSeconds),
                    style: const TextStyle(
                      color: Colors.white,
                      fontSize: 60,
                      fontWeight: FontWeight.bold,
                    ),
                  ),

                  // 타이머 길이 선택
                  Padding(
                    padding: const EdgeInsets.symmetric(vertical: 20),
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: _timeOptions.map((time) {
                        return GestureDetector(
                          onTap: () => _changeTimeOption(time),
                          child: Container(
                            margin: const EdgeInsets.symmetric(horizontal: 5),
                            padding: const EdgeInsets.symmetric(
                                horizontal: 15, vertical: 8),
                            decoration: BoxDecoration(
                              color: _selectedTime == time
                                  ? Colors.white.withAlpha((0.8 * 255).toInt())
                                  : Colors.white.withAlpha((0.3 * 255).toInt()),
                              borderRadius: BorderRadius.circular(5),
                            ),
                            child: Text(
                              '$time',
                              style: TextStyle(
                                color: Colors.red.shade700,
                                fontSize: 16,
                                fontWeight: FontWeight.bold,
                              ),
                            ),
                          ),
                        );
                      }).toList(),
                    ),
                  ),

                  // 시작/일시정지 버튼
                  IconButton(
                    iconSize: 70,
                    color: Colors.white,
                    icon: Icon(_isRunning
                        ? Icons.pause_circle_filled
                        : Icons.play_circle_fill),
                    onPressed: () {
                      if (_isRunning) {
                        _pauseTimer();
                      } else {
                        _startTimer();
                      }
                    },
                  ),

                  const SizedBox(height: 20),
                  ElevatedButton(
                    style: ElevatedButton.styleFrom(
                      backgroundColor: Colors.white.withAlpha((0.9 * 255).toInt()),
                    ),
                    onPressed: _resetTimer,
                    child: Text(
                      'RESET',
                      style: TextStyle(
                        color: Colors.red.shade700,
                        fontSize: 18,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                  ),

                  const SizedBox(height: 40),

                  // 하단에 사이클 / 라운드 진행 현황 표시
                  Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      Column(
                        children: [
                          Text(
                            '${_cycleCount % 4}/4',
                            style: const TextStyle(
                              color: Colors.white,
                              fontSize: 22,
                            ),
                          ),
                          const Text(
                            'ROUND',
                            style: TextStyle(
                              color: Colors.white70,
                              fontSize: 14,
                            ),
                          ),
                        ],
                      ),
                      const SizedBox(width: 40),
                      Column(
                        children: [
                          Text(
                            '$_roundCount/12',
                            style: const TextStyle(
                              color: Colors.white,
                              fontSize: 22,
                            ),
                          ),
                          const Text(
                            'GOAL',
                            style: TextStyle(
                              color: Colors.white70,
                              fontSize: 14,
                            ),
                          ),
                        ],
                      ),
                    ],
                  ),
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }
}

```

### TA의 정답 해설

- 각 MinButton은 SingleChildScrollView 위에서 수평으로 스크롤 됩니다.
- 반복되는 MinButton 을 List.generate 를 활용하여 5분 간격으로 생성되게 하였습니다.
- TimeTile의 경우 Stack, Positioned, Opacity 의 조합으로 카드가 쌓인 효과를 만들었습니다.
- 재생 버튼을 누르는 순간 countDown 함수가 실행되고 0.001 초 에 한 번씩 아래 로직을 반복합니다.
    - 1초 감소
    - 0초가 된 경우 지정된 시간으로 reset
    - break 모드와 round 모드 변경
    - round 모드였던 경우 round 와 goal 을 갱신
    - 재생여부 false 설정
    - 재생중이고 시간이 남았는지 여부에 따라 루프 종료
- StatefullWidget 을 만들고 각 state 의 변화에 따라 루프를 반복하고 위젯을 다시 렌더링 하는 연습을 할 수 있는 과제였습니다.

#### main.dart

```dart
import 'package:flutter/material.dart';
import 'package:pomodoro/views/pomodoro.dart';

void main() {
  runApp(const App());
}

class App extends StatelessWidget {
  const App({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Pomodoro',
      theme: ThemeData(
        primaryColor: Colors.green[200],
      ),
      home: const Pomodoro(),
    );
  }
}
```

#### views/pomodoro.dart

```dart
import 'package:flutter/material.dart';
import 'package:pomodoro/widgets/min_button.dart';

import '../widgets/time_tile.dart';

class Pomodoro extends StatefulWidget {
  const Pomodoro({Key? key}) : super(key: key);

  @override
  State<Pomodoro> createState() => _PomodoroState();
}

class _PomodoroState extends State<Pomodoro> {
  static final List<int> mins = List.generate(7, (i) => 5 + i * 5).toList();
  static const _initMin = 15;
  int targetMin = _initMin;
  int sec = _initMin * 60;
  bool playing = false;
  bool isBreak = false;
  int round = 1;
  int goal = 0;

  void countDown() {
    Future.doWhile(() async {
      await Future.delayed(const Duration(milliseconds: 1));
      setState(() {
        sec = sec - 1;
      });

      if (sec == 0) {
        sec = isBreak ? targetMin * 60 : 5 * 60;
        isBreak = !isBreak;
        setRoundGoal();
        playing = false;
        setState(() {});

        return false;
      }

      return playing && sec > 0;
    });
  }

  void setRoundGoal() {
    if (isBreak) {
      return;
    }

    if (round >= 4) {
      round = 1;
      goal++;
    } else {
      round++;
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: isBreak ? Colors.purple : Theme.of(context).primaryColor,
      appBar: AppBar(
        elevation: 0,
        backgroundColor:
            isBreak ? Colors.purple : Theme.of(context).primaryColor,
        title: Row(
          mainAxisAlignment: MainAxisAlignment.start,
          children: const [
            Text(
              'Minchodoro',
              textAlign: TextAlign.start,
              style: TextStyle(
                fontWeight: FontWeight.bold,
              ),
            ),
          ],
        ),
      ),
      body: Column(
        mainAxisAlignment: MainAxisAlignment.spaceAround,
        children: [
          isBreak
              ? Text(
                  'Break till bored',
                  style: TextStyle(
                    fontSize: 24,
                    fontWeight: FontWeight.bold,
                    color: Theme.of(context).primaryColor,
                  ),
                )
              : const Text(
                  'Work till die',
                  style: TextStyle(
                    fontSize: 24,
                    fontWeight: FontWeight.bold,
                    color: Colors.purple,
                  ),
                ),
          Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              TimeTile(
                time: (sec / 60).floor(),
              ),
              const Text(
                ':',
                style: TextStyle(
                  color: Colors.white,
                  fontSize: 32,
                ),
              ),
              TimeTile(time: sec % 60)
            ],
          ),
          SingleChildScrollView(
            scrollDirection: Axis.horizontal,
            child: Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                for (var min in mins)
                  MinButton(
                    min: min,
                    selected: min == targetMin,
                    onPressed: () => setState(() {
                      targetMin = min;
                      sec = min * 60;
                    }),
                  )
              ],
            ),
          ),
          Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              InkWell(
                onTap: () => setState(() {
                  playing = !playing;
                  if (playing) {
                    countDown();
                  }
                }),
                child: Container(
                  width: 64,
                  height: 64,
                  decoration: BoxDecoration(
                    shape: BoxShape.circle,
                    color: Colors.grey.shade700,
                  ),
                  child: Icon(
                    playing ? Icons.pause : Icons.play_arrow,
                    color: Colors.white,
                    size: 48,
                  ),
                ),
              ),
              const SizedBox(width: 20),
              InkWell(
                onTap: () => setState(() {
                  playing = false;
                  sec = targetMin * 60;
                }),
                child: Container(
                  width: 64,
                  height: 64,
                  decoration: BoxDecoration(
                    shape: BoxShape.circle,
                    color: Colors.grey.shade700,
                  ),
                  child: const Icon(
                    Icons.replay,
                    color: Colors.white,
                    size: 48,
                  ),
                ),
              ),
            ],
          ),
          Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Text('Round: $round/4'),
              const SizedBox(width: 20),
              Text('Goal: $goal/12'),
            ],
          ),
        ],
      ),
    );
  }
}
```

#### widgets/min_buttion.dart

```dart
import 'package:flutter/material.dart';

class MinButton extends StatelessWidget {
  final int min;
  final bool selected;
  final VoidCallback onPressed;

  const MinButton({
    Key? key,
    required this.min,
    required this.selected,
    required this.onPressed,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: const EdgeInsets.symmetric(horizontal: 4),
      child: TextButton(
        onPressed: onPressed,
        style: TextButton.styleFrom(
          fixedSize: const Size(84, 48),
          backgroundColor: selected ? Colors.white : Colors.transparent,
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(8),
            side: BorderSide(
              width: 1,
              color: Colors.grey.shade700,
            ),
          ),
        ),
        child: Text(
          min < 10 ? "0${min.toString()}" : min.toString(),
          style: TextStyle(
            color: selected ? Colors.black : Colors.white,
          ),
        ),
      ),
    );
  }
}
```


#### widgets/time_title.dart

```dart
import 'package:flutter/material.dart';

class TimeTile extends StatelessWidget {
  final int time;

  const TimeTile({
    Key? key,
    required this.time,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Stack(
      clipBehavior: Clip.none,
      children: [
        Positioned.fill(
          top: -20,
          child: Container(
            margin: const EdgeInsets.symmetric(horizontal: 4),
            decoration: BoxDecoration(
              color: Colors.white.withOpacity(0.2),
              borderRadius: BorderRadius.circular(8),
            ),
          ),
        ),
        Positioned.fill(
          top: -15,
          child: Container(
            margin: const EdgeInsets.symmetric(horizontal: 3),
            decoration: BoxDecoration(
              color: Colors.white.withOpacity(0.3),
              borderRadius: BorderRadius.circular(8),
            ),
          ),
        ),
        Positioned.fill(
          top: -10,
          child: Container(
            margin: const EdgeInsets.symmetric(horizontal: 2),
            decoration: BoxDecoration(
              color: Colors.white.withOpacity(0.4),
              borderRadius: BorderRadius.circular(8),
            ),
          ),
        ),
        Positioned.fill(
          top: -5,
          child: Container(
            margin: const EdgeInsets.symmetric(horizontal: 1),
            decoration: BoxDecoration(
              color: Colors.white.withOpacity(0.5),
              borderRadius: BorderRadius.circular(8),
            ),
          ),
        ),
        Container(
          decoration: BoxDecoration(
            color: Colors.white,
            borderRadius: BorderRadius.circular(8),
          ),
          padding: const EdgeInsets.all(48),
          child: Text(
            time < 10 ? "0${time.toString()}" : time.toString(),
            style: const TextStyle(fontSize: 48, color: Colors.purple),
          ),
        )
      ],
    );
  }
}
```

----
### 📜출처(참고 문헌)  


----
### 🔗연결 문서


