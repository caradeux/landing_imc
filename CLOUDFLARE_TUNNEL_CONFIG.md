# ☁️ Cloudflare Tunnel Configuration Guide

## 🎯 Overview

This guide provides step-by-step instructions to configure a Cloudflare Tunnel for your Sitio IMC application, making it accessible via your domain (imcs.cl) with automatic HTTPS.

---

## 📋 Prerequisites

- Cloudflare account with domain (imcs.cl) added
- Cloudflare Tunnel created (cloudflared installed)
- Application running on http://192.168.1.89:3002

---

## 🔧 Configuration Steps

### Step 1: Access Cloudflare Dashboard

1. Log in to [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Select your domain: **imcs.cl**
3. Navigate to **Zero Trust** → **Access** → **Tunnels**

### Step 2: Create or Select Tunnel

If you don't have a tunnel yet:
1. Click **Create a tunnel**
2. Choose **Cloudflared**
3. Name your tunnel (e.g., "imc-server")
4. Install cloudflared on your server (192.168.1.89)
5. Copy the tunnel token

If you already have a tunnel:
1. Select your existing tunnel
2. Click **Configure**

### Step 3: Add Public Hostname

Click **Add a public hostname** and configure:

#### Hostname Configuration
```
Subdomain: [leave empty for root domain, or enter subdomain like "www" or "app"]
Domain: imcs.cl
Path: [leave empty]
```

**Examples:**
- Root domain: `imcs.cl` → Leave subdomain empty
- Subdomain: `www.imcs.cl` → Enter "www" in subdomain
- App subdomain: `app.imcs.cl` → Enter "app" in subdomain

#### Service Configuration
```
Type: HTTP
URL: http://192.168.1.89:3002
```

⚠️ **IMPORTANT:**
- Use **HTTP** (NOT HTTPS)
- Use the actual server IP: **192.168.1.89**
- Use the assigned port: **3002**
- Cloudflare handles HTTPS automatically for public access

### Step 4: Additional Settings (Optional)

#### HTTP Settings
- **No TLS Verify:** Disabled (not needed for HTTP)
- **HTTP Host Header:** Leave empty or set to your domain
- **Origin Server Name:** Leave empty

#### Advanced Settings
- **Proxy Type:** HTTP (default)
- **Connect Timeout:** 30s (default)
- **TCP Keep-Alive:** 30s (default)
- **No Happy Eyeballs:** Disabled (default)

### Step 5: Save Configuration

1. Click **Save hostname**
2. Wait for the tunnel to update (usually takes a few seconds)
3. Your application should now be accessible via your domain

---

## 🧪 Testing

### Test Local Access First
```bash
# From the server
curl http://192.168.1.89:3002

# From another machine on the network
curl http://192.168.1.89:3002
```

### Test Public Access
```bash
# Test your domain
curl https://imcs.cl

# Or open in browser
https://imcs.cl
```

---

## 📊 Configuration Summary

| Setting | Value |
|---------|-------|
| **Domain** | imcs.cl |
| **Service Type** | HTTP |
| **Service URL** | http://192.168.1.89:3002 |
| **Protocol** | HTTP → HTTPS (Cloudflare handles SSL) |
| **Server IP** | 192.168.1.89 |
| **Application Port** | 3002 |

---

## 🔍 Verification Checklist

- [ ] Application accessible locally: http://192.168.1.89:3002
- [ ] Cloudflare Tunnel status: Connected
- [ ] Public hostname configured correctly
- [ ] Domain resolves to Cloudflare
- [ ] HTTPS certificate active (automatic)
- [ ] Application accessible via domain: https://imcs.cl

---

## 🐛 Troubleshooting

### Tunnel Not Connecting

**Check tunnel status:**
```bash
# On the server where cloudflared is running
cloudflared tunnel info [tunnel-name]
```

**Restart tunnel:**
```bash
# If running as service
sudo systemctl restart cloudflared

# If running manually
cloudflared tunnel run [tunnel-name]
```

### 502 Bad Gateway Error

**Possible causes:**
1. Application not running
   ```bash
   docker ps | grep sitio-imc
   ```

2. Wrong port configured
   - Verify port 3002 is correct
   - Check application logs

3. Firewall blocking connection
   ```bash
   # Check if port is accessible
   telnet 192.168.1.89 3002
   ```

### 521 Web Server Is Down

**Check application status:**
```bash
# View application logs
docker logs h4k8g08gsc8w44cwc040og00

# Restart application if needed
docker restart h4k8g08gsc8w44cwc040og00
```

### SSL/TLS Errors

- Ensure you're using **HTTP** (not HTTPS) in the service URL
- Cloudflare handles SSL termination automatically
- Check Cloudflare SSL/TLS settings: should be "Full" or "Flexible"

---

## 🔐 Security Recommendations

1. **Enable Cloudflare Access Policies** (optional)
   - Restrict access by IP, email, or country
   - Add authentication layer

2. **Configure WAF Rules**
   - Protect against common attacks
   - Rate limiting

3. **Enable Bot Protection**
   - Block malicious bots
   - Challenge suspicious traffic

4. **Monitor Traffic**
   - Review Cloudflare Analytics
   - Set up alerts for unusual activity

---

## 📱 Multiple Domains/Subdomains

You can add multiple hostnames pointing to the same application:

### Example 1: Root + WWW
```
Hostname 1: imcs.cl → http://192.168.1.89:3002
Hostname 2: www.imcs.cl → http://192.168.1.89:3002
```

### Example 2: Multiple Subdomains
```
Hostname 1: app.imcs.cl → http://192.168.1.89:3002
Hostname 2: admin.imcs.cl → http://192.168.1.89:3002
Hostname 3: api.imcs.cl → http://192.168.1.89:3002
```

---

## 🔄 Updating Configuration

If you need to change the port or IP:

1. Go to Cloudflare Dashboard → Tunnels
2. Select your tunnel → Configure
3. Edit the public hostname
4. Update the Service URL
5. Save changes

---

## 📞 Support Resources

- **Cloudflare Tunnel Docs:** https://developers.cloudflare.com/cloudflare-one/connections/connect-apps/
- **Coolify Dashboard:** http://localhost:8000
- **Application Logs:** `docker logs h4k8g08gsc8w44cwc040og00`

---

## ✅ Quick Reference

**Correct Configuration:**
```
Type: HTTP
URL: http://192.168.1.89:3002
```

**Incorrect Configurations (DO NOT USE):**
```
❌ https://192.168.1.89:3002  (Don't use HTTPS)
❌ http://localhost:3002       (Don't use localhost)
❌ http://192.168.1.89:3000    (Wrong port)
```

---

**Last Updated:** January 15, 2026  
**Application:** Sitio IMC  
**Port:** 3002
