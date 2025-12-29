# Railway PostgreSQL Database Configuration

## Project Information
- **Project Name**: life
- **Project ID**: d135c64e-c56c-4869-aa24-b3d5c8579b95
- **Environment**: production
- **Environment ID**: 185326a8-802c-4cda-b6bd-a686c3d2272e
- **Service**: Postgres
- **Service ID**: eb744cdb-ed0d-49d3-a9a4-49de3b5c6cda

## Connection URLs

### Public URL (External Access)
```
postgresql://postgres:vDYIZDJTNgEKgZHPTOsJtKwkmJSowLcL@turntable.proxy.rlwy.net:25006/railway
```

### Internal URL (From within Railway)
```
postgresql://postgres:vDYIZDJTNgEKgZHPTOsJtKwkmJSowLcL@postgres.railway.internal:5432/railway
```

## Authentication Details
| Variable | Value |
|----------|-------|
| **PGUSER** | postgres |
| **PGPASSWORD** | vDYIZDJTNgEKgZHPTOsJtKwkmJSowLcL |
| **POSTGRES_USER** | postgres |
| **POSTGRES_PASSWORD** | vDYIZDJTNgEKgZHPTOsJtKwkmJSowLcL |

## Database Configuration
| Variable | Value |
|----------|-------|
| **PGDATABASE** | railway |
| **POSTGRES_DB** | railway |
| **PGDATA** | /var/lib/postgresql/data/pgdata |

## Host & Port Configuration

### External (Public)
| Variable | Value |
|----------|-------|
| **Host** | turntable.proxy.rlwy.net |
| **Port** | 25006 |
| **RAILWAY_TCP_PROXY_DOMAIN** | turntable.proxy.rlwy.net |
| **RAILWAY_TCP_PROXY_PORT** | 25006 |

### Internal (Railway Network)
| Variable | Value |
|----------|-------|
| **PGHOST** | postgres.railway.internal |
| **RAILWAY_PRIVATE_DOMAIN** | postgres.railway.internal |
| **PGPORT** | 5432 |
| **RAILWAY_TCP_APPLICATION_PORT** | 5432 |

## Environment Variables

### Connection Strings
- **DATABASE_PUBLIC_URL**: `postgresql://postgres:vDYIZDJTNgEKgZHPTOsJtKwkmJSowLcL@turntable.proxy.rlwy.net:25006/railway`
- **DATABASE_URL**: `postgresql://postgres:vDYIZDJTNgEKgZHPTOsJtKwkmJSowLcL@postgres.railway.internal:5432/railway`

### Railway Metadata
- **RAILWAY_ENVIRONMENT**: production
- **RAILWAY_ENVIRONMENT_ID**: 185326a8-802c-4cda-b6bd-a686c3d2272e
- **RAILWAY_ENVIRONMENT_NAME**: production
- **RAILWAY_PROJECT_ID**: d135c64e-c56c-4869-aa24-b3d5c8579b95
- **RAILWAY_PROJECT_NAME**: life
- **RAILWAY_SERVICE_ID**: eb744cdb-ed0d-49d3-a9a4-49de3b5c6cda
- **RAILWAY_SERVICE_NAME**: Postgres

### Volume Configuration
- **RAILWAY_VOLUME_ID**: 9ca7c2fa-af65-490d-937e-c0dfd670e141
- **RAILWAY_VOLUME_NAME**: postgres-volume
- **RAILWAY_VOLUME_MOUNT_PATH**: /var/lib/postgresql/data

### Other Configuration
- **RAILWAY_DEPLOYMENT_DRAINING_SECONDS**: 60
- **SSL_CERT_DAYS**: 820

## Connection Methods

### Using psql (with SSL disabled)
```bash
PGPASSWORD="vDYIZDJTNgEKgZHPTOsJtKwkmJSowLcL" psql -h turntable.proxy.rlwy.net -p 25006 -U postgres -d railway
```

### Using Node.js (pg package)
```javascript
const { Client } = require('pg');
const client = new Client({
  user: 'postgres',
  password: 'vDYIZDJTNgEKgZHPTOsJtKwkmJSowLcL',
  host: 'turntable.proxy.rlwy.net',
  port: 25006,
  database: 'railway',
  ssl: false
});
```

### Using Python (psycopg2)
```python
import psycopg2
conn = psycopg2.connect(
    host='turntable.proxy.rlwy.net',
    port=25006,
    user='postgres',
    password='vDYIZDJTNgEKgZHPTOsJtKwkmJSowLcL',
    database='railway',
    sslmode='disable'
)
```

## Notes
- SSL is currently **disabled** for connections
- The database was reset on December 29, 2025 (all tables dropped)
- Public domain (`turntable.proxy.rlwy.net`) is used for external access
- Internal domain (`postgres.railway.internal`) is for services within the same Railway network
