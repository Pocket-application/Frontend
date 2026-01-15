# Pocket-App

Pocket-App es una aplicación de finanzas personales diseñada para gestionar movimientos, transferencias, categorías y cuentas. Permite visualizar reportes financieros, realizar reajustes de saldo y analizar tendencias de ingresos y egresos.

## Tecnologías
- **Frontend:** React 19, Tailwind CSS, Recharts, Lucide-React
- **Backend:** FastAPI
- **Base de datos:** PostgreSQL
- **Cache:** Redis


## Funcionalidades

### Dashboard
- Visualización de movimientos recientes
- Balance general (ingresos, egresos)
- Gráfico de torta comparativo

### Flujos
- Listado de movimientos
- Filtros por mes, rango de fechas, categoría, tipo de movimiento
- Crear, editar y eliminar movimientos
- Pagination

### Transferencias
- Listado de transferencias entre cuentas
- Crear, editar y eliminar transferencias
- Filtros por fecha y cuenta

### Categorías
- Visualización de categorías separadas por ingresos y egresos
- Crear, editar y eliminar categorías
- Modal para acciones

### Cuentas
- Listado de cuentas con saldo
- Crear, editar y eliminar cuentas
- Reajuste de saldo con modal interactivo

### Reportes
- Resumen general de ingresos, egresos, balance y número de movimientos
- Visualización por categorías con gráficos de torta o barras
- Visualización por cuentas: saldo inicial vs saldo final, ingresos y egresos
- Evolución en el tiempo: línea de saldo acumulado diario
- Filtros: rango de fechas, tipo de movimiento, categoría y cuenta
- Extras: Top 5 categorías, comparativa mensual

## Instalación

1. Clonar el repositorio
```
git clone <repo-url>
```
2. Instalar dependencias
```
npm install
```
3. Iniciar la aplicación
```
npm start
```

## Buenas prácticas
- Separar componentes por funcionalidad y sección
- Usar modales para acciones de creación y edición
- Mantener consistencia de colores y tipografía con Tailwind
- Formatear montos y saldos con separador de miles y dos decimales
- Evitar movimientos duplicados y transferencias internas en cálculos de reportes

## Contacto
- Desarrollador: Oscar Palomino
- Email: ing.oscarp1@gmail.com

