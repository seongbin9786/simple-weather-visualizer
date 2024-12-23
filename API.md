# API

## 날씨 API

단기예보 API 사용 - 오늘 기준 예보를 제공 - 파라미터: (위치, 날짜)

- URL: http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst

- 파라미터:

  - queryParam 사용
  - 고정 파라미터

    - ServiceKey={KEY}
    - pageNo=1
    - numOfRows=10000
    - dataType=JSON
    - base_time=0500

  - 변동 파라미터
    - base_date=20241223 (날짜)
    - nx=55
    - ny=127 (nx, ny값은 위도, 경도를 변환한 값)

- 응답:

  - JSON
  - response.body.items.item 필드로 배열을 제공
  - 형식:

    ```js
    {
        // 안 중요
        "nx": 55,
        "ny": 127
        "baseDate": "20241223",
        "baseTime": "0500",
        "fcstDate": "20241223",

        // 중요
        "fcstTime": "0600", // 예보 기준 시각
        "category": "TMP", // 필드 종류
        "fcstValue": "-6", // 필드 값
    },
    ```

| 단기예보 항목 | 설명           | 단위        | 데이터 길이 |
| ------------- | -------------- | ----------- | ----------- |
| POP           | 강수확률       | %           | 8           |
| PTY           | 강수형태       | 코드값      | 4           |
| PCP           | 1시간 강수량   | 범주 (1 mm) | 8           |
| REH           | 습도           | %           | 8           |
| SNO           | 1시간 신적설   | 범주 (1 cm) | 8           |
| SKY           | 하늘상태       | 코드값      | 4           |
| TMP           | 1시간 기온     | ℃           | 10          |
| TMN           | 일 최저기온    | ℃           | 10          |
| TMX           | 일 최고기온    | ℃           | 10          |
| UUU           | 풍속(동서성분) | m/s         | 12          |
| VVV           | 풍속(남북성분) | m/s         | 12          |
| WAV           | 파고           | M           | 8           |
| VEC           | 풍향           | deg         | 10          |
| WSD           | 풍속           | m/s         | 10          |

- 하늘상태(SKY) 코드 : 맑음(1), 구름많음(3), 흐림(4)
- 강수형태(PTY) 코드 : (단기) 없음(0), 비(1), 비/눈(2), 눈(3), 소나기(4)

- 단기예보 강수량(PCP)

| 범주                    | 문자열 표시                |
| ----------------------- | -------------------------- |
| 0.1 ~ 1.0mm 미만        | 1mm 미만                   |
| 1.0mm 이상 30.0mm 미만  | "실수값+mm (1.0mm~29.9mm)" |
| 30.0mm 이상 50.0mm 미만 | 30.0~50.0mm                |
| 50.0mm 이상             | 50.0mm 이상                |

- 신적설(SNO)

| 범주                  | 문자열 표시               |
| --------------------- | ------------------------- |
| 0.1 ~ 0.5cm 미만      | 0.5cm 미만                |
| 0.5cm 이상 5.0cm 미만 | "실수값+cm (0.5cm~4.9cm)" |
| 5.0cm 이상            | 5.0cm 이상                |

- 풍속 정보
  - 동서바람성분(UUU) : 동(+표기), 서(-표기)
  - 남북바람성분(VVV) : 북(+표기), 남(-표기)

## Geolocation API

- localhost, https에서만 동작

```js
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      const { latitude, longitude } = position.coords;
      console.log(`위도: ${latitude}, 경도: ${longitude}`);
    },
    (error) => {
      switch (error.code) {
        case error.PERMISSION_DENIED:
          console.error("사용자가 위치 정보 접근을 거부했습니다.");
          break;
        case error.POSITION_UNAVAILABLE:
          console.error("위치 정보를 사용할 수 없습니다.");
          break;
        case error.TIMEOUT:
          console.error("위치 정보 요청 시간이 초과되었습니다.");
          break;
        default:
          console.error("알 수 없는 오류가 발생했습니다.");
      }
    },
  );
} else {
  console.error("Geolocation API를 지원하지 않는 브라우저입니다.");
}
```

## 키카오 좌표-주소 변환 API

- https://apis.map.kakao.com/web/sample/coord2addr/

```js
const map = new kakao.maps.Map(mapContainer, mapOption);
const geocoder = new kakao.maps.services.Geocoder();

geocoder.coord2RegionCode(
  coords.getLng(),
  coords.getLat(),
  (result, status) => {
    if (status === kakao.maps.services.Status.OK) {
      for (let i = 0; i < result.length; i++) {
        // 행정동의 region_type 값은 'H' 이므로
        if (result[i].region_type === "H") {
          infoDiv.innerHTML = result[i].address_name;
          break;
        }
      }
    }
  },
);
```
