export default interface Region {
  oblast: string;     // e.g., "Osh", "Chui", "Naryn"
  raion?: string;     // district within oblast
  village?: string;
}