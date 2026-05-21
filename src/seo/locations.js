/** Local SEO targets — used in schema areaServed and metadata */
export const SERVICE_LOCATIONS = [
  { type: 'City', name: 'Mumbai', region: 'Maharashtra', country: 'IN' },
  { type: 'City', name: 'Delhi', region: 'Delhi', country: 'IN' },
  { type: 'City', name: 'Bangalore', region: 'Karnataka', country: 'IN' },
  { type: 'City', name: 'Pune', region: 'Maharashtra', country: 'IN' },
  { type: 'City', name: 'Hyderabad', region: 'Telangana', country: 'IN' },
  { type: 'City', name: 'Chennai', region: 'Tamil Nadu', country: 'IN' },
  { type: 'City', name: 'Kolkata', region: 'West Bengal', country: 'IN' },
  { type: 'City', name: 'Ahmedabad', region: 'Gujarat', country: 'IN' },
  { type: 'AdministrativeArea', name: 'Maharashtra', country: 'IN' },
  { type: 'Country', name: 'India', country: 'IN' },
]

export const LOCATION_KEYWORDS = [
  'love astrologer in Mumbai',
  'ex love back specialist Mumbai',
  'relationship astrologer Delhi',
  'online astrologer India',
  'love problem solution Pune',
  'vashikaran specialist Bangalore',
  'best tantrik near me Maharashtra',
  'online love astrologer Mumbai Delhi Pune',
  'breakup solution astrologer India',
  'marriage problem astrologer Maharashtra',
]

export function buildAreaServedSchema() {
  return SERVICE_LOCATIONS.map((loc) => {
    const entry = { '@type': loc.type, name: loc.name }
    if (loc.region) entry.containedInPlace = { '@type': 'AdministrativeArea', name: loc.region }
    return entry
  }).concat([
    { '@type': 'Country', name: 'United States' },
    { '@type': 'Country', name: 'United Kingdom' },
    { '@type': 'Country', name: 'Canada' },
    { '@type': 'Country', name: 'Australia' },
    { '@type': 'Country', name: 'United Arab Emirates' },
  ])
}
