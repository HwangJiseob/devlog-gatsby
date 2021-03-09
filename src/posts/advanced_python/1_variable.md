---
title: Python variable
date: 2020-03-09
tags: ["파이썬"]
series: Advanced Python
thumbnail: "../images/series_thumbnail/advanced_python.jpg"
description: 파이썬의 변수 할당의 기저에 대하여
---

python의 C나 Java와 달리 변수를 선언할 때 자료형을 명시하지 않습니다. 이를 두고 파이썬은 동적 타입 언어(dynamically typed), C나 Java는 정적 타입 언어(statically typed)라고 표현합니다. 이 타입 변환 여부의 Pros와 Cons에 대해서는 여기서 다루지 않습니다. 다만 지금 단계에서는 파이썬은 변수의 재할당이 다른 언어들보다 훨씬 자유롭다는 것만 알면 됩니다.

#   Python variable assignment
다음은 Python의 변수 정의 예제코드입니다.
```py
a   # NameError: name 'a' is not defined
a = 1
b, c = 2, '3'
```

프로그래밍 언어에서 변수의 정의는 구체적으로 변수의 선언과 할당으로 구분됩니다. Javascript나 C는 변수의 선언과 할당 구문을 분리할 수 있지만, Python은 1번 라인에서 보이는 것처럼 선언과 할당 구문을 분리할 수 없습니다. 이로 미루어 보아 Python에서는 definiton, declaration, assignment를 엄격히 구분하지 않는 것 같습니다. Python reference도 

하지만 이런 제약 때문인지는 몰라도, Python에서는 하나의 variable statement에서 여러 변수를 동시에 '할당'할 수 있습니다. 이는 C나 Javascript가 하나의 variable statement에서 여러 변수를 선언'만' 할 수 있는 것과 다른, 어떻게 보면 장점일 수 있습니다.

다만 이렇게 강력한 Python에서 아쉽게도 [destructuring](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)(구조분해 할당)은 지원하지 않습니다.

#   Python Object
`Python Object`는 다른 프로그래밍 언어에서 사용하는 object와 개념이 다릅니다. Javascript에서는 object를 `object 자료형`으로 사용하며, Java에서는 모든 클래스에 대한 `최상위 클래스`로 object를 사용합니다. 반면 Python은 데이터라는 개념을 object로 취급하는 모양에 가깝습니다. `Python Object`가 모두 공통적으로 value, type, id를 가진다는 [Reference](https://docs.python.org/3/reference/datamodel.html#objects-values-and-types)의 설명을 읽으면 무슨 느낌인지 알 수 있습니다.

다만 Python Object는 고유 id를 `id()` 함수를 통해 명시적으로 접근할 수 있다는 점에서 다른 프로그래밍 언어들이 취급하는 데이터와는 또 다릅니다. CPython에서는 이것이 C의 메모리 주소와 같습니다. 그리고 C조차도 디버거를 쓰지 않으면 런타임 중에 변수가 할당된 주소를 알 수 없습니다.(물론 실제 프로그래밍에서 주소 상수를 직접 이용하는 경우는 거의 없고 C에서는 포인터 변수를 이용하여 세밀한 메모리 조작이 가능하기 때문에 이를 두고 Python이 더 뛰어나다고 할 수는 없습니다.) 그리고 이 고유 id는 해당 Python Object의 라이프사이클 동안 절대 변하지 않습니다.

하지만 이것이 Python Object와 그냥 data와의 유일한 차이는 아닙니다. CPython에서 Python object는 기본적으로 아래의 C 구조체로 구현됩니다.

```c:title=include/object.h
...
typedef struct _object {
    _PyObject_HEAD_EXTRA
    Py_ssize_t ob_refcnt;
    PyTypeObject *ob_type;
} PyObject;
...
```

참고로 value 필드는 `PyObject`에는 존재하지 않고 구체적인 type이 지정된 `PyListObject`, `PyBoolObject` 등에 존재합니다.

여가서 중요한 것은 바로 저 `ob_refcnt`입니다.

Javascript는 