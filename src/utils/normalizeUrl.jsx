export function normalizeUrl(value) {
  const input = value.trim();
  const withProtocol = /^[a-z][a-z\d+.-]*:/i.test(input) ? input : `https://${input}`;
  const url = new URL(withProtocol);
  if (!['http:', 'https:'].includes(url.protocol) || !url.hostname) {
    throw new Error('Enter an HTTP or HTTPS website address.');
  }
  return url.href;
}
