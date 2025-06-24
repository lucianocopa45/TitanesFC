# 🏟️ TitanesFC – Club Deportivo Titanes FC

![Angular](https://img.shields.io/badge/Angular-v19-red?logo=angular)
![Node.js](https://img.shields.io/badge/Node.js-v18.x-green?logo=node.js)
![SQL Server](https://img.shields.io/badge/SQL_Server-Windows-blue?logo=microsoft)
![Estado](https://img.shields.io/badge/Estado-En%20Desarrollo-yellow)
![Licencia](https://img.shields.io/badge/Licencia-MIT-lightgrey)

Aplicación web **fullstack** para la gestión de socios, profesores y actividades deportivas. Desarrollada como proyecto integrador utilizando Angular, Node.js y SQL Server.

---

## 🚀 Tecnologías utilizadas

### 🧩 Frontend
- [Angular v19](https://angular.io)
- Formularios reactivos

### 🔧 Backend
- [Node.js](https://nodejs.org) con [Express](https://expressjs.com/)
- Endpoints RESTful
- Manejo de datos en formato JSON
- CORS habilitado
- Conexión a SQL Server mediante [`msnodesqlv8`](https://www.npmjs.com/package/msnodesqlv8)

### 🗃️ Base de Datos
- [SQL Server](https://www.microsoft.com/es-es/sql-server) con autenticación Windows
- Tablas: socios, profesores, actividades, inscripciones

### 🎨 Diseño UI/UX
- Prototipo realizado en Figma  
  [🔗 Ver diseño en Figma](https://www.figma.com/design/rPCyLBC6D6kpHGGrGNeJxP/TitanesFC-Dise%C3%B1o?node-id=0-1&t=htt6OfL6Yopi2nlJ-1](https://www.figma.com/design/rPCyLBC6D6kpHGGrGNeJxP/TitanesFC-Dise%C3%B1o?node-id=0-1&t=5cku1ulKsIKxSd2N-1)

---

## ✅ Funcionalidades principales

### 🔐 Autenticación
- Registro e inicio de sesión
- Acceso restringido a administradores
- Redirección al panel correspondiente post-login

### 👥 Gestión de Socios
- ABM completo de socios
- Cálculo automático de cuota según categoría

### 🧑‍🏫 Gestión de Profesores
- Alta, modificación y eliminación de profesores
- Asignación de múltiples actividades por profesor

### 🏐 Gestión de Actividades
- ABM de actividades deportivas
- Validación de cupos disponibles
- Inscripción y cancelación de socios a actividades

### 📬 Formularios
- Formulario de contacto general
- Validaciones usando formularios reactivos (Angular)

---

## 🔀 Flujo de trabajo con Git y GitHub

- Ramas organizadas: `feature/`, `develop`, `main`
- Commits semánticos y descriptivos
- Pull requests para revisión de código
- Merge a `main` tras validación en `develop`
- Resolución de conflictos de manera colaborativa
- GitHub como repositorio remoto

---

## ⚙️ Instalación local

### 1. Clonar los repositorios

#### Frontend
```bash
git clone https://github.com/lucianocopa45/TitanesFC.git
npm install
```

### Base de datos
```bash
https://drive.google.com/file/d/1bi18fctNCK-rPYKYECYA-Vm7Z0RhaHwZ/view?usp=drive_link
```

### Backend
```bash
git clone https://github.com/AndresIFTS24/backendTitanes.git
npm install
```
