# Portfolio - AI Engineer

Portfolio web profesional y moderno para mostrar proyectos de Inteligencia Artificial y Machine Learning.

## Características

- Diseño moderno y profesional con tema oscuro
- Totalmente responsive (móvil, tablet, desktop)
- Animaciones suaves y efectos visuales
- Secciones optimizadas para AI Engineer:
  - Presentación personalizada
  - Sobre mí
  - Habilidades técnicas en IA/ML
  - Galería de proyectos
  - Información de contacto
- Navegación fluida con scroll suave
- Menú hamburguesa para móviles

## Tecnologías Utilizadas

- HTML5
- CSS3 (con variables CSS y Grid/Flexbox)
- JavaScript (Vanilla)
- Font Awesome (para iconos)

## Instalación y Uso

### Opción 1: Abrir directamente

1. Abre el archivo `index.html` en tu navegador web favorito
2. El portfolio se cargará automáticamente

### Opción 2: Servidor local

Para una mejor experiencia, puedes usar un servidor local:

#### Con Python:
```bash
# Python 3
python -m http.server 8000

# Luego abre en el navegador: http://localhost:8000
```

#### Con Node.js (usando http-server):
```bash
# Instalar http-server globalmente
npm install -g http-server

# Ejecutar servidor
http-server

# Abrir en el navegador: http://localhost:8080
```

#### Con VS Code:
- Instala la extensión "Live Server"
- Click derecho en `index.html` > "Open with Live Server"

## Personalización

### 1. Información Personal

Edita `index.html` y actualiza:
- Nombre en la sección hero (línea 33)
- Texto "Sobre Mí" (líneas 46-48)
- Email y enlaces de redes sociales (líneas 159-170)

### 2. Proyectos

Modifica los proyectos en la sección de proyectos (líneas 91-157):
- Título del proyecto
- Descripción
- Tecnologías utilizadas (tags)
- Enlaces a GitHub y demos

Para agregar más proyectos, copia uno de los bloques `.project-card` y personalízalo.

### 3. Habilidades

Actualiza las habilidades en la sección skills (líneas 55-88):
- Cambia los títulos
- Modifica las tecnologías listadas
- Cambia los iconos de Font Awesome si lo deseas

### 4. Colores y Estilos

Edita las variables CSS en `styles.css` (líneas 9-16):
```css
:root {
    --primary-color: #6366f1;
    --secondary-color: #8b5cf6;
    --dark-bg: #0f172a;
    --light-bg: #1e293b;
    --text-primary: #f1f5f9;
    --text-secondary: #cbd5e1;
    --accent: #22d3ee;
}
```

### 5. Iconos

Los iconos vienen de Font Awesome. Puedes cambiarlos usando cualquier icono de:
https://fontawesome.com/icons

Ejemplo: `<i class="fas fa-robot"></i>`

## Estructura de Archivos

```
Portfolio/
│
├── index.html          # Estructura principal del portfolio
├── styles.css          # Estilos y diseño
├── script.js           # Interactividad y animaciones
└── README.md          # Documentación
```

## Características Destacadas

### Responsive Design
- Diseño adaptativo para todas las pantallas
- Menú hamburguesa en móviles
- Grid flexible para proyectos y habilidades

### Animaciones
- Efecto de aparición al hacer scroll
- Hover effects en tarjetas
- Transiciones suaves
- Efecto de escritura en el título (opcional)

### Navegación
- Scroll suave entre secciones
- Indicador de sección activa en la navegación
- Navbar con efecto de transparencia

## Consejos de Personalización

1. **Imágenes de Proyectos**: Puedes reemplazar los iconos de Font Awesome con imágenes reales:
   ```html
   <div class="project-image">
       <img src="ruta/a/tu/imagen.jpg" alt="Proyecto">
   </div>
   ```

2. **Agregar CV para Descargar**:
   ```html
   <a href="tu-cv.pdf" download class="btn btn-primary">Descargar CV</a>
   ```

3. **Integrar Formulario de Contacto**: Considera usar servicios como Formspree o EmailJS para agregar un formulario funcional.

4. **Analytics**: Agrega Google Analytics o similar para trackear visitantes.

## Despliegue

### GitHub Pages (Gratis)
1. Crea un repositorio en GitHub
2. Sube estos archivos
3. Ve a Settings > Pages
4. Selecciona la rama main
5. Tu sitio estará en: `https://tu-usuario.github.io/nombre-repo`

### Netlify (Gratis)
1. Arrastra la carpeta del proyecto a netlify.com/drop
2. Tu sitio se desplegará automáticamente

### Vercel (Gratis)
1. Instala Vercel CLI: `npm i -g vercel`
2. Ejecuta: `vercel`
3. Sigue las instrucciones

## Próximas Mejoras Sugeridas

- [ ] Agregar sección de blog
- [ ] Integrar formulario de contacto funcional
- [ ] Modo claro/oscuro toggle
- [ ] Sección de certificaciones
- [ ] Testimonios de clientes/colegas
- [ ] Integración con CMS (Content Management System)
- [ ] Versión multiidioma

## Licencia

Este proyecto es de uso libre. Siéntete libre de usarlo y modificarlo según tus necesidades.

## Soporte

Para cualquier pregunta o sugerencia, no dudes en contactar.

---

Desarrollado con dedicación para AI Engineers
