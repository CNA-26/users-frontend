# Rahti CSC Deployment Guide (Static Site)

## Prerequisites
- GitHub repository with the code
- Access to Rahti CSC (https://rahti.csc.fi/)

## Deployment Method
This uses Rahti's **nginx-runtime** builder for static React apps - no Docker needed!

## Deployment Steps

### Deploy via Rahti Web Console

1. **Login to Rahti**
   - Go to https://rahti.csc.fi/
   - Login with your CSC credentials

2. **Create New Project** (if needed)
   - Click "Create Project"
   - Enter project name (e.g., `users-frontend`)

3. **Deploy from GitHub**
   - Click "+ Add" → "Import from Git"
   - Enter your GitHub repository URL: `https://github.com/CNA-26/users-frontend.git`

4. **Configure Build**
   - **Builder Image**: Select "nginx" or search for `nginx-runtime`
   - **Application Name**: `users-frontend`
   - **Name**: `users-frontend`
   - Click "Show advanced Git options"
   - **Context Dir**: Leave empty (or `/` if required)
   - Click "Create"

5. **Wait for Build**
   - Rahti will:
     1. Clone your repo
     2. Run `npm install` and `npm run build`
     3. Serve the `build/` folder with nginx
   - Monitor build logs in the console

6. **Access Your App**
   - Once deployed, click on "Routes" to get your app URL
   - Example: `https://users-frontend-<project>.rahtiapp.fi`

## Files in This Repo

### `.s2i/nginx.conf`
Simple nginx configuration that:
- Serves from `/opt/app-root/src` (where S2I puts your build)
- Handles React Router with `try_files` fallback to `index.html`

## Troubleshooting

### Build Fails
- Check build logs in Rahti console
- Ensure `npm run build` works locally first

### 404 on Routes
- Verify `.s2i/nginx.conf` exists and is committed
- Check that nginx builder is being used (not Node.js builder)

## Environment Variables (Future)
When connecting to real backend:
- `REACT_APP_USERS_API_URL`: Your backend API URL
- `REACT_APP_USE_MOCK`: Set to `false`
