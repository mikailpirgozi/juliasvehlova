import Script from 'next/script'

/**
 * Google Analytics 4 with Consent Mode v2 (GDPR-compliant).
 *
 * Previously gtag.js was never loaded, so `window.gtag(...)` calls across the
 * app were no-ops and no data was collected. This component actually loads the
 * library and wires Google Consent Mode:
 *   - analytics/ad storage default = DENIED (no cookies before consent)
 *   - granted only after the user accepts in the cookie banner
 *   - prior "accepted" choice is restored on load
 *
 * Renders nothing unless NEXT_PUBLIC_GA_ID is set.
 */
export function GoogleAnalytics() {
  const gaId = process.env.NEXT_PUBLIC_GA_ID

  if (!gaId) return null

  return (
    <>
      <Script id="ga-consent-default" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('consent', 'default', {
            ad_storage: 'denied',
            ad_user_data: 'denied',
            ad_personalization: 'denied',
            analytics_storage: 'denied',
            wait_for_update: 500
          });
        `}
      </Script>
      <Script
        id="ga-lib"
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
      />
      <Script id="ga-init" strategy="afterInteractive">
        {`
          gtag('js', new Date());
          try {
            if (localStorage.getItem('cookie-consent') === 'accepted') {
              gtag('consent', 'update', { analytics_storage: 'granted' });
            }
          } catch (e) {}
          gtag('config', '${gaId}', { anonymize_ip: true });
        `}
      </Script>
    </>
  )
}
