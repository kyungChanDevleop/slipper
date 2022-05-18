import Script from "next/script";
import { ChangeEvent, useEffect, useState } from "react";
import KakaomapPresenter from "./kakaomap.presenter";

export default function KaKaoMapContainer() {
  const [info, setInfo] = useState();
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [markers, setMarkers] = useState([]);
  const [map, setMap] = useState();
  const [keyword, setKeyword] = useState("");

  const onChangeKeyword = (e: any) => {
    e.preventDefault();
    setKeyword(e.target.value);
  };
  // console.log(keyword);
  useEffect(() => {
    if (!map) return;
    const ps = new kakao.maps.services.Places();

    ps.keywordSearch("북가좌", (data, status, _pagination) => {
      if (status === kakao.maps.services.Status.OK) {
        const bounds = new kakao.maps.LatLngBounds();
        let markers = [];
        for (var i = 0; i < data.length; i++) {
          // @ts-ignore
          markers.push({
            position: {
              lat: data[i].y,
              lng: data[i].x,
            },
            content: data[i].place_name,
          });

          // @ts-ignore
          bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
          setLat(data[i].y);
          setLng(data[i].x);
        }
        setMarkers(markers);

        // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
        map.setBounds(bounds);
      }
    });
  }, [map]);

  return (
    <KakaomapPresenter
      lat={lat}
      lng={lng}
      setMap={setMap}
      markers={markers}
      info={info}
      setInfo={setInfo}
      onChangeKeyword={onChangeKeyword}
      keyword={keyword}
    />
  );
}