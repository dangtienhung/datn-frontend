import { useEffect, useRef, useState } from 'react'
import '../../StyleMap.css'
import axios from 'axios'
import GeoLoCaTion from '../../utils/geolocation'
import ListStore from '../../interfaces/ListStore.type'

interface LngLat {
  lng: number
  lat: number
}

const List: ListStore[] = [
  {
    highName: 'Trường Cao đẳng FPT Polytechnic',
    name: 'Trường Cao đẳng FPT Polytechnic, Tòa nhà FPT Polytechnic, Trịnh Văn Bô, Phương Canh, Nam Từ Liêm, Hà Nội',
    geoLocation: {
      lat: 21.038338774000067,
      lng: 105.74712340900004
    }
  },
  {
    highName: 'Xã Hồng Hà',
    name: 'Xã Hồng Hà, Đan Phượng, Hà Nội',
    geoLocation: {
      lat: 21.13130478200003,
      lng: 105.68977495700005
    }
  }
]

interface Props {
  setGapStore?: React.Dispatch<React.SetStateAction<ListStore[]>>
  setAddress?: React.Dispatch<React.SetStateAction<undefined>>
}

const getLocation = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      let location: LngLat = {
        lng: 0,
        lat: 0
      }
      location = {
        lng: position.coords.longitude,
        lat: position.coords.latitude
      }
      localStorage.setItem('userLocation', JSON.stringify(location))
    })
  }
}

getLocation()

const YaSuoMap = ({ setGapStore, setAddress }: Props) => {
  const { lnglat } = GeoLoCaTion()
  const map = useRef(document.createElement('script'))
  const [places, setPlaces] = useState<LngLat>({
    lng: 0,
    lat: 0
  })
  //   const [gapStore, setGapStore] = useState([])

  const getDistance = async () => {
    setTimeout(async () => {
      const controller = new AbortController()
      const StorageDistance = JSON.parse(localStorage.getItem('location')!)
      await axios
        .get(
          `https://rsapi.goong.io/DistanceMatrix?origins=${StorageDistance?.lat ? StorageDistance.lat : lnglat.lat},${
            StorageDistance?.lng ? StorageDistance.lng : lnglat.lng
          }&destinations=${List[0].geoLocation.lat},${List[0].geoLocation.lng}%7C${List[1].geoLocation.lat},${
            List[1].geoLocation.lng
          }&vehicle=car&api_key=BCLZh27rb6GtYXaozPyS16xbZoYw3E1STP7Ckg2P`,
          { signal: controller.signal }
        )
        .then(({ data: { rows } }) => {
          const fetchDistance = rows[0].elements
          console.log('places', places)
          const listDistance = fetchDistance.map((item: any, index: number) => {
            return { ...List[index], ...item.distance }
          })

          if (setGapStore) {
            setGapStore(
              fetchDistance.map((item: any, index: number) => {
                return { ...List[index], ...item.distance }
              })
            )
          }

          // localStorage.removeItem("location");
          controller.abort()
        })
    }, 1000)
  }

  useEffect(() => {
    window.onload = () => {
      localStorage.removeItem('location')
    }

    document.querySelector('.mapboxgl-ctrl-geocoder--icon-search')?.remove()
    document.querySelector('.mapboxgl-ctrl-geocoder--input')?.setAttribute('placeholder', 'Địa chỉ người nhận')
    document.querySelector('.mapboxgl-ctrl-geocoder--input')?.setAttribute('name', 'address')
    document.querySelector('.mapboxgl-ctrl-geocoder--input')?.setAttribute('autoComplete', 'off')

    // document.querySelector("#map")?.addEventListener("click", (e: any) => {
    //   console.log(e.target.className === "mapboxgl-ctrl-icon");
    // }); // not delete

    document.querySelector('.mapboxgl-ctrl-geocoder--input')?.addEventListener('change', async (e: any) => {
      if (setAddress) {
        setAddress(e.target.value)
      }
      await getDistance()
    })

    if (navigator.geolocation) {
      map.current.innerHTML = `
      goongjs.accessToken = "QG9FGuZksX4QOibtVKjBvv7dQcSLpbDqQnajow1S";
      var map = new goongjs.Map({
        container: 'map',
        style: 'https://tiles.goong.io/assets/goong_map_web.json',
        center: [${places.lng}, ${places.lat}],
        zoom: 13
      });
      var geocoder = new GoongGeocoder({
        accessToken: "BCLZh27rb6GtYXaozPyS16xbZoYw3E1STP7Ckg2P"
        });
      
      var marker = new goongjs.Marker();
        geocoder.addTo('#geocoder');
         
        // Add geocoder result to container.
        geocoder.on('result', function ({result:{result:{geometry:{location}}}}) {
          console.log(location)
          marker.remove();
          localStorage.setItem("location",JSON.stringify(location))
          marker
          .setLngLat([location.lng,
            location.lat])
          .addTo(map)
            map.flyTo({
              center: [
                location.lng,
                location.lat
              ],
              essential: true // this animation is considered essential with respect to prefers-reduced-motion
            })
        });
  
        // Clear results container when search is cleared.
        geocoder.on('clear', function () {
          localStorage.removeItem("location")
        // results.innerText = '';
        });

        map.flyTo({
          center: [
            ${places.lng}, ${places.lat}
          ],
          essential: true // this animation is considered essential with respect to prefers-reduced-motion
      });
  
      map.addControl(new goongjs.NavigationControl());
       map.on("load",()=>{
        if (navigator.geolocation) {
          marker.remove();
          navigator.geolocation.getCurrentPosition((position) => {
              localStorage.setItem("userLocation",JSON.stringify(
                {
                  lng:position.coords.longitude,
                  lat:position.coords.latitude
                }
              ))
              map.flyTo({
                 center: [
                  position.coords.longitude,
                  position.coords.latitude
                 ],
                 essential: true // this animation is considered essential with respect to prefers-reduced-motion
             });
             marker
               .setLngLat([position.coords.longitude,position.coords.latitude]).addTo(map)
             map.addControl(
               new goongjs.GeolocateControl({
               positionOptions: {
               enableHighAccuracy: true
             },
               trackUserLocation: true,
             })
             );
          });
        }
  
       }); `
    }
    if (lnglat.lat > 0 && lnglat.lng > 0) {
      getDistance()
    }

    document.body.appendChild(map.current)
  }, [lnglat, places])
  return (
    <>
      <div>
        {/* {gapStore.map((item: any, index: number) => (
          <div key={index}>
            {item.name} {item.text}
          </div>
        ))} */}
        {/* <input
          type="text"
          className="outline-none shadow-lg shadow-indigo-500/40 p-1"
          placeholder="Search..."
          onChange={onSearch}
        />
        {valueGeocoder.length > 0 ? (
          <section className="absolute z-50 bg-[#fff] shadow-lg shadow-indigo-500/40 p-4 divide-y">
            {valueGeocoder.map((item: any, index: number) => (
              <div
                key={index}
                className="cursor-pointer hover:bg-slate-100 py-3 px-1"
                onClick={() => onGetPlace(item.place_id)}
              >
                <h3 className="font-medium">
                  {item.structured_formatting.main_text}
                </h3>
                <span className="text-[13px]">{item.description}</span>
              </div>
            ))}
          </section>
        ) : (
          ""
        )} */}
      </div>
    </>
  )
}

export default YaSuoMap
