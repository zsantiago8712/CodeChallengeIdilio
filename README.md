# Catálogo de contenido (estilo Netflix)

Este proyecto es un monorepo que implementa un catálogo de shows con categorías, carruseles horizontales y pantalla de detalle, usando React Native, Expo, tRPC, Prisma y Supabase.

## Estructura del proyecto

El monorepo permite compartir lógica, tipos y UI entre frontend y backend, facilitando el desarrollo y la mantenibilidad. La UI es compartida entre web y móviles para maximizar la reutilización de componentes.

---

## Frontend

- **TanStack Query:** Usamos TanStack Query por su manejo automático de caché, facilidad de uso y porque elimina la necesidad de usar `useEffect` para los fetch; todo se gestiona con hooks dedicados.
- **NativeWind:** Elegimos NativeWind por la facilidad y rapidez para aplicar estilos con clases de Tailwind en React Native y web.
- **Expo:** Permite desarrollo rápido y despliegue multiplataforma (web, iOS, Android) con una sola base de código.
- **UI Compartida:** La interfaz se comparte entre web y móvil para mantener consistencia y reducir duplicidad de código.

---

## Backend

- **tRPC:** Usamos tRPC para tener tipado extremo a extremo entre frontend y backend, evitando errores y facilitando el desarrollo.
- **Prisma:** Prisma es nuestro ORM por su facilidad para migraciones, mantener la base de datos sincronizada entre entornos y su API intuitiva.
- **Supabase Client:** Utilizamos Supabase solo para almacenar imágenes de los shows, aprovechando su sistema de almacenamiento y hosting.
- **Fastify:** Elegimos Fastify por su rendimiento, bajo consumo de recursos y su integración sencilla con tRPC.

---

## Decisiones adicionales

- **Monorepo:** Permite compartir tipos, lógica y dependencias entre frontend y backend, acelerando el desarrollo y evitando inconsistencias.
- **Navegación:** Usamos `@react-navigation/native` para una navegación fluida y funcional entre pantallas.
- **Build y ejecución:** El proyecto se puede correr fácilmente con `pnpm run dev` para iniciar backend y frontend en paralelo.
- **Husky + ESLint + Prettier:** Usamos Husky para ejecutar lint y format en cada commit, asegurando calidad y estilo consistente en el código.

---

¿Quieres agregar alguna decisión técnica más o personalizar algún apartado?
