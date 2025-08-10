import { useEffect } from 'react'

const SEO = ({ 
  title = "IMC Servicios Chile SpA | Construcción Industrial y Comercial Santiago",
  description = "🏗️ IMC Servicios Chile SpA - Empresa líder en construcción industrial, servicios eléctricos certificados SEC, obras civiles y carpintería especializada en Santiago. +15 años de experiencia. Cotización gratuita ⚡",
  keywords = "construcción industrial Santiago, servicios eléctricos certificados SEC, obras civiles Chile, carpintería especializada, techumbres industriales, soldadura certificada AWS",
  canonical = "https://imcservicioschile.cl/",
  ogImage = "https://imcservicioschile.cl/og-image.jpg"
}) => {
  
  useEffect(() => {
    // Update document title
    document.title = title
    
    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]')
    if (metaDescription) {
      metaDescription.setAttribute('content', description)
    }
    
    // Update meta keywords
    const metaKeywords = document.querySelector('meta[name="keywords"]')
    if (metaKeywords) {
      metaKeywords.setAttribute('content', keywords)
    }
    
    // Update canonical URL
    let canonicalLink = document.querySelector('link[rel="canonical"]')
    if (!canonicalLink) {
      canonicalLink = document.createElement('link')
      canonicalLink.rel = 'canonical'
      document.head.appendChild(canonicalLink)
    }
    canonicalLink.href = canonical
    
    // Update Open Graph tags
    const ogTitle = document.querySelector('meta[property="og:title"]')
    if (ogTitle) ogTitle.setAttribute('content', title)
    
    const ogDescription = document.querySelector('meta[property="og:description"]')
    if (ogDescription) ogDescription.setAttribute('content', description)
    
    const ogUrl = document.querySelector('meta[property="og:url"]')
    if (ogUrl) ogUrl.setAttribute('content', canonical)
    
    const ogImageMeta = document.querySelector('meta[property="og:image"]')
    if (ogImageMeta) ogImageMeta.setAttribute('content', ogImage)
    
    // Update Twitter tags
    const twitterTitle = document.querySelector('meta[property="twitter:title"]')
    if (twitterTitle) twitterTitle.setAttribute('content', title)
    
    const twitterDescription = document.querySelector('meta[property="twitter:description"]')
    if (twitterDescription) twitterDescription.setAttribute('content', description)
    
    const twitterImage = document.querySelector('meta[property="twitter:image"]')
    if (twitterImage) twitterImage.setAttribute('content', ogImage)
    
  }, [title, description, keywords, canonical, ogImage])
  
  return null
}

export default SEO