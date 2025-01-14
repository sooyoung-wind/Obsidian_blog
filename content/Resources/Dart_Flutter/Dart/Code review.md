---
title: Code review
date: 2025-01-14 21:06
tags:
  - Dart
---

Created at : 2025-01-14 21:06  
Auther: Soo.Y  

----
### 📝메모 



### 내가 제출한 코드

```dart
typedef MyDictionary = Map<String, String>;

class myClass {
  MyDictionary myMap = {};

  void add(String term, String definition) => myMap[term] = definition;

  String? get(String term) {
    return myMap[term];
  }

  void delete(String term) => myMap.remove(term);

  void showAll() => myMap.forEach((term, definition) => print('${term}: ${definition}'));

  void count() => print('사전 단어 총 수 : ${myMap.length} 입니다.');

  void upsert(String term, String definition) => myMap[term] = definition;

  bool exists(String term) {
    return myMap.containsKey(term);
  }

  void bulkAdd(List<MyDictionary> words) {
    words.forEach((for_word) => myMap['${for_word['term']}'] = '${for_word['definition']}');
  }

  void bulkDelete(List<String> words) {
    words.forEach((for_word) => myMap.remove(for_word));
  }

}

void main() {

  myClass my_dict1 = myClass();
  print('=========단어 개별 입력==========');
  my_dict1.add('김치','맛있다.');
  my_dict1.add('아파트','비싸다.');
  my_dict1.add('Dart','어렵다.');

  my_dict1.showAll();
  my_dict1.count();
  print('=========김치 검색===========');
  print(my_dict1.get('김치'));
  print('=========김치 단어 업데이트===========');
  my_dict1.upsert('김치', '사랑해');
  my_dict1.showAll();
  print('=========단어 존재 여부 exists===========');
  print(my_dict1.exists('김치'));
  print('=========특정 단어 삭제===========');
  my_dict1.delete('김치');
  my_dict1.showAll();
  print('=========여러 단어 입력===========');
  my_dict1.bulkAdd([{"term":"김치", "definition":"대박이네~"}, {"term":"아파트", "definition":"비싸네~"}]);
  my_dict1.showAll();
  print('=========여러 단어 삭제===========');
  my_dict1.bulkDelete(["김치", "아파트"]);
  my_dict1.showAll();

}

```

### 공식 정답

```dart
class Word {
  final String term;
  final String definition;
  Word({
    required this.term,
    required this.definition,
  });
}

typedef WordsInput = List<Map<String, String>>;

class Dictionary {
  Map<String, Word> words = {};

  bool exists(String term) {
    return words.containsKey(term);
  }

  Word? get(String term) {
    return words[term];
  }

  void add(String term, String definition) {
    if (!exists(term)) {
      words[term] = Word(
        term: term,
        definition: definition,
      );
    }
  }

  void showAll() {
    print("----");
    words.forEach((key, value) {
      print("${value.term}: ${value.definition}\n");
    });
    print("----");
  }

  int count() {
    return words.length;
  }

  void update(String term, String definition) {
    if (exists(term)) {
      words[term] = Word(
        term: term,
        definition: definition,
      );
    }
  }

  void delete(String term) {
    if (exists(term)) {
      words.remove(term);
    }
  }

  void upsert(String term, String definition) {
    if (exists(term)) {
      update(term, definition);
    } else {
      add(term, definition);
    }
  }

  void bulkAdd(WordsInput words) {
    for (var word in words) {
      if (word.containsKey('term') && word.containsKey('definition')) {
        add(word["term"] ?? "", word["definition"] ?? "");
      }
    }
  }

  void bulkDelete(List<String> keys) {
    for (var key in keys) {
      delete(key);
    }
  }
}

void main() {
  var dictionary = Dictionary();

  dictionary.add("김치", "한국 음식");
  dictionary.showAll();

  // Count
  print(dictionary.count());

  // Update
  dictionary.update("김치", "밋있는 한국 음식!!!");
  print(dictionary.get("김치"));

  // Delete
  dictionary.delete("김치");
  print(dictionary.count());

  // Upsert
  dictionary.upsert("김치", "밋있는 한국 음식!!!");
  print(dictionary.get("김치"));
  dictionary.upsert("김치", "진짜 밋있는 한국 음식!!!");
  print(dictionary.get("김치"));

  // Exists
  print(dictionary.exists("김치"));

  // Bulk Add
  dictionary.bulkAdd([
    {"term": "A", "definition": "B"},
    {"term": "X", "definition": "Y"}
  ]);
  dictionary.showAll();

  // Bulk Delete
  dictionary.bulkDelete(["A", "X"]);
  dictionary.showAll();
}

```

