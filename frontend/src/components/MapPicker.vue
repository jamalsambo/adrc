<template>
  <div>
    <q-btn
      icon="my_location"
      label="Usar minha localização"
      color="primary"
      outline
      @click="getCurrentLocation"
      class="q-mb-sm"
    />

    <div id="map" style="height: 400px"></div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'


const props = defineProps(['lat', 'lng'])
const emit = defineEmits(['update:lat', 'update:lng'])

let map
let marker

function setMarker(lat, lng) {
  if (!marker) {
    marker = L.marker([lat, lng], { draggable: false }).addTo(map)
  } else {
    marker.setLatLng([lat, lng])
  }
  map.setView([lat, lng], 15)
  emit('update:lat', lat)
  emit('update:lng', lng)
}

function getCurrentLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords
        setMarker(latitude, longitude)
      },
      (err) => {
        alert('Não foi possível obter sua localização com precisão.')
        console.error(err)
      },
      {
        enableHighAccuracy: true,   // 🔍 Prioriza GPS ou Wi-Fi (melhor precisão)
        timeout: 5000,             // Espera até 10s
        maximumAge: 0               // Não usa cache
      }
    )
  } else {
    alert('Seu navegador não suporta geolocalização.')
  }
}


onMounted(() => {
  const initialLat = props.lat || -18.9
  const initialLng = props.lng || 35.3

  map = L.map('map').setView([initialLat, initialLng],6)

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map)

  setMarker(initialLat, initialLng, { draggable: false })

  map.on('click', (e) => {
    const { lat, lng } = e.latlng
    setMarker(lat, lng)
  })
})
</script>

<style>
#map {
  border: 1px solid #ccc;
  border-radius: 8px;
}
</style>
