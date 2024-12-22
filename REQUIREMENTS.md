# 요구 사항

## v0

1. API 활용
    - API들은 key 노출을 막기 위해 NextJS API Routes 활용 필요
    - 날씨 정보 조회
        - 기상청 오픈 API 활용 (https://www.data.go.kr/data/15084084/openapi.do)
    - 현재 위치 정보 조회
        - HTML5 Geolocation API (`navigator.geolocation.getCurrentPosition`)
        - 카카오맵 API 활용 (https://apis.map.kakao.com/web/sample/coord2addr/)
    - 장소 검색 및 선택
        - 주소 조회
            - 카카오맵 API 활용 (https://postcode.map.daum.net/guide)
        - 검색 결과에서 장소 즐겨찾기 추가 가능
2. 장소 즐겨찾기
    - localstroage에 저장
    - 즐겨찾기 목록 조회
    - 즐겨찾기 취소
    - 클릭 시 해당 위치를 선택
3. 선택된 위치에 대한 날씨 시각화
    - 선택된 위치명
    - 오늘의 시간대 별 날씨 목록
        - 현재 시각의 날씨 (선택된 아이템)
