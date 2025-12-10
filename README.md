# 2048 Game – Docker Edition
Este proyecto es una implementación del clásico juego **2048** usando **HTML, CSS y JavaScript**, ejecutado dentro de un contenedor **Docker** para facilitar la portabilidad y evaluación.

## Requisitos
- Tener instalado **Docker** y **docker-compose**.

---
## Path
```bash
└── Globant-2048
    ├── docker-compose.yml
    ├── Dockerfile
    ├── Makefile
    ├── nginx
    │   └── default.conf
    ├── README.md
    └── src
        ├── img
        │   └── tutorial.png
        ├── index.html
        ├── script.js
        └── styles.css
```

---
## Requisitos
- Entorno compatible con contenedores: Linux, macOS o WSL2 (Windows).
- Tener instalado **Docker** y **docker-compose**.

### 🐧 Linux / WSL
```bash
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
```

### 🪟Windows
Descarga e instala Docker Desktop desde:
- https://www.docker.com/products/docker-desktop/
```bash
docker --version
```

## 📸 Vista del Proyecto
![2048](./public/2048.png)

## Cómo ejecutar el juego

### 🐧 Linux / WSL
```bash
git clone https://github.com/ZTerto/Globant-2048.git
cd Globant-2048
make up
xdg-open http://127.0.0.1:8080
```

### 🪟Windows
```bash
git clone https://github.com/ZTerto/Globant-2048.git
cd Globant-2048
make up
start http://127.0.0.1:8080
```