### TA가 제공해준 정답

> TA 가 제시하는 솔루션  
class 는 속성과 동작을 하나의 템플릿으로 정의합니다. 이번 챌린지의 경우 Dictionary 는 words 를 속성으로 가지고 add, get.. 등과 같은 동작을 포함하고 있습니다.
typedef 는 Dart의 기본 type 을 사용자 정의의 이름으로 aliasing 해줍니다.
List 는 순서가 있는 항목들의 집합입니다. List는 다른 언어에서의 배열과 유사하며, 각 항목은 인덱스를 통해 접근할 수 있습니다. 인덱스는 0부터 시작합니다.
Map 은 키-값 쌍을 저장하는 데이터 구조입니다. 각 키는 고유해야 하며, 각 키는 하나의 값을 가리킵니다. 이러한 특성 때문에 Map은 빠르게 특정 값을 찾는 데 사용될 수 있습니다.
솔루션에서는 Dictionary 내 word 의 유니크함을 보장하기 위해 List 보다는 Map을 사용 하였습니다.
Map은 == 연산자로 비교할 경우 주소값을 비교하기 때문에 모든 key와 value 를 비교하는 메서드가 필요합니다. 이를 위해 equals 메서드를 Extension 으로 구현하여 체이닝 메서드 호출을 통해 사용성을 높였습니다.
해당 솔루션은 replit 에 편리하게 제출하기 위해서 하나의 파일에서 assert를 통해 테스트를 구현하였습니다. 실행을 위해서는 아래와 같이 추가 옵션을 주어야 합니다.
dart --enable-asserts main.dart
실제 개발 환경에서는 test 패키지 를 통해 유닛 및 통합 테스팅이 가능합니다.
틱톡 클론 30강 에서도 테스팅에 대해 자세히 배울 수 있습니다.



```dart
extension MapExtension<K, V> on Map<K, V> {
  bool equals(Map<K, V> other) {
    if (identical(this, other)) return true;
    if (length != other.length) return false;
    for (final key in keys) {
      if (!other.containsKey(key)) return false;
      if (other[key] != this[key]) return false;
    }

    return true;
  }
}

typedef Term = String;
typedef Definition = String;
typedef Words = Map<Term, Definition>;

class Dictionary {
  Words words;
  Dictionary(this.words);

  void add(Term term, Definition definition) {
    words[term] = definition;
  }

  Definition? get(Term term) {
    return words[term];
  }

  Definition? delete(Term term) {
    return words.remove(term);
  }

  Definition? update(Term term, Definition definition) {
    return words.update(term, (value) => definition);
  }

  Words showAll() {
    return words;
  }

  int count() {
    return words.length;
  }

  Definition? upsert(Term term, Definition definition) {
    if (words.containsKey(term)) {
      return this.update(term, definition);
    }

    this.add(term, definition);
    return null;
  }

  bool exists(Term term) {
    return words.containsKey(term);
  }

  void bulkAdd(Words words) {
    this.words.addAll(words);
  }

  void bulkDelete(List<Term> terms) {
    terms.forEach((term) => this.words.remove(term));
  }
}

main() {
  Dictionary dictionary = Dictionary({
    'Dart': 'A new programming language',
    'Flutter': 'A framework to build cross-platform apps'
  });

  dictionary.add('Android', 'A mobile operating system');
  assert(dictionary.count() == 3);

  Definition? actual = dictionary.get('Android');
  assert(actual == 'A mobile operating system');

  actual = dictionary.delete('Android');
  assert(actual == 'A mobile operating system');

  actual = dictionary.update('Dart', '3.0 is awesome');
  assert(actual == '3.0 is awesome');

  Words words = dictionary.showAll();
  assert(words.equals({
    'Dart': '3.0 is awesome',
    'Flutter': 'A framework to build cross-platform apps'
  }));

  int count = dictionary.count();
  assert(count == 2);

  Definition? updated = dictionary.upsert('Dart', 'flirting language');
  assert(updated == 'flirting language');

  Definition? inserted = dictionary.upsert('IOS', 'A mobile operating system');
  assert(inserted == null);
  assert(dictionary.count() == 3);

  bool exists = dictionary.exists('Dart');
  assert(exists == true);

  dictionary.bulkAdd({
    'Rust': 'Super fast programming language',
    'Typescript': 'A typed superset of JavaScript'
  });
  assert(dictionary.count() == 5);

  dictionary.bulkDelete(['Rust', 'Typescript']);
  assert(dictionary.count() == 3);
}

```

----
### 📜출처(참고 문헌)  


----
### 🔗연결 문서


