// lib/dealers/map-utils.ts
// Converts geographic lat/lng to percentage positions on the @react-map/india SVG
// The SVG viewBox is "0 0 764.05 792" — these constants are calibrated to that map.

// Geographic bounds of India as represented in the SVG
const MAP_BOUNDS = {
  lng: { min: 68.0, max: 97.5 },
  lat: { min: 6.5, max: 37.0 },
};

// Percentage bounds of the actual India landmass within the SVG viewBox
const SVG_BOUNDS = {
  x: { min: 12, max: 84 },
  y: { min: 7, max: 99 },
};

/**
 * Convert latitude/longitude to percentage position on the India SVG map.
 * Returns { x: number, y: number } where values are 0-100 percentages.
 */
export function latLngToMapPercent(lat: number, lng: number): { x: number; y: number } {
  const x =
    ((lng - MAP_BOUNDS.lng.min) / (MAP_BOUNDS.lng.max - MAP_BOUNDS.lng.min)) *
      (SVG_BOUNDS.x.max - SVG_BOUNDS.x.min) +
    SVG_BOUNDS.x.min;

  // Y is inverted: higher latitude = lower y percentage (north is top)
  const y =
    ((MAP_BOUNDS.lat.max - lat) / (MAP_BOUNDS.lat.max - MAP_BOUNDS.lat.min)) *
      (SVG_BOUNDS.y.max - SVG_BOUNDS.y.min) +
    SVG_BOUNDS.y.min;

  return {
    x: Math.max(0, Math.min(100, x)),
    y: Math.max(0, Math.min(100, y)),
  };
}

/**
 * Spread overlapping map pins so nearby dealers are visible individually.
 * Pins within `threshold` percent of each other are grouped, then arranged
 * in a circle around their centroid.
 */
export function spreadOverlappingPins(
  pins: { id: string; x: number; y: number }[],
  threshold = 1.5,
  radius = 2.5
): Record<string, { x: number; y: number }> {
  const result: Record<string, { x: number; y: number }> = {};
  const assigned = new Set<number>();

  // Group nearby pins using simple distance check
  const groups: number[][] = [];

  for (let i = 0; i < pins.length; i++) {
    if (assigned.has(i)) continue;

    const group = [i];
    assigned.add(i);

    for (let j = i + 1; j < pins.length; j++) {
      if (assigned.has(j)) continue;
      const dx = pins[i].x - pins[j].x;
      const dy = pins[i].y - pins[j].y;
      if (Math.sqrt(dx * dx + dy * dy) < threshold) {
        group.push(j);
        assigned.add(j);
      }
    }

    groups.push(group);
  }

  for (const group of groups) {
    if (group.length === 1) {
      // Single pin — no offset needed
      const pin = pins[group[0]];
      result[pin.id] = { x: pin.x, y: pin.y };
      continue;
    }

    // Compute centroid
    let cx = 0,
      cy = 0;
    for (const idx of group) {
      cx += pins[idx].x;
      cy += pins[idx].y;
    }
    cx /= group.length;
    cy /= group.length;

    // Scale radius based on group size
    const r = radius * (1 + (group.length - 2) * 0.25);

    // Place pins in a circle around centroid
    for (let i = 0; i < group.length; i++) {
      const angle = (2 * Math.PI * i) / group.length - Math.PI / 2;
      const pin = pins[group[i]];
      result[pin.id] = {
        x: Math.max(0, Math.min(100, cx + r * Math.cos(angle))),
        y: Math.max(0, Math.min(100, cy + r * Math.sin(angle))),
      };
    }
  }

  return result;
}
