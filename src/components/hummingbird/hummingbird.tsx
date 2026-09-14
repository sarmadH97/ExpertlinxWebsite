import { useId } from "react";

export type HummingbirdProps = {
  className?: string;
  variant?: "hero" | "scene" | "mark";
};

/** Stable decorative mascot boundary: a future Rive renderer can use the same props. */
export function Hummingbird({ className = "", variant = "hero" }: HummingbirdProps) {
  const id = useId().replaceAll(":", "");
  return (
    <svg className={`hummingbird hummingbird--${variant} ${className}`} viewBox="0 0 600 560" fill="none" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id={`${id}-wing`} x1="130" y1="90" x2="365" y2="385" gradientUnits="userSpaceOnUse">
          <stop stopColor="#bafcff" /><stop offset=".34" stopColor="#46dff8" /><stop offset=".7" stopColor="#158bb7" /><stop offset="1" stopColor="#073d67" />
        </linearGradient>
        <linearGradient id={`${id}-body`} x1="405" y1="260" x2="178" y2="480" gradientUnits="userSpaceOnUse">
          <stop stopColor="#cffbff" /><stop offset=".26" stopColor="#5fe4f5" /><stop offset=".62" stopColor="#0e94bb" /><stop offset="1" stopColor="#072d53" />
        </linearGradient>
        <linearGradient id={`${id}-back`} x1="200" y1="65" x2="295" y2="355" gradientUnits="userSpaceOnUse">
          <stop stopColor="#66e4f9" stopOpacity=".65" /><stop offset="1" stopColor="#09517f" stopOpacity=".1" />
        </linearGradient>
      </defs>
      <g className="bird-hover">
        <g className="bird-wing-back">
          <path d="M306 340C204 271 176 142 211 39C229 129 312 180 339 240C360 287 348 316 306 340Z" fill={`url(#${id}-back)`} stroke="#64d8f7" strokeOpacity=".24" />
          <path d="M211 39L309 307L229 167M242 136L316 283" stroke="#b5f7ff" strokeOpacity=".24" />
        </g>
        <g className="bird-wing-front">
          <path d="M303 339C206 319 86 237 45 106C129 171 248 172 307 254C327 282 331 312 303 339Z" fill={`url(#${id}-wing)`} />
          <path d="M45 106L303 339L151 186Z" fill="#aaf5ff" fillOpacity=".19" />
          <path d="M86 152L303 339L167 207Z" fill="#e4ffff" fillOpacity=".13" />
          <path d="M45 106L303 339M91 180L301 336M141 242L304 340M151 186L281 297" stroke="#d5fbff" strokeOpacity=".3" strokeWidth=".8" />
        </g>
        <path d="M291 340C286 384 252 419 165 481L212 420L146 446L246 347Z" fill={`url(#${id}-body)`} />
        <path d="M252 394L165 481L231 382" fill="#46cce5" fillOpacity=".25" />
        <path d="M246 348C278 347 300 324 319 282C332 251 356 234 383 239C405 243 417 264 414 281C411 303 390 312 363 313C347 368 311 410 266 409C246 404 235 378 246 348Z" fill={`url(#${id}-body)`} />
        <path d="M246 348L319 282L293 376L266 409Z" fill="#087ca4" fillOpacity=".58" />
        <path d="M319 282L363 313L293 376Z" fill="#4be0ec" fillOpacity=".5" />
        <path d="M386 271L561 243L409 284Z" fill="#92dfed" />
        <path d="M411 278L561 243L414 281Z" fill="#e0fdff" />
        <path d="M333 261C351 239 380 239 396 253L352 275Z" fill="#d8ffff" fillOpacity=".35" />
        <circle cx="389" cy="265" r="4" fill="#041923" /><circle cx="390" cy="264" r="1.1" fill="#ebffff" />
        <path d="M251 351L293 376L266 409M319 282L363 313M277 387L212 446" stroke="#a7efff" strokeOpacity=".3" />
      </g>
    </svg>
  );
}
