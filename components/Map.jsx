'use client'
import {
  MapContainer,
  Marker,
  Popup,
  Rectangle,
  TileLayer,
  useMap,
  useMapEvent
} from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { useEventHandlers } from '@react-leaflet/core'
import { useCallback, useMemo, useRef, useState } from 'react'
import { marker } from '@/public'
import { Icon } from 'leaflet'

const Map = ({}) => {
  function SetViewOnClick({ animateRef }) {
    const map = useMapEvent('click', e => {
      map.setView(e.latlng, map.getZoom(), {
        animate: animateRef.current || false
      })
    })

    return null
  }
  const POSITION_CLASSES = {
    bottomleft: 'leaflet-bottom leaflet-left',
    bottomright: 'leaflet-bottom leaflet-right',
    topleft: 'leaflet-top leaflet-left',
    topright: 'leaflet-top leaflet-right'
  }

  const BOUNDS_STYLE = { weight: 1 }

  function MinimapBounds({ parentMap, zoom }) {
    const minimap = useMap()

    // Clicking a point on the minimap sets the parent's map center
    const onClick = useCallback(
      e => {
        parentMap.setView(e.latlng, parentMap.getZoom())
      },
      [parentMap]
    )
    useMapEvent('click', onClick)

    // Keep track of bounds in state to trigger renders
    const [bounds, setBounds] = useState(parentMap.getBounds())
    const onChange = useCallback(() => {
      setBounds(parentMap.getBounds())
      // Update the minimap's view to match the parent map's center and zoom
      minimap.setView(parentMap.getCenter(), zoom)
    }, [minimap, parentMap, zoom])

    // Listen to events on the parent map
    const handlers = useMemo(() => ({ move: onChange, zoom: onChange }), [])
    useEventHandlers(
      {
        instance: parentMap,
        //@ts-ignore
        context: undefined
      },
      handlers
    )

    return <Rectangle bounds={bounds} pathOptions={BOUNDS_STYLE} />
  }

  function MinimapControl({ position, zoom }) {
    const parentMap = useMap()
    const mapZoom = zoom || 0

    const minimap = useMemo(
      () => (
        <MapContainer
          style={{ height: 50, width: 80 }}
          center={parentMap.getCenter()}
          zoom={mapZoom}
          dragging={false}
          doubleClickZoom={false}
          scrollWheelZoom={false}
          attributionControl={false}
          zoomControl={false}
        >
          <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />
          <MinimapBounds parentMap={parentMap} zoom={mapZoom} />
        </MapContainer>
      ),
      []
    )

    const positionClass =
      (position && POSITION_CLASSES[position]) || POSITION_CLASSES.topright
    return (
      <div className={positionClass}>
        <div className='leaflet-control leaflet-bar'>{minimap}</div>
      </div>
    )
  }
  const animateRef = useRef(false)
  const position = [51.505, -0.09]
  const icon = new Icon({
    iconUrl: 'marker.svg',
    iconSize: [25, 41],
    iconAnchor: [12, 41]
  })
  return (
    <MapContainer
      className='h-[500px] w-[800px]'
      center={position}
      zoom={13}
      style={{ borderRadius: '20px' }}
      placeholder={
        <>
          <p>
            Map of London.{' '}
            <noscript>You need to enable JavaScript to see this map.</noscript>
          </p>
        </>
      }
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />{' '}
      <Marker position={position} icon={icon} />
      <Popup>
        A pretty CSS3 popup. <br /> Easily customizable.
      </Popup>
      <MinimapControl position='topright' zoom={1} />
      <SetViewOnClick animateRef={animateRef} />
    </MapContainer>
  )
}

export default Map
