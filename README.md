# 🌍 SomoLink  
### AI-Powered Digital Learning Infrastructure

---

**SomoLink** is an **AI-native, solar-driven connectivity and education platform** built by [Wekkitech Limited](https://wekkitech.net) to deliver reliable, safe, and intelligent internet access to schools and communities across emerging regions.

It fuses **artificial intelligence, renewable energy, and open data** to create an adaptive network that learns from each connected site — optimizing bandwidth, caching educational content, ensuring child-safe browsing, and sustaining itself through community participation.

---

## 🧭 Vision

> To reimagine school connectivity as an **intelligent, inclusive public good** — turning digital access into measurable learning equity.

SomoLink provides **free internet for schools** and **affordable access for surrounding communities**, sustained through transparent, community-driven micropayments.  
It operates entirely on solar power, runs AI models locally for efficiency, and publishes anonymized performance data to support open, accountable education infrastructure.

---

## ⚙️ System Overview

SomoLink’s architecture is built around four intelligent layers:

| Layer | Description | Key Technologies |
|--------|--------------|------------------|
| **Edge Layer** | Solar-powered hardware at schools providing Wi-Fi, caching, and telemetry. | Go / Rust / Linux / TFLite / ONNX / MQTT |
| **AI & Data Layer** | Predictive models for solar energy, bandwidth optimization, anomaly detection, and learning analytics. | Python / PyTorch / LightGBM / MLflow / Airflow |
| **Backend Services** | APIs, billing, data ingestion, and federated learning orchestration. | FastAPI / NestJS / PostgreSQL / Kafka / gRPC |
| **Frontend & Dashboards** | School, community, and ops dashboards with real-time insights. | React / Next.js / Tailwind / Recharts / TypeScript |

---

## 🧠 Core Capabilities

- **AI-Powered QoS & Forecasting**  
  Machine learning models predict solar yield and dynamically allocate bandwidth to prioritize education traffic during school hours.

- **Edge Caching for Curriculum Access**  
  Locally caches educational content (Kiwix, Kolibri, OpenStax, etc.) to ensure continuity during outages or low bandwidth.

- **Child-Safe Browsing & Deep Search**  
  DNS and AI content filtering for pupils; open, deeper search for community users with safety boundaries.

- **Learning Analytics & Recommendations**  
  AI analyzes usage data to calculate *Connected Learning Hours (CLH)* and recommends improvements to teachers and administrators.

- **Sustainability Through Community Participation**  
  Schools connect free via unique codes; community access fees automatically fund school internet uptime and maintenance.

- **Open APIs & Transparency**  
  Public APIs expose uptime, learning hours, and sustainability metrics — promoting accountability and replication.

---

## 🧩 Repository Structure


Detailed breakdown in [`docs/architecture/overview.md`](docs/architecture/overview.md)

---

## 🔍 Key Components

| Component | Function | Location |
|------------|-----------|----------|
| **somolink-edge** | Edge agent for caching, telemetry, and safe-browsing | `/edge/agent` |
| **somolink-ai** | ML models: solar forecasting, QoS optimization, anomaly detection | `/ai/` |
| **somolink-dashboard** | School & community dashboards (Next.js) | `/apps/dashboard-school`, `/apps/dashboard-community` |
| **somolink-backend** | REST & gRPC APIs, billing, telemetry ingest | `/services/` |
| **somolink-infra** | Terraform, Kubernetes, and monitoring | `/infra/` |

---

## 🧱 Tech Stack Summary

| Domain | Tools |
|--------|-------|
| **Languages** | Python, Go, TypeScript, SQL |
| **AI/ML** | PyTorch, LightGBM, MLflow, ONNX Runtime |
| **Databases** | PostgreSQL, TimescaleDB, ClickHouse |
| **Message/Telemetry** | Kafka, MQTT, OpenTelemetry |
| **Frontend** | React, Next.js, Tailwind, Recharts |
| **Infrastructure** | Docker, Kubernetes, Terraform, Prometheus, Grafana |
| **Edge OS** | Ubuntu Core / Yocto Linux |
| **DevOps** | GitHub Actions, ArgoCD, Helm, Pre-commit |

---

## 🔒 Data Ethics & Privacy

- No personally identifiable information (PII) is stored.  
- Federated learning ensures local model training without data exposure.  
- All analytics are aggregated and anonymized before reporting.  
- Open **model cards** and **datasheets** document every AI component.

---

## 📈 Roadmap

| Phase | Duration | Objectives |
|--------|-----------|------------|
| **Phase 1** | Months 1–3 | Stabilize edge agent, deploy first 10 school pilots, launch dashboards. |
| **Phase 2** | Months 4–8 | Integrate federated learning, add gamified learning content, and expand to 25 schools. |
| **Phase 3** | Months 9–12 | Release open API, scale to 50 schools + 20 community hubs, and publish open-source toolkit. |

---

## 🤝 Contributors

| Name | Role | Focus Area |
|------|------|-------------|
| **Brill Okoth Owino** | CEO & Lead Engineer | Systems architecture & strategic direction |
| **Ian Gitonga** | UI/UX & API Integrations | Frontend and workflow logic |
| **Emmanuel Kibet** | AI/LLM Development | Machine learning & model integration |
| **Chrispine Owuor** | Backend & Database Engineer | Core API & data infrastructure |

---

## 🧾 License

This project is released under the **apache License**.  
See [LICENSE](LICENSE) for details.

---

## 📬 Contact

**Wekkitech Limited**  
📍 Nakuru, Kenya  
🌐 [wekkitech.net](https://wekkitech.net)  
📧 info@wekkitech.net  
🖇 [LinkedIn](https://linkedin.com/company/wekkitech)

---

> *“SomoLink transforms connectivity into a living, intelligent network — built for equity, powered by AI, and sustained by communities.”*



