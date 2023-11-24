export function getTimeMseconds(m: number, s: number) {
  const sToMs = 1000;
  const mToS = 60;
  return m * mToS * sToMs + s * sToMs;
}

export default function minmax(min: number, max: number, value: number) {
  return Math.max(min, Math.min(max, value));
}
