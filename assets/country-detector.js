/**
 * CountryDetector
 * Detects visitor's country via: sessionStorage cache → Shopify server data → ipapi.co API
 */
class CountryDetector {
  constructor({ sectionId, cacheKey, apiUrl }) {
    this.sectionId = sectionId;
    this.cacheKey = cacheKey;
    this.apiUrl = apiUrl;
  }

  // ── Cache Layer ─────────────────────────────────────────────────────────────

  getCachedCountry() {
    try {
      const raw = sessionStorage.getItem(this.cacheKey);
      if (!raw) return null;
      return JSON.parse(raw);
    } catch {
      return null;
    }
  }

  setCachedCountry(country) {
    try {
      sessionStorage.setItem(this.cacheKey, JSON.stringify(country));
    } catch {
      // sessionStorage unavailable (private mode, quota exceeded) — silently skip
    }
  }

  // ── Detection Methods ───────────────────────────────────────────────────────

  getShopifyCountry() {
    const section = document.getElementById(this.sectionId);
    if (!section) return null;
    const name = section.dataset.shopifyCountry;
    const isoCode = section.dataset.shopifyIsoCode;
    if (!name || !isoCode) return null;
    return { name, isoCode };
  }

  async fetchCountryFromAPI() {
      const response = await fetch(this.apiUrl);
  if (!response.ok) throw new Error(`API error: ${response.status}`);
  const data = await response.json();

  // ip-api.com returns { country, countryCode }
  const name    = data.country    || data.country_name;
  const isoCode = data.countryCode || data.country_code;

  if (!name || !isoCode) throw new Error('Invalid API response');
  return { name, isoCode };
  }

  // ── Flag Utility ────────────────────────────────────────────────────────────

  getCountryFlag(isoCode) {
    if (!isoCode || typeof isoCode !== 'string') return '';
    const upper = isoCode.toUpperCase();
    if (!/^[A-Z]{2}$/.test(upper)) return '';
    // Convert each letter to a regional indicator symbol (Unicode trick)
    return [...upper]
      .map((char) => String.fromCodePoint(0x1F1E6 + char.charCodeAt(0) - 65))
      .join('');
  }

  // ── Rendering ───────────────────────────────────────────────────────────────

  renderCountry({ name, isoCode }) {
    const section = document.getElementById(this.sectionId);
    if (!section) return;
    const nameEl = section.querySelector('.country-detector__name');
    const flagEl = section.querySelector('.country-detector__flag');
    const errorEl = section.querySelector('.country-detector__error');
    if (nameEl) nameEl.textContent = name;
    if (flagEl) flagEl.textContent = this.getCountryFlag(isoCode);
    if (errorEl) errorEl.hidden = true;
  }

  renderError(message) {
    const section = document.getElementById(this.sectionId);
    if (!section) return;
    const errorEl = section.querySelector('.country-detector__error');
    if (errorEl) {
      errorEl.textContent = message;
      errorEl.hidden = false;
    }
  }

  // ── Orchestration ───────────────────────────────────────────────────────────

  async init() {
    // Priority 1: Cache
    const cached = this.getCachedCountry();
    if (cached) {
      this.renderCountry(cached);
      return;
    }

    // Priority 2: Shopify server-side data
    const shopifyCountry = this.getShopifyCountry();
    if (shopifyCountry) {
      this.setCachedCountry(shopifyCountry);
      this.renderCountry(shopifyCountry);
      return;
    }

    // Priority 3: IP API fallback
    try {
      const apiCountry = await this.fetchCountryFromAPI();
      this.setCachedCountry(apiCountry);
      this.renderCountry(apiCountry);
    } catch {
      this.renderError('Unable to detect your location. Please try again later.');
    }
  }
}

// Export for Node/Jest environments; ignore in browser
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { CountryDetector };
}