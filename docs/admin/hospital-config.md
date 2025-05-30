
# Hospital Configuration API 

This document explains how Angular developers can interact with the Hospital Configuration API. It includes how to create and manage default configs, update nested paths, fetch values for constants, and use them effectively in Angular applications.

---

## 🚀 Features

- **Set Default State** for a hospital
- **Update Specific Keys** using `path`
- **Fetch Specific Config Sections**
- **Auto-create Nested Paths** with JSON
- **Use Configs as Constants in Angular**

---

## 🧩 API Endpoints

### `POST /config/set` admin role required

Used to set or update configuration values.

#### Request Body:
```json
{
  "hospital_id": 1,
  "config_key": "defaultConfig",
  "path": "settings.theme",
  "value": {
    "color": "blue",
    "font": "Arial"
  },
  "auto_create_paths": true
}
````

* `hospital_id` (integer): Required. Must exist in `hospitals` table.
* `config_key` (string): Alphabetic only. E.g., `"defaultConfig"`
* `path` (string, optional): Nested dot-notation. E.g., `"settings.theme"`
* `value` (object): Configuration object or primitive.
* `auto_create_paths` (boolean, optional): If `true`, will create nested paths automatically to store data on backend.

---

### `GET /config/get`

Used to fetch a full or partial configuration.

#### Request Parameters:

```json
{
  "hospital_id": 1,
  "config_key": "defaultConfig",
  "path": "settings.theme"
}
```

Returns nested config if path exists, otherwise returns entire config for the key.

---


## ⚙️ Angular Integration

### Step 1: Fetch Config on App Init

Create a service to fetch and store the config:

```ts
@Injectable({ providedIn: 'root' })
export class ConfigService {
  private config: any = {};

  constructor(private http: HttpClient) {}

  loadConfig(hospitalId: number): Promise<void> {
    return this.http.get<any>('/api/config/get', {
      params: {
        hospital_id: hospitalId,
        config_key: 'defaultConfig'
      }
    }).toPromise().then(response => {
      this.config = response.config || {};
    });
  }

  get(path: string): any {
    return path.split('.').reduce((acc, part) => acc?.[part], this.config);
  }
}
```

### Step 2: Use Constants in Angular Components

```ts
constructor(private configService: ConfigService) {}

ngOnInit() {
  const themeColor = this.configService.get('settings.theme.color');
  console.log('Theme Color:', themeColor);
}
```

### Step 3: Define Constants for Reuse

Create a constants file:

```ts
export const CONFIG_PATHS = {
  THEME_COLOR: 'settings.theme.color',
  NOTIFICATIONS_EMAIL: 'settings.notifications.email',
  FONT: 'settings.theme.font'
};
```

Then use:

```ts
const color = this.configService.get(CONFIG_PATHS.THEME_COLOR);
```

---

## 🌱 Example Usage

### 1. **Set Default Config**

```ts
const defaultConfig = {
  settings: {
    theme: { color: "blue", font: "Arial" },
    notifications: { email: true, sms: false }
  }
};

http.post('/api/config/set', {
  hospital_id: 1,
  config_key: 'defaultConfig',
  value: defaultConfig,
  auto_create_paths: true
});
```

### 2. **Update Specific Value**

```ts
http.post('/api/config/set', {
  hospital_id: 1,
  config_key: 'defaultConfig',
  path: 'settings.theme.color',
  value: 'red'
});
```

### 3. **Fetch Part of Config**

```ts
http.get('/api/config/get', {
  params: {
    hospital_id: 1,
    config_key: 'defaultConfig',
    path: 'settings.theme'
  }
});
```
