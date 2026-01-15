#!/bin/bash

# ========================================
# Script de Verificación - Sitio IMC
# ========================================

echo "🔍 Verificando el deployment de Sitio IMC..."
echo "=============================================="

# Colores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Variables
SERVER_IP="192.168.1.89"
APP_PORT="3002"
APP_NAME="sitio-imc"

echo -e "${BLUE}📋 Información del Deployment:${NC}"
echo "   - Servidor: $SERVER_IP"
echo "   - Puerto: $APP_PORT"
echo "   - Aplicación: $APP_NAME"
echo ""

# 1. Verificar conectividad al servidor
echo -e "${BLUE}1. 🌐 Verificando conectividad al servidor...${NC}"
if ping -c 1 $SERVER_IP &> /dev/null; then
    echo -e "   ${GREEN}✅ Servidor $SERVER_IP es accesible${NC}"
else
    echo -e "   ${RED}❌ No se puede conectar al servidor $SERVER_IP${NC}"
    exit 1
fi

# 2. Verificar si el puerto está abierto
echo -e "${BLUE}2. 🔌 Verificando puerto $APP_PORT...${NC}"
if timeout 5 bash -c "</dev/tcp/$SERVER_IP/$APP_PORT" 2>/dev/null; then
    echo -e "   ${GREEN}✅ Puerto $APP_PORT está abierto${NC}"
    PORT_OPEN=true
else
    echo -e "   ${RED}❌ Puerto $APP_PORT no está accesible${NC}"
    PORT_OPEN=false
fi

# 3. Probar HTTP request
echo -e "${BLUE}3. 🌍 Probando acceso HTTP...${NC}"
if [ "$PORT_OPEN" = true ]; then
    HTTP_STATUS=$(curl -s -o /dev/null -w "%{http_code}" --connect-timeout 10 http://$SERVER_IP:$APP_PORT/ 2>/dev/null)
    if [ "$HTTP_STATUS" = "200" ]; then
        echo -e "   ${GREEN}✅ Aplicación responde correctamente (HTTP $HTTP_STATUS)${NC}"
        APP_WORKING=true
    elif [ "$HTTP_STATUS" = "000" ]; then
        echo -e "   ${RED}❌ No hay respuesta HTTP (timeout o conexión rechazada)${NC}"
        APP_WORKING=false
    else
        echo -e "   ${YELLOW}⚠️  Aplicación responde con HTTP $HTTP_STATUS${NC}"
        APP_WORKING=false
    fi
else
    echo -e "   ${RED}❌ No se puede probar HTTP (puerto cerrado)${NC}"
    APP_WORKING=false
fi

# 4. Verificar contenido de la respuesta
if [ "$APP_WORKING" = true ]; then
    echo -e "${BLUE}4. 📄 Verificando contenido de la respuesta...${NC}"
    RESPONSE=$(curl -s --connect-timeout 10 http://$SERVER_IP:$APP_PORT/ 2>/dev/null)
    if echo "$RESPONSE" | grep -q "IMC\|Servicios\|Chile" 2>/dev/null; then
        echo -e "   ${GREEN}✅ Contenido de la aplicación detectado${NC}"
    else
        echo -e "   ${YELLOW}⚠️  Respuesta recibida pero contenido no reconocido${NC}"
    fi
fi

# 5. Verificar otros puertos comunes
echo -e "${BLUE}5. 🔍 Verificando otros puertos...${NC}"
PORTS_TO_CHECK=(3001 3003 8080 80 443)
for port in "${PORTS_TO_CHECK[@]}"; do
    if timeout 2 bash -c "</dev/tcp/$SERVER_IP/$port" 2>/dev/null; then
        echo -e "   ${GREEN}✅ Puerto $port está abierto${NC}"
    else
        echo -e "   ${RED}❌ Puerto $port está cerrado${NC}"
    fi
done

# 6. Verificar DNS/resolución
echo -e "${BLUE}6. 🌐 Verificando resolución DNS...${NC}"
if nslookup $SERVER_IP &> /dev/null; then
    echo -e "   ${GREEN}✅ Resolución DNS funciona${NC}"
else
    echo -e "   ${YELLOW}⚠️  Problemas con resolución DNS (usando IP directa)${NC}"
fi

# Resumen final
echo ""
echo "=============================================="
echo -e "${BLUE}📊 RESUMEN DE VERIFICACIÓN${NC}"
echo "=============================================="

if [ "$APP_WORKING" = true ]; then
    echo -e "${GREEN}🎉 ¡ÉXITO! La aplicación está funcionando correctamente${NC}"
    echo -e "${GREEN}   Accede a: http://$SERVER_IP:$APP_PORT${NC}"
else
    echo -e "${RED}❌ PROBLEMA: La aplicación no está accesible${NC}"
    echo ""
    echo -e "${YELLOW}🔧 PASOS RECOMENDADOS:${NC}"
    echo "   1. Verifica que el contenedor esté corriendo"
    echo "   2. Revisa los logs en Coolify Dashboard"
    echo "   3. Confirma el mapeo de puertos (3002:8080)"
    echo "   4. Reinicia la aplicación si es necesario"
    echo ""
    echo -e "${BLUE}📋 Información útil:${NC}"
    echo "   - Coolify Dashboard: http://localhost:8000"
    echo "   - UUID Aplicación: a0kos0wc8ws00804cc44gskw"
    echo "   - Consulta: TROUBLESHOOTING.md"
fi

echo ""
echo -e "${BLUE}📅 Verificación completada: $(date)${NC}"