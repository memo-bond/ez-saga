# 🧩 Easy Saga — Infra & Saga Orchestration Platform

**Easy Saga** is a developer-first platform to define, manage, and deploy distributed systems with the **Saga Compensation Pattern** — all through a clean, modern UI.

No CLI. No YAML editing. Just build systems and services, choose your infrastructure (Redis, MySQL, Kafka, Grafana...), and let Easy Saga generate and manage everything — from Velocity-based Kubernetes manifests to Kafka-driven orchestration.

---

## 🚀 Key Features

### 🔧 System & Environment Management
- Define multi-env systems (dev, staging, prod, etc.)
- Per-env namespace + isolation
- RBAC-ready

### ⚙️ Infra-as-a-Service (Stack-as)
- Choose Redis, MySQL, Kafka, Grafana, ELK, and more
- Configure replica counts, clustering, external/internal
- Render K8s YAML from **Velocity templates**
- Export as ZIP or deploy with 1-click

### 🔄 Saga Compensation Engine
- Define saga flows visually or in YAML
- Kafka-based event orchestration
- Decoupled service communication with compensation handling

### 📊 Monitoring & Observability
- Grafana dashboards per system/env
- ELK + Jaeger support
- Status tracking: running/stopped services, pod health, topic sync

---

## 🧠 Architecture Highlights

- 🧱 **Monorepo**: `apps/`, `core/`, `infra/`, `templates/`
- 🎯 **Java 21 + Spring Boot** backend
- 🎨 **React + Tailwind** modern UI
- ✍️ **Velocity templates** for dynamic Kubernetes YAML
- 📦 Export infrastructure as GitOps-ready bundles
- 🔐 JWT-based authentication (Admin UI ready)

---

## ✨ Example Use Case: Ecommerce System

1. Create system `ecommerce`, add `dev` and `prod` environments
2. Select stacks: ✅ Redis (3 replicas), ✅ MySQL, ✅ Grafana
3. Define services: `order-service`, `inventory-service`
4. Design saga: `order → reserve-inventory → payment → ship`
5. Export YAMLs or apply directly to K8s

> Saga orchestration, Kafka topics, infra provisioning — done automatically.

---

## 📦 Quickstart

> Coming soon in v1.0 — deployment guide, Helm chart, and GitHub Actions.

---

## ✅ Easy Saga Project Checklist

### ⏳ In Progress
- [ ] Easy Saga Admin

### 🍀 Backlog
- [ ] Backend API
- [ ] Saga Engine
- [ ] GitOps Export
- [ ] Monitoring (integration planned)


---

## 🤝 Contribute

Easy Saga is built for platform teams, DevOps engineers, and backend developers who want to stop hand-wiring infra and start focusing on business logic.


## 💖 Credit

- louis.huyle@outlook.com