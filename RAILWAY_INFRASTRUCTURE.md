# Railway Infrastructure Documentation

> **Last Updated**: January 1, 2026  
> **Account**: George Apostolakis (ga109uk@icloud.com)

---

## Project Overview

| Property | Value |
|----------|-------|
| **Project Name** | life |
| **Project ID** | `d135c64e-c56c-4869-aa24-b3d5c8579b95` |
| **Environment** | production |
| **Environment ID** | `185326a8-802c-4cda-b6bd-a686c3d2272e` |

---

## Services Architecture

The project consists of **3 services**:

```
┌─────────────────────────────────────────────────────────────────┐
│                         Railway Project: life                    │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌──────────────┐   ┌──────────────┐   ┌──────────────┐        │
│  │     Life     │   │   Postgres   │   │    Qdrant    │        │
│  │  (Node.js)   │──▶│  (Database)  │   │  (Vector DB) │        │
│  │   Port 8080  │   │   Port 5432  │   │   Port 6333  │        │
│  └──────────────┘   └──────────────┘   └──────────────┘        │
│         │                  │                   │                 │
│         │                  │                   │                 │
│         ▼                  ▼                   ▼                 │
│  ┌──────────────┐   ┌──────────────┐   ┌──────────────┐        │
│  │   Public     │   │postgres-volume│   │qdrant-volume │        │
│  │   Domain     │   │  1107MB/50GB │   │  1060MB/50GB │        │
│  └──────────────┘   └──────────────┘   └──────────────┘        │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## Service Details

### 1. Life (Main Application)

| Property | Value |
|----------|-------|
| **Service Name** | Life |
| **Service ID** | `1107dd01-d3d0-40ce-9e67-7af17e21ac0f` |
| **Type** | Node.js Application |
| **Port** | 8080 |
| **Public Domain** | `https://life-production-1b7b.up.railway.app` |
| **Private Domain** | `life.railway.internal` |
| **Deployment Status** | SUCCESS |
| **Latest Deployment** | `3e361773-2d03-4e75-8997-59055be824a0` (2026-01-01) |

#### Build Configuration
- **Build Tool**: Railpack (Nixpacks successor)
- **Runtime**: Node.js
- **Start Command**: `npm start` → `node src/server.js`
- **Build Time**: ~25 seconds

#### Application Variables

| Variable | Value | Description |
|----------|-------|-------------|
| `DATABASE_URL` | `postgresql://postgres:***@postgres.railway.internal:5432/railway` | Internal Postgres connection |
| `DEEPSEEK_API_KEY` | `sk-8114cd34f84745a39a36c328fb61b0b1` | DeepSeek API key |
| `DEEPSEEK_BASE_URL` | `https://api.deepseek.com/v1` | DeepSeek API endpoint |
| `DEEPSEEK_MODEL` | `deepseek-chat` | DeepSeek model name |
| `VENICE_API_KEY` | `WBF7_AVts7Wp8Qdk5F3sDeVaNemNrWWGJaE09tn5fJ` | Venice.ai API key |
| `VENICE_BASE_URL` | `https://api.venice.ai/api/v1` | Venice.ai API endpoint |
| `VENICE_MODEL` | `venice-uncensored` | Venice model name |
| `EMBEDDINGS_API_KEY` | `WBF7_AVts7Wp8Qdk5F3sDeVaNemNrWWGJaE09tn5fJ` | Embeddings API key (Venice) |
| `EMBEDDINGS_BASE_URL` | `https://api.venice.ai/api/v1` | Embeddings API endpoint |
| `EMBEDDINGS_MODEL` | `text-embedding-bge-m3` | Embeddings model |
| `EMBEDDINGS_DIM` | `1024` | Embedding vector dimensions |
| `EMBEDDINGS_PROVIDER` | `venice` | Embeddings provider name |
| `QDRANT_URL` | `http://qdrant-production-4495.up.railway.app` | Qdrant vector DB URL |

---

### 2. Postgres (Relational Database)

| Property | Value |
|----------|-------|
| **Service Name** | Postgres |
| **Service ID** | `eb744cdb-ed0d-49d3-a9a4-49de3b5c6cda` |
| **Type** | PostgreSQL Database |
| **Version** | PostgreSQL 17.7 (Debian) |
| **Port (Internal)** | 5432 |
| **Port (Public)** | 25006 |
| **Deployment Status** | SUCCESS |
| **Deployment Date** | 2025-12-25 |

#### Connection Details

**Internal (Railway Network)**
```
Host: postgres.railway.internal
Port: 5432
Database: railway
User: postgres
Password: vDYIZDJTNgEKgZHPTOsJtKwkmJSowLcL
```

**External (Public Access)**
```
Host: turntable.proxy.rlwy.net
Port: 25006
Database: railway
User: postgres
Password: vDYIZDJTNgEKgZHPTOsJtKwkmJSowLcL
```

