import { useState } from 'react';
import { Link as LinkIcon } from 'lucide-react';

function Favicon({ hostname }) {
  const [failed, setFailed] = useState(false);
  if (failed) return <LinkIcon size={19} aria-hidden="true" />;

  return (
    <img
      src={`https://www.google.com/s2/favicons?domain=${encodeURIComponent(hostname)}&sz=64`}
      alt=""
      width="24"
      height="24"
      loading="lazy"
      decoding="async"
      referrerPolicy="no-referrer"
      onError={() => setFailed(true)}
      className="size-6 object-contain"
    />
  );
}

export default function SiteIcon({ url }) {
  let hostname;
  try { hostname = new URL(url).hostname; }
  catch { hostname = null; }

  return (
    <span className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-line bg-active text-muted" aria-hidden="true">
      {hostname ? <Favicon key={hostname} hostname={hostname} /> : <LinkIcon size={19} />}
    </span>
  );
}
