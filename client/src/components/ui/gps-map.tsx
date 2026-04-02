'use client';

// Routes defined once, reused for both paths and animateMotion
const ROUTES = {
  a: "M 40 60 V 100 H 150 V 160",
  b: "M 330 50 H 280 V 100 H 150 V 160",
  c: "M 50 230 H 150 V 160",
  d: "M 310 230 H 280 V 200 H 150 V 160",
  e: "M 200 40 V 100 H 150 V 160",
} as const;

type RouteKey = keyof typeof ROUTES;

// Car = white circle animated along a route using SVG animateMotion
function Car({
  routeId,
  dur,
  begin,
  reverse = false,
}: {
  routeId: RouteKey;
  dur: string;
  begin: string;
  reverse?: boolean;
}) {
  return (
    <g filter="url(#car-shadow)">
      <circle r="4.5" fill="white" stroke="#4e6645" strokeWidth="2" />
      <circle r="1.8" fill="#4e6645" />
      <animateMotion
        dur={dur}
        begin={begin}
        repeatCount="indefinite"
        calcMode="linear"
        // reverse: go from 100% → 0% using keyPoints
        keyPoints={reverse ? "1;0" : "0;1"}
        keyTimes="0;1"
      >
        <mpath href={`#map-route-${routeId}`} />
      </animateMotion>
    </g>
  );
}

interface GpsMapProps {
  className?: string;
}

