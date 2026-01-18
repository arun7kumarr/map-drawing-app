import { create } from 'zustand'
import type { Feature } from 'geojson'

interface MapState {
  features: Feature[]
  addFeature: (f: Feature) => void
}

export const useMapStore = create<MapState>((set) => ({
  features: [],
  addFeature: (feature) =>
    set((state) => ({
      features: [...state.features, feature],
    })),
}))