**Connection URLs**
```bash
# Internal
postgresql://postgres:vDYIZDJTNgEKgZHPTOsJtKwkmJSowLcL@postgres.railway.internal:5432/railway

# External
postgresql://postgres:vDYIZDJTNgEKgZHPTOsJtKwkmJSowLcL@turntable.proxy.rlwy.net:25006/railway
```

#### Volume Configuration

| Property | Value |
|----------|-------|
| **Volume Name** | postgres-volume |
| **Volume ID** | `9ca7c2fa-af65-490d-937e-c0dfd670e141` |
| **Mount Path** | `/var/lib/postgresql/data` |
| **Storage Used** | 1107 MB |
| **Storage Limit** | 50,000 MB (50 GB) |

#### Database Schema

**Tables:**

1. **`blocks`** - Main content storage
   | Column | Type | Nullable | Default |
   |--------|------|----------|---------|
   | `id` | UUID | NOT NULL | `gen_random_uuid()` |
   | `ts` | TIMESTAMPTZ | NOT NULL | `now()` |
   | `source` | TEXT | NOT NULL | - |
   | `text` | TEXT | NOT NULL | - |
   | `visibility` | TEXT | NOT NULL | `'public'` |
   | `request_id` | TEXT | NULL | - |
   | `embedding` | DOUBLE PRECISION[] | NULL | - |
   
   **Indexes:**
   - `blocks_pkey` - PRIMARY KEY on `id`
   - `idx_blocks_ts_desc` - B-tree on `ts DESC`
   
   **Record Count:** 16

2. **`request_log`** - API request logging
   | Column | Type | Nullable | Default |
   |--------|------|----------|---------|
   | `request_id` | TEXT | NOT NULL | - |
   | `response` | JSONB | NOT NULL | - |
   | `created_at` | TIMESTAMPTZ | NOT NULL | `now()` |
   
   **Indexes:**
   - `request_log_pkey` - PRIMARY KEY on `request_id`
   
   **Record Count:** 18

3. **`scene_cache`** - Scene caching
   | Column | Type | Nullable | Default |
   |--------|------|----------|---------|
   | `id` | INTEGER | NOT NULL | - |
   | `scene_package` | TEXT | NOT NULL | `''` |
   | `updated_at` | TIMESTAMPTZ | NOT NULL | `now()` |
   
   **Indexes:**
   - `scene_cache_pkey` - PRIMARY KEY on `id`
   
   **Record Count:** 1

#### Postgres Environment Variables

| Variable | Value |
|----------|-------|
| `PGDATA` | `/var/lib/postgresql/data/pgdata` |
| `PGDATABASE` | `railway` |
| `PGHOST` | `postgres.railway.internal` |
| `PGPORT` | `5432` |
| `PGUSER` | `postgres` |
| `PGPASSWORD` | `vDYIZDJTNgEKgZHPTOsJtKwkmJSowLcL` |
| `POSTGRES_DB` | `railway` |
| `POSTGRES_USER` | `postgres` |
| `POSTGRES_PASSWORD` | `vDYIZDJTNgEKgZHPTOsJtKwkmJSowLcL` |
| `SSL_CERT_DAYS` | `820` |
| `RAILWAY_DEPLOYMENT_DRAINING_SECONDS` | `60` |

---

### 3. Qdrant (Vector Database)

| Property | Value |
|----------|-------|
| **Service Name** | Qdrant |
| **Service ID** | `3fa8beba-1757-4802-b979-37c12ec968f0` |
| **Type** | Vector Search Engine |
| **Version** | 1.16.3 |
| **Port** | 6333 |
| **Public Domain** | `https://qdrant-production-4495.up.railway.app` |
| **Private Domain** | `qdrant.railway.internal` |
| **Deployment Status** | SUCCESS |
| **Deployment Date** | 2025-12-29 |
| **Cluster Mode** | Disabled (single node) |

#### Volume Configuration

| Property | Value |
|----------|-------|
| **Volume Name** | qdrant-volume |
| **Volume ID** | `6a936838-bddb-4ff4-89ad-4a487088dcd4` |
| **Mount Path** | `/qdrant/storage` |
| **Storage Used** | 1060 MB |
| **Storage Limit** | 50,000 MB (50 GB) |

#### Collections

**`blocks`** Collection
| Property | Value |
|----------|-------|
| **Status** | 🟢 Green |
| **Points Count** | 16 |
| **Indexed Vectors** | 0 |
| **Segments** | 8 |
| **Vector Size** | 1024 |
| **Distance Metric** | Cosine |

