# Catálogo de contenido móvil (estilo Netflix)

Esta aplicación móvil implementa un catálogo de shows con categorías, carruseles
horizontales y pantalla de detalle, diseñada específicamente para Android e iOS
usando React Native, Expo, tRPC, Prisma y Supabase.

## 📋 Reto Técnico Original

**[Ver documento completo del reto técnico](./Reto%20técnico.pdf)**

Este proyecto fue desarrollado como respuesta al reto técnico de Idilio, donde
se solicitaba crear una aplicación móvil de catálogo de contenido con
funcionalidades específicas de navegación, categorización y detalle de shows.

## 🎥 Video Demostración

**[Ver demostración completa de la aplicación](https://www.loom.com/share/37320db31dfe4661a78cd2e6ddbe57a1?sid=e7d24eeb-1c27-45a5-a30a-87ecd7bd3cec)**

El video muestra todas las funcionalidades implementadas, navegación entre
pantallas y componentes técnicos de la aplicación.

## Estructura del proyecto

El monorepo permite compartir lógica, tipos y UI entre frontend móvil y backend,
facilitando el desarrollo y la mantenibilidad. La interfaz está optimizada
exclusivamente para dispositivos móviles con una experiencia de usuario nativa.

---

## Frontend

- **TanStack Query:** Usamos TanStack Query por su manejo automático de caché,
  facilidad de uso y porque elimina la necesidad de usar `useEffect` para los
  fetch; todo se gestiona con hooks dedicados.
- **Gluestack UI + NativeWind:** Cambiamos a Gluestack UI por simplicidad y
  componentes precreados que eliminan la necesidad de StyleSheets. Con
  NativeWind, aplicamos estilos usando clases de Tailwind de forma más intuitiva
  y mantenible.
- **Expo:** Permite desarrollo rápido y despliegue para iOS y Android con una
  sola base de código optimizada para móviles.
- **UI Móvil Nativa:** La interfaz está diseñada específicamente para
  dispositivos móviles, aprovechando las características nativas de Android e
  iOS.

---

## Backend

- **tRPC:** Usamos tRPC para tener tipado extremo a extremo entre frontend y
  backend, evitando errores y facilitando el desarrollo.
- **Prisma:** Prisma es nuestro ORM por su facilidad para migraciones, mantener
  la base de datos sincronizada entre entornos y su API intuitiva.
- **Supabase Client:** Utilizamos Supabase solo para almacenar imágenes de los
  shows, aprovechando su sistema de almacenamiento y hosting.
- **Fastify:** Elegimos Fastify por su rendimiento, bajo consumo de recursos y
  su integración sencilla con tRPC.

---

## Decisiones adicionales

- **Monorepo:** Permite compartir tipos, lógica y dependencias entre frontend y
  backend, acelerando el desarrollo y evitando inconsistencias.
- **Navegación:** Usamos `@react-navigation/native` para una navegación fluida y
  funcional entre pantallas.
- **Build y ejecución:** El proyecto se puede correr fácilmente con
  `pnpm run dev` para iniciar backend y frontend en paralelo.
- **Husky + ESLint + Prettier:** Usamos Husky para ejecutar lint y format en
  cada commit, asegurando calidad y estilo consistente en el código.

---

## 🚀 Cómo ejecutar el proyecto

**⚠️ RECOMENDACIÓN IMPORTANTE:** Se recomienda ejecutar el backend y frontend
por separado para un mejor control y debugging.

### Backend (Puerto 3000)

```bash
# Terminal 1 - Ejecutar el servidor backend
pnpm run dev:back
```

### Frontend (Expo)

```bash
# Terminal 2 - Ejecutar la aplicación móvil
pnpm run dev:front
```

### Comandos adicionales disponibles

```bash
# Linting y formato de código
pnpm run lint
pnpm run lint:fix
pnpm run format

# Base de datos y datos de prueba
pnpm prisma:generate  # Genera el cliente Prisma
pnpm prisma:migrate   # Ejecuta migraciones
pnpm run seed         # Pobla la base de datos con shows e imágenes

# Ejecutar en plataformas específicas
pnpm --filter frontend run ios
pnpm --filter frontend run android
pnpm --filter frontend run web
```

---

## ⚙️ Configuración de Variables de Entorno

La aplicación requiere configuración de variables de entorno tanto para el
backend como para el frontend. Se incluyen archivos `.env.example` como
plantillas.

### Backend (packages/api/.env)

```bash
# Base de datos PostgreSQL
DATABASE_URL="postgresql://usuario:password@host:puerto/nombre_bd"

# Supabase - Para almacenamiento de imágenes
SUPABASE_URL="https://tu-proyecto.supabase.co"
SUPABASE_ANON_KEY="tu_anon_key_aqui"
SUPABASE_SERVICE_ROLE_KEY="tu_service_role_key_aqui"
```

### Frontend (apps/frontend/.env)

```bash
# Configuración del backend
# Opciones: 'localhost' para desarrollo local o 'ngrok' para testing remoto
EXPO_PUBLIC_BACKEND_MODE=localhost

# URL local de desarrollo (actualiza la IP con tu dirección local)
EXPO_PUBLIC_LOCAL_BACKEND_URL=http://192.168.68.111:3000/trpc

# URL de ngrok (actualiza cuando reinicies ngrok)
EXPO_PUBLIC_NGROK_BACKEND_URL=https://your-ngrok-url.ngrok-free.app/trpc
```

### 🗃️ Configuración de Supabase

La aplicación utiliza **Supabase** para:

- **PostgreSQL Database:** Base de datos principal para almacenar shows,
  categorías y ratings
- **Storage:** Almacenamiento de imágenes de shows (posters y banners)

#### Pasos para configurar Supabase

1. **Crear proyecto** en [supabase.com](https://supabase.com)
2. **Copiar credenciales** del dashboard de tu proyecto
3. **Configurar Storage bucket** llamado `show-images` (público)
4. **Actualizar variables** en `.env` del backend

### 🌱 Poblar la Base de Datos

Después de configurar las variables de entorno, ejecuta el script de seed para
poblar la base de datos con shows de ejemplo:

```bash
# Poblar base de datos con shows e imágenes
pnpm run seed
```

**El script de seed:**

- Crea categorías predefinidas (Action, Comedy, Drama, etc.)
- Inserta 100+ shows con datos realistas
- Sube imágenes automáticamente a Supabase Storage
- Genera ratings aleatorios para cada show
- Crea datos de prueba completos para testing

---

## 🗄️ Base de Datos

La aplicación utiliza **Prisma** como ORM, evitando completamente el uso de
consultas SQL directas. Esto proporciona:

- **Type Safety** completo entre backend y base de datos
- **Migrations** automáticas y versionadas
- **Schema declarativo** fácil de mantener
- **Query optimization** automática
- **Relaciones** manejadas de forma elegante

### Beneficios de usar Prisma

- No hay consultas SQL escritas manualmente
- Autocompletado y validación de tipos en tiempo de desarrollo
- Migraciones seguras y reversibles
- Introspección automática del esquema

---

## 🤖 Uso de IA en el Desarrollo

Durante el desarrollo de este proyecto, se utilizó inteligencia artificial
únicamente para:

- **Consultas de documentación** técnica
- **Resolución de errores** específicos de sintaxis
- **Clarificaciones** sobre mejores prácticas
- **Ejemplos de uso** de librerías específicas

**Importante:** La lógica de negocio, arquitectura del proyecto, y
implementación de funcionalidades fueron desarrolladas completamente de forma
manual, sin generación automática de código por IA.

---

## 🚀 Mejoras Futuras y Funcionalidades Adicionales

Si hubiéramos tenido más tiempo, se habrían implementado las siguientes
funcionalidades para llevar la aplicación al siguiente nivel:

### **🔐 Autenticación y Perfiles**

- **Sistema de login/registro** con email y contraseña
- **Autenticación social** (Google, Apple, Facebook)
- **Perfiles múltiples** por cuenta (como Netflix)
- **Preferencias personalizadas** por usuario
- **Historial de visualización** y progreso de episodios
- **Recomendaciones basadas** en el comportamiento del usuario

### **🎨 Carrusel de Imágenes Avanzado**

- **Múltiples imágenes** por show (posters, screenshots, artwork)
- **Carrusel automático** que se mueve solo cada 3-5 segundos
- **Indicadores de navegación** (dots, flechas)
- **Transiciones suaves** con animaciones nativas
- **Lazy loading** para optimizar rendimiento
- **Zoom y pan** en imágenes de alta resolución

### **🎬 Funcionalidades de Streaming**

- **Reproductor de video** integrado
- **Controles de reproducción** personalizados
- **Subtítulos** y opciones de audio
- **Calidad adaptativa** según conexión
- **Descarga offline** para ver sin internet
- **Chromecast** y AirPlay support

### **📱 Experiencia de Usuario Avanzada**

- **Modo offline** completo
- **Notificaciones push** para nuevos episodios
- **Tema claro/oscuro** configurable
- **Accesibilidad** mejorada (VoiceOver, TalkBack)
- **Gestos avanzados** (swipe para like, pull to refresh)
- **Modo landscape** optimizado

### **⚡ Optimizaciones Técnicas**

- **Cache avanzado** con persistencia local
- **Precarga inteligente** de contenido
- **Optimización de imágenes** automática
- **Bundle splitting** para carga más rápida
- **Métricas de rendimiento** y analytics
- **Error boundary** y crash reporting

### **🔍 Funcionalidades de Descubrimiento**

- **Filtros avanzados** (año, género, rating, duración)
- **Búsqueda por voz** usando Speech-to-Text
- **Recomendaciones IA** basadas en ML
- **Trending** y contenido popular
- **Listas curadas** por editores
- **Función "Random"** para descubrir contenido

### **👥 Funcionalidades Sociales**

- **Compartir shows** con amigos
- **Reseñas y comentarios** de usuarios
- **Listas colaborativas** entre amigos
- **Sistema de seguimiento** de amigos
- **Ratings y recomendaciones** sociales
- **Watch parties** virtuales

### **📊 Dashboard y Analytics**

- **Panel de administración** para gestión de contenido
- **Métricas de uso** y engagement
- **A/B testing** para nuevas features
- **Sistema de reportes** y moderación
- **Analytics de comportamiento** de usuario

---