export function GpsMap({ className }: GpsMapProps) {
  return (
    <div className={`relative rounded-xl overflow-hidden${className ? ' ' + className : ''}`}>
      <div className="absolute bottom-1 right-2 text-[8px] text-gray-400 z-10 select-none pointer-events-none">
        © MobiSoins Dispatch
      </div>

      <svg
        viewBox="0 0 400 300"
        width="100%"
        height="100%"
        xmlns="http://www.w3.org/2000/svg"
        style={{ display: 'block' }}
        aria-hidden="true"
      >
        <defs>
          {/* Route paths — referenced by Car animateMotion */}
          {(Object.entries(ROUTES) as [RouteKey, string][]).map(([key, d]) => (
            <path key={key} id={`map-route-${key}`} d={d} />
          ))}

          {/* Drop shadow for cars */}
          <filter id="car-shadow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="0" dy="1" stdDeviation="1.5" floodColor="rgba(0,0,0,0.28)" />
          </filter>
        </defs>

        {/* ── Background ── */}
        <rect width="400" height="300" fill="#f2efe9" />

        {/* ── City blocks ── */}
        {[
          [20,20,60,40],[100,15,70,35],[190,18,50,38],[300,18,55,32],
          [20,115,55,45],[170,118,60,42],[300,112,58,44],
          [22,215,52,38],[100,210,65,38],[170,215,58,35],[300,210,56,38],
          [90,115,40,45],
        ].map(([x,y,w,h],i) => (
          <rect key={i} x={x} y={y} width={w} height={h} rx="1" fill="#e8e2d9" />
        ))}

        {/* ── Park ── */}
        <rect x="280" y="180" width="80" height="60" rx="3" fill="#c8dbb0" />
        {[[296,196,4],[310,204,3.5],[325,196,4],[340,205,3.5],[353,196,4],[300,215,3.5],[318,222,4],[345,218,3.5]].map(([cx,cy,r],i) => (
          <circle key={i} cx={cx} cy={cy} r={r} fill="#a8c890" opacity="0.7" />
        ))}
        <text x="320" y="232" fontSize="7" fill="#5f8a3e" textAnchor="middle" fontFamily="sans-serif">Parc du Quartier</text>

        {/* ── Water ── */}
        <rect x="0" y="270" width="400" height="30" fill="#aad3df" />
        <path d="M 20 278 q 15 -3 30 0 q 15 3 30 0 q 15 -3 30 0 q 15 3 30 0 q 15 -3 30 0 q 15 3 30 0 q 15 -3 30 0 q 15 3 30 0 q 15 -3 30 0 q 15 3 30 0"
          stroke="#88bfcf" strokeWidth="0.8" fill="none" opacity="0.6" />
        <text x="200" y="285" fontSize="7" fill="#5d8a9e" textAnchor="middle" fontFamily="sans-serif">Rivière Saint-Charles</text>

        {/* ── Major road borders ── */}
        <line x1="0" y1="100" x2="400" y2="100" stroke="#d4cfc8" strokeWidth="8" />
        <line x1="0" y1="200" x2="400" y2="200" stroke="#d4cfc8" strokeWidth="8" />
        <line x1="150" y1="0" x2="150" y2="300" stroke="#d4cfc8" strokeWidth="8" />
        <line x1="280" y1="0" x2="280" y2="270" stroke="#d4cfc8" strokeWidth="8" />

        {/* ── Major road surface ── */}
        <line x1="0" y1="100" x2="400" y2="100" stroke="#ffffff" strokeWidth="7" />
        <line x1="0" y1="200" x2="400" y2="200" stroke="#ffffff" strokeWidth="7" />
        <line x1="150" y1="0" x2="150" y2="300" stroke="#ffffff" strokeWidth="7" />
        <line x1="280" y1="0" x2="280" y2="270" stroke="#ffffff" strokeWidth="7" />

        {/* ── Minor roads ── */}
        {[
          [0,50,150,50],[280,50,400,50],[0,150,150,150],[280,150,400,150],
          [0,250,150,250],[60,0,60,100],[60,200,60,270],[220,0,220,100],[220,200,220,270],
        ].map(([x1,y1,x2,y2],i) => (
          <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#f0ece4" strokeWidth="3" />
        ))}

        {/* ── Road labels ── */}
        <text x="30"  y="97"  fontSize="6" fill="#999" fontFamily="sans-serif">Boul. René-Lévesque</text>
        <text x="30"  y="197" fontSize="6" fill="#999" fontFamily="sans-serif">Rue Sherbrooke</text>
        <text x="147" y="20"  fontSize="6" fill="#999" fontFamily="sans-serif" transform="rotate(-90,147,20)">Av. du Parc</text>
        <text x="277" y="20"  fontSize="6" fill="#999" fontFamily="sans-serif" transform="rotate(-90,277,20)">Rue Saint-Denis</text>

        {/* ── Route white halos (behind blue) ── */}
        {Object.values(ROUTES).map((d, i) => (
          <path key={i} d={d} stroke="white" strokeWidth="7" fill="none"
            strokeLinecap="round" strokeLinejoin="round" opacity="0.55" />
        ))}

        {/* ── Route blue lines ── */}
        {Object.values(ROUTES).map((d, i) => (
          <path key={i} d={d} stroke="#4285f4" strokeWidth="3.5" fill="none"
            strokeLinecap="round" strokeLinejoin="round" opacity="0.65" />
        ))}

        {/* ── Home pins (patient homes) ── */}
        {([[40,60],[330,50],[50,230],[310,230],[200,40]] as [number,number][]).map(([x,y],i) => (
          <g key={i} transform={`translate(${x},${y})`}>
            <circle cx="0" cy="-8" r="8" fill="#4e6645" stroke="white" strokeWidth="1.5" />
            <polygon points="0,2 -5,-5 5,-5" fill="#4e6645" />
            <polygon points="0,-14 -4,-11 4,-11" fill="white" />
            <rect x="-3" y="-11" width="6" height="4" fill="white" />
          </g>
        ))}

        {/* ── MobiSoins hub pulse ── */}
        <circle cx="150" cy="160" r="10" fill="#003366" opacity="0.08">
          <animate attributeName="r" values="10;28;10" dur="2.5s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.15;0;0.15" dur="2.5s" repeatCount="indefinite" />
        </circle>
        <circle cx="150" cy="160" r="6" fill="#003366" opacity="0.12">
          <animate attributeName="r" values="6;18;6" dur="2.5s" begin="0.5s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.22;0;0.22" dur="2.5s" begin="0.5s" repeatCount="indefinite" />
        </circle>
        <g transform="translate(150,160)">
          <circle cx="0" cy="-10" r="11" fill="#003366" stroke="white" strokeWidth="2" />
          <polygon points="0,4 -7,-4 7,-4" fill="#003366" />
          <text x="0" y="-7" fontSize="5.5" textAnchor="middle" fill="white" fontWeight="bold" fontFamily="sans-serif">MS</text>
        </g>

        {/* ── ANT FARM: 4 cars per route (2 each direction), staggered ── */}

        {/* Route A (8s) */}
        <Car routeId="a" dur="8s"   begin="0s"    />
        <Car routeId="a" dur="8s"   begin="4s"    />
        <Car routeId="a" dur="8s"   begin="2s"    reverse />
        <Car routeId="a" dur="8s"   begin="6s"    reverse />

        {/* Route B (11s) */}
        <Car routeId="b" dur="11s"  begin="0.5s"  />
        <Car routeId="b" dur="11s"  begin="5.5s"  />
        <Car routeId="b" dur="11s"  begin="2.5s"  reverse />
        <Car routeId="b" dur="11s"  begin="8s"    reverse />

        {/* Route C (7s) */}
        <Car routeId="c" dur="7s"   begin="1s"    />
        <Car routeId="c" dur="7s"   begin="4.5s"  />
        <Car routeId="c" dur="7s"   begin="2.5s"  reverse />
        <Car routeId="c" dur="7s"   begin="6s"    reverse />

        {/* Route D (9.5s) */}
        <Car routeId="d" dur="9.5s" begin="1.5s"  />
        <Car routeId="d" dur="9.5s" begin="6s"    />
        <Car routeId="d" dur="9.5s" begin="3.5s"  reverse />
        <Car routeId="d" dur="9.5s" begin="8s"    reverse />

        {/* Route E (7.5s) */}
        <Car routeId="e" dur="7.5s" begin="0.5s"  />
        <Car routeId="e" dur="7.5s" begin="4s"    />
        <Car routeId="e" dur="7.5s" begin="2s"    reverse />
        <Car routeId="e" dur="7.5s" begin="6s"    reverse />

      </svg>
    </div>
  );
}