**Collection Configuration:**
```json
{
  "params": {
    "vectors": {
      "size": 1024,
      "distance": "Cosine"
    },
    "shard_number": 1,
    "replication_factor": 1,
    "write_consistency_factor": 1,
    "on_disk_payload": true
  },
  "hnsw_config": {
    "m": 16,
    "ef_construct": 100,
    "full_scan_threshold": 10000,
    "on_disk": false
  },
  "optimizer_config": {
    "deleted_threshold": 0.2,
    "vacuum_min_vector_number": 1000,
    "indexing_threshold": 10000,
    "flush_interval_sec": 5
  },
  "wal_config": {
    "wal_capacity_mb": 32,
    "wal_segments_ahead": 0
  }
}
```

---

## External API Integrations

### DeepSeek AI
| Property | Value |
|----------|-------|
| **Purpose** | Primary LLM for cognition |
| **Base URL** | `https://api.deepseek.com/v1` |
| **Model** | `deepseek-chat` |
| **API Key** | `sk-8114cd34f84745a39a36c328fb61b0b1` |

### Venice.ai
| Property | Value |
|----------|-------|
| **Purpose** | Uncensored LLM & Embeddings |
| **Base URL** | `https://api.venice.ai/api/v1` |
| **LLM Model** | `venice-uncensored` |
| **Embeddings Model** | `text-embedding-bge-m3` |
| **Embedding Dimensions** | 1024 |
| **API Key** | `WBF7_AVts7Wp8Qdk5F3sDeVaNemNrWWGJaE09tn5fJ` |

---

## Networking

### Domain Configuration

| Service | Public Domain | Private Domain |
|---------|---------------|----------------|
| Life | `life-production-1b7b.up.railway.app` | `life.railway.internal` |
| Postgres | `turntable.proxy.rlwy.net:25006` | `postgres.railway.internal:5432` |
| Qdrant | `qdrant-production-4495.up.railway.app` | `qdrant.railway.internal:6333` |

### Internal Service References

Cross-service URLs are automatically injected:
- `RAILWAY_SERVICE_LIFE_URL` → `life-production-1b7b.up.railway.app`
- `RAILWAY_SERVICE_QDRANT_URL` → `qdrant-production-4495.up.railway.app`

---

## Deployment History

### Life Service (Recent)
| Deployment ID | Status | Date |
|---------------|--------|------|
| `3e361773-2d03-4e75-8997-59055be824a0` | SUCCESS | 2026-01-01 00:19:17 |
| `656f66e3-45ab-4b65-bab7-bdf85c87b36d` | REMOVED | 2026-01-01 00:03:07 |
| `68caa59a-1573-4349-80e9-b7990429660f` | REMOVED | 2025-12-31 23:58:46 |
| `b35485ab-333d-4f7e-a9c6-b67d0e081bb6` | REMOVED | 2025-12-31 23:38:20 |
| `2a089c83-aa3f-4264-8b8e-7481711ff844` | REMOVED | 2025-12-31 20:26:50 |

### Postgres Service
| Deployment ID | Status | Date |
|---------------|--------|------|
| `f75ca14a-1c01-4c41-b617-744f4554c19b` | SUCCESS | 2025-12-25 20:33:32 |

### Qdrant Service
| Deployment ID | Status | Date |
|---------------|--------|------|
| `5b558c08-3ec3-45cf-be64-70d8d770433b` | SUCCESS | 2025-12-29 19:53:41 |

---

## Storage Summary

| Volume | Service | Mount Path | Used | Limit | Usage % |
|--------|---------|------------|------|-------|---------|
| postgres-volume | Postgres | `/var/lib/postgresql/data` | 1,107 MB | 50,000 MB | 2.2% |
| qdrant-volume | Qdrant | `/qdrant/storage` | 1,060 MB | 50,000 MB | 2.1% |

**Total Storage Used:** 2,167 MB / 100,000 MB (2.2%)

---

## CLI Commands Reference

### Check Status
```bash
railway status          # Current linked project/service
railway whoami          # Logged in user
railway list            # All projects
```

### Service Management
```bash
railway service status                    # All services status
railway variables                         # Current service variables
railway variables --service Postgres      # Specific service variables
railway variables --service Qdrant
```

### Deployments
```bash
railway deployment list                   # Life deployments
railway deployment list --service Postgres
railway deployment list --service Qdrant
railway up                                # Deploy current directory
railway redeploy                          # Redeploy latest
```

### Logs
```bash
railway logs                              # Stream live logs
railway logs -n 100                       # Last 100 log lines
railway logs --build                      # Build logs
railway logs --filter "@level:error"      # Error logs only
```

### Volumes
```bash
railway volume list                       # List all volumes
```

### Database Access
```bash
railway connect                           # Connect to linked database
PGPASSWORD="***" psql -h turntable.proxy.rlwy.net -p 25006 -U postgres -d railway
```

---

## Notes

- **SSL**: Disabled for Postgres connections
- **Database Reset**: Last reset on December 29, 2025
- **Build System**: Using Railpack (successor to Nixpacks)
- **Node.js Dependencies**: fastify, openai, pg, uuid
- **Vector Indexing**: Qdrant has 0 indexed vectors (below threshold of 10,000)